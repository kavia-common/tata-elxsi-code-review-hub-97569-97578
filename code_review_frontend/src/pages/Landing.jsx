import React from "react";
import GitHubLoginButton from "../components/GitHubLoginButton";
import Card from "../components/Card";

// PUBLIC_INTERFACE
export default function Landing({ onSignIn }) {
  /** Landing page with branded hero and login CTA. */
  return (
    <>
      <div className="container" style={{ marginTop: 18 }}>
        <div className="grid hero">
          <Card
            title="Tata Elxsi Code Review Hub"
            subtitle="A modern, vibrant dashboard for GitHub repositories and code reviews"
            right={<span className="badge">Light Theme</span>}
          >
            <div style={{ display: "grid", gap: 14 }}>
              <div className="kicker">Built for GitHub</div>
              <div style={{ color: "var(--text-muted)" }}>
                Sign in with your GitHub account to see your repositories, user info, and a unified code review dashboard.
              </div>
              <div>
                <GitHubLoginButton onClick={onSignIn} large />
              </div>
            </div>
          </Card>

          <Card title="Brand & Identity" subtitle="Tata Elxsi palette in action">
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: "var(--te-primary)" }} />
                <div>Primary: #c5168c</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: "var(--te-secondary)" }} />
                <div>Secondary: #034ea1</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: "var(--te-accent)" }} />
                <div>Accent: #c5168c</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid" style={{ marginTop: 16 }}>
          <Card title="How it works" subtitle="OAuth + GitHub APIs + Cards UI">
            <ol style={{ margin: 0, paddingLeft: 18, color: "var(--text-muted)" }}>
              <li>Click “Sign in with GitHub”.</li>
              <li>You will be redirected to GitHub's OAuth page.</li>
              <li>After authorization, you’ll be redirected to /oauth/callback.</li>
              <li>Optional: Backend exchanges the code for an access token.</li>
              <li>Dashboard displays repos and user info using GitHub APIs.</li>
            </ol>
          </Card>
        </div>
      </div>
    </>
  );
}
