import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import Spinner from "./Spinner.jsx";

/** Only renders the page for signed-in users; everyone else is sent to /login. */
export default function PrivateRoute({ component: Component, ...rest }) {
  const { me, ready } = useApp();
  return (
    <Route
      {...rest}
      render={(props) =>
        !ready ? <Spinner />
        : me ? <Component {...props} />
        : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      }
    />
  );
}
