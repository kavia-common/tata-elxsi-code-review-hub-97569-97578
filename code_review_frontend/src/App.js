import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import OAuthCallback from "./pages/OAuthCallback";
import { buildGitHubOAuthUrl, fetchGitHubUser } from "./services/api";
import { clearAuth, getAccessToken, setAccessToken } from "./services/storage";

// PUBLIC_INTERFACE
export default function App() {
  /** App entry – wires routes, OAuth login, and layout */
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

function Main() {
  const [accessToken, setToken] = useState(getAccessToken());
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(!!accessToken);

  // Load user on initial token presence
  useEffect(() => {
    let isMounted = true;
    async function init() {
      if (!accessToken) return;
      try {
        setLoadingUser(true);
        const u = await fetchGitHubUser(accessToken);
        if (isMounted) setUser(u);
      } catch {
        // Clear invalid token
        setAccessToken("");
        setToken("");
        clearAuth();
      } finally {
        if (isMounted) setLoadingUser(false);
      }
    }
    init();
    return () => { isMounted = false; };
  }, [accessToken]);

  // PUBLIC_INTERFACE
  const signIn = useCallback(() => {
    /** Redirects to GitHub OAuth authorize URL. */
    const url = buildGitHubOAuthUrl(Math.random().toString(36).slice(2, 10));
    window.location.href = url;
  }, []);

  // PUBLIC_INTERFACE
  const signOut = useCallback(() => {
    /** Clears auth and returns to landing. */
    clearAuth();
    setToken("");
    setUser(null);
  }, []);

  const onAuth = useCallback(({ accessToken: token, user: u }) => {
    setAccessToken(token);
    setToken(token);
    setUser(u);
  }, []);

  const content = useMemo(() => {
    if (loadingUser) return null;
    return user ? <Dashboard user={user} accessToken={accessToken} /> : <Landing onSignIn={signIn} />;
  }, [user, accessToken, loadingUser, signIn]);

  return (
    <>
      <Navbar onSignIn={signIn} onSignOut={signOut} user={user} />
      <Routes>
        <Route path="/" element={content} />
        <Route path="/oauth/callback" element={<OAuthCallback onAuth={onAuth} />} />
      </Routes>
    </>
  );
}
