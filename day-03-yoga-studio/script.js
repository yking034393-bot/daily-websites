// Harmony Yoga Studio — class catalogue, schedule and booking

const classes = [
  { name: "Sunrise Flow", icon: "🌅", level: "beginner", duration: "60 min", intensity: "Gentle", desc: "Wake up slowly with breath-led movement as the sun comes up. Perfect for first-timers." },
  { name: "Gentle Hatha", icon: "🪷", level: "beginner", duration: "60 min", intensity: "Gentle", desc: "Classic poses held a little longer, with time to breathe into each one. No rush, no pressure." },
  { name: "Power Flow", icon: "🔥", level: "intermediate", duration: "60 min", intensity: "Strong", desc: "A sweaty, athletic vinyasa sequence that builds heat, strength and focus." },
  { name: "Lunch Reset", icon: "☀️", level: "intermediate", duration: "45 min", intensity: "Moderate", desc: "A midday stretch and reset for desk workers — back in the office feeling brand new." },
  { name: "Yin & Restore", icon: "🌙", level: "restorative", duration: "75 min", intensity: "Deep rest", desc: "Long, supported holds, candlelight and blankets. The class that feels like a warm hug." },
  { name: "Weekend Warrior Flow", icon: "💪", level: "advanced", duration: "90 min", intensity: "Strong", desc: "Our longest, most challenging flow — arm balances, inversions and deep backbends." },
  { name: "Prenatal Yoga", icon: "🤰", level: "beginner", duration: "60 min", intensity: "Gentle", desc: "Safe, supportive movement for every stage of pregnancy, led by a certified prenatal teacher." },
  { name: "Breathwork Basics", icon: "🌬️", level: "restorative", duration: "45 min", intensity: "Calm", desc: "No poses, just breathing. Learn techniques that calm the nervous system in minutes." },
];

const schedule = {
  Mon: [
    { time: "7:00 AM", name: "Sunrise Flow", teacher: "Meera Kapoor", spots: 3 },
    { time: "12:15 PM", name: "Lunch Reset", teacher: "Daniel Osei", spots: 6 },
    { time: "6:30 PM", name: "Power Flow", teacher: "Daniel Osei", spots: 2 },
  ],
  Tue: [
    { time: "7:00 AM", name: "Gentle Hatha", teacher: "Meera Kapoor", spots: 5 },
    { time: "5:30 PM", name: "Yin & Restore", teacher: "Sana Iqbal", spots: 4 },
    { time: "7:00 PM", name: "Breathwork Basics", teacher: "Sana Iqbal", spots: 8 },
  ],
  Wed: [
    { time: "7:00 AM", name: "Sunrise Flow", teacher: "Meera Kapoor", spots: 3 },
    { time: "12:15 PM", name: "Lunch Reset", teacher: "Daniel Osei", spots: 7 },
    { time: "6:30 PM", name: "Power Flow", teacher: "Daniel Osei", spots: 1 },
  ],
  Thu: [
    { time: "9:00 AM", name: "Prenatal Yoga", teacher: "Sana Iqbal", spots: 5 },
    { time: "5:30 PM", name: "Yin & Restore", teacher: "Sana Iqbal", spots: 2 },
    { time: "7:00 PM", name: "Gentle Hatha", teacher: "Meera Kapoor", spots: 6 },
  ],
  Fri: [
    { time: "7:00 AM", name: "Sunrise Flow", teacher: "Meera Kapoor", spots: 4 },
    { time: "12:15 PM", name: "Lunch Reset", teacher: "Daniel Osei", spots: 5 },
    { time: "6:30 PM", name: "Power Flow", teacher: "Daniel Osei", spots: 3 },
  ],
  Sat: [
    { time: "8:00 AM", name: "Weekend Warrior Flow", teacher: "Daniel Osei", spots: 4 },
    { time: "10:30 AM", name: "Gentle Hatha", teacher: "Meera Kapoor", spots: 7 },
    { time: "4:00 PM", name: "Yin & Restore", teacher: "Sana Iqbal", spots: 5 },
  ],
  Sun: [
    { time: "9:00 AM", name: "Sunrise Flow", teacher: "Meera Kapoor", spots: 6 },
    { time: "11:00 AM", name: "Breathwork Basics", teacher: "Sana Iqbal", spots: 9 },
    { time: "5:00 PM", name: "Yin & Restore", teacher: "Sana Iqbal", spots: 3 },
  ],
};

const classGrid = document.getElementById("classGrid");
const filters = document.getElementById("filters");

function renderClasses(filter) {
  const shown = filter === "all" ? classes : classes.filter((c) => c.level === filter);
  classGrid.innerHTML = shown.map((c) => `
    <article class="class-card">
      <div class="icon">${c.icon}</div>
      <h3>${c.name}</h3>
      <p class="meta">${c.duration} · ${c.intensity}</p>
      <p>${c.desc}</p>
      <span class="tag">${c.level}</span>
    </article>`).join("");
}

filters.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  filters.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderClasses(btn.dataset.filter);
});

renderClasses("all");

// Schedule tabs
const dayTabs = document.getElementById("dayTabs");
const scheduleList = document.getElementById("scheduleList");
const days = Object.keys(schedule);

days.forEach((day, i) => {
  const btn = document.createElement("button");
  btn.className = "day-tab" + (i === 0 ? " active" : "");
  btn.textContent = day;
  btn.addEventListener("click", () => {
    dayTabs.querySelectorAll(".day-tab").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderSchedule(day);
  });
  dayTabs.appendChild(btn);
});

function renderSchedule(day) {
  scheduleList.innerHTML = schedule[day].map((s) => `
    <li>
      <span class="time">${s.time}</span>
      <span><strong>${s.name}</strong> <span class="teacher">with ${s.teacher}</span></span>
      <span class="spots">${s.spots} spots left</span>
      <button class="mini-btn" data-book="${s.name}">Reserve</button>
    </li>`).join("");
}

renderSchedule("Mon");

// Booking buttons: pre-fill the form's class select
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-book]");
  if (!btn) return;
  const select = document.getElementById("classSelect");
  const option = [...select.options].find((o) => o.value === btn.dataset.book);
  if (option) select.value = option.value;
  document.getElementById("book").scrollIntoView({ behavior: "smooth" });
  document.getElementById("name").focus();
});

// Pricing plan buttons
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-plan]");
  if (!btn) return;
  document.getElementById("book").scrollIntoView({ behavior: "smooth" });
  const msg = document.getElementById("formMsg");
  msg.textContent = `Great choice — the ${btn.dataset.plan} plan. Complete the booking form and mention "${btn.dataset.plan}" in your first visit.`;
});

// Booking form
document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const cls = document.getElementById("classSelect").value;
  const date = document.getElementById("date").value;
  const msg = document.getElementById("formMsg");
  if (!name || !date) {
    msg.textContent = "Please fill in your name and a date.";
    return;
  }
  msg.textContent = `Namaste, ${name}! Your mat for ${cls} on ${date} is reserved. See you on the mat 🧘`;
  e.target.reset();
});
