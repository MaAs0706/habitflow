// frontend/js/auth.js

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { auth } from "./config.js";

// Create Google provider
const provider = new GoogleAuthProvider();

// Request Google Calendar access (required for this app)
provider.addScope("https://www.googleapis.com/auth/calendar");

// DOM elements (exist depending on page)
const loginBtn = document.getElementById("google-login-btn");
const logoutBtn = document.getElementById("logout-btn");
const userNameEl = document.getElementById("user-name");
const errorEl = document.getElementById("login-error");


if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    try {
      await signInWithPopup(auth, provider);
      // Redirect handled by auth state listener
    } catch (error) {
      console.error("Login error:", error);
      if (errorEl) {
        errorEl.classList.remove("hidden");
      }
    }
  });
}


if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
}


onAuthStateChanged(auth, (user) => {
  const isLoginPage = window.location.pathname.includes("login.html");

  if (user) {
    // User is logged in
    if (userNameEl) {
      userNameEl.textContent = user.displayName || "User";
    }

    // Prevent logged-in users from seeing login page
    if (isLoginPage) {
      window.location.href = "index.html";
    }

  } else {
    // User is NOT logged in
    if (!isLoginPage) {
      window.location.href = "login.html";
    }
  }
});
