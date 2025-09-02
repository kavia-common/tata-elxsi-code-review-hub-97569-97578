//
// Simple API helpers for GitHub OAuth and data fetching.
// Uses environment variables (REACT_APP_*) and avoids hard-coded values.
//

const SITE_URL = process.env.REACT_APP_SITE_URL || window.location.origin;
const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID || "";
const GITHUB_SCOPES = (process.env.REACT_APP_GITHUB_SCOPES || "read:user repo").replace(/[,]/g, " ");
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";

// PUBLIC_INTERFACE
export function buildGitHubOAuthUrl(state = "") {
  /** Build GitHub OAuth authorization URL using environment variables. */
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: `${SITE_URL}/oauth/callback`,
    scope: GITHUB_SCOPES,
    state,
    allow_signup: "true",
  });
  return `https://github.com/login/oauth/authorize?${params.toString()}`;
}

// PUBLIC_INTERFACE
export async function exchangeCodeForToken(code) {
  /** Exchanges the GitHub OAuth code for an access token via backend, if configured. */
  if (!BACKEND_URL) {
    throw new Error("No backend configured. Please set REACT_APP_BACKEND_URL.");
  }
  const res = await fetch(`${BACKEND_URL}/oauth/github/callback?code=${encodeURIComponent(code)}`);
  if (!res.ok) throw new Error(`Token exchange failed (${res.status})`);
  return res.json();
}

// PUBLIC_INTERFACE
export async function fetchGitHubUser(accessToken) {
  /** Fetches GitHub user using a provided access token. */
  const res = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`Failed to fetch user (${res.status})`);
  return res.json();
}

// PUBLIC_INTERFACE
export async function fetchGitHubRepos(accessToken) {
  /** Fetches GitHub repositories for the authenticated user. */
  const res = await fetch("https://api.github.com/user/repos?per_page=50&sort=updated", {
    headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`Failed to fetch repos (${res.status})`);
  return res.json();
}
