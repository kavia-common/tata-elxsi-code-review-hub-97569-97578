import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { exchangeCodeForToken, fetchGitHubUser } from "../services/api";
import { setAccessToken } from "../services/storage";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
export default function OAuthCallback({ onAuth }) {
  /** Handles GitHub OAuth redirect callback. Exchanges code via backend if configured. */
  const [message, setMessage] = useState("Completing authentication...");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    async function run() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");
      const errorParam = params.get("error");

      if (errorParam) {
        setError(`GitHub returned an error: ${errorParam}`);
        return;
      }
      if (!code) {
        setError("Missing OAuth code. Please try sign-in again.");
        return;
      }

      try {
        setMessage("Exchanging code for access token...");
        const payload = await exchangeCodeForToken(code);
        const token = payload?.access_token || payload?.token || payload?.accessToken;
        if (!token) {
          throw new Error("Token not found in backend response.");
        }
        setAccessToken(token);
        setMessage("Loading your GitHub profile...");
        const user = await fetchGitHubUser(token);
        if (isMounted) {
          onAuth({ accessToken: token, user });
          navigate("/");
        }
      } catch (e) {
        setError(e.message || "Authentication failed.");
      }
    }
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container" style={{ marginTop: 18 }}>
      <Card title="GitHub Authentication">
        {error ? (
          <div className="card" style={{ background: "#fff1f2", color: "#b91c1c", borderStyle: "dashed" }}>{error}</div>
        ) : (
          <div style={{ color: "var(--text-muted)" }}>{message}</div>
        )}
      </Card>
    </div>
  );
}
