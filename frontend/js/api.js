const API = "http://localhost:5000/api";

/* =====================
AUTH HELPERS
===================== */

function getToken() {
  return localStorage.getItem("token");
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* =====================
AUTH
===================== */

export async function login(data) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Login failed");

  const out = await res.json();
  localStorage.setItem("token", out.token);
  return out;
}

export async function register(data) {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Register failed");
  return res.json();
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

/* =====================
ANIME CRUD
===================== */

export async function getAnime() {
  const res = await fetch(`${API}/anime`, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
}

export async function addAnime(data) {
  const res = await fetch(`${API}/anime`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Add failed");
  return res.json();
}

export async function updateAnime(id, updates) {
  const res = await fetch(`${API}/anime/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) throw new Error("Update failed");
  return res.json();
}

export async function deleteAnime(id) {
  const res = await fetch(`${API}/anime/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Delete failed");
  return res.json();
}
