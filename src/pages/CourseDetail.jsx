import React from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import { useApp } from "../context/AppContext.jsx";
import LessonItem from "../components/LessonItem.jsx";
import Progress from "../components/Progress.jsx";
import Spinner from "../components/Spinner.jsx";

export default function CourseDetail() {
  const { id } = useParams();
  const { data: c, err } = useFetch(`/courses/${id}`);
  const { me, enroll, unenroll } = useApp();

  if (err) return <main><h2>Course not found</h2><Link className="btn" to="/">Back to courses</Link></main>;
  if (!c || !me) return <main><Spinner /></main>;

  const enrolled = me.enrolled[c.id];
  const pct = enrolled ? Math.round((enrolled.length / c.lessons.length) * 100) : 0;
  const next = (enrolled && c.lessons.find((l) => !enrolled.includes(l.id))) || c.lessons[0];

  return (
    <main>
      <div className="row">
        <div className="col" style={{ flex: 2 }}>
          <div className="thumb panel" style={{ background: c.color, height: 180, fontSize: 70 }}>{c.emoji}</div>
          <h1 style={{ marginTop: 16 }}>{c.title}</h1>
          <p className="mut">{c.description}</p>
          <p>
            <span className="tag">{c.category}</span><span className="tag">{c.level}</span>
            <span className="mut">By {c.instructor} · ⭐ {c.rating} · {c.hours} hours</span>
          </p>
          <h2 style={{ marginTop: 24 }}>Lessons ({c.lessons.length})</h2>
          {c.lessons.map((l) =>
            enrolled
              ? <Link key={l.id} to={`/course/${c.id}/lesson/${l.id}`}><LessonItem l={l} done={enrolled.includes(l.id)} /></Link>
              : <LessonItem key={l.id} l={l} />)}
        </div>
        <div className="col">
          <div className="panel">
            {enrolled ? (
              <>
                <b>Your progress: {pct}%</b>
                <div style={{ margin: "8px 0 14px" }}><Progress pct={pct} /></div>
                <Link className="btn" to={`/course/${c.id}/lesson/${next.id}`}>
                  {pct === 100 ? "Review course" : pct ? "Continue" : "Start learning"}
                </Link>{" "}
                <button className="btn alt" onClick={() => unenroll(c.id)}>Unenroll</button>
              </>
            ) : (
              <>
                <b style={{ fontSize: 20 }}>Free</b>
                <p className="mut">Enroll to unlock lessons and track progress.</p>
                <button className="btn" onClick={() => enroll(c.id)}>Enroll now</button>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
