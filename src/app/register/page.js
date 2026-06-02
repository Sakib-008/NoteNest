"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    department: "",
    semester: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email address";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "At least 6 characters required";
    if (!formData.department.trim()) newErrors.department = "Department is required";
    if (!formData.semester.trim()) newErrors.semester = "Semester is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitted(true);
      } else {
        setErrors({ general: data.message || "Registration failed. Please try again." });
      }
    } catch {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ivory:     #F7F4EE;
          --ivory-dark:#EDE8DD;
          --forest:    #2C4A3E;
          --forest-mid:#3D6355;
          --forest-lt: #557A6B;
          --gold:      #B89A5A;
          --gold-lt:   #D4BA80;
          --ink:       #1C1C1C;
          --ink-soft:  #4A4A4A;
          --ink-muted: #8A8A8A;
          --red:       #C0392B;
          --white:     #FFFFFF;
          --shadow-sm: 0 2px 8px rgba(44,74,62,0.08);
          --shadow-md: 0 8px 32px rgba(44,74,62,0.12);
          --shadow-lg: 0 24px 64px rgba(44,74,62,0.16);
        }

        html, body {
          height: 100%;
          background: var(--ivory);
          font-family: 'DM Sans', sans-serif;
          color: var(--ink);
          -webkit-font-smoothing: antialiased;
        }

        .page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        /* ── LEFT PANEL ── */
        .left-panel {
          background: var(--forest);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3.5rem;
        }

        /* Notebook ruled lines */
        .left-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 39px,
            rgba(255,255,255,0.045) 39px,
            rgba(255,255,255,0.045) 40px
          );
          pointer-events: none;
        }

        /* Subtle left margin line */
        .left-panel::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          left: 5.5rem;
          width: 1px;
          background: rgba(184,154,90,0.25);
          pointer-events: none;
        }

        .brand {
          position: relative;
          z-index: 1;
          animation: fadeUp 0.7s ease both;
        }

        .brand-mark {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 3.5rem;
        }

        .brand-icon {
          width: 40px;
          height: 40px;
          border: 1.5px solid var(--gold);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-icon svg {
          width: 20px;
          height: 20px;
          stroke: var(--gold);
          fill: none;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 500;
          color: var(--ivory);
          letter-spacing: 0.04em;
        }

        .hero-text {
          margin-bottom: 2rem;
        }

        .hero-eyebrow {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .hero-eyebrow::before {
          content: '';
          display: block;
          width: 28px;
          height: 1px;
          background: var(--gold);
          opacity: 0.7;
        }

        .hero-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 3.5vw, 3.2rem);
          font-weight: 300;
          line-height: 1.18;
          color: var(--ivory);
          letter-spacing: -0.01em;
          margin-bottom: 1.5rem;
        }

        .hero-heading em {
          font-style: italic;
          color: var(--gold-lt);
        }

        .hero-body {
          font-size: 0.875rem;
          line-height: 1.75;
          color: rgba(247,244,238,0.6);
          max-width: 320px;
          font-weight: 300;
        }

        .feature-list {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          animation: fadeUp 0.7s 0.2s ease both;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.875rem;
        }

        .feature-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold);
          flex-shrink: 0;
          opacity: 0.8;
        }

        .feature-text {
          font-size: 0.8rem;
          color: rgba(247,244,238,0.55);
          font-weight: 300;
          letter-spacing: 0.02em;
        }

        /* ── RIGHT PANEL ── */
        .right-panel {
          background: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 4rem;
          position: relative;
        }

        /* Corner decoration */
        .right-panel::before {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 120px; height: 120px;
          background: radial-gradient(circle at top right, var(--ivory-dark) 0%, transparent 70%);
          pointer-events: none;
        }

        .form-container {
          width: 100%;
          max-width: 420px;
          animation: fadeUp 0.6s 0.1s ease both;
        }

        .form-header {
          margin-bottom: 2.5rem;
        }

        .form-subtitle {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--forest-lt);
          margin-bottom: 0.75rem;
        }

        .form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 500;
          color: var(--ink);
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.25rem 0 2rem;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: var(--ivory-dark);
        }

        .divider-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--gold);
          opacity: 0.6;
        }

        /* ── FLOATING LABEL INPUTS ── */
        .field {
          position: relative;
          margin-bottom: 1.35rem;
        }

        .field label {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.825rem;
          color: var(--ink-muted);
          font-weight: 300;
          pointer-events: none;
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
        }

        .field.has-value label,
        .field.focused label {
          top: 0;
          transform: translateY(-100%) translateY(-4px);
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--forest-mid);
          font-weight: 500;
        }

        .field.error label {
          color: var(--red);
        }

        .field input,
        .field select {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid var(--ivory-dark);
          padding: 0.625rem 0;
          font-size: 0.9rem;
          color: var(--ink);
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          outline: none;
          transition: border-color 0.2s ease;
          appearance: none;
          -webkit-appearance: none;
        }

        .field select {
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238A8A8A' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0 center;
          padding-right: 1.5rem;
        }

        .field input:focus,
        .field select:focus {
          border-bottom-color: var(--forest);
        }

        .field.error input,
        .field.error select {
          border-bottom-color: var(--red);
        }

        .field-underline {
          position: absolute;
          bottom: 0; left: 0;
          height: 1.5px;
          width: 0;
          background: var(--forest);
          transition: width 0.3s ease;
        }

        .field.focused .field-underline {
          width: 100%;
        }

        .field.error .field-underline {
          background: var(--red);
          width: 100%;
        }

        .error-msg {
          font-size: 0.7rem;
          color: var(--red);
          margin-top: 0.35rem;
          font-weight: 400;
          letter-spacing: 0.01em;
          opacity: 0;
          transform: translateY(-4px);
          transition: all 0.2s ease;
          display: block;
        }

        .field.error .error-msg {
          opacity: 1;
          transform: translateY(0);
        }

        /* Two-column grid for department & semester */
        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        /* ── SUBMIT BUTTON ── */
        .submit-btn {
          width: 100%;
          margin-top: 2rem;
          padding: 0.95rem 2rem;
          background: var(--forest);
          color: var(--ivory);
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: background 0.25s ease, transform 0.15s ease;
          border-radius: 2px;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gold);
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
        }

        .submit-btn:hover::before {
          transform: translateX(0);
        }

        .submit-btn:hover {
          color: var(--forest);
        }

        .submit-btn:active {
          transform: scale(0.99);
        }

        .btn-text {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.625rem;
        }

        .spinner {
          width: 14px; height: 14px;
          border: 1.5px solid rgba(247,244,238,0.3);
          border-top-color: var(--ivory);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .submit-btn:hover .spinner {
          border-color: rgba(44,74,62,0.3);
          border-top-color: var(--forest);
        }

        /* ── GENERAL ERROR ── */
        .general-error {
          background: #FDF2F2;
          border-left: 3px solid var(--red);
          padding: 0.75rem 1rem;
          border-radius: 2px;
          font-size: 0.8rem;
          color: var(--red);
          margin-bottom: 1.5rem;
        }

        /* ── SUCCESS STATE ── */
        .success-container {
          text-align: center;
          padding: 2rem 0;
          animation: fadeUp 0.5s ease both;
        }

        .success-icon {
          width: 64px; height: 64px;
          border-radius: 50%;
          border: 2px solid var(--forest);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.75rem;
          animation: scaleIn 0.4s 0.1s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        .success-icon svg {
          width: 26px; height: 26px;
          stroke: var(--forest);
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
          animation: drawCheck 0.5s 0.4s ease forwards;
        }

        .success-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.75rem;
          font-weight: 500;
          color: var(--ink);
          margin-bottom: 0.75rem;
        }

        .success-body {
          font-size: 0.875rem;
          color: var(--ink-soft);
          line-height: 1.7;
          font-weight: 300;
        }

        /* ── LOGIN LINK ── */
        .login-prompt {
          margin-top: 1.75rem;
          text-align: center;
          font-size: 0.8rem;
          color: var(--ink-muted);
          font-weight: 300;
        }

        .login-link {
          color: var(--forest);
          font-weight: 500;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }

        .login-link:hover {
          border-bottom-color: var(--forest);
        }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes scaleIn {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }

        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .page { grid-template-columns: 1fr; }
          .left-panel {
            padding: 2.5rem;
            min-height: 260px;
          }
          .feature-list { display: none; }
          .right-panel { padding: 2.5rem 2rem; }
        }

        @media (max-width: 480px) {
          .right-panel { padding: 2rem 1.5rem; }
          .field-row { grid-template-columns: 1fr; gap: 0; }
        }
      `}</style>

      <div className="page">
        {/* ── LEFT PANEL ── */}
        <div className="left-panel">
          <div className="brand">
            <div className="brand-mark">
              <div className="brand-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="8" y1="13" x2="16" y2="13"/>
                  <line x1="8" y1="17" x2="13" y2="17"/>
                </svg>
              </div>
              <span className="brand-name">NoteNest</span>
            </div>

            <div className="hero-text">
              <p className="hero-eyebrow">Academic companion</p>
              <h1 className="hero-heading">
                Your notes,<br />
                beautifully <em>organised.</em>
              </h1>
              <p className="hero-body">
                A quiet, focused space for every lecture, every idea, and every moment of clarity — built for students who care about their craft.
              </p>
            </div>
          </div>

          <div className="feature-list">
            {[
              "Organise notes by subject & semester",
              "Access everything from any device",
              "Share notes with your classmates",
              "Never lose an important idea again",
            ].map((f) => (
              <div className="feature-item" key={f}>
                <div className="feature-dot" />
                <span className="feature-text">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="right-panel">
          <div className="form-container">
            {submitted ? (
              <div className="success-container">
                <div className="success-icon">
                  <svg viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h2 className="success-title">Welcome to NoteNest</h2>
                <p className="success-body">
                  Your account has been created.<br />
                  You're all set to start organising your academic life.
                </p>
              </div>
            ) : (
              <>
                <div className="form-header">
                  <p className="form-subtitle">Get started</p>
                  <h2 className="form-title">Create your account</h2>
                  <div className="divider">
                    <div className="divider-line" />
                    <div className="divider-dot" />
                    <div className="divider-line" />
                  </div>
                </div>

                {errors.general && (
                  <div className="general-error">{errors.general}</div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  {/* Full Name */}
                  <div className={`field ${formData.fullName ? "has-value" : ""} ${focused === "fullName" ? "focused" : ""} ${errors.fullName ? "error" : ""}`}>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onFocus={() => setFocused("fullName")}
                      onBlur={() => setFocused("")}
                      autoComplete="name"
                    />
                    <div className="field-underline" />
                    <span className="error-msg">{errors.fullName}</span>
                  </div>

                  {/* Email */}
                  <div className={`field ${formData.email ? "has-value" : ""} ${focused === "email" ? "focused" : ""} ${errors.email ? "error" : ""}`}>
                    <label htmlFor="email">University Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused("")}
                      autoComplete="email"
                    />
                    <div className="field-underline" />
                    <span className="error-msg">{errors.email}</span>
                  </div>

                  {/* Password */}
                  <div className={`field ${formData.password ? "has-value" : ""} ${focused === "password" ? "focused" : ""} ${errors.password ? "error" : ""}`}>
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocused("password")}
                      onBlur={() => setFocused("")}
                      autoComplete="new-password"
                    />
                    <div className="field-underline" />
                    <span className="error-msg">{errors.password}</span>
                  </div>

                  {/* Department & Semester */}
                  <div className="field-row">
                    <div className={`field ${formData.department ? "has-value" : ""} ${focused === "department" ? "focused" : ""} ${errors.department ? "error" : ""}`}>
                      <label htmlFor="department">Department</label>
                      <input
                        id="department"
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        onFocus={() => setFocused("department")}
                        onBlur={() => setFocused("")}
                      />
                      <div className="field-underline" />
                      <span className="error-msg">{errors.department}</span>
                    </div>

                    <div className={`field ${formData.semester ? "has-value" : ""} ${focused === "semester" ? "focused" : ""} ${errors.semester ? "error" : ""}`}>
                      <label htmlFor="semester">Semester</label>
                      <select
                        id="semester"
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                        onFocus={() => setFocused("semester")}
                        onBlur={() => setFocused("")}
                      >
                        <option value="" disabled hidden></option>
                        {semesters.map((s) => (
                          <option key={s} value={s}>{s} Semester</option>
                        ))}
                      </select>
                      <div className="field-underline" />
                      <span className="error-msg">{errors.semester}</span>
                    </div>
                  </div>

                  <button type="submit" className="submit-btn" disabled={loading}>
                    <span className="btn-text">
                      {loading && <span className="spinner" />}
                      {loading ? "Creating account…" : "Create Account"}
                    </span>
                  </button>
                </form>

                <p className="login-prompt">
                  Already have an account?{" "}
                  <a href="/login" className="login-link">Sign in</a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}