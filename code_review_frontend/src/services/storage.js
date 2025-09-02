const KEY = "crh_auth";

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function write(value) {
  localStorage.setItem(KEY, JSON.stringify(value || {}));
}

// PUBLIC_INTERFACE
export function getAccessToken() {
  /** Returns the persisted access token if available. */
  return read().accessToken || "";
}

// PUBLIC_INTERFACE
export function setAccessToken(accessToken) {
  /** Persists the provided access token. */
  const current = read();
  write({ ...current, accessToken });
}

// PUBLIC_INTERFACE
export function clearAuth() {
  /** Clears persisted auth data. */
  write({});
}
