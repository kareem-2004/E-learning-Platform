import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import { useApp } from "../context/AppContext.jsx";
import CourseCard from "../components/CourseCard.jsx";
import Spinner from "../components/Spinner.jsx";

export default function MyLearning() {
  const { data } = useFetch("/courses");
  const { me } = useApp();
  if (!data || !me) return <main><Spinner /></main>;

  const mine = data.filter((c) => me.enrolled[c.id]);
  const lessons = mine.reduce((s, c) => s + me.enrolled[c.id].length, 0);
  const completed = mine.filter((c) => me.enrolled[c.id].length === c.lessonCount).length;

  return (
    <main>
      <h1>My Learning</h1>
      <div className="stats" style={{ marginTop: 16 }}>
        <div className="panel stat"><b>{mine.length}</b><span className="mut">Enrolled</span></div>
        <div className="panel stat"><b>{lessons}</b><span className="mut">Lessons done</span></div>
        <div className="panel stat"><b>{completed}</b><span className="mut">Completed</span></div>
      </div>
      {mine.length
        ? <div className="grid">{mine.map((c) => <CourseCard key={c.id} c={c} />)}</div>
        : <div className="panel"><p>You haven't enrolled in any courses yet.</p><Link className="btn" to="/">Browse courses</Link></div>}
    </main>
  );
}
