// Verdant Earth — Day 18
// Projects data, filters, animated stats, carbon calculator, donations, forms.

const projects = [
  {
    title: "Reforest the Margalla Hills",
    category: "forests",
    tag: "Forests",
    place: "Islamabad, Pakistan",
    blurb: "Replanting 250,000 native pines and acacias across fire-damaged slopes, with local rangers tending every sapling for three years.",
    goal: 250000, raised: 187400, unit: "trees"
  },
  {
    title: "Mangrove Shield — Indus Delta",
    category: "forests",
    tag: "Forests",
    place: "Sindh, Pakistan",
    blurb: "Restoring mangrove belts that protect coastal villages from storms and shelter fish nurseries for 40,000 fishing families.",
    goal: 120000, raised: 96400, unit: "trees"
  },
  {
    title: "Coral Gardens Revival",
    category: "oceans",
    tag: "Oceans",
    place: "Churna Island, Arabian Sea",
    blurb: "Transplanting heat-resilient coral fragments onto damaged reefs and monitoring recovery with volunteer divers.",
    goal: 8000, raised: 5210, unit: "coral fragments"
  },
  {
    title: "Plastic-Free Rivers",
    category: "oceans",
    tag: "Oceans",
    place: "Ravi River, Lahore",
    blurb: "River clean-up crews and floating barriers stopping 60 tonnes of plastic a year from reaching the sea.",
    goal: 60, raised: 41, unit: "tonnes removed"
  },
  {
    title: "Snow Leopard Guardians",
    category: "wildlife",
    tag: "Wildlife",
    place: "Gilgit-Baltistan",
    blurb: "Training herders as wildlife guardians, fitting tracking collars, and paying for livestock lost to predators so leopards live.",
    goal: 120, raised: 88, unit: "leopards protected"
  },
  {
    title: "Markhor Mountain Corridors",
    category: "wildlife",
    tag: "Wildlife",
    place: "Chitral, Khyber Pakhtunkhwa",
    blurb: "Reconnecting fragmented mountain habitat so Pakistan's national animal can roam and breed safely again.",
    goal: 45, raised: 31, unit: "km of corridor"
  },
  {
    title: "Solar Schools Programme",
    category: "climate",
    tag: "Climate",
    place: "Rural Punjab & Sindh",
    blurb: "Putting solar panels and fans in 200 off-grid schools, cutting diesel use and keeping classrooms open in summer heat.",
    goal: 200, raised: 143, unit: "schools solarised"
  },
  {
    title: "Urban Cooling — 10,000 Shade Trees",
    category: "climate",
    tag: "Climate",
    place: "Karachi & Lahore",
    blurb: "Street-tree planting along the hottest bus routes and schoolyards, chosen with residents and watered by neighbourhood teams.",
    goal: 10000, raised: 6900, unit: "trees"
  },
  {
    title: "Wetland Revival — Haleji Lake",
    category: "wildlife",
    tag: "Wildlife",
    place: "Thatta, Sindh",
    blurb: "Restoring reed beds and nesting islands at a Ramsar wetland that hosts 60,000 migratory birds every winter.",
    goal: 300, raised: 212, unit: "hectares restored"
  }
];

const grid = document.getElementById("project-grid");
const countEl = document.getElementById("project-count");
const searchInput = document.getElementById("project-search");
let activeFilter = "all";

function renderProjects() {
  const q = searchInput.value.trim().toLowerCase();
  const shown = projects.filter(p => {
    const matchesFilter = activeFilter === "all" || p.category === activeFilter;
    const hay = (p.title + " " + p.place + " " + p.blurb + " " + p.tag).toLowerCase();
    return matchesFilter && (!q || hay.includes(q));
  });
  countEl.textContent = shown.length + " of " + projects.length + " projects";
  if (!shown.length) {
    grid.innerHTML = "<p>No projects match that search. Try another word or filter.</p>";
    return;
  }
  grid.innerHTML = shown.map(p => {
    const pct = Math.round((p.raised / p.goal) * 100);
    return `
    <article class="card">
      <span class="tag">${p.tag}</span>
      <h3>${p.title}</h3>
      <p class="card-meta">${p.place}</p>
      <p>${p.blurb}</p>
      <div class="progress"><span style="width:${pct}%"></span></div>
      <p class="goal">${p.raised.toLocaleString()} of ${p.goal.toLocaleString()} ${p.unit} — ${pct}% funded</p>
      <a class="btn btn-outline" href="#donate">Support this project</a>
    </article>`;
  }).join("");
}

document.getElementById("project-filters").addEventListener("click", e => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  activeFilter = btn.dataset.filter;
  renderProjects();
});
searchInput.addEventListener("input", renderProjects);
renderProjects();

// Animated impact stats
const statNums = document.querySelectorAll(".stat-num");
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    statObserver.unobserve(el);
    const target = Number(el.dataset.target);
    const start = performance.now();
    const dur = 1400;
    (function tick(now) {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  });
}, { threshold: 0.4 });
statNums.forEach(el => statObserver.observe(el));

// Carbon calculator
const flightsEl = document.getElementById("calc-flights");
const carEl = document.getElementById("calc-car");
const energyEl = document.getElementById("calc-energy");
const tonnesEl = document.getElementById("calc-tonnes");
const treesEl = document.getElementById("calc-trees");

function updateCalc() {
  const flights = Number(flightsEl.value);
  const carKm = Number(carEl.value);
  document.getElementById("flights-val").textContent = flights + (flights === 1 ? " flight" : " flights");
  document.getElementById("car-val").textContent = carKm + " km";
  const energyBase = { low: 1.2, medium: 2.4, high: 3.8 }[energyEl.value];
  const tonnes = flights * 0.9 + (carKm * 52 * 0.00018) + energyBase;
  const trees = Math.round(tonnes * 1000 / 22);
  tonnesEl.textContent = tonnes.toFixed(1);
  treesEl.textContent = trees.toLocaleString();
}
[flightsEl, carEl, energyEl].forEach(el => el.addEventListener("input", updateCalc));
updateCalc();

// Donations
let donateAmount = 10;
let donateFreq = "once";
const donateBtn = document.getElementById("donate-btn");
const donateMsg = document.getElementById("donate-msg");
const impactEl = document.getElementById("donate-impact");
const customEl = document.getElementById("donate-custom");

function updateDonate() {
  const trees = Math.floor(donateAmount / 2);
  const plastic = Math.floor(donateAmount / 5);
  impactEl.textContent = "Your $" + donateAmount + " plants " + trees + " trees and clears " + plastic + " kg of ocean plastic.";
  donateBtn.textContent = "Donate $" + donateAmount + " " + donateFreq;
}
document.getElementById("donate-amounts").addEventListener("click", e => {
  const btn = e.target.closest(".amount-btn");
  if (!btn) return;
  document.querySelectorAll(".amount-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  donateAmount = Number(btn.dataset.amount);
  customEl.value = donateAmount;
  updateDonate();
});
customEl.addEventListener("input", () => {
  donateAmount = Math.max(1, Number(customEl.value) || 1);
  document.querySelectorAll(".amount-btn").forEach(b =>
    b.classList.toggle("active", Number(b.dataset.amount) === donateAmount));
  updateDonate();
});
document.querySelector(".donate-frequency").addEventListener("click", e => {
  const btn = e.target.closest(".freq-btn");
  if (!btn) return;
  document.querySelectorAll(".freq-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  donateFreq = btn.dataset.freq;
  updateDonate();
});
donateBtn.addEventListener("click", () => {
  donateMsg.textContent = "Thank you! Your $" + donateAmount + " " + donateFreq + " gift was recorded (demo — no payment taken).";
});
updateDonate();

// Volunteer form
document.getElementById("volunteer-form").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("vol-name").value.trim();
  const interest = document.getElementById("vol-interest").value;
  document.getElementById("vol-msg").textContent =
    "Welcome aboard, " + name + "! We will email you about " + interest.toLowerCase() + " near you.";
  e.target.reset();
});

// Event RSVPs
document.querySelectorAll(".rsvp-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.textContent = "Spot reserved ✓";
    btn.disabled = true;
    document.getElementById("rsvp-msg").textContent = "Your spot is reserved. Details will be emailed to you before the event.";
  });
});

// Newsletter
document.getElementById("newsletter-form").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("news-msg").textContent = "Subscribed! Your first Verdant Earth update arrives next month.";
  e.target.reset();
});
