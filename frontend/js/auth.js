const API = "http://localhost:5000/api";

/* ---------- LOGIN ---------- */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();

      // ✅ STORE TOKEN
      localStorage.setItem("token", data.token);

      // ✅ REDIRECT TO DASHBOARD
      window.location.href = "index.html";

    } catch (err) {
      alert("Invalid email or password");
    }
  });
}

/* ---------- REGISTER ---------- */
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) throw new Error("Register failed");

      alert("Account created. Please login.");
      window.location.href = "login.html";

    } catch (err) {
      alert("Registration failed");
    }
  });
}
