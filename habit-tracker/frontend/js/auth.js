import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

//  Firestore imports
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { auth, db } from "./config.js";

// Create Google provider
const provider = new GoogleAuthProvider();

// Request Google Calendar access
provider.addScope("https://www.googleapis.com/auth/calendar");

// DOM elements
const loginBtn = document.getElementById("google-login-btn");
const logoutBtn = document.getElementById("logout-btn");
const userNameEl = document.getElementById("user-name");
const errorEl = document.getElementById("login-error");

/* 
   LOGIN
 */
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
      if (errorEl) {
        errorEl.classList.remove("hidden");
      }
    }
  });
}

/* 
   LOGOUT
 */
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
}

/* 
   AUTH STATE + USER SETUP
 */
onAuthStateChanged(auth, async (user) => {
  const isLoginPage = window.location.pathname.includes("login.html");

  if (user) {
    // UI update
    if (userNameEl) {
      userNameEl.textContent = user.displayName || "User";
    }

    // 🔹 NEW: ensure user profile exists
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      const timezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone;

      const today = new Date().toISOString().split("T")[0];

      await setDoc(userRef, {
        timezone,
        lastResetDate: today,
        createdAt: serverTimestamp()
      });
    }

    // Redirect logged-in users away from login page
    if (isLoginPage) {
      window.location.href = "index.html";
    }

  } else {
    // Not logged in → protect dashboard
    if (!isLoginPage) {
      window.location.href = "login.html";
    }
  }
});
