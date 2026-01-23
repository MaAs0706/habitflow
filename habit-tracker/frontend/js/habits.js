import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { auth, db } from "./config.js";

/* =====================
   CREATE HABIT
===================== */
export async function createHabit({ title, time, frequency }) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const habitsRef = collection(db, "users", user.uid, "habits");

  await addDoc(habitsRef, {
    title,
    time,
    frequency,
    streak: 0,
    createdAt: serverTimestamp()
  });
}
window.createHabit = createHabit;

/* =====================
   GET HABITS
===================== */
export async function getHabits() {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const habitsRef = collection(db, "users", user.uid, "habits");
  const snapshot = await getDocs(habitsRef);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
