import React from "react";
import { FaGithub } from "react-icons/fa";

// PUBLIC_INTERFACE
export default function Navbar({ onSignIn, onSignOut, user }) {
  /** Top navigation bar with Tata Elxsi brand styling and GitHub CTA. */
  return (
    <div className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <div className="brand-mark">TE</div>
          <div>
            <div style={{ fontSize: 16, lineHeight: 1 }}>Tata Elxsi</div>
            <div className="brand-sub">Code Review Hub</div>
          </div>
        </div>
        <div className="nav-actions">
          {user ? (
            <>
              <img
                className="avatar"
                src={user.avatar_url}
                alt={user.login}
                title={user.login}
              />
              <button className="btn btn-outline" onClick={onSignOut}>Sign out</button>
            </>
          ) : (
            <button className="btn btn-accent" onClick={onSignIn}>
              <FaGithub /> Sign in with GitHub
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
