import React from "react";
import { FaBolt, FaUsers, FaShieldAlt } from "react-icons/fa";

// PUBLIC_INTERFACE
export default function Landing({ onSignIn }) {
  /** Landing page with a full-page gradient background, centered hero, custom Sign In button, and glassmorphic info cards. */
  return (
    <div className="hero-wrapper">
      <div className="hero-inner">
        <div className="hero-cta" style={{ textAlign: "center" }}>
          <h1 className="section-title">AI-Powered Code Review</h1>
          <p className="section-subtitle">
            Automate insights, streamline collaboration, and keep your repositories secure. Connect your GitHub to get started.
          </p>
          <div>
            <button className="btn btn-gradient" onClick={onSignIn} aria-label="Sign in">
              Sign In
            </button>
          </div>
        </div>

        <div className="cards-row">
          <div className="glass-card">
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
              <div className="icon-gradient"><FaBolt size={20} /></div>
              <div className="glass-title">Automated Suggestions</div>
            </div>
            <p className="glass-desc">
              Intelligent, real-time recommendations to improve code quality and catch issues early.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
              <div className="icon-gradient"><FaUsers size={18} /></div>
              <div className="glass-title">Seamless Collaboration</div>
            </div>
            <p className="glass-desc">
              Align reviewers and contributors with clear insights and consistent review standards.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
              <div className="icon-gradient"><FaShieldAlt size={18} /></div>
              <div className="glass-title">Secure & Private</div>
            </div>
            <p className="glass-desc">
              Your data stays protected. OAuth-based access and minimal scopes keep your code private.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
