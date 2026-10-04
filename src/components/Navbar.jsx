import "./Navbar.css";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  Library,
  UserRound,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export default function Navbar() {
  const { me, logout } = useApp();
  const history = useHistory();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  const signOut = async () => {
    await logout();
    history.push("/login");
  };

  return (
    <nav className="navbar">
      <Link to={me ? "/" : "/login"} className="logo">
        <GraduationCap size={25} strokeWidth={2} />
        <span>LearnHub</span>
      </Link>

      <div className="nav-links">
        {me ? (
          <>
            <NavLink
              exact
              to="/"
              className="nl"
              activeClassName="active"
            >
              <BookOpen size={18} />
              <span>Courses</span>
            </NavLink>

            <NavLink
              to="/my-learning"
              className="nl"
              activeClassName="active"
            >
              <Library size={18} />
              <span>My Learning</span>
            </NavLink>

            <NavLink
              to="/profile"
              className="nl"
              activeClassName="active"
            >
              <UserRound size={18} />
              <span>Profile</span>
            </NavLink>

            <button className="btn alt nav-button" onClick={signOut}>
              <LogOut size={17} />
              <span>Log out</span>
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="nl" activeClassName="active">
              Log in
            </NavLink>

            <NavLink to="/register" className="nl" activeClassName="active">
              Register
            </NavLink>
          </>
        )}

        <button
          className="btn alt theme-button"
          onClick={() => setDark((d) => !d)}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          title={dark ? "Light mode" : "Dark mode"}
        >
          {dark ? <Sun size={19} /> : <Moon size={19} />}
        </button>
      </div>
    </nav>
  );
}