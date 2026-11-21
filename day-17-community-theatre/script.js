// The Velvet Stage — season data, booking and basket
const SHOWS = [
  {
    id: "macbeth",
    title: "Macbeth",
    genre: "drama",
    emoji: "🗡️",
    dates: ["Fri 28 Nov 2026 · 7:30pm", "Sat 29 Nov 2026 · 7:30pm", "Sun 30 Nov 2026 · 2:30pm"],
    duration: "2h 15m incl. interval",
    blurb: "Ambition, witches and a very unlucky dinner party. Our autumn Shakespeare is staged in the round, with the audience on three sides of the action.",
    priceFrom: 11,
  },
  {
    id: "panto",
    title: "Cinderella — The Pantomime",
    genre: "family",
    emoji: "🎃",
    dates: ["Sat 13 Dec 2026 · 2:00pm", "Sat 13 Dec 2026 · 6:30pm", "Sun 14 Dec 2026 · 2:00pm", "Fri 19 Dec 2026 · 7:00pm"],
    duration: "2h incl. interval",
    blurb: "Glass slippers, a very rude Buttons and a fairy godmother with opinions. Our sell-out family panto — booing the villain is strongly encouraged.",
    priceFrom: 8,
  },
  {
    id: "importance",
    title: "The Importance of Being Earnest",
    genre: "comedy",
    emoji: "🫖",
    dates: ["Thu 15 Jan 2027 · 7:30pm", "Fri 16 Jan 2027 · 7:30pm", "Sat 17 Jan 2027 · 7:30pm"],
    duration: "2h incl. interval",
    blurb: "Wilde's sparkling comedy of double lives, cucumber sandwiches and handbags. Bunburying has never looked this good.",
    priceFrom: 11,
  },
  {
    id: "leith",
    title: "Sunshine on Leith Street",
    genre: "musical",
    emoji: "🎵",
    dates: ["Fri 6 Mar 2027 · 7:30pm", "Sat 7 Mar 2027 · 7:30pm", "Sun 8 Mar 2027 · 2:30pm"],
    duration: "2h 30m incl. interval",
    blurb: "Our spring musical: a joyful, big-hearted story of love, family and coming home, with a live five-piece band and a cast of twenty.",
    priceFrom: 11,
  },
  {
    id: "mousetrap",
    title: "The Mousetrap (…Almost)",
    genre: "drama",
    emoji: "🕵️",
    dates: ["Fri 24 Apr 2027 · 7:30pm", "Sat 25 Apr 2027 · 7:30pm"],
    duration: "2h 10m incl. interval",
    blurb: "A snowbound guest house, seven strangers and one very patient detective. A loving homage to the classic whodunit — keep the secret!",
    priceFrom: 11,
  },
  {
    id: "improv",
    title: "Friday Night Improv: Make It Up!",
    genre: "comedy",
    emoji: "😂",
    dates: ["Fri 5 Dec 2026 · 8:00pm", "Fri 9 Jan 2027 · 8:00pm", "Fri 6 Feb 2027 · 8:00pm"],
    duration: "1h 30m, no interval",
    blurb: "Our resident improv troupe builds an entire show from your suggestions. No script, no safety net, no two nights alike.",
    priceFrom: 8,
  },
];

const TICKET_TYPES = [
  { key: "adult", label: "Adult", price: 14 },
  { key: "concession", label: "Concession", price: 11 },
  { key: "under18", label: "Under 18", price: 8 },
];

const GENRE_LABELS = { drama: "Drama", comedy: "Comedy", musical: "Musical", family: "Family" };

let basket = [];
let activeGenre = "all";
let activeShow = null;
let modalQty = { adult: 0, concession: 0, under18: 0 };

const $ = (id) => document.getElementById(id);
const money = (n) => "£" + n;

// ---- Season listing ----
function renderShows() {
  const q = ($("showSearch").value || "").trim().toLowerCase();
  const grid = $("showsGrid");
  grid.innerHTML = "";
  const filtered = SHOWS.filter((s) => {
    const okGenre = activeGenre === "all" || s.genre === activeGenre;
    const okQuery = !q || s.title.toLowerCase().includes(q);
    return okGenre && okQuery;
  });
  $("noShows").hidden = filtered.length > 0;
  filtered.forEach((s) => {
    const card = document.createElement("article");
    card.className = "show-card";
    card.dataset.genre = s.genre;
    card.innerHTML = `
      <div class="show-banner">${s.emoji}</div>
      <div class="show-body">
        <span class="show-genre">${GENRE_LABELS[s.genre]}</span>
        <h3>${s.title}</h3>
        <p class="show-meta">${s.dates[0]} · ${s.duration}</p>
        <p>${s.blurb}</p>
        <div class="show-foot">
          <span class="show-price">from ${money(s.priceFrom)} <span>· ${s.dates.length} dates</span></span>
          <button class="btn btn-secondary" data-book="${s.id}" type="button">Book tickets</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
  grid.querySelectorAll("[data-book]").forEach((btn) => {
    btn.addEventListener("click", () => openBooking(btn.dataset.book));
  });
}

$("showSearch").addEventListener("input", renderShows);
$("genreChips").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
  chip.classList.add("active");
  activeGenre = chip.dataset.genre;
  renderShows();
});

// ---- Booking modal ----
function openBooking(showId) {
  activeShow = SHOWS.find((s) => s.id === showId);
  if (!activeShow) return;
  modalQty = { adult: 0, concession: 0, under18: 0 };
  $("modalTitle").textContent = "Book tickets";
  $("modalShow").textContent = `${activeShow.title} · ${activeShow.duration}`;
  const sel = $("perfDate");
  sel.innerHTML = "";
  activeShow.dates.forEach((d) => {
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    sel.appendChild(opt);
  });
  renderTicketRows();
  $("bookingModal").hidden = false;
}

function renderTicketRows() {
  const wrap = $("ticketRows");
  wrap.innerHTML = "";
  TICKET_TYPES.forEach((t) => {
    const row = document.createElement("div");
    row.className = "ticket-row";
    row.innerHTML = `
      <span>${t.label} · ${money(t.price)}</span>
      <span class="qty">
        <button type="button" data-dec="${t.key}" aria-label="One fewer ${t.label}">−</button>
        <strong>${modalQty[t.key]}</strong>
        <button type="button" data-inc="${t.key}" aria-label="One more ${t.label}">+</button>
      </span>`;
    wrap.appendChild(row);
  });
  wrap.querySelectorAll("[data-inc]").forEach((b) =>
    b.addEventListener("click", () => { modalQty[b.dataset.inc]++; renderTicketRows(); }));
  wrap.querySelectorAll("[data-dec]").forEach((b) =>
    b.addEventListener("click", () => {
      if (modalQty[b.dataset.dec] > 0) modalQty[b.dataset.dec]--;
      renderTicketRows();
    }));
  const total = TICKET_TYPES.reduce((sum, t) => sum + t.price * modalQty[t.key], 0);
  $("modalTotal").textContent = money(total);
}

function closeBooking() { $("bookingModal").hidden = true; }
$("modalClose").addEventListener("click", closeBooking);
$("bookingModal").addEventListener("click", (e) => { if (e.target === $("bookingModal")) closeBooking(); });

$("addToBasket").addEventListener("click", () => {
  const count = Object.values(modalQty).reduce((a, b) => a + b, 0);
  if (count === 0) {
    $("modalTotal").textContent = "Pick at least one ticket first";
    return;
  }
  const lines = TICKET_TYPES.filter((t) => modalQty[t.key] > 0)
    .map((t) => ({ label: t.label, qty: modalQty[t.key], price: t.price }));
  basket.push({
    show: activeShow.title,
    date: $("perfDate").value,
    lines,
    total: lines.reduce((s, l) => s + l.qty * l.price, 0),
  });
  closeBooking();
  renderBasket();
  openDrawer();
});

// ---- Basket drawer ----
function renderBasket() {
  const totalCount = basket.reduce((s, b) => s + b.lines.reduce((a, l) => a + l.qty, 0), 0);
  $("basketCount").textContent = totalCount;
  const items = $("basketItems");
  items.innerHTML = "";
  $("basketEmpty").hidden = basket.length > 0;
  $("basketFoot").hidden = basket.length === 0;
  $("reserveMsg").hidden = true;
  basket.forEach((b, i) => {
    const div = document.createElement("div");
    div.className = "basket-item";
    div.innerHTML = `
      <h4>${b.show}</h4>
      <p>${b.date}</p>
      <p>${b.lines.map((l) => `${l.qty} × ${l.label}`).join(", ")}</p>
      <div class="item-line">
        <strong>${money(b.total)}</strong>
        <button class="remove-btn" type="button" data-remove="${i}">Remove</button>
      </div>`;
    items.appendChild(div);
  });
  items.querySelectorAll("[data-remove]").forEach((btn) =>
    btn.addEventListener("click", () => {
      basket.splice(Number(btn.dataset.remove), 1);
      renderBasket();
    }));
  $("basketTotal").textContent = money(basket.reduce((s, b) => s + b.total, 0));
}

function openDrawer() {
  $("basketDrawer").hidden = false;
  $("drawerScrim").hidden = false;
}
function closeDrawer() {
  $("basketDrawer").hidden = true;
  $("drawerScrim").hidden = true;
}
$("basketToggle").addEventListener("click", openDrawer);
$("basketClose").addEventListener("click", closeDrawer);
$("drawerScrim").addEventListener("click", closeDrawer);

$("reserveBtn").addEventListener("click", () => {
  if (!basket.length) return;
  const ref = "VS-" + Math.random().toString(36).slice(2, 7).toUpperCase();
  $("reserveRef").textContent = ref;
  basket = [];
  renderBasket();
  $("reserveMsg").hidden = false;
});

// ---- Get involved ----
$("auditionBtn").addEventListener("click", () => { $("auditionMsg").hidden = false; });
$("volunteerBtn").addEventListener("click", () => { $("volunteerMsg").hidden = false; });
$("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  $("newsletterMsg").hidden = false;
  $("newsletterEmail").value = "";
});

// ---- Live info ----
function nextShowText() {
  const first = SHOWS[0];
  $("nextShowNote").textContent = `Next performance: ${first.title} — ${first.dates[0]}.`;
}
function openStatus() {
  const now = new Date();
  const hour = now.getHours();
  // Curtain up 7:30pm; doors open 6:45pm on performance evenings (Fri–Sun).
  const day = now.getDay();
  const isShowDay = day === 5 || day === 6 || day === 0;
  if (isShowDay && hour >= 18 && hour < 23) {
    $("openStatus").textContent = "● We're open tonight — box office is staffed until curtain up.";
  } else if (isShowDay && hour < 18) {
    $("openStatus").textContent = "Doors open at 6:45pm tonight. Box office opens at 6:00pm.";
  } else {
    $("openStatus").textContent = "No performance today. The box office opens 6:00pm on show nights.";
  }
  $("tonightInfo").textContent = isShowDay
    ? "Tonight is a performance night. Doors open 45 minutes before curtain up; the bar serves interval drinks and homemade cake."
    : "No performance tonight. Check the season above for the next show date.";
}

renderShows();
renderBasket();
nextShowText();
openStatus();
