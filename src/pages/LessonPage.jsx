import React from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import { useApp } from "../context/AppContext.jsx";
import LessonItem from "../components/LessonItem.jsx";
import Progress from "../components/Progress.jsx";
import Spinner from "../components/Spinner.jsx";

export default function LessonPage() {
  const { id, lid } = useParams();
  const { data: c } = useFetch(`/courses/${id}`);
  const { me, toggle } = useApp();
  const history = useHistory();

  if (!c || !me) return <main><Spinner /></main>;
  const enrolled = me.enrolled[c.id];
  if (!enrolled) return <Redirect to={`/course/${id}`} />;

  const idx = c.lessons.findIndex((l) => l.id === +lid);
  const lesson = c.lessons[idx];
  if (!lesson) return <Redirect to={`/course/${id}`} />;

  const done = enrolled.includes(lesson.id);
  const next = c.lessons[idx + 1];

  return (
    <main>
      <p><Link to={`/course/${c.id}`} className="mut">← {c.title}</Link></p>
      <div className="row">
        <div className="col" style={{ flex: 2 }}>
          <div className="video">▶</div>
          <h1>{idx + 1}. {lesson.title}</h1>
          <p className="mut">{lesson.minutes} min · Lesson content for “{lesson.title}” goes here: explanations, code samples and exercises.</p>
          <button className={"btn " + (done ? "alt" : "ok")} onClick={() => toggle(c.id, lesson.id)}>
            {done ? "Mark as incomplete" : "✓ Mark complete"}
          </button>{" "}
          {next && <button className="btn" onClick={() => history.push(`/course/${c.id}/lesson/${next.id}`)}>Next lesson →</button>}
        </div>
        <div className="col">
          <div className="panel">
            <b>Course content</b>
            <div style={{ margin: "10px 0" }}><Progress pct={Math.round((enrolled.length / c.lessons.length) * 100)} /></div>
            {c.lessons.map((x) => (
              <Link key={x.id} to={`/course/${c.id}/lesson/${x.id}`}>
                <LessonItem l={x} done={enrolled.includes(x.id)} current={x.id === lesson.id} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
