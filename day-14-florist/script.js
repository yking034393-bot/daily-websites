const PRODUCTS = [
  { name: "The Meadow Bouquet", desc: "Peonies, ranunculus and sweet peas in soft blush and cream.", price: 58, category: "bouquet", tag: "Bouquet", emoji: "💐" },
  { name: "Classic Red Roses", desc: "A dozen long-stem red roses, hand-tied with eucalyptus.", price: 65, category: "roses", tag: "Roses", emoji: "🌹" },
  { name: "Blush Rose & Peony", desc: "Pale pink roses with peonies and soft greenery.", price: 72, category: "roses", tag: "Roses", emoji: "🌸" },
  { name: "Sunflower Bunch", desc: "Bright sunflowers with wheat stems — instant sunshine.", price: 38, category: "seasonal", tag: "Seasonal", emoji: "🌻" },
  { name: "Spring Tulip Bundle", desc: "Twenty mixed tulips in cheerful spring colours.", price: 34, category: "seasonal", tag: "Seasonal", emoji: "🌷" },
  { name: "Wildflower Posy", desc: "A loose, just-picked mix of seasonal wildflowers.", price: 29, category: "bouquet", tag: "Bouquet", emoji: "🌼" },
  { name: "White Lily Arrangement", desc: "Elegant white lilies and gypsophila in a ceramic vase.", price: 54, category: "bouquet", tag: "Bouquet", emoji: "🤍" },
  { name: "Orchid in Ceramic Pot", desc: "A white phalaenopsis orchid, potted and ready to enjoy.", price: 48, category: "plants", tag: "Potted", emoji: "🪴" },
  { name: "Lavender & Herb Planter", desc: "Lavender, rosemary and thyme in a rustic wooden box.", price: 42, category: "plants", tag: "Potted", emoji: "🌿" },
  { name: "Autumn Harvest Bouquet", desc: "Dahlias, chrysanthemums and dried grasses in warm tones.", price: 52, category: "seasonal", tag: "Seasonal", emoji: "🍂" },
  { name: "Pastel Rose Dozen", desc: "Twelve pastel roses — pink, peach and cream.", price: 59, category: "roses", tag: "Roses", emoji: "💗" },
  { name: "Succulent Trio", desc: "Three easy-care succulents in matching ceramic pots.", price: 36, category: "plants", tag: "Potted", emoji: "🌵" },
];

const grid = document.getElementById("productGrid");
const emptyNote = document.getElementById("emptyNote");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
let activeFilter = "all";

const basket = [];
const basketList = document.getElementById("basketList");
const basketEmpty = document.getElementById("basketEmpty");
const basketCount = document.getElementById("basketCount");
const basketTotal = document.getElementById("basketTotal");
const basketPanel = document.getElementById("basketPanel");

function renderProducts() {
  const q = searchInput.value.trim().toLowerCase();
  let items = PRODUCTS.filter((p) => {
    const matchesFilter = activeFilter === "all" || p.category === activeFilter;
    const matchesSearch =
      !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });
  const sort = sortSelect.value;
  if (sort === "price-asc") items = [...items].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") items = [...items].sort((a, b) => b.price - a.price);
  if (sort === "name") items = [...items].sort((a, b) => a.name.localeCompare(b.name));

  grid.innerHTML = "";
  emptyNote.hidden = items.length > 0;
  items.forEach((p) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-emoji">${p.emoji}</div>
      <p class="product-tag">${p.tag}</p>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="product-foot">
        <span class="product-price">$${p.price}</span>
        <button type="button" class="add-btn">Add to basket</button>
      </div>`;
    card.querySelector(".add-btn").addEventListener("click", () => addToBasket(p.name, p.price));
    grid.appendChild(card);
  });
}

function renderBasket() {
  const count = basket.reduce((sum, item) => sum + item.qty, 0);
  const total = basket.reduce((sum, item) => sum + item.qty * item.price, 0);
  basketCount.textContent = count;
  basketTotal.textContent = "$" + total;
  basketEmpty.style.display = basket.length ? "none" : "block";
  basketList.innerHTML = "";
  basket.forEach((item, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${item.name} × ${item.qty}</span><span>$${item.qty * item.price} <button type="button" aria-label="Remove ${item.name}">Remove</button></span>`;
    li.querySelector("button").addEventListener("click", () => {
      basket.splice(i, 1);
      renderBasket();
    });
    basketList.appendChild(li);
  });
}

function addToBasket(name, price) {
  const found = basket.find((item) => item.name === name);
  if (found) found.qty += 1;
  else basket.push({ name, price, qty: 1 });
  renderBasket();
  basketPanel.classList.add("open");
}

document.querySelectorAll("[data-add]").forEach((btn) => {
  btn.addEventListener("click", () => addToBasket(btn.dataset.add, Number(btn.dataset.price)));
});

document.getElementById("basketToggle").addEventListener("click", () => basketPanel.classList.add("open"));
document.getElementById("basketClose").addEventListener("click", () => basketPanel.classList.remove("open"));

document.getElementById("checkoutBtn").addEventListener("click", () => {
  const note = document.getElementById("checkoutNote");
  if (!basket.length) {
    note.textContent = "Your basket is empty — add a bouquet first.";
    return;
  }
  note.textContent = "Thank you! Your flowers are reserved for collection — we'll call to confirm a time.";
  basket.length = 0;
  renderBasket();
});

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderProducts();
  });
});
searchInput.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);

document.querySelectorAll("[data-plan]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById("planNote").textContent =
      `Lovely choice — ${btn.dataset.plan} it is! We'll email you to confirm your first delivery day.`;
  });
});

document.getElementById("deliveryForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("dName").value.trim();
  const date = document.getElementById("dDate").value;
  const msg = document.getElementById("dMessage").value.trim();
  document.getElementById("deliveryNote").textContent =
    `Thanks ${name}! Delivery booked for ${date}${msg ? ` with the card message: “${msg}”` : ""}. We'll confirm by phone.`;
  e.target.reset();
});

// Live opening-hours indicator (Mon–Sat 8–18, Sun 9–16).
(function () {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const open = day === 0 ? 9 : 8;
  const close = day === 0 ? 16 : 18;
  const el = document.getElementById("openIndicator");
  if (hour >= open && hour < close) {
    el.textContent = `● We're open now — until ${close === 16 ? "4pm" : "6pm"} today. Same-day delivery on orders before 2pm.`;
  } else {
    el.textContent = `○ We're closed right now — we open at ${open === 9 ? "9am" : "8am"}. You can still browse and book a delivery.`;
  }
})();

renderProducts();
renderBasket();
