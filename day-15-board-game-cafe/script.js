const GAMES = [
  { id: 1, name: "Catan", emoji: "🏝️", category: "strategy", players: "3–4", minPlayers: 3, maxPlayers: 4, time: 90, difficulty: 2, desc: "Settle, trade and build on a shifting island. The classic gateway strategy game." },
  { id: 2, name: "Ticket to Ride", emoji: "🚂", category: "family", players: "2–5", minPlayers: 2, maxPlayers: 5, time: 45, difficulty: 1, desc: "Claim railway routes across the country before your rivals block you." },
  { id: 3, name: "Codenames", emoji: "🕵️", category: "party", players: "4–8+", minPlayers: 4, maxPlayers: 8, time: 20, difficulty: 1, desc: "One-word clues, 25 secret agents, and a team guessing game that sparks arguments." },
  { id: 4, name: "Pandemic", emoji: "🦠", category: "coop", players: "2–4", minPlayers: 2, maxPlayers: 4, time: 45, difficulty: 2, desc: "Work together as a disease-control team and cure four outbreaks before time runs out." },
  { id: 5, name: "Exploding Kittens", emoji: "🐱", category: "card", players: "2–5", minPlayers: 2, maxPlayers: 5, time: 15, difficulty: 1, desc: "A fast card game of Russian roulette with kittens, laser beams and the occasional taco cat." },
  { id: 6, name: "Azul", emoji: "🎨", category: "strategy", players: "2–4", minPlayers: 2, maxPlayers: 4, time: 40, difficulty: 2, desc: "Draft beautiful tiles and decorate a palace wall. Elegant, quick and quietly cut-throat." },
  { id: 7, name: "Wavelength", emoji: "📡", category: "party", players: "2–12", minPlayers: 2, maxPlayers: 12, time: 30, difficulty: 1, desc: "Guess where your team's clue lands on a spectrum from hot to cold. Hilarious every time." },
  { id: 8, name: "Gloomhaven: Jaws of the Lion", emoji: "🦁", category: "coop", players: "1–4", minPlayers: 1, maxPlayers: 4, time: 90, difficulty: 3, desc: "A dungeon-crawling campaign in a box — best with a regular group and a long evening." },
  { id: 9, name: "Dixit", emoji: "🌙", category: "family", players: "3–6", minPlayers: 3, maxPlayers: 6, time: 30, difficulty: 1, desc: "Dreamy picture cards, cryptic clues and gentle bluffing. A favourite for all ages." },
  { id: 10, name: "Uno", emoji: "🃏", category: "card", players: "2–10", minPlayers: 2, maxPlayers: 10, time: 20, difficulty: 1, desc: "The classic card game of matching, reversing and ruining friendships — politely." },
  { id: 11, name: "Chess", emoji: "♟️", category: "classic", players: "2", minPlayers: 2, maxPlayers: 2, time: 60, difficulty: 3, desc: "The timeless duel. Our house sets are weighted wood, and the clock is always available." },
  { id: 12, name: "Scrabble", emoji: "🔤", category: "classic", players: "2–4", minPlayers: 2, maxPlayers: 4, time: 60, difficulty: 2, desc: "Triple-word-score glory awaits. House rule: no proper nouns, no mercy." },
  { id: 13, name: "Wingspan", emoji: "🦅", category: "strategy", players: "1–5", minPlayers: 1, maxPlayers: 5, time: 70, difficulty: 2, desc: "Attract birds to your wildlife preserves in this relaxing, gorgeous engine-builder." },
  { id: 14, name: "The Resistance", emoji: "🎭", category: "party", players: "5–10", minPlayers: 5, maxPlayers: 10, time: 30, difficulty: 2, desc: "Hidden traitors, secret missions and very suspicious friends. Best with a big group." },
];

const RENTAL_PRICE = 2;
let basket = [];

const grid = document.getElementById("game-grid");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("category-filter");
const playersFilter = document.getElementById("players-filter");
const sortSelect = document.getElementById("sort");
const resultCount = document.getElementById("result-count");
const noResults = document.getElementById("no-results");

function difficultyLabel(n) {
  return "★".repeat(n) + "☆".repeat(3 - n);
}

function matchesPlayers(game, band) {
  if (band === "all") return true;
  if (band === "2") return game.minPlayers <= 2 && game.maxPlayers >= 2;
  if (band === "3-4") return game.minPlayers <= 4 && game.maxPlayers >= 3;
  if (band === "5+") return game.maxPlayers >= 5;
  return true;
}

function renderGames() {
  const q = searchInput.value.trim().toLowerCase();
  const cat = categoryFilter.value;
  const band = playersFilter.value;
  const sort = sortSelect.value;

  let list = GAMES.filter(g =>
    (cat === "all" || g.category === cat) &&
    matchesPlayers(g, band) &&
    (q === "" || g.name.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q))
  );

  if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "time-asc") list.sort((a, b) => a.time - b.time);
  if (sort === "time-desc") list.sort((a, b) => b.time - a.time);
  if (sort === "difficulty") list.sort((a, b) => a.difficulty - b.difficulty);

  resultCount.textContent = `Showing ${list.length} of ${GAMES.length} games`;
  noResults.hidden = list.length !== 0;

  grid.innerHTML = list.map(g => `
    <article class="game-card">
      <span class="game-emoji" aria-hidden="true">${g.emoji}</span>
      <h3>${g.name}</h3>
      <p class="game-meta">${g.players} players · ${g.time} min · ${difficultyLabel(g.difficulty)}</p>
      <p class="game-desc">${g.desc}</p>
      <div class="game-foot">
        <span class="tag">${g.category}</span>
        <span class="game-price">£${RENTAL_PRICE.toFixed(2)} rental</span>
        <button class="reserve-btn" type="button" data-id="${g.id}" ${basket.includes(g.id) ? "disabled" : ""}>
          ${basket.includes(g.id) ? "Reserved ✓" : "Reserve"}
        </button>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll(".reserve-btn").forEach(btn => {
    btn.addEventListener("click", () => addToBasket(Number(btn.dataset.id)));
  });
}

function renderBasket() {
  const countEl = document.getElementById("basket-count");
  const itemsEl = document.getElementById("basket-items");
  const emptyEl = document.getElementById("basket-empty");
  const totalEl = document.getElementById("basket-total");

  countEl.textContent = basket.length;
  emptyEl.hidden = basket.length !== 0;
  totalEl.textContent = "£" + (basket.length * RENTAL_PRICE).toFixed(2);

  itemsEl.innerHTML = basket.map(id => {
    const g = GAMES.find(x => x.id === id);
    return `<li><span>${g.emoji} ${g.name} <small>(${g.players} players, ${g.time} min)</small></span>
      <button class="remove-btn" type="button" data-id="${g.id}">Remove</button></li>`;
  }).join("");

  itemsEl.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      basket = basket.filter(id => id !== Number(btn.dataset.id));
      renderBasket();
      renderGames();
    });
  });
}

function addToBasket(id) {
  if (!basket.includes(id)) basket.push(id);
  renderBasket();
  renderGames();
  document.getElementById("basket-panel").hidden = false;
}

// Basket panel open/close
document.getElementById("basket-toggle").addEventListener("click", () => {
  const panel = document.getElementById("basket-panel");
  panel.hidden = !panel.hidden;
});
document.getElementById("basket-close").addEventListener("click", () => {
  document.getElementById("basket-panel").hidden = true;
});

// Reserve form
document.getElementById("reserve-form").addEventListener("submit", e => {
  e.preventDefault();
  const msg = document.getElementById("reserve-message");
  const name = document.getElementById("res-name").value.trim();
  const date = document.getElementById("res-date").value;
  if (basket.length === 0) {
    msg.textContent = "Your basket is empty — reserve a game first.";
    msg.classList.add("error");
    return;
  }
  if (!name || !date) {
    msg.textContent = "Please add your name and a visit date.";
    msg.classList.add("error");
    return;
  }
  const names = basket.map(id => GAMES.find(x => x.id === id).name).join(", ");
  msg.classList.remove("error");
  msg.textContent = `Thanks, ${name}! ${basket.length} game(s) reserved for ${date}: ${names}. We'll have them on your table when you arrive.`;
  basket = [];
  renderBasket();
  renderGames();
  e.target.reset();
});

// Booking form
document.getElementById("booking-form").addEventListener("submit", e => {
  e.preventDefault();
  const msg = document.getElementById("booking-message");
  const name = document.getElementById("bk-name").value.trim();
  const date = document.getElementById("bk-date").value;
  const time = document.getElementById("bk-time").value;
  const party = document.getElementById("bk-party").value;
  if (!name || !date || !time || !party) {
    msg.textContent = "Please fill in every field so we can hold your table.";
    msg.classList.add("error");
    return;
  }
  msg.classList.remove("error");
  msg.textContent = `Thanks, ${name}! Your table for ${party} on ${date} at ${time} is requested — we'll confirm by email within the hour.`;
  e.target.reset();
});

// Filters
[searchInput, categoryFilter, playersFilter, sortSelect].forEach(el =>
  el.addEventListener("input", renderGames)
);

// Live opening-hours indicator
// Hours: Mon–Thu 12:00–23:00, Fri–Sat 11:00–24:00, Sun 10:00–22:00
function updateOpenStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 Sun … 6 Sat
  const mins = now.getHours() * 60 + now.getMinutes();
  let open, close;
  if (day === 0) { open = 10 * 60; close = 22 * 60; }
  else if (day === 5 || day === 6) { open = 11 * 60; close = 24 * 60; }
  else { open = 12 * 60; close = 23 * 60; }

  const dot = document.getElementById("open-dot");
  const text = document.getElementById("open-text");
  const fmt = m => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

  if (mins >= open && mins < close) {
    dot.className = "dot open";
    text.textContent = `We're open now — until ${fmt(close)} today. Walk-ins welcome!`;
  } else if (mins < open) {
    dot.className = "dot closed";
    text.textContent = `We're closed right now — we open today at ${fmt(open)}.`;
  } else {
    dot.className = "dot closed";
    text.textContent = "We're closed for today — see you tomorrow!";
  }
}

updateOpenStatus();
setInterval(updateOpenStatus, 60000);
renderGames();
renderBasket();
