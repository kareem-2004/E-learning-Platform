import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api.js";

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

export function AppProvider({ children }) {
  const [me, setMe] = useState(null);      // { user, enrolled } when signed in, otherwise null
  const [ready, setReady] = useState(false); // true once the session check has finished
  const [toast, setToast] = useState("");

  useEffect(() => {
    api.get("/me").then(setMe).catch(() => setMe(null)).finally(() => setReady(true));
  }, []);

  const say = (msg) => { setToast(msg); setTimeout(() => setToast(""), 1800); };
  const setEnrolled = (enrolled) => setMe((p) => ({ ...p, enrolled }));

  // Auth: errors are thrown so the form can show the message
  const login = async (creds) => setMe(await api.post("/auth/login", creds));
  const register = async (data) => setMe(await api.post("/auth/register", data));
  const logout = async () => { await api.post("/auth/logout"); setMe(null); };

  const enroll = async (id) => { setEnrolled(await api.post(`/courses/${id}/enroll`)); say("Enrolled! 🎉"); };
  const unenroll = async (id) => setEnrolled(await api.del(`/courses/${id}/enroll`));
  const toggle = async (courseId, lessonId) =>
    setEnrolled(await api.post(`/courses/${courseId}/progress`, { lessonId }));
  const saveUser = async (u) => {
    const user = await api.put("/me", u);
    setMe((p) => ({ ...p, user }));
    say("Profile saved");
  };

  return (
    <Ctx.Provider value={{ me, ready, login, register, logout, enroll, unenroll, toggle, saveUser }}>
      {children}
      {toast && <div className="toast">{toast}</div>}
    </Ctx.Provider>
  );
}
