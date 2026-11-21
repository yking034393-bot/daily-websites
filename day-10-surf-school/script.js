const LESSONS = [
  { id: "l1", name: "First Wave — Beginner Group", level: "beginner", tags: ["beginner"], desc: "Your very first surf lesson. Beach safety, pop-up practice on the sand, then catching white-water waves with an instructor at your side.", price: 45, unit: "per person · 2 hrs" },
  { id: "l2", name: "Sunset Session — Beginner Group", level: "beginner", tags: ["beginner"], desc: "The same friendly beginner lesson, timed for golden hour. Small groups, gentle waves, and a sunset you'll never forget.", price: 55, unit: "per person · 2 hrs" },
  { id: "l3", name: "Dawn Patrol — Intermediate", level: "intermediate", tags: ["intermediate"], desc: "Early-morning session for surfers who can stand and ride white water. Learn to catch unbroken waves and read the lineup.", price: 50, unit: "per person · 2 hrs" },
  { id: "l4", name: "Turns & Cutbacks — Intermediate", level: "intermediate", tags: ["intermediate"], desc: "Take your surfing to the next level: bottom turns, cutbacks, and trimming along the wave face with video feedback.", price: 60, unit: "per person · 2 hrs" },
  { id: "l5", name: "Advanced Wave Clinic", level: "advanced", tags: ["advanced"], desc: "For confident surfers chasing bigger, faster waves. Wave selection, duck diving, and advanced manoeuvres with a pro coach.", price: 75, unit: "per person · 2.5 hrs" },
  { id: "l6", name: "Private 1-to-1 Lesson", level: "private", tags: ["private", "beginner", "intermediate", "advanced"], desc: "One instructor, all yours. Fully tailored to your level and goals — the fastest way to progress, whatever your starting point.", price: 95, unit: "per person · 2 hrs" },
  { id: "l7", name: "Kids' Surf Club (ages 7–12)", level: "kids", tags: ["kids", "beginner"], desc: "Small, safe, and seriously fun. Games, beach safety, and gentle waves — with a maximum of four kids per instructor.", price: 35, unit: "per child · 1.5 hrs" },
  { id: "l8", name: "Family Surf Day", level: "kids", tags: ["kids", "beginner", "private"], desc: "A private family session for up to four people. Parents and kids learn together, with boards sized for every age.", price: 160, unit: "per family (up to 4) · 2 hrs" },
  { id: "l9", name: "Couples Sunset Lesson", level: "private", tags: ["private", "beginner"], desc: "A private sunset lesson for two, with photos included. The most romantic way to learn to surf — no experience needed.", price: 150, unit: "per couple · 2 hrs" },
];

const RENTALS = [
  { id: "r1", name: "Soft-top Beginner Board 8ft", kind: "board", tags: ["board"], desc: "Stable, forgiving foam board — the one our instructors use for first-timers.", price: 25, unit: "per day" },
  { id: "r2", name: "Soft-top Funboard 7ft", kind: "board", tags: ["board"], desc: "A step up in manoeuvrability for improvers who can catch green waves.", price: 30, unit: "per day" },
  { id: "r3", name: "Hardboard Shortboard 6'2\"", kind: "board", tags: ["board"], desc: "For experienced surfers only. Fibreglass performance board, thruster setup.", price: 40, unit: "per day" },
  { id: "r4", name: "Longboard 9ft", kind: "board", tags: ["board"], desc: "Classic nose-riding longboard for mellow days and small, clean waves.", price: 35, unit: "per day" },
  { id: "r5", name: "Shorty Wetsuit 2mm", kind: "wetsuit", tags: ["wetsuit"], desc: "Short-arm, short-leg suit — perfect for today's 22°C water.", price: 10, unit: "per day" },
  { id: "r6", name: "Full Wetsuit 3/2mm", kind: "wetsuit", tags: ["wetsuit"], desc: "Full-length suit for cooler mornings and longer sessions.", price: 15, unit: "per day" },
  { id: "r7", name: "Rash Guard (UV 50+)", kind: "accessory", tags: ["accessory"], desc: "Long-sleeve rash guard to stop chafing and sunburn. All sizes.", price: 8, unit: "per day" },
  { id: "r8", name: "Bodyboard + Fins", kind: "accessory", tags: ["accessory"], desc: "Bodyboard with fins and leash — great fun in the shore break.", price: 12, unit: "per day" },
  { id: "r9", name: "Waterproof Phone Pouch", kind: "accessory", tags: ["accessory"], desc: "Keep your phone dry and take photos from the water.", price: 5, unit: "per day" },
];

const basket = new Map(); // id -> {item, qty}

function money(n) { return "$" + n; }

function cardHTML(item, isLesson) {
  const tags = item.tags.map(t => `<span class="tag">${t}</span>`).join("");
  return `
    <article class="card">
      <h3>${item.name}</h3>
      <div class="tag-row">${tags}</div>
      <p>${item.desc}</p>
      <p class="price-line">${money(item.price)} <span>${item.unit}</span></p>
      <button class="btn btn-primary" data-add="${item.id}" data-kind="${isLesson ? "lesson" : "rental"}">Add to basket</button>
    </article>`;
}

function renderLessons() {
  const active = document.querySelector("#lessonFilters .filter-btn.active").dataset.filter;
  const q = (document.getElementById("lessonSearch").value || "").trim().toLowerCase();
  const list = LESSONS.filter(l =>
    (active === "all" || l.tags.includes(active)) &&
    (!q || (l.name + " " + l.desc).toLowerCase().includes(q))
  );
  document.getElementById("lessonCards").innerHTML = list.map(l => cardHTML(l, true)).join("");
  document.getElementById("lessonEmpty").hidden = list.length > 0;
}

function renderRentals() {
  const active = document.querySelector("#rentalFilters .filter-btn.active").dataset.filter;
  const list = RENTALS.filter(r => active === "all" || r.kind === active);
  document.getElementById("rentalCards").innerHTML = list.map(r => cardHTML(r, false)).join("");
}

function findItem(id) {
  return LESSONS.find(l => l.id === id) || RENTALS.find(r => r.id === id);
}

function renderBasket() {
  const count = [...basket.values()].reduce((s, e) => s + e.qty, 0);
  document.getElementById("basketCount").textContent = count;
  const box = document.getElementById("basketItems");
  if (basket.size === 0) {
    box.innerHTML = '<p class="basket-empty">Your basket is empty. Add a lesson or some rental gear to get started.</p>';
    document.getElementById("basketTotal").textContent = "$0";
    return;
  }
  let total = 0;
  box.innerHTML = [...basket.values()].map(({ item, qty }) => {
    total += item.price * qty;
    return `
      <div class="basket-item">
        <div>
          <strong>${item.name}</strong><br>
          <span>${money(item.price)} ${item.unit}</span>
          <div class="qty">
            <button data-dec="${item.id}" aria-label="Decrease quantity">−</button>
            <span>${qty}</span>
            <button data-inc="${item.id}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div><strong>${money(item.price * qty)}</strong></div>
      </div>`;
  }).join("");
  document.getElementById("basketTotal").textContent = money(total);
}

function openBasket() {
  renderBasket();
  document.getElementById("basketDrawer").hidden = false;
}
function closeBasket() {
  document.getElementById("basketDrawer").hidden = true;
}

document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  if (add) {
    const item = findItem(add.dataset.add);
    const entry = basket.get(item.id) || { item, qty: 0 };
    entry.qty += 1;
    basket.set(item.id, entry);
    renderBasket();
    openBasket();
    return;
  }
  const inc = e.target.closest("[data-inc]");
  if (inc) {
    const entry = basket.get(inc.dataset.inc);
    entry.qty += 1;
    renderBasket();
    return;
  }
  const dec = e.target.closest("[data-dec]");
  if (dec) {
    const entry = basket.get(dec.dataset.dec);
    entry.qty -= 1;
    if (entry.qty <= 0) basket.delete(dec.dataset.dec);
    renderBasket();
    return;
  }
  const filter = e.target.closest(".filter-btn");
  if (filter) {
    filter.parentElement.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    filter.classList.add("active");
    if (filter.parentElement.id === "lessonFilters") renderLessons();
    else renderRentals();
    return;
  }
});

document.getElementById("lessonSearch").addEventListener("input", renderLessons);
document.getElementById("basketBtn").addEventListener("click", openBasket);
document.getElementById("basketClose").addEventListener("click", closeBasket);
document.getElementById("basketDrawer").addEventListener("click", (e) => {
  if (e.target.id === "basketDrawer") closeBasket();
});
document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.getElementById("mainNav");
  const open = nav.classList.toggle("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", String(open));
});
document.querySelectorAll("#mainNav a").forEach(a =>
  a.addEventListener("click", () => document.getElementById("mainNav").classList.remove("open"))
);

document.getElementById("checkoutBtn").addEventListener("click", () => {
  const note = document.getElementById("checkoutNote");
  if (basket.size === 0) {
    note.textContent = "Your basket is empty — add a lesson or rental first.";
  } else {
    note.textContent = "Thanks! This is a demo checkout — your items are reserved for 24 hours. Pay at the shack or call (555) 014-2837 to confirm.";
    basket.clear();
    renderBasket();
  }
  note.hidden = false;
});

// Booking form
const lessonSelect = document.getElementById("lessonSelect");
lessonSelect.innerHTML = LESSONS.map(l => `<option value="${l.id}">${l.name} — ${money(l.price)} ${l.unit}</option>`).join("");
const dateInput = document.querySelector('#bookingForm input[name="date"]');
if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const lesson = LESSONS.find(l => l.id === lessonSelect.value);
  const note = document.getElementById("bookingNote");
  note.textContent = `Thanks, ${form.name.value.split(" ")[0]}! Your ${lesson.name} on ${form.date.value} is requested — we'll confirm by email at ${form.email.value} within a few hours. See you at the blue flag!`;
  note.hidden = false;
  form.reset();
  dateInput.min = new Date().toISOString().split("T")[0];
});

renderLessons();
renderRentals();
renderBasket();
