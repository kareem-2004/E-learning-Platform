import "./Auth.css";
import React, { useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import Spinner from "../components/Spinner.jsx";

export default function Auth({ mode }) {
  const isRegister = mode === "register";
  const { me, ready, login, register } = useApp();
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!ready) return <Spinner />;

  if (me) {
    return (
      <Redirect
        to={(location.state && location.state.from) || "/"}
      />
    );
  }

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (isRegister && form.name.trim().length < 2) {
      return setError("Please enter your name.");
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    if (isRegister && form.password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    setBusy(true);

    try {
      if (isRegister) {
        await register({
          name: form.name.trim(),
          email: form.email,
          password: form.password,
        });
      } else {
        await login({
          email: form.email,
          password: form.password,
        });
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setBusy(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">



        <h1>
          {isRegister ? "Create an account" : "Welcome back! Glad To See You, Again!"}
        </h1>

        <form onSubmit={submit} className="auth-form">

          {isRegister && (
            <label>
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                autoComplete="name"
                required
              />
            </label>
          )}

          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </label>

          <label>
            <span>Password</span>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder={
                  isRegister ? "At least 6 characters" : "Enter your password"
                }
                autoComplete={
                  isRegister ? "new-password" : "current-password"
                }
                required
                minLength={6}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          {isRegister && (
            <label>
              <span>Confirm password</span>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
              />
            </label>
          )}

          {!isRegister && (
            <div className="forgot-row">
              <span />
              <span className="forgot-text">Forgot password?</span>
            </div>
          )}

          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}

          <button className="auth-submit" type="submit" disabled={busy}>
            {busy
              ? "Please wait..."
              : isRegister
              ? "Create account"
              : "Log in"}
          </button>
        </form>

        <div className="auth-switch">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <Link to="/login">Log in</Link>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <Link to="/register">Sign up</Link>
            </>
          )}
        </div>

      </div>
    </main>
  );
}