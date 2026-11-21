const flavours = [
  { name: "Madagascan Vanilla Bean", desc: "Slow-steeped vanilla pods, Jersey cream, a whisper of salt.", price: 3.20, emoji: "🍨", cat: "classic" },
  { name: "Triple Chocolate Fudge", desc: "Dark, milk and white chocolate swirled with fudge ribbons.", price: 3.60, emoji: "🍫", cat: "chocolate" },
  { name: "Strawberry Fields", desc: "Local strawberries folded through sweet cream.", price: 3.40, emoji: "🍓", cat: "fruit" },
  { name: "Salted Caramel Crunch", desc: "Burnt caramel, sea salt, and honeycomb pieces.", price: 3.60, emoji: "🍯", cat: "classic" },
  { name: "Mango Sorbet", desc: "Alphonso mangoes, nothing else but a squeeze of lime.", price: 3.20, emoji: "🥭", cat: "fruit", vegan: true },
  { name: "Mint Choc Chip", desc: "Fresh mint, dark chocolate shards, cool as a sea breeze.", price: 3.40, emoji: "🌿", cat: "classic" },
  { name: "Pistachio & Honey", desc: "Sicilian pistachios roasted in-house, wildflower honey.", price: 4.20, emoji: "🥜", cat: "classic" },
  { name: "Dark Chocolate Orange", desc: "70% dark chocolate with candied orange peel.", price: 3.80, emoji: "🍊", cat: "chocolate", vegan: true },
  { name: "Raspberry Ripple", desc: "Sharp raspberries rippled through vanilla cream.", price: 3.40, emoji: "🫐", cat: "fruit" },
  { name: "Biscoff Swirl", desc: "Caramelised biscuit crumble in spiced brown-butter cream.", price: 3.80, emoji: "🍪", cat: "classic" },
  { name: "Coconut & Lime (Vegan)", desc: "Creamy coconut milk with zesty lime — fully dairy-free.", price: 3.60, emoji: "🥥", cat: "fruit", vegan: true },
  { name: "Chocolate Brownie Blast", desc: "Warm fudge brownie chunks in double chocolate cream.", price: 3.80, emoji: "🍩", cat: "chocolate" },
  { name: "Lemon Sorbet", desc: "Amalfi lemons, sparkling and sharp — the palate cleanser.", price: 3.20, emoji: "🍋", cat: "fruit", vegan: true },
  { name: "Coffee & Walnut", desc: "Espresso-soaked walnuts in roasted coffee cream.", price: 3.60, emoji: "☕", cat: "classic" },
  { name: "Cherry Bakewell", desc: "Morello cherries, almond cream, a hint of marzipan.", price: 3.80, emoji: "🍒", cat: "fruit" },
  { name: "Chocolate Peanut Butter Cup", desc: "Salty peanut butter cups smashed into chocolate cream.", price: 3.80, emoji: "🥜", cat: "chocolate" },
];

const scoops = ["Vanilla Bean", "Triple Choc", "Strawberry", "Salted Caramel", "Mango Sorbet", "Mint Choc Chip", "Pistachio & Honey", "Biscoff Swirl"];
const toppings = ["Hot fudge", "Caramel sauce", "Crushed honeycomb", "Chopped hazelnuts", "Rainbow sprinkles", "Toasted marshmallow", "Cherry on top", "Biscoff crumble"];

const grid = document.getElementById("flavourGrid");
const searchInput = document.getElementById("flavourSearch");
const noFlavours = document.getElementById("noFlavours");
let activeFilter = "all";

function money(n) { return "£" + n.toFixed(2); }

function renderFlavours() {
  const q = searchInput.value.trim().toLowerCase();
  const list = flavours.filter(f => {
    const inCat = activeFilter === "all" || f.cat === activeFilter || (activeFilter === "vegan" && f.vegan);
    const inSearch = !q || f.name.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q);
    return inCat && inSearch;
  });
  grid.innerHTML = "";
  noFlavours.hidden = list.length > 0;
  list.forEach(f => {
    const card = document.createElement("article");
    card.className = "flavour-card";
    card.innerHTML =
      '<div class="flavour-emoji">' + f.emoji + '</div>' +
      '<h3>' + f.name + '</h3>' +
      (f.vegan ? '<span class="tag vegan">Vegan</span>' : '<span class="tag">' + f.cat + '</span>') +
      '<p>' + f.desc + '</p>' +
      '<div class="price-row"><span class="price">' + money(f.price) + ' / scoop</span>' +
      '<button class="add-btn" type="button">Add scoop +</button></div>';
    card.querySelector(".add-btn").addEventListener("click", () => addToBasket(f.name + " — single scoop", f.price));
    grid.appendChild(card);
  });
}

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderFlavours();
  });
});
searchInput.addEventListener("input", renderFlavours);
renderFlavours();

/* ---- Basket ---- */
const basket = [];
const basketBtn = document.getElementById("basketBtn");
const basketDrawer = document.getElementById("basketDrawer");
const basketItems = document.getElementById("basketItems");
const basketEmpty = document.getElementById("basketEmpty");
const basketTotal = document.getElementById("basketTotal");
const basketCount = document.getElementById("basketCount");
const checkoutMsg = document.getElementById("checkoutMsg");

function addToBasket(label, price) {
  basket.push({ label, price });
  renderBasket();
  basketDrawer.hidden = false;
}
function renderBasket() {
  basketCount.textContent = basket.length;
  basketItems.innerHTML = "";
  basketEmpty.hidden = basket.length > 0;
  let total = 0;
  basket.forEach((item, i) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = '<span>' + item.label + '</span><span><strong>' + money(item.price) + '</strong> ' +
      '<button type="button" aria-label="Remove">✕</button></span>';
    li.querySelector("button").addEventListener("click", () => { basket.splice(i, 1); renderBasket(); });
    basketItems.appendChild(li);
  });
  basketTotal.textContent = money(total);
}
basketBtn.addEventListener("click", () => { basketDrawer.hidden = false; });
document.getElementById("closeBasket").addEventListener("click", () => { basketDrawer.hidden = true; });
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (basket.length === 0) { checkoutMsg.textContent = "Your basket is empty — add a flavour first."; return; }
  checkoutMsg.textContent = "Reserved! Show this basket at the counter within 2 hours. See you soon. 🍦";
  basket.length = 0;
  renderBasket();
});

/* ---- Sundae builder ---- */
let sundaeSize = { label: "Regular", price: 4.50 };
let sundaeScoops = [];
let sundaeToppings = [];
const scoopOptions = document.getElementById("scoopOptions");
const toppingOptions = document.getElementById("toppingOptions");

scoops.forEach(name => {
  const b = document.createElement("button");
  b.type = "button"; b.className = "option"; b.textContent = name;
  b.addEventListener("click", () => {
    if (sundaeScoops.includes(name)) {
      sundaeScoops = sundaeScoops.filter(s => s !== name);
      b.classList.remove("selected");
    } else if (sundaeScoops.length < 3) {
      sundaeScoops.push(name);
      b.classList.add("selected");
    }
    updateSundae();
  });
  scoopOptions.appendChild(b);
});
toppings.forEach(name => {
  const b = document.createElement("button");
  b.type = "button"; b.className = "option"; b.textContent = name + " · £0.60";
  b.addEventListener("click", () => {
    if (sundaeToppings.includes(name)) {
      sundaeToppings = sundaeToppings.filter(t => t !== name);
      b.classList.remove("selected");
    } else {
      sundaeToppings.push(name);
      b.classList.add("selected");
    }
    updateSundae();
  });
  toppingOptions.appendChild(b);
});
document.getElementById("sizeOptions").addEventListener("click", e => {
  if (!e.target.classList.contains("option")) return;
  document.querySelectorAll("#sizeOptions .option").forEach(b => b.classList.remove("selected"));
  e.target.classList.add("selected");
  sundaeSize = { label: e.target.textContent.split(" · ")[0], price: parseFloat(e.target.dataset.price) };
  updateSundae();
});

function updateSundae() {
  const total = sundaeSize.price + sundaeToppings.length * 0.60;
  const scoopText = sundaeScoops.length ? sundaeScoops.join(", ") : "choose your scoops";
  const topText = sundaeToppings.length ? " + " + sundaeToppings.join(", ") : "";
  document.getElementById("sundaeSummary").textContent = sundaeSize.label + " sundae: " + scoopText + topText + ".";
  document.getElementById("sundaeTotal").textContent = money(total);
  document.getElementById("addSundaeBtn").disabled = sundaeScoops.length === 0;
  document.getElementById("addSundaeBtn").dataset.total = total;
}
updateSundae();

document.getElementById("addSundaeBtn").addEventListener("click", () => {
  const total = parseFloat(document.getElementById("addSundaeBtn").dataset.total || sundaeSize.price);
  const label = sundaeSize.label + " sundae (" + sundaeScoops.join(", ") + (sundaeToppings.length ? " + " + sundaeToppings.join(", ") : "") + ")";
  addToBasket(label, total);
});
document.getElementById("clearSundaeBtn").addEventListener("click", () => {
  sundaeScoops = []; sundaeToppings = [];
  scoopOptions.querySelectorAll(".option").forEach(b => b.classList.remove("selected"));
  toppingOptions.querySelectorAll(".option").forEach(b => b.classList.remove("selected"));
  updateSundae();
});

/* ---- Opening hours ---- */
(function () {
  const el = document.getElementById("openNow");
  const now = new Date();
  const day = now.getDay(); // 0 Sun … 6 Sat
  const mins = now.getHours() * 60 + now.getMinutes();
  let open, close;
  if (day === 0) { open = 10 * 60; close = 20 * 60; }
  else if (day === 5 || day === 6) { open = 10 * 60; close = 22 * 60 + 30; }
  else { open = 11 * 60; close = 21 * 60; }
  const isOpen = mins >= open && mins < close;
  el.textContent = isOpen ? "● Open now — come on in!" : "○ Closed right now — back at " + Math.floor(open / 60) + ":00.";
  el.classList.toggle("closed", !isOpen);
})();

/* ---- Ticker ---- */
const specials = [
  "Today's special: Pistachio & Honey — two scoops for £5.50 until 6pm.",
  "New this week: Cherry Bakewell is back by popular demand.",
  "Free pup-cup for dogs on the terrace, every day.",
  "Sundae Sundays: build-your-own sundae, toppings half price.",
];
let specialIdx = 0;
setInterval(() => {
  specialIdx = (specialIdx + 1) % specials.length;
  document.getElementById("tickerText").textContent = specials[specialIdx];
}, 6000);

/* ---- Forms ---- */
document.getElementById("partyForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("partyName").value.trim();
  const date = document.getElementById("partyDate").value;
  document.getElementById("partyMsg").textContent =
    "Thanks, " + name + "! Your party request for " + date + " is in — we'll email you within a day. 🎉";
  e.target.reset();
});
document.getElementById("newsForm").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("newsEmail").value.trim();
  document.getElementById("newsMsg").textContent = "Welcome to the Scoop List, " + email + "! First flavour drop lands next month. 🍦";
  e.target.reset();
});
