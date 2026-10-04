import React from "react";
export default function Progress({ pct }) {
  return <div className="prog"><i style={{ width: pct + "%" }} /></div>;
}
