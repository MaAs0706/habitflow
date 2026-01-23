

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { auth, db } from "./config.js";

/* 
   CREATE HABIT
 */
export async function createHabit({ title, time, frequency }) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const habitsRef = collection(db, "users", user.uid, "habits");

  await addDoc(habitsRef, {
    title,
    time,
    frequency,
    completedToday: false,
    lastCompleted: null,
    streak: 0,
    createdAt: serverTimestamp()
  });
}

// DEV ONLY (remove later)
window.createHabit = createHabit;

/* 
   GET HABITS
 */
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

/* 
   MARK HABIT DONE
 */
export async function updateHabitCompletion(habitId, completed) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const habitRef = doc(db, "users", user.uid, "habits", habitId);

  const today = new Date().toISOString().split("T")[0];

  if (completed) {
    await updateDoc(habitRef, {
      completedToday: true,
      lastCompleted: today
    });
  } else {
    await updateDoc(habitRef, {
      completedToday: false,
      lastCompleted: null
    });
  }
}