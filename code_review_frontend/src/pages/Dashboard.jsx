import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import { fetchGitHubRepos } from "../services/api";

// PUBLIC_INTERFACE
export default function Dashboard({ user, accessToken }) {
  /** Code review dashboard showing repos and quick stats. */
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(!!accessToken);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function load() {
      if (!accessToken) return;
      try {
        setLoading(true);
        const data = await fetchGitHubRepos(accessToken);
        if (isMounted) setRepos(Array.isArray(data) ? data : []);
      } catch (e) {
        if (isMounted) setError(e.message || "Failed to load repositories.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, [accessToken]);

  const stats = useMemo(() => {
    const total = repos.length;
    const forks = repos.filter(r => r.fork).length;
    const priv = repos.filter(r => r.private).length;
    const updatedRecently = repos.filter(r => {
      try {
        const d = new Date(r.updated_at);
        return (Date.now() - d.getTime()) < 1000 * 60 * 60 * 24 * 7; // 7 days
      } catch {
        return false;
      }
    }).length;
    return { total, forks, priv, updatedRecently };
  }, [repos]);

  return (
    <div className="container" style={{ marginTop: 18 }}>
      <div className="grid hero">
        <Card
          title="Overview"
          subtitle="Your code review insights at a glance"
          right={user ? <span className="badge">Signed in as {user.login}</span> : null}
        >
          <div className="header-stats">
            <div className="stat">
              <div className="label">Repositories</div>
              <div className="value">{stats.total}</div>
            </div>
            <div className="stat">
              <div className="label">Private</div>
              <div className="value">{stats.priv}</div>
            </div>
            <div className="stat">
              <div className="label">Forks</div>
              <div className="value">{stats.forks}</div>
            </div>
            <div className="stat">
              <div className="label">Updated (7d)</div>
              <div className="value">{stats.updatedRecently}</div>
            </div>
          </div>
        </Card>
        <Card title="Code Review Status" subtitle="Recent activity snapshots">
          <div className="code-review-card">
            <div className="ribbon">
              <div style={{ display: "grid", gap: 8 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div className="badge">GitHub</div>
                  <div className="badge" style={{ background: "#ffe4f3", color: "#c5168c", borderColor: "#ffd1eb" }}>
                    Tata Elxsi
                  </div>
                </div>
                <div style={{ fontWeight: 700 }}>No PR analytics connected</div>
                <div style={{ color: "var(--text-muted)" }}>
                  Connect a backend to fetch pull requests, reviews, checks and CI status for your repositories.
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid" style={{ marginTop: 16 }}>
        <Card
          title="Repositories"
          subtitle={loading ? "Loading repositories..." : "Your latest repositories from GitHub"}
          right={<span className="badge">{repos.length} total</span>}
        >
          {error && (
            <div className="card" style={{ borderStyle: "dashed", color: "#b91c1c", background: "#fff1f2" }}>
              {error}
            </div>
          )}
          {!loading && repos.length === 0 && (
            <div style={{ color: "var(--text-muted)" }}>
              No repositories to display. Ensure permissions include repo scope.
            </div>
          )}
          <div className="repo-list">
            {repos.map((r) => (
              <div key={r.id} className="repo-item">
                <div>
                  <div className="repo-name">{r.full_name}</div>
                  <div className="repo-meta">
                    <span>★ {r.stargazers_count}</span>
                    <span>⎇ {r.forks_count}</span>
                    <span>Issues {r.open_issues_count}</span>
                    <span>{r.private ? "Private" : "Public"}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <a className="btn btn-outline" href={r.html_url} target="_blank" rel="noreferrer">Open</a>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
