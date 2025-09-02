# Tata Elxsi Code Review Hub – React Frontend

A modern, vibrant, light-themed React app featuring Tata Elxsi branding and GitHub OAuth sign-in. It displays user info, repositories, and a card-based code review dashboard.

## Features

- Tata Elxsi color palette and corporate styling
- Sign-in with GitHub (OAuth) using env-based config
- Display authenticated GitHub user info and repositories
- Card-based, responsive, light-themed layout
- Environment-driven configuration (no hard-coded secrets)

## Quickstart

1) Install dependencies
- npm install

2) Configure environment
- Copy .env.example to .env and fill in:
  - REACT_APP_SITE_URL
  - REACT_APP_GITHUB_CLIENT_ID
  - REACT_APP_GITHUB_SCOPES (optional)
  - REACT_APP_BACKEND_URL (optional, required for token exchange)

3) Run
- npm start
- Open http://localhost:3000

## OAuth Flow

- Clicking “Sign in with GitHub” redirects to GitHub’s OAuth consent, using:
  - client_id: REACT_APP_GITHUB_CLIENT_ID
  - redirect_uri: REACT_APP_SITE_URL/oauth/callback
  - scope: REACT_APP_GITHUB_SCOPES

- The callback page (/oauth/callback) expects a backend at REACT_APP_BACKEND_URL to exchange the “code” for an access token at:
  - GET {REACT_APP_BACKEND_URL}/oauth/github/callback?code=...

- If the backend is not configured, the app demonstrates the flow but cannot retrieve a token.

## Branding

- Colors:
  - Primary: #c5168c
  - Secondary: #034ea1
  - Accent: #c5168c

- The layout uses soft elevation, rounded corners, and a sticky top navbar with Tata Elxsi gradient.

## Project Structure

- src/components: Navbar, Card, GitHubLoginButton
- src/pages: Landing, Dashboard, OAuthCallback
- src/services: api.js (OAuth helpers, GitHub API), storage.js (localStorage)

## Notes

- Do not hard-code secrets in source code.
- Always provide REACT_APP_* variables via .env.
- For production deployments, configure REACT_APP_SITE_URL to match your domain.

