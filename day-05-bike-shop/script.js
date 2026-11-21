const BIKES = [
  { id: "summit-trail-29", name: "Summit Trail 29", brand: "Pedal & Peak · Carbon", type: "mountain", price: 2899, was: 3199, icon: "🚵", desc: "Full-suspension trail bike, 140 mm travel, Shimano 12-speed.", tags: ["Trail", "Full suspension", "29\" wheels"] },
  { id: "ridgeline-hardtail", name: "Ridgeline Hardtail", brand: "Peakline", type: "mountain", price: 1199, icon: "🚵", desc: "Light alloy hardtail with a dropper post — a first proper mountain bike.", tags: ["Hardtail", "Beginner friendly"] },
  { id: "velocity-road", name: "Velocity Road Comp", brand: "AeroVelo", type: "road", price: 1849, icon: "🚴", desc: "Carbon fork road bike with hydraulic disc brakes and 2×11 gearing.", tags: ["Road", "Carbon fork"] },
  { id: "aero-sprint", name: "Aero Sprint Pro", brand: "AeroVelo", type: "road", price: 3499, icon: "🚴", desc: "Race-ready aero frame, electronic shifting, tubeless-ready wheels.", tags: ["Road", "Race", "Electronic shifting"] },
  { id: "city-glide", name: "City Glide 7", brand: "Pedal & Peak · Urban", type: "hybrid", price: 649, icon: "🚲", desc: "Comfortable step-through hybrid with mudguards, rack and lights included.", tags: ["Hybrid", "Commuter", "Step-through"] },
  { id: "commuter-plus", name: "Commuter Plus", brand: "UrbanRide", type: "hybrid", price: 899, icon: "🚲", desc: "Belt-drive hybrid with an 8-speed hub — almost no maintenance, ever.", tags: ["Hybrid", "Belt drive", "Low maintenance"] },
  { id: "volt-city", name: "Volt City E-Bike", brand: "VoltRide", type: "electric", price: 2199, icon: "⚡", desc: "250 W hub motor, 60-mile range, integrated lights and rear rack.", tags: ["Electric", "Commuter", "60-mile range"] },
  { id: "volt-trail", name: "Volt Trail E-MTB", brand: "VoltRide", type: "electric", price: 3299, icon: "⚡", desc: "Mid-drive e-mountain bike with 85 Nm torque and a 720 Wh battery.", tags: ["Electric", "Mountain", "Mid-drive"] },
  { id: "trailblazer-24", name: "Trailblazer 24", brand: "Pedal & Peak · Kids", type: "kids", price: 349, icon: "🚲", desc: "24-inch kids' bike with easy gears and a lightweight alloy frame.", tags: ["Kids", "24\" wheels"] },
  { id: "little-sprocket", name: "Little Sprocket 16", brand: "Pedal & Peak · Kids", type: "kids", price: 219, icon: "🚲", desc: "First proper bike for ages 4–6, with stabiliser-compatible mounts.", tags: ["Kids", "16\" wheels", "First bike"] },
  { id: "gravel-wanderer", name: "Gravel Wanderer", brand: "Peakline", type: "road", price: 1499, icon: "🚴", desc: "Drop-bar gravel bike with clearance for 45 mm tyres and bikepacking mounts.", tags: ["Gravel", "Bikepacking"] },
  { id: "fold-away", name: "Fold-Away 20", brand: "UrbanRide", type: "hybrid", price: 749, icon: "🚲", desc: "Folding bike that fits under a desk or in a car boot in 20 seconds.", tags: ["Hybrid", "Folding", "Commuter"] },
];

const SERVICES = [
  { name: "Full Service", price: 89, time: "2–3 days", desc: "Strip, clean, regrease, true wheels, adjust gears and brakes, safety check." },
  { name: "Safety Check", price: 25, time: "Same day", desc: "Brakes, tyres, headset, wheels and bolts — a quick once-over before a big ride." },
  { name: "Wheel True & Spoke", price: 30, time: "Same day", desc: "Buckled wheel? We true it and replace any broken spokes." },
  { name: "Brake Bleed", price: 35, time: "Same day", desc: "Hydraulic disc brake bleed with fresh fluid and new pads if needed." },
  { name: "Drivetrain Deep Clean", price: 45, time: "1 day", desc: "Chain, cassette and chainrings ultrasonically cleaned and re-lubed." },
  { name: "E-Bike Diagnostics", price: 55, time: "1–2 days", desc: "Motor, battery and firmware check with a full report." },
];

const RENTALS = [
  { name: "City Hybrid", price: 25, desc: "Comfortable hybrid for the lakeside path and town. Helmet and lock included." },
  { name: "Trail Hardtail", price: 45, desc: "Capable hardtail for the forest trails, with a dropper post and tubeless tyres." },
  { name: "E-Bike", price: 55, desc: "Electric assist for the hill climbs — arrive at the view without the sweat." },
];

const TRAILS = [
  { name: "Lakeside Loop", distance: "12 km", climb: "120 m", level: "easy", label: "Easy", desc: "Flat lakeside path, perfect for families and a first ride." },
  { name: "Pine Forest Singletrack", distance: "18 km", climb: "340 m", level: "moderate", label: "Moderate", desc: "Flowing singletrack through the pines with a couple of punchy climbs." },
  { name: "Summit Ridge Descent", distance: "24 km", climb: "780 m", level: "hard", label: "Hard", desc: "A big climb rewarded with the fastest descent in the valley. For confident riders." },
];

const basket = new Map();
const bikeGrid = document.getElementById("bikeGrid");
const emptyMsg = document.getElementById("emptyMsg");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
let activeType = "all";

const money = (n) => "$" + n.toLocaleString("en-US");

function renderBikes() {
  const q = searchInput.value.trim().toLowerCase();
  let list = BIKES.filter((b) =>
    (activeType === "all" || b.type === activeType) &&
    (!q || b.name.toLowerCase().includes(q) || b.brand.toLowerCase().includes(q))
  );
  if (sortSelect.value === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sortSelect.value === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

  emptyMsg.hidden = list.length > 0;
  bikeGrid.innerHTML = list.map((b) => `
    <article class="bike-card">
      <span class="thumb" aria-hidden="true">${b.icon}</span>
      <h3>${b.name}</h3>
      <p class="brand-line">${b.brand} · ${b.type[0].toUpperCase() + b.type.slice(1)}</p>
      <p class="desc">${b.desc}</p>
      <div class="tag-row">${b.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      <div class="bike-foot">
        <span class="price">${money(b.price)}${b.was ? ` <span class="was">${money(b.was)}</span>` : ""}</span>
        <button class="btn btn-primary btn-small" data-add="${b.id}">Add to basket</button>
      </div>
    </article>`).join("");
}

function renderServices() {
  document.getElementById("serviceGrid").innerHTML = SERVICES.map((s) => `
    <article class="service-card">
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <p class="price">${money(s.price)} <span class="time">· ${s.time}</span></p>
    </article>`).join("");
}

function renderRentals() {
  document.getElementById("rentalGrid").innerHTML = RENTALS.map((r) => `
    <article class="rental-card">
      <h3>${r.name}</h3>
      <p>${r.desc}</p>
      <p class="price">${money(r.price)} <span class="time">/ day</span></p>
    </article>`).join("");
}

function renderTrails() {
  document.getElementById("trailList").innerHTML = TRAILS.map((t) => `
    <div class="trail-row">
      <div><h3>${t.name}</h3><p>${t.desc}</p></div>
      <div class="trail-meta">
        <span>📏 ${t.distance}</span>
        <span>⛰️ ${t.climb}</span>
        <span class="difficulty ${t.level}">${t.label}</span>
      </div>
    </div>`).join("");
}

let toastTimer;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function updateBasketCount() {
  const total = [...basket.values()].reduce((a, b) => a + b, 0);
  document.getElementById("basketCount").textContent = total;
}

document.addEventListener("click", (e) => {
  const addBtn = e.target.closest("[data-add]");
  if (addBtn) {
    const bike = BIKES.find((b) => b.id === addBtn.dataset.add);
    basket.set(bike.id, (basket.get(bike.id) || 0) + 1);
    updateBasketCount();
    showToast(`${bike.name} added to your basket.`);
  }
});

document.getElementById("basketBtn").addEventListener("click", () => {
  if (basket.size === 0) {
    showToast("Your basket is empty — add a bike to get started.");
    return;
  }
  const lines = [...basket.entries()].map(([id, qty]) => {
    const bike = BIKES.find((b) => b.id === id);
    return `${qty} × ${bike.name} (${money(bike.price * qty)})`;
  });
  const total = [...basket.entries()].reduce((sum, [id, qty]) => {
    return sum + BIKES.find((b) => b.id === id).price * qty;
  }, 0);
  showToast(`Basket: ${lines.join(", ")} — Total ${money(total)}`);
});

document.getElementById("typeFilters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  activeType = btn.dataset.type;
  renderBikes();
});

searchInput.addEventListener("input", renderBikes);
sortSelect.addEventListener("change", renderBikes);

document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("bookName").value.trim();
  const service = document.getElementById("bookService").value;
  const date = document.getElementById("bookDate").value;
  document.getElementById("bookingNote").textContent =
    `Thanks, ${name}! Your ${service.split(" — ")[0]} is requested for ${date}. We'll call you to confirm.`;
  showToast("Service booking requested — see you soon!");
  e.target.reset();
});

document.getElementById("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("newsEmail").value.trim();
  document.getElementById("newsNote").textContent = `You're in, ${email} — see you on the trails.`;
  showToast("Subscribed to Ride Notes.");
  e.target.reset();
});

renderBikes();
renderServices();
renderRentals();
renderTrails();
