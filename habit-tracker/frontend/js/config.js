

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyArl7lrDO9dII1GkrvxS9m8oIFUiMPhpHQ",
  authDomain: "habitflow-31a5d.firebaseapp.com",
  projectId: "habitflow-31a5d",
  appId: "1:576947482649:web:4164ba0b358d8ef8fdfa88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth instance
export const auth = getAuth(app);
