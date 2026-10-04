import React, { useMemo, useState } from "react";
import useFetch from "../hooks/useFetch.js";
import { CATEGORIES } from "../data/courses.js";
import { useApp } from "../context/AppContext.jsx";
import CourseCard from "../components/CourseCard.jsx";
import Spinner from "../components/Spinner.jsx";

export default function Home() {
  const { data, err } = useFetch("/courses");
  const { me } = useApp();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [lvl, setLvl] = useState("All");
  const [sort, setSort] = useState("rating");

  const list = useMemo(() => {
    if (!data) return [];
    const s = q.trim().toLowerCase();
    return data
      .filter((c) =>
        (cat === "All" || c.category === cat) &&
        (lvl === "All" || c.level === lvl) &&
        (!s || (c.title + c.instructor + c.description).toLowerCase().includes(s)))
      .sort((a, b) =>
        sort === "rating" ? b.rating - a.rating : sort === "hours" ? a.hours - b.hours : a.title.localeCompare(b.title));
  }, [data, q, cat, lvl, sort]);

  return (
    <main>
      <div className="hero">
        <h1>Welcome, {me.user.name}! 👋</h1>
        <p>Ready to learn something new today? Pick a course and keep your progress going.</p>
      </div>
      <div className="bar">
        <input placeholder="Search courses, instructors…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          <option>All</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={lvl} onChange={(e) => setLvl(e.target.value)}>
          <option>All</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="rating">Top rated</option><option value="hours">Shortest</option><option value="title">A–Z</option>
        </select>
      </div>
      {err ? <p>Failed to load courses.</p>
        : !data ? <Spinner />
        : list.length ? <div className="grid">{list.map((c) => <CourseCard key={c.id} c={c} />)}</div>
        : <p className="mut">No courses match your filters.</p>}
    </main>
  );
}
