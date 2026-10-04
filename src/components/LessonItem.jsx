import React from "react";

export default function LessonItem({ l, done, current }) {
  return (
    <div className={"les" + (current ? " cur" : "")}>
      <span className={"chk" + (done ? " d" : "")}>{done ? "✓" : ""}</span>
      <span style={{ flex: 1 }}>{l.title}</span>
      <span className="mut" style={{ fontSize: 13 }}>{l.minutes} min</span>
    </div>
  );
}
