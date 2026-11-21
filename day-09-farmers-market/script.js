/* Maple & Main Farmers Market — Day 09 */

const vendors = [
  { id: 1, name: "Willow Creek Farm", stall: 3, category: "produce", tagline: "Organic veg grown 12 miles away, picked Friday morning.", featured: "Strawberries", price: 3.50, unit: "punnet" },
  { id: 2, name: "Old Mill Dairy", stall: 7, category: "dairy", tagline: "Raw-milk cheeses, butter and free-range eggs.", featured: "Aged cheddar", price: 6.20, unit: "200g wedge" },
  { id: 3, name: "Crumb & Crust Bakery", stall: 5, category: "bakery", tagline: "Sourdough, croissants and cinnamon buns, baked at dawn.", featured: "Country sourdough", price: 4.80, unit: "loaf" },
  { id: 4, name: "Holloway Honey", stall: 11, category: "produce", tagline: "Raw honey, beeswax candles and honeycomb from our own hives.", featured: "Wildflower honey", price: 7.00, unit: "340g jar" },
  { id: 5, name: "Meadowbrook Meats", stall: 14, category: "meat", tagline: "Grass-fed beef, rare-breed pork and free-range chicken.", featured: "Dry-aged ribeye", price: 14.50, unit: "per kg" },
  { id: 6, name: "Salt & Smoke Fish Co.", stall: 16, category: "meat", tagline: "Day-boat fish, smoked salmon and oysters on ice.", featured: "Smoked salmon", price: 9.75, unit: "200g pack" },
  { id: 7, name: "The Dumpling Cart", stall: 22, category: "food", tagline: "Steamed pork and veggie dumplings, made to order.", featured: "Pork & chive dumplings", price: 6.50, unit: "box of 6" },
  { id: 8, name: "Taco Verde", stall: 24, category: "food", tagline: "Baja fish tacos, elote and agua fresca.", featured: "Baja fish taco", price: 4.25, unit: "each" },
  { id: 9, name: "Fern & Fable Plants", stall: 28, category: "crafts", tagline: "Houseplants, herbs and handmade terracotta pots.", featured: "Rosemary plant", price: 5.00, unit: "pot" },
  { id: 10, name: "Wick & Wax Co.", stall: 30, category: "crafts", tagline: "Soy candles, soaps and balms in small batches.", featured: "Fig & cedar candle", price: 12.00, unit: "each" },
  { id: 11, name: "Golden Acre Orchards", stall: 9, category: "produce", tagline: "Apples, pears and pressed juice from a family orchard.", featured: "Cox's apples", price: 2.80, unit: "per kg" },
  { id: 12, name: "Noor's Flatbreads", stall: 19, category: "bakery", tagline: "Wood-fired flatbreads, za'atar and olive oil dips.", featured: "Za'atar flatbread", price: 3.75, unit: "each" },
  { id: 13, name: "Hattie's Preserves", stall: 26, category: "produce", tagline: "Jams, chutneys and pickles from surplus garden fruit.", featured: "Plum & ginger jam", price: 4.50, unit: "jar" },
  { id: 14, name: "Blue Door Coffee Roasters", stall: 21, category: "food", tagline: "Small-batch coffee, filter and flat whites to go.", featured: "Flat white", price: 3.20, unit: "each" },
  { id: 15, name: "Riverbank Flowers", stall: 2, category: "crafts", tagline: "Cut flowers and hand-tied bouquets, grown without chemicals.", featured: "Autumn bouquet", price: 10.00, unit: "bunch" },
  { id: 16, name: "Sunrise Eggs", stall: 8, category: "dairy", tagline: "Pasture-raised eggs from happy hens.", featured: "Free-range eggs", price: 3.10, unit: "half dozen" }
];

const produceByMonth = {
  november: {
    note: "November is root-veg and brassica season — perfect for soups, roasts and stews.",
    items: [
      { emoji: "🎃", name: "Pumpkin", stalls: "Willow Creek Farm" },
      { emoji: "🥕", name: "Carrots", stalls: "Willow Creek Farm" },
      { emoji: "🥔", name: "Potatoes", stalls: "Golden Acre Orchards" },
      { emoji: "🥬", name: "Kale", stalls: "Willow Creek Farm" },
      { emoji: "🍎", name: "Apples", stalls: "Golden Acre Orchards" },
      { emoji: "🍐", name: "Pears", stalls: "Golden Acre Orchards" },
      { emoji: "🧅", name: "Onions", stalls: "Willow Creek Farm" },
      { emoji: "🥦", name: "Broccoli", stalls: "Willow Creek Farm" }
    ]
  },
  december: {
    note: "December brings the Christmas table: sprouts, parsnips, cranberries and clementines.",
    items: [
      { emoji: "🥦", name: "Brussels sprouts", stalls: "Willow Creek Farm" },
      { emoji: "🥕", name: "Parsnips", stalls: "Willow Creek Farm" },
      { emoji: "🍊", name: "Clementines", stalls: "Golden Acre Orchards" },
      { emoji: "🌰", name: "Chestnuts", stalls: "Hattie's Preserves" },
      { emoji: "🍎", name: "Bramley apples", stalls: "Golden Acre Orchards" },
      { emoji: "🥬", name: "Red cabbage", stalls: "Willow Creek Farm" }
    ]
  },
  january: {
    note: "January is lean but lovely — leeks, swede and stored apples, plus the first forced rhubarb.",
    items: [
      { emoji: "🧅", name: "Leeks", stalls: "Willow Creek Farm" },
      { emoji: "🥔", name: "Swede", stalls: "Willow Creek Farm" },
      { emoji: "🍎", name: "Stored apples", stalls: "Golden Acre Orchards" },
      { emoji: "🌱", name: "Forced rhubarb", stalls: "Hattie's Preserves" },
      { emoji: "🥬", name: "Winter greens", stalls: "Willow Creek Farm" }
    ]
  }
};

const schedule = [
  { time: "7:30am", title: "Stalls open their shutters", text: "Early birds get the first sourdough and the best pick of the veg." },
  { time: "8:00am", title: "Market opens", text: "The bell rings, the coffee cart fires up, and trading begins." },
  { time: "9:00am", title: "Kids' veggie-printing tent", text: "Free craft session for under-10s, next to the info tent." },
  { time: "10:00am", title: "Live music: The Honeybees", text: "Folk trio playing by the bandstand until noon." },
  { time: "11:00am", title: "Cooking demo — squash soup", text: "Chef Amara cooks with Willow Creek pumpkins. Tasters for all." },
  { time: "12:30pm", title: "Last orders & the 'wonky veg' box", text: "Unsold produce goes into £5 surprise boxes — first come, first served." },
  { time: "1:00pm", title: "Market closes", text: "See you next Saturday, same time, same place." }
];

const recipes = [
  {
    title: "🍲 Roast Pumpkin Soup",
    meta: "Serves 4 · 35 minutes",
    ingredients: ["1 pumpkin — Willow Creek Farm", "2 onions — Willow Creek Farm", "1 sourdough loaf — Crumb & Crust", "Butter — Old Mill Dairy"],
    steps: "Roast the pumpkin, soften the onions in butter, blend with stock, and serve with thick sourdough soldiers."
  },
  {
    title: "🥗 Apple, Cheddar & Kale Salad",
    meta: "Serves 2 · 15 minutes",
    ingredients: ["2 Cox's apples — Golden Acre Orchards", "Aged cheddar — Old Mill Dairy", "Kale — Willow Creek Farm", "Wildflower honey — Holloway Honey"],
    steps: "Massage the kale with a honey dressing, toss with sliced apple and shaved cheddar, and finish with toasted seeds."
  },
  {
    title: "🍳 Market Breakfast Flatbread",
    meta: "Serves 2 · 20 minutes",
    ingredients: ["2 za'atar flatbreads — Noor's Flatbreads", "Free-range eggs — Sunrise Eggs", "Smoked salmon — Salt & Smoke Fish Co.", "Rosemary — Fern & Fable"],
    steps: "Warm the flatbreads, fry the eggs, and top with salmon ribbons and fresh rosemary. Eat warm, preferably standing at the stall."
  }
];

/* --- Vendor catalogue --- */
const grid = document.getElementById("vendorGrid");
const searchInput = document.getElementById("vendorSearch");
const sortSelect = document.getElementById("vendorSort");
const resultCount = document.getElementById("resultCount");
let activeFilter = "all";

const money = (n) => "£" + n.toFixed(2);

function renderVendors() {
  const q = searchInput.value.trim().toLowerCase();
  let list = vendors.filter((v) =>
    (activeFilter === "all" || v.category === activeFilter) &&
    (q === "" || v.name.toLowerCase().includes(q) || v.featured.toLowerCase().includes(q) || v.tagline.toLowerCase().includes(q))
  );
  if (sortSelect.value === "name") list.sort((a, b) => a.name.localeCompare(b.name));
  if (sortSelect.value === "stall") list.sort((a, b) => a.stall - b.stall);
  if (sortSelect.value === "price") list.sort((a, b) => a.price - b.price);

  resultCount.textContent = list.length + (list.length === 1 ? " stall" : " stalls") + " this week";
  if (!list.length) {
    grid.innerHTML = '<p class="empty-msg">No stalls match that search — try a different word or filter.</p>';
    return;
  }
  grid.innerHTML = list.map((v) => `
    <article class="vendor-card">
      <span class="stall-no">Stall ${v.stall} · ${v.category}</span>
      <h3>${v.name}</h3>
      <p class="tagline">${v.tagline}</p>
      <p class="featured">⭐ Featured: <strong>${v.featured}</strong> — <span class="price">${money(v.price)} / ${v.unit}</span></p>
      <button class="add-btn" data-id="${v.id}">Add ${v.featured} to basket</button>
    </article>`).join("");
}

document.getElementById("vendorFilters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  activeFilter = btn.dataset.filter;
  renderVendors();
});
searchInput.addEventListener("input", renderVendors);
sortSelect.addEventListener("change", renderVendors);

/* --- Basket --- */
const basket = new Map(); // vendor id -> qty
const basketBtn = document.getElementById("basketBtn");
const basketCount = document.getElementById("basketCount");
const drawer = document.getElementById("basketDrawer");
const overlay = document.getElementById("drawerOverlay");
const drawerBody = document.getElementById("drawerBody");
const drawerTotal = document.getElementById("drawerTotal");

function basketQty() {
  return [...basket.values()].reduce((a, b) => a + b, 0);
}
function basketTotal() {
  return [...basket.entries()].reduce((sum, [id, qty]) => {
    const v = vendors.find((x) => x.id === id);
    return sum + v.price * qty;
  }, 0);
}
function renderBasket() {
  basketCount.textContent = basketQty();
  if (!basket.size) {
    drawerBody.innerHTML = '<p class="empty-basket">Your basket is empty.<br>Add something tasty from the stalls above.</p>';
  } else {
    drawerBody.innerHTML = [...basket.entries()].map(([id, qty]) => {
      const v = vendors.find((x) => x.id === id);
      return `<div class="basket-item">
        <div><strong>${v.featured}</strong><br><small>${v.name} · ${money(v.price)} / ${v.unit}</small></div>
        <div class="qty-controls">
          <button data-action="dec" data-id="${id}" aria-label="Remove one">−</button>
          <span>${qty}</span>
          <button data-action="inc" data-id="${id}" aria-label="Add one">+</button>
        </div>
        <strong>${money(v.price * qty)}</strong>
      </div>`;
    }).join("");
  }
  drawerTotal.textContent = money(basketTotal());
}
grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-btn");
  if (!btn) return;
  const id = Number(btn.dataset.id);
  basket.set(id, (basket.get(id) || 0) + 1);
  renderBasket();
  btn.textContent = "✓ Added!";
  setTimeout(() => { btn.textContent = "Add " + vendors.find((v) => v.id === id).featured + " to basket"; }, 900);
});
drawerBody.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const qty = basket.get(id) || 0;
  if (btn.dataset.action === "inc") basket.set(id, qty + 1);
  if (btn.dataset.action === "dec") {
    if (qty <= 1) basket.delete(id);
    else basket.set(id, qty - 1);
  }
  renderBasket();
});
function openDrawer() {
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  overlay.hidden = false;
}
function closeDrawer() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  overlay.hidden = true;
}
basketBtn.addEventListener("click", openDrawer);
document.getElementById("drawerClose").addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (!basket.size) return;
  const code = "MM-" + Math.random().toString(36).slice(2, 6).toUpperCase();
  document.getElementById("reserveCode").textContent = code;
  document.getElementById("checkoutSuccess").hidden = false;
  basket.clear();
  renderBasket();
});

/* --- Seasonal produce --- */
const produceGrid = document.getElementById("produceGrid");
const seasonNote = document.getElementById("seasonNote");
function renderProduce(month) {
  const data = produceByMonth[month];
  produceGrid.innerHTML = data.items.map((p) => `
    <div class="produce-card" title="Available at ${p.stalls}">
      <div class="emoji">${p.emoji}</div>
      <h3>${p.name}</h3>
      <p>at ${p.stalls}</p>
    </div>`).join("");
  seasonNote.textContent = data.note;
}
document.getElementById("seasonTabs").addEventListener("click", (e) => {
  const tab = e.target.closest(".season-tab");
  if (!tab) return;
  document.querySelectorAll(".season-tab").forEach((t) => t.classList.remove("active"));
  tab.classList.add("active");
  renderProduce(tab.dataset.month);
});

/* --- Schedule & recipes --- */
document.getElementById("timeline").innerHTML = schedule.map((s) => `
  <li><time>${s.time}</time><div><strong>${s.title}</strong><p>${s.text}</p></div></li>`).join("");

document.getElementById("recipeGrid").innerHTML = recipes.map((r) => `
  <article class="recipe-card">
    <h3>${r.title}</h3>
    <p class="recipe-meta">${r.meta}</p>
    <ul>${r.ingredients.map((i) => `<li>${i}</li>`).join("")}</ul>
    <p>${r.steps}</p>
  </article>`).join("");

/* --- Forms --- */
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

document.getElementById("stallForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("stallName").value.trim();
  const email = document.getElementById("stallEmail").value.trim();
  const type = document.getElementById("stallType").value;
  const ok = name && emailOk(email) && type;
  document.getElementById("stallError").hidden = !!ok;
  document.getElementById("stallSuccess").hidden = !ok;
  if (ok) e.target.reset();
});

document.getElementById("newsForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("newsEmail").value.trim();
  const ok = emailOk(email);
  document.getElementById("newsError").hidden = ok;
  document.getElementById("newsSuccess").hidden = !ok;
  if (ok) e.target.reset();
});

/* --- Mobile menu --- */
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});
mainNav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") mainNav.classList.remove("open");
});

/* --- Init --- */
renderVendors();
renderProduce("november");
renderBasket();
