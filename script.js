function selectMood(mood) {
  let day = prompt("Enter the day (1-31):");
  if (!isValidDay(day)) {
    alert("Invalid day. Please enter a number between 1 and 31.");
    return;
  }

  let month = prompt("Enter the month (1-12):");
  if (!isValidMonth(month)) {
    alert("Invalid month. Please enter a number between 1 and 12.");
    return;
  }

  let year = prompt("Enter the year (e.g., 2025):");
  if (!isValidYear(year)) {
    alert("Invalid year. Please enter a valid 4-digit year.");
    return;
  }

  let dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;
  logMood(dateStr, mood);
}

function isValidDay(day) {
  return day >= 1 && day <= 31;
}

function isValidMonth(month) {
  return month >= 1 && month <= 12;
}

function isValidYear(year) {
  return year.length === 4 && !isNaN(year);
}

function logMood(date, mood) {
  let moodLog = JSON.parse(localStorage.getItem("moodLog")) || {};
  moodLog[date] = mood;
  localStorage.setItem("moodLog", JSON.stringify(moodLog));
  renderCalendar();
}

function renderCalendar() {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  let moodLog = JSON.parse(localStorage.getItem("moodLog")) || {};

  let selectedMonth = document.getElementById("month").value;
  let selectedYear = document.getElementById("year").value;

  let daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    let dateStr = `${selectedYear}-${String(selectedMonth).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    let mood = moodLog[dateStr] || "";

    let dayDiv = document.createElement("div");
    dayDiv.className = "day";
    dayDiv.innerHTML = `<span>${day}</span><span class="mood">${mood}</span>`;

    calendar.appendChild(dayDiv);
  }
}

document.addEventListener("DOMContentLoaded", renderCalendar);
