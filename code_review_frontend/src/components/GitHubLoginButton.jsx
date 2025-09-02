import React from "react";
import { FaGithub } from "react-icons/fa";

// PUBLIC_INTERFACE
export default function GitHubLoginButton({ onClick, large }) {
  /** Reusable GitHub OAuth sign-in button. */
  return (
    <button className={`btn btn-accent${large ? " btn-large" : ""}`} onClick={onClick}>
      <FaGithub size={18} />
      Continue with GitHub
    </button>
  );
}
