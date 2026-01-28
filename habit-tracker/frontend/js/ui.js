

import { createHabit, getHabits,updateHabitCompletion } from "./habits.js";


const habitList = document.getElementById("habit-list");
const addHabitForm = document.getElementById("add-habit-form");
const habitTitleInput = document.getElementById("habit-title");
const habitTimeInput = document.getElementById("habit-time");
const habitFrequencyInput = document.getElementById("habit-frequency");


async function loadHabits() {
  const habits = await getHabits();
  renderHabits(habits);
}

function renderHabits(habits) {
  habitList.innerHTML = "";

  if (habits.length === 0) {
    habitList.innerHTML = "<li>No habits yet</li>";
    return;
  }

  habits.forEach(habit => {
    const li = document.createElement("li");

    li.className = "habit-item";

    li.innerHTML = `
      <label>
        <input type="checkbox" ${habit.completedToday ? "checked" : ""} />
        <strong>${habit.title}</strong>
        <span>${habit.time}</span>
      </label>
    `;

    const checkbox = li.querySelector("input");

    checkbox.addEventListener("change", async () => {
  await updateHabitCompletion(habit.id, checkbox.checked);
  await loadHabits(); // manual refresh
});


    habitList.appendChild(li);
  });
}

/* The manual refresh only updates when called */
addHabitForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = habitTitleInput.value.trim();
  const time = habitTimeInput.value;
  const frequency = habitFrequencyInput.value;

  if (!title || !time) return;

  await createHabit({
    title,
    time,
    frequency
  });

  addHabitForm.reset();
  await loadHabits(); // manual refresh
});


import { onAuthStateChanged } from 
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { auth } from "./config.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    loadHabits();
  }
});
