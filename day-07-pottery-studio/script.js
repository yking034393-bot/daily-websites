// Riverstone Pottery Studio — data & interactions

const CLASSES = [
  { id: 1, name: "First Time on the Wheel", emoji: "🌀", level: "beginner", levelLabel: "Beginner", schedule: "Saturdays · 10:00–12:30", price: 65, desc: "No experience needed. Centre clay, pull your first cylinder and leave with a piece to be glazed and fired." },
  { id: 2, name: "Six-Week Wheel Course", emoji: "🏺", level: "beginner", levelLabel: "Beginner", schedule: "Tuesdays · 6:30–9:00 pm", price: 320, desc: "Our signature course. From centring to glazing, make a full set of bowls and mugs over six weeks." },
  { id: 3, name: "Hand-Building: Pinch & Coil", emoji: "🤲", level: "beginner", levelLabel: "Beginner", schedule: "Sundays · 2:00–4:30 pm", price: 55, desc: "Slow, meditative hand-building. Make sculptural bowls, vases and planters without a wheel." },
  { id: 4, name: "Throwing Bigger: Large Forms", emoji: "⚱️", level: "intermediate", levelLabel: "Intermediate", schedule: "Wednesdays · 6:30–9:00 pm", price: 95, desc: "For confident throwers ready to go big — large bowls, planters and floor vases up to 40 cm tall." },
  { id: 5, name: "Glazing Masterclass", emoji: "🎨", level: "intermediate", levelLabel: "Intermediate", schedule: "First Saturday of the month · 1:00–4:00 pm", price: 85, desc: "Layer, wax-resist and dip your way to rich, food-safe glazes. Bring two bisque pieces to glaze." },
  { id: 6, name: "Porcelain & Fine Throwing", emoji: "🍶", level: "advanced", levelLabel: "Advanced", schedule: "Thursdays · 6:30–9:30 pm", price: 110, desc: "Work with porcelain's delicate nature — thin walls, translucency and precision trimming." },
  { id: 7, name: "Raku Firing Experience", emoji: "🔥", level: "advanced", levelLabel: "Advanced", schedule: "Last Sunday of the month · 11:00 am–3:00 pm", price: 130, desc: "Outdoor raku firing with crackle glazes and smoke effects. Dramatic, fast and unforgettable." },
  { id: 8, name: "Family Clay Morning", emoji: "👨‍👩‍👧", level: "kids", levelLabel: "Kids & families", schedule: "Saturdays · 9:00–10:30 am", price: 40, desc: "A relaxed morning for families with children aged 5+. Make a pinch pot, a mug or a little animal together." },
  { id: 9, name: "Teen Wheel Club", emoji: "🧒", level: "kids", levelLabel: "Kids & families", schedule: "Fridays · 4:00–5:30 pm", price: 35, desc: "Weekly wheel time for ages 10–16. Learn the basics, make gifts, and show your work at our summer exhibition." },
];

const SHOP = [
  { id: 101, name: "Speckled Stoneware Mug", emoji: "☕", price: 28, desc: "350 ml, oatmeal speckle glaze. Dishwasher safe." },
  { id: 102, name: "Riverstone Serving Bowl", emoji: "🥣", price: 46, desc: "Wide 24 cm bowl in deep river blue with a sandy rim." },
  { id: 103, name: "Tall Bud Vase", emoji: "🏺", price: 38, desc: "Slender 22 cm vase, perfect for a single stem. Sage green." },
  { id: 104, name: "Rustic Pasta Plate Set", emoji: "🍽️", price: 64, desc: "Set of two wide-rimmed plates in warm terracotta." },
  { id: 105, name: "Honey Glaze Teapot", emoji: "🫖", price: 78, desc: "600 ml teapot with cane handle, amber honey glaze." },
  { id: 106, name: "Mini Succulent Planter", emoji: "🪴", price: 24, desc: "Small planter with drainage hole, in speckled white." },
  { id: 107, name: "Raku Moon Jar", emoji: "🌕", price: 95, desc: "One-of-a-kind raku jar with crackle glaze and smoky flashes." },
  { id: 108, name: "Espresso Cup Duo", emoji: "☕", price: 32, desc: "Two 90 ml espresso cups in charcoal and cream." },
];

const GALLERY = [
  { emoji: "🏺", title: "River Blue Vase", text: "Thrown on the wheel and glazed in our signature river blue. The sandy rim is left unglazed to show the raw stoneware." },
  { emoji: "🥣", title: "Breakfast Bowl Set", text: "A set of four bowls made in our six-week wheel course by student Mara J. — her first full set!" },
  { emoji: "🌕", title: "Raku Moon Jar", text: "Pulled glowing from the raku kiln and plunged into sawdust. The crackle pattern is different every single time." },
  { emoji: "🫖", title: "Honey Teapot", text: "A slow pour, a balanced handle, and a glaze that pools amber in the creases. Our best-selling teapot shape." },
  { emoji: "🪴", title: "Planter Row", text: "A dozen small planters glazed in sage, speckle and charcoal — ready for the spring plant fair." },
  { emoji: "🍶", title: "Porcelain Sake Set", text: "Thin-walled porcelain from our advanced class. Translucent in the light, with a celadon glaze." },
];

// ---------- Classes ----------
const classList = document.getElementById("classList");
const classCount = document.getElementById("classCount");

function renderClasses(level) {
  const filtered = level === "all" ? CLASSES : CLASSES.filter((c) => c.level === level);
  classList.innerHTML = filtered.map((c) => `
    <article class="card">
      <div class="card-emoji">${c.emoji}</div>
      <h3>${c.name}</h3>
      <p><span class="tag">${c.levelLabel}</span></p>
      <p class="meta">${c.schedule}</p>
      <p>${c.desc}</p>
      <p class="price">$${c.price} per person</p>
      <button class="btn btn-small" data-book="${c.name}">Book this class</button>
    </article>`).join("");
  classCount.textContent = `Showing ${filtered.length} of ${CLASSES.length} classes.`;
}

document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    renderClasses(chip.dataset.level);
  });
});

classList.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-book]");
  if (!btn) return;
  const select = document.getElementById("bookClass");
  select.value = btn.dataset.book;
  document.getElementById("book").scrollIntoView({ behavior: "smooth" });
  document.getElementById("bookName").focus();
});

renderClasses("all");

// ---------- Shop ----------
const shopList = document.getElementById("shopList");
const shopCount = document.getElementById("shopCount");
const basket = new Map(); // id -> qty

function renderShop() {
  const query = document.getElementById("shopSearch").value.trim().toLowerCase();
  const sort = document.getElementById("shopSort").value;
  let items = SHOP.filter((p) => p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));
  if (sort === "price-asc") items = [...items].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") items = [...items].sort((a, b) => b.price - a.price);
  if (sort === "name") items = [...items].sort((a, b) => a.name.localeCompare(b.name));
  shopList.innerHTML = items.length ? items.map((p) => `
    <article class="card">
      <div class="card-emoji">${p.emoji}</div>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <p class="price">$${p.price}</p>
      <button class="btn btn-small" data-add="${p.id}">Add to basket</button>
    </article>`).join("") : "<p>No pieces match your search — try a different word.</p>";
  shopCount.textContent = `Showing ${items.length} of ${SHOP.length} pieces.`;
}

function renderBasket() {
  const itemsEl = document.getElementById("basketItems");
  const totalEl = document.getElementById("basketTotal");
  const countEl = document.getElementById("basketCount");
  const emptyEl = document.getElementById("basketEmpty");
  const checkoutBtn = document.getElementById("checkoutBtn");
  let total = 0, count = 0;
  itemsEl.innerHTML = "";
  basket.forEach((qty, id) => {
    const p = SHOP.find((s) => s.id === id);
    total += p.price * qty; count += qty;
    const li = document.createElement("li");
    li.innerHTML = `<span>${p.emoji} ${p.name} × ${qty}</span><span>$${p.price * qty} <button data-remove="${id}" aria-label="Remove ${p.name}">✕</button></span>`;
    itemsEl.appendChild(li);
  });
  totalEl.textContent = "$" + total;
  countEl.textContent = `(${count} item${count === 1 ? "" : "s"})`;
  emptyEl.style.display = count ? "none" : "block";
  checkoutBtn.disabled = count === 0;
}

shopList.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-add]");
  if (!btn) return;
  const id = Number(btn.dataset.add);
  basket.set(id, (basket.get(id) || 0) + 1);
  renderBasket();
});

document.getElementById("basketItems").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-remove]");
  if (!btn) return;
  basket.delete(Number(btn.dataset.remove));
  renderBasket();
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
  document.getElementById("basketNote").textContent =
    "Thank you! This is a demo shop — your pieces are reserved in the studio for 48 hours. We'll email you about pickup.";
  basket.clear();
  renderBasket();
});

document.getElementById("shopSearch").addEventListener("input", renderShop);
document.getElementById("shopSort").addEventListener("change", renderShop);
renderShop();
renderBasket();

// ---------- Gallery lightbox ----------
const galleryGrid = document.getElementById("galleryGrid");
galleryGrid.innerHTML = GALLERY.map((g, i) => `
  <figure class="gallery-item" data-gallery="${i}" tabindex="0" role="button" aria-label="View ${g.title}">
    <span class="g-emoji">${g.emoji}</span>
    <h3>${g.title}</h3>
    <p>Click to view</p>
  </figure>`).join("");

const lightbox = document.getElementById("lightbox");
function openLightbox(i) {
  const g = GALLERY[i];
  document.getElementById("lightboxEmoji").textContent = g.emoji;
  document.getElementById("lightboxTitle").textContent = g.title;
  document.getElementById("lightboxText").textContent = g.text;
  lightbox.hidden = false;
}
function closeLightbox() { lightbox.hidden = true; }
galleryGrid.addEventListener("click", (e) => {
  const item = e.target.closest("[data-gallery]");
  if (item) openLightbox(Number(item.dataset.gallery));
});
galleryGrid.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const item = e.target.closest("[data-gallery]");
    if (item) openLightbox(Number(item.dataset.gallery));
  }
});
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

// ---------- Booking form ----------
const bookSelect = document.getElementById("bookClass");
bookSelect.innerHTML = CLASSES.map((c) => `<option value="${c.name}">${c.name} — $${c.price}</option>`).join("");
document.getElementById("bookDate").min = new Date().toISOString().split("T")[0];

document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("bookName").value.trim();
  const cls = bookSelect.value;
  const date = document.getElementById("bookDate").value;
  const people = document.getElementById("bookPeople").value;
  document.getElementById("bookingNote").textContent =
    `Thanks, ${name}! Your request for "${cls}" on ${date} for ${people} ${people === "1" ? "person" : "people"} is in — we'll confirm by email within a day.`;
  e.target.reset();
});

// ---------- Newsletter ----------
document.getElementById("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("newsletterNote").textContent =
    "You're on the list! Kiln Notes arrives on the first Sunday of each month.";
  e.target.reset();
});

// ---------- Mobile menu ----------
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") mainNav.classList.remove("open");
});
