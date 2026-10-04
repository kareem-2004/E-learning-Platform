import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import Progress from "./Progress.jsx";

export default function CourseCard({ c }) {
  const { me } = useApp();
  const enrolled = me && me.enrolled[c.id];
  const pct = enrolled ? Math.round((enrolled.length / c.lessonCount) * 100) : 0;
  return (
    <Link to={`/course/${c.id}`} className="card">
      <div className="thumb" style={{ background: c.color }}>{c.emoji}</div>
      <div className="cb">
        <div><span className="tag">{c.category}</span><span className="tag">{c.level}</span></div>
        <b>{c.title}</b>
        <span className="mut" style={{ fontSize: 13 }}>{c.instructor} · ⭐ {c.rating} · {c.hours}h</span>
        {enrolled && (<><Progress pct={pct} /><span className="mut" style={{ fontSize: 12 }}>{pct}% complete</span></>)}
      </div>
    </Link>
  );
}
