/**
 * REST-style API client.
 *
 * By default this runs against an in-browser mock (courses in src/data/courses.js,
 * accounts + progress in localStorage) so the project works with zero setup.
 * NOTE: the mock stores passwords in localStorage for demo purposes only.
 * A real backend must hash passwords and issue a session cookie or token.
 *
 * To use a real backend, set VITE_API_URL (e.g. http://localhost:4000/api) in
 * a .env file. Every call then goes through fetch() to the same routes:
 *   POST   /auth/register          { name, email, password }  -> { user, enrolled }
 *   POST   /auth/login             { email, password }        -> { user, enrolled }
 *   POST   /auth/logout
 *   GET    /me                     -> { user, enrolled }  (401 when signed out)
 *   PUT    /me                     { name, bio }
 *   GET    /courses
 *   GET    /courses/:id
 *   POST   /courses/:id/enroll
 *   DELETE /courses/:id/enroll
 *   POST   /courses/:id/progress   { lessonId }
 */
import { COURSES } from "../data/courses.js";

const BASE = import.meta.env.VITE_API_URL;
const KEY = "learnhub_v2";

/* ---------- real backend ---------- */
async function http(method, path, body) {
  const res = await fetch(BASE + path, {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw { status: res.status, message: json.message };
  return json;
}

/* ---------- mock backend ---------- */
const readDB = () => {
  try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
};
let DB = readDB() || { users: {}, session: null, progress: {} };
const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch { /* ignore */ } };
const reply = (v) => new Promise((r) => setTimeout(() => r(JSON.parse(JSON.stringify(v))), 250));
const fail = (status, message) => new Promise((_, rej) => setTimeout(() => rej({ status, message }), 250));

const publicUser = (u) => ({ name: u.name, email: u.email, bio: u.bio || "" });
const meOf = (email) => ({ user: publicUser(DB.users[email]), enrolled: DB.progress[email] || {} });
const authed = () => DB.session && DB.users[DB.session];
const enrolledMap = () => (DB.progress[DB.session] = DB.progress[DB.session] || {});

const mock = {
  get(path) {
    if (path === "/courses") return reply(COURSES.map(({ lessons, ...c }) => ({ ...c, lessonCount: lessons.length })));
    const m = path.match(/^\/courses\/(\d+)$/);
    if (m) { const c = COURSES.find((c) => c.id === +m[1]); return c ? reply(c) : fail(404, "Not found"); }
    if (path === "/me") return authed() ? reply(meOf(DB.session)) : fail(401, "Not signed in");
    return fail(404, "Not found");
  },
  post(path, body) {
    if (path === "/auth/register") {
      const email = (body.email || "").trim().toLowerCase();
      if (DB.users[email]) return fail(409, "An account with this email already exists. Log in instead.");
      DB.users[email] = { name: body.name.trim(), email, password: body.password, bio: "" };
      DB.session = email; persist();
      return reply(meOf(email));
    }
    if (path === "/auth/login") {
      const email = (body.email || "").trim().toLowerCase();
      const u = DB.users[email];
      if (!u || u.password !== body.password) return fail(401, "Incorrect email or password.");
      DB.session = email; persist();
      return reply(meOf(email));
    }
    if (path === "/auth/logout") { DB.session = null; persist(); return reply({ ok: true }); }
    if (!authed()) return fail(401, "Not signed in");

    let m = path.match(/^\/courses\/(\d+)\/enroll$/);
    if (m) { const e = enrolledMap(); e[m[1]] = e[m[1]] || []; persist(); return reply(e); }
    m = path.match(/^\/courses\/(\d+)\/progress$/);
    if (m) {
      const e = enrolledMap();
      const list = (e[m[1]] = e[m[1]] || []);
      const i = list.indexOf(body.lessonId);
      i >= 0 ? list.splice(i, 1) : list.push(body.lessonId);
      persist();
      return reply(e);
    }
    return fail(404, "Not found");
  },
  put(path, body) {
    if (!authed()) return fail(401, "Not signed in");
    if (path === "/me") {
      DB.users[DB.session] = { ...DB.users[DB.session], name: body.name, bio: body.bio };
      persist();
      return reply(publicUser(DB.users[DB.session]));
    }
    return fail(404, "Not found");
  },
  del(path) {
    if (!authed()) return fail(401, "Not signed in");
    const m = path.match(/^\/courses\/(\d+)\/enroll$/);
    if (m) { const e = enrolledMap(); delete e[m[1]]; persist(); return reply(e); }
    return fail(404, "Not found");
  },
};

const api = BASE
  ? {
      get: (p) => http("GET", p),
      post: (p, b) => http("POST", p, b),
      put: (p, b) => http("PUT", p, b),
      del: (p) => http("DELETE", p),
    }
  : mock;

export default api;
