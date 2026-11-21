const PRODUCTS = [
  { id: 1, name: "Country Sourdough", emoji: "🍞", category: "bread", price: 9.50, desc: "36-hour ferment, stone-milled flour, crackling crust.", badge: "Bestseller" },
  { id: 2, name: "Butter Croissant", emoji: "🥐", category: "pastry", price: 4.25, desc: "27 layers of French butter. Shatters beautifully.", badge: "Bestseller" },
  { id: 3, name: "Pain au Chocolat", emoji: "🍫", category: "pastry", price: 4.75, desc: "Dark chocolate batons in flaky laminated dough." },
  { id: 4, name: "Cinnamon Morning Bun", emoji: "🌀", category: "sweet", price: 5.00, desc: "Brioche swirl, cinnamon sugar, vanilla glaze." },
  { id: 5, name: "Seeded Wholemeal Loaf", emoji: "🌾", category: "bread", price: 8.00, desc: "Sunflower, pumpkin and flax seeds, soft crumb." },
  { id: 6, name: "Vegan Banana Bread", emoji: "🍌", category: "vegan", price: 6.50, desc: "Toasted walnuts, no eggs or dairy, still moist.", badge: "Vegan" },
  { id: 7, name: "Lemon Drizzle Cake", emoji: "🍋", category: "sweet", price: 5.50, desc: "Sharp lemon sponge with a crackly sugar drizzle." },
  { id: 8, name: "Olive & Rosemary Focaccia", emoji: "🫒", category: "bread", price: 7.50, desc: "Olive oil-rich, studded with green olives." },
  { id: 9, name: "Almond Croissant", emoji: "🥜", category: "pastry", price: 5.50, desc: "Frangipane-filled, twice-baked, flaked almonds." },
  { id: 10, name: "Vegan Chocolate Brownie", emoji: "🍫", category: "vegan", price: 4.50, desc: "Fudgy, dark, sea-salt top. Nobody guesses it's vegan.", badge: "Vegan" },
  { id: 11, name: "Cardamom Knot", emoji: "🪢", category: "sweet", price: 4.75, desc: "Swedish-style knotted bun, pearl sugar crunch." },
  { id: 12, name: "Rye & Caraway Loaf", emoji: "🍞", category: "bread", price: 8.50, desc: "Dense, malty rye with a whisper of caraway." },
];

const OVEN_NOW = [
  { name: "Country Sourdough", tag: "8:00am batch" },
  { name: "Butter Croissants", tag: "Fresh tray" },
  { name: "Cinnamon Morning Buns", tag: "Just glazed" },
  { name: "Olive & Rosemary Focaccia", tag: "11:00am batch" },
];

const SCHEDULE = [
  { name: "Butter Croissants", time: "7:30am", note: "Usually gone by 10:00am" },
  { name: "Country Sourdough", time: "8:00am", note: "Second batch at 11:30am" },
  { name: "Seeded Wholemeal", time: "8:30am", note: "Sells out most Saturdays" },
  { name: "Olive & Rosemary Focaccia", time: "11:00am", note: "Lunch favourite — reserve ahead" },
  { name: "Rye & Caraway", time: "11:30am", note: "Small batch, 12 loaves only" },
  { name: "Cinnamon Morning Buns", time: "9:00am", note: "Second tray at 12:30pm" },
];

const CAKES = [
  { name: "The Rosewood", desc: "Vanilla bean sponge, raspberry jam, rose buttercream. Serves 12–20.", price: "from $55" },
  { name: "Midnight Chocolate", desc: "Three layers of dark chocolate sponge, salted caramel drip. Serves 12–24.", price: "from $60" },
  { name: "Lemon & Elderflower", desc: "Light lemon sponge, elderflower syrup, elderflower cream. Serves 10–16.", price: "from $50" },
  { name: "Pistachio & Rose", desc: "Pistachio sponge, rosewater cream, candied petals. Serves 12–20.", price: "from $65" },
];

let activeCategory = "all";
let basket = {}; // id -> qty

const $ = (sel) => document.querySelector(sel);
const money = (n) => "$" + n.toFixed(2);

function renderOven() {
  $("#ovenList").innerHTML = OVEN_NOW.map(o =>
    `<li><span>${o.name}</span><span class="tag">${o.tag}</span></li>`).join("");
}

function renderSchedule() {
  $("#scheduleList").innerHTML = SCHEDULE.map(s =>
    `<div class="schedule-item"><h3>${s.name}</h3><p class="time">Out of the oven: ${s.time}</p><p>${s.note}</p></div>`).join("");
}

function renderCakes() {
  $("#cakeList").innerHTML = CAKES.map(c =>
    `<li><h4>${c.name} <span class="badge">${c.price}</span></h4><p>${c.desc}</p></li>`).join("");
}

function filteredProducts() {
  const q = $("#searchInput").value.trim().toLowerCase();
  const matches = (p) => !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
  let list;
  if (activeCategory === "vegan") {
    list = PRODUCTS.filter(p => p.category === "vegan" && matches(p));
  } else {
    list = PRODUCTS.filter(p =>
      (activeCategory === "all" || p.category === activeCategory) && matches(p));
  }
  const sort = $("#sortSelect").value;
  if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
  else list.sort((a, b) => a.name.localeCompare(b.name));
  return list;
}

function renderProducts() {
  const list = filteredProducts();
  $("#emptyMsg").hidden = list.length > 0;
  $("#productGrid").innerHTML = list.map(p => `
    <article class="product-card">
      <span class="product-emoji" aria-hidden="true">${p.emoji}</span>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="product-meta">
        <span class="price">${money(p.price)}</span>
        ${p.badge ? `<span class="badge${p.category === "vegan" ? " vegan" : ""}">${p.badge}</span>` : ""}
      </div>
      <button class="add-btn" data-add="${p.id}">Add to basket</button>
    </article>`).join("");
}

function basketCount() {
  return Object.values(basket).reduce((a, b) => a + b, 0);
}

function basketTotal() {
  return Object.entries(basket).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find(x => x.id === Number(id));
    return sum + (p ? p.price * qty : 0);
  }, 0);
}

function renderBasket() {
  $("#basketCount").textContent = basketCount();
  const items = Object.entries(basket);
  if (!items.length) {
    $("#basketItems").innerHTML = `<li class="basket-empty">Your basket is empty — add something delicious.</li>`;
  } else {
    $("#basketItems").innerHTML = items.map(([id, qty]) => {
      const p = PRODUCTS.find(x => x.id === Number(id));
      return `<li>
        <span>${p.emoji} ${p.name}<br><small>${money(p.price)} each</small></span>
        <span class="qty-controls">
          <button data-dec="${p.id}" aria-label="Remove one">−</button>
          <strong>${qty}</strong>
          <button data-inc="${p.id}" aria-label="Add one">+</button>
        </span>
        <strong>${money(p.price * qty)}</strong>
      </li>`;
    }).join("");
  }
  $("#basketTotal").textContent = money(basketTotal());
}

function openBasket() {
  renderBasket();
  $("#basketDrawer").classList.add("open");
  $("#basketDrawer").setAttribute("aria-hidden", "false");
}
function closeBasket() {
  $("#basketDrawer").classList.remove("open");
  $("#basketDrawer").setAttribute("aria-hidden", "true");
}

document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  if (add) {
    const id = Number(add.dataset.add);
    basket[id] = (basket[id] || 0) + 1;
    renderBasket();
    return;
  }
  const inc = e.target.closest("[data-inc]");
  if (inc) { basket[Number(inc.dataset.inc)]++; renderBasket(); return; }
  const dec = e.target.closest("[data-dec]");
  if (dec) {
    const id = Number(dec.dataset.dec);
    basket[id]--;
    if (basket[id] <= 0) delete basket[id];
    renderBasket();
    return;
  }
});

$("#basketBtn").addEventListener("click", openBasket);
$("#basketClose").addEventListener("click", closeBasket);
$("#basketDrawer").addEventListener("click", (e) => {
  if (e.target === $("#basketDrawer")) closeBasket();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeBasket();
});

$("#checkoutBtn").addEventListener("click", () => {
  const msg = $("#checkoutMsg");
  if (!basketCount()) {
    msg.textContent = "Your basket is empty — add a bake first.";
    return;
  }
  const ref = "GW-" + Math.floor(1000 + Math.random() * 9000);
  msg.textContent = `Reserved! Order ${ref} — ${money(basketTotal())} — collect today before 3:00pm. Show this code at the counter.`;
  basket = {};
  renderBasket();
});

$("#searchInput").addEventListener("input", renderProducts);
$("#sortSelect").addEventListener("change", renderProducts);
$("#categoryFilters").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-category]");
  if (!btn) return;
  document.querySelectorAll("#categoryFilters button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  activeCategory = btn.dataset.category;
  renderProducts();
});

$("#cakeForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#cakeName").value.trim();
  const date = $("#cakeDate").value;
  if (!name || !date) return;
  $("#cakeMsg").textContent =
    `Thanks, ${name}! Your ${$("#cakeOccasion").value.toLowerCase()} cake (${$("#cakeFlavour").value}) for ${$("#cakeServings").value} servings is requested for ${date}. We'll email you within a day to confirm.`;
  e.target.reset();
});

$("#newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  $("#newsMsg").textContent = "You're on the list — tomorrow's bake list lands in your inbox at 6:30am.";
  e.target.reset();
});

// No past dates for cake collection
$("#cakeDate").min = new Date().toISOString().split("T")[0];

$("#menuToggle").addEventListener("click", () => {
  $("#mainNav").classList.toggle("open");
});

renderOven();
renderSchedule();
renderCakes();
renderProducts();
renderBasket();
