import { useEffect, useState } from "react";
import api from "../api/api.js";

export default function useFetch(path) {
  const [state, setState] = useState({ data: null, err: null });
  useEffect(() => {
    let active = true;
    setState({ data: null, err: null });
    api.get(path)
      .then((data) => active && setState({ data, err: null }))
      .catch((err) => active && setState({ data: null, err }));
    return () => { active = false; };
  }, [path]);
  return state;
}
