const RECORDS = [
  { id: 1, title: "Rumours", artist: "Fleetwood Mac", genre: "rock", format: "new", year: 1977, price: 26.99, label: "Warner", condition: "New 180g pressing", color: "#7c3f58", emoji: "🎵", badge: "Staff pick", fresh: true },
  { id: 2, title: "Kind of Blue", artist: "Miles Davis", genre: "jazz", format: "used", year: 1959, price: 34.00, label: "Columbia", condition: "VG+ original", color: "#1f4e79", emoji: "🎷", badge: "Rare original", fresh: true },
  { id: 3, title: "What's Going On", artist: "Marvin Gaye", genre: "soul", format: "new", year: 1971, price: 24.99, label: "Tamla", condition: "New reissue", color: "#8a5a2b", emoji: "🎤", badge: "", fresh: false },
  { id: 4, title: "The Dark Side of the Moon", artist: "Pink Floyd", genre: "rock", format: "used", year: 1973, price: 42.00, label: "Harvest", condition: "VG+ UK first press", color: "#2b2b3a", emoji: "🌙", badge: "Collector's item", fresh: true },
  { id: 5, title: "Random Access Memories", artist: "Daft Punk", genre: "electronic", format: "new", year: 2013, price: 29.99, label: "Columbia", condition: "New 2×LP", color: "#b08d2e", emoji: "🤖", badge: "", fresh: false },
  { id: 6, title: "Illmatic", artist: "Nas", genre: "hiphop", format: "used", year: 1994, price: 38.00, label: "Columbia", condition: "VG original", color: "#3d5a45", emoji: "🎙️", badge: "", fresh: true },
  { id: 7, title: "A Love Supreme", artist: "John Coltrane", genre: "jazz", format: "new", year: 1965, price: 27.50, label: "Impulse!", condition: "New reissue", color: "#5b2d8e", emoji: "🎷", badge: "Staff pick", fresh: false },
  { id: 8, title: "Abbey Road", artist: "The Beatles", genre: "rock", format: "new", year: 1969, price: 25.99, label: "Apple", condition: "New remaster", color: "#4a6b8a", emoji: "🚶", badge: "", fresh: false },
  { id: 9, title: "Blue", artist: "Joni Mitchell", genre: "rock", format: "used", year: 1971, price: 22.00, label: "Reprise", condition: "VG+ original", color: "#2f6f6f", emoji: "💙", badge: "", fresh: true },
  { id: 10, title: "Superstition", artist: "Stevie Wonder", genre: "soul", format: "7", year: 1972, price: 8.99, label: "Tamla", condition: "7\" single, VG", color: "#a33e2a", emoji: "🎹", badge: "", fresh: false },
  { id: 11, title: "The Goldberg Variations", artist: "Glenn Gould", genre: "classical", format: "used", year: 1955, price: 19.50, label: "Columbia", condition: "VG mono original", color: "#6b4a2f", emoji: "🎼", badge: "", fresh: false },
  { id: 12, title: "Homework", artist: "Daft Punk", genre: "electronic", format: "new", year: 1997, price: 23.99, label: "Virgin", condition: "New reissue", color: "#333333", emoji: "🏠", badge: "", fresh: true },
  { id: 13, title: "Enter the Wu-Tang (36 Chambers)", artist: "Wu-Tang Clan", genre: "hiphop", format: "new", year: 1993, price: 28.99, label: "Loud", condition: "New reissue", color: "#8c8c1a", emoji: "🐝", badge: "", fresh: false },
  { id: 14, title: "Bitches Brew", artist: "Miles Davis", genre: "jazz", format: "used", year: 1970, price: 31.00, label: "Columbia", condition: "VG 2×LP original", color: "#7a2e3d", emoji: "🎺", badge: "", fresh: true },
  { id: 15, title: "Dancing Queen", artist: "ABBA", genre: "rock", format: "7", year: 1976, price: 6.99, label: "Epic", condition: "7\" single, VG+", color: "#c97b1e", emoji: "💃", badge: "", fresh: false },
  { id: 16, title: "Innervisions", artist: "Stevie Wonder", genre: "soul", format: "used", year: 1973, price: 26.00, label: "Tamla", condition: "VG+ original", color: "#4d3a6b", emoji: "✨", badge: "", fresh: true }
];

const GEAR = [
  { id: 101, name: "Rega Planar 1 Turntable", desc: "Belt-drive deck with factory-fitted cartridge. The easiest way into proper vinyl.", price: 299.00, color: "#374151", emoji: "🎛️" },
  { id: 102, name: "Audio-Technica AT-LP120X", desc: "Direct-drive deck with USB out — rip your records while you play them.", price: 349.00, color: "#1f2937", emoji: "💿" },
  { id: 103, name: "Vinyl Cleaning Kit", desc: "Carbon fibre brush, cleaning fluid and microfibre cloths. Keeps records crackle-free.", price: 24.99, color: "#065f46", emoji: "🧼" },
  { id: 104, name: "Anti-Static Inner Sleeves (50)", desc: "Replace worn paper sleeves and stop dust and static damaging your records.", price: 19.99, color: "#7c2d12", emoji: "📦" },
  { id: 105, name: "Stylus & Cartridge — Ortofon 2M Red", desc: "The classic upgrade cartridge. Noticeably clearer highs and tighter bass.", price: 99.00, color: "#9d174d", emoji: "💎" },
  { id: 106, name: "Record Storage Crate", desc: "Solid pine crate holding around 60 LPs. Stackable, and looks good doing it.", price: 34.99, color: "#92400e", emoji: "🗄️" }
];

const basket = new Map(); // id -> {item, qty}

const fmt = n => "£" + n.toFixed(2);
const $ = id => document.getElementById(id);

function cardHtml(item, isRecord) {
  const tag = isRecord
    ? (item.format === "new" ? "New pressing" : item.format === "7" ? "7\" single" : "Used original")
    : "Gear";
  const sub = isRecord
    ? `${item.year} · ${item.label} · ${item.condition}`
    : item.desc;
  const badge = item.badge ? `<span class="tag">${item.badge}</span>` : "";
  return `
    <article class="card">
      <div class="card-cover" style="background:${item.color}">${item.emoji}</div>
      <div class="card-body">
        ${badge}
        <h3>${item.title || item.name}</h3>
        ${isRecord ? `<p class="artist">${item.artist}</p>` : ""}
        <p class="meta">${sub}</p>
        <span class="tag ${item.format === "used" ? "used" : ""}">${tag}</span>
        <div class="price-row">
          <span class="price">${fmt(item.price)}</span>
          <button class="add-btn" type="button" data-add="${item.id}">Add to basket</button>
        </div>
      </div>
    </article>`;
}

function renderRecords() {
  const q = ($("searchInput").value || "").toLowerCase().trim();
  const genre = $("genreFilter").value;
  const format = $("formatFilter").value;
  const sort = $("sortSelect").value;

  let list = RECORDS.filter(r => {
    const hay = `${r.title} ${r.artist} ${r.label}`.toLowerCase();
    const okQ = !q || hay.includes(q);
    const okG = genre === "all" || r.genre === genre;
    const okF = format === "all" || r.format === format;
    return okQ && okG && okF;
  });

  if (sort === "price-low") list.sort((a, b) => a.price - b.price);
  if (sort === "price-high") list.sort((a, b) => b.price - a.price);
  if (sort === "year-new") list.sort((a, b) => b.year - a.year);
  if (sort === "year-old") list.sort((a, b) => a.year - b.year);

  $("resultsCount").textContent = list.length
    ? `Showing ${list.length} of ${RECORDS.length} records`
    : "No records match — try a different search or filter.";
  $("recordGrid").innerHTML = list.length
    ? list.map(r => cardHtml(r, true)).join("")
    : `<p class="empty">Nothing in this crate yet. Try clearing a filter.</p>`;
}

function renderNew() {
  $("newGrid").innerHTML = RECORDS.filter(r => r.fresh).map(r => cardHtml(r, true)).join("");
}

function renderGear() {
  $("gearGrid").innerHTML = GEAR.map(g => cardHtml(g, false)).join("");
}

function findItem(id) {
  return RECORDS.find(r => r.id === id) || GEAR.find(g => g.id === id);
}

function renderBasket() {
  const count = [...basket.values()].reduce((s, e) => s + e.qty, 0);
  $("basketCount").textContent = count;
  const items = [...basket.values()];
  if (!items.length) {
    $("basketItems").innerHTML = `<p class="empty-basket">Your basket is empty. Add a record or two from the crates.</p>`;
  } else {
    $("basketItems").innerHTML = items.map(({ item, qty }) => `
      <div class="basket-item">
        <div>
          <p><strong>${item.title || item.name}</strong></p>
          <p class="meta">${item.artist ? item.artist + " · " : ""}${fmt(item.price)}</p>
        </div>
        <div class="qty">
          <button type="button" data-dec="${item.id}" aria-label="Remove one">−</button>
          <span>${qty}</span>
          <button type="button" data-inc="${item.id}" aria-label="Add one">+</button>
        </div>
      </div>`).join("");
  }
  const total = items.reduce((s, e) => s + e.item.price * e.qty, 0);
  $("basketTotal").textContent = fmt(total);
}

function updateOpenStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const mins = now.getHours() * 60 + now.getMinutes();
  const open = day === 0 ? mins >= 11 * 60 && mins < 17 * 60 : mins >= 10 * 60 && mins < 18 * 60;
  const html = open
    ? `<span class="dot open"></span>Open now — come and dig the crates.`
    : `<span class="dot closed"></span>Closed right now — we open ${day === 0 ? "tomorrow at 10:00" : "at 10:00 tomorrow"}.`;
  $("openStatus").innerHTML = html;
  $("openStatus2").innerHTML = html;
}

document.addEventListener("click", e => {
  const add = e.target.closest("[data-add]");
  if (add) {
    const id = Number(add.dataset.add);
    const item = findItem(id);
    const entry = basket.get(id) || { item, qty: 0 };
    entry.qty += 1;
    basket.set(id, entry);
    renderBasket();
    return;
  }
  const inc = e.target.closest("[data-inc]");
  if (inc) {
    const entry = basket.get(Number(inc.dataset.inc));
    entry.qty += 1;
    renderBasket();
    return;
  }
  const dec = e.target.closest("[data-dec]");
  if (dec) {
    const id = Number(dec.dataset.dec);
    const entry = basket.get(id);
    entry.qty -= 1;
    if (entry.qty <= 0) basket.delete(id);
    renderBasket();
  }
});

$("searchInput").addEventListener("input", renderRecords);
$("genreFilter").addEventListener("change", renderRecords);
$("formatFilter").addEventListener("change", renderRecords);
$("sortSelect").addEventListener("change", renderRecords);

$("basketBtn").addEventListener("click", () => {
  $("basketDrawer").classList.add("open");
  $("basketDrawer").setAttribute("aria-hidden", "false");
});
$("closeBasket").addEventListener("click", () => {
  $("basketDrawer").classList.remove("open");
  $("basketDrawer").setAttribute("aria-hidden", "true");
});
$("basketDrawer").addEventListener("click", e => {
  if (e.target === $("basketDrawer")) {
    $("basketDrawer").classList.remove("open");
    $("basketDrawer").setAttribute("aria-hidden", "true");
  }
});

$("reserveBtn").addEventListener("click", () => {
  if (!basket.size) {
    $("reserveMsg").textContent = "Your basket is empty — add a record first.";
    return;
  }
  const day = $("reserveDay").value;
  const total = $("basketTotal").textContent;
  $("reserveMsg").textContent = `Reserved! Collect ${day.toLowerCase()} and pay ${total} in store. We'll hold your records for 48 hours.`;
  basket.clear();
  renderBasket();
});

$("newsletterForm").addEventListener("submit", e => {
  e.preventDefault();
  $("newsletterMsg").textContent = "You're on the list — see you in the crates.";
  $("newsletterEmail").value = "";
});

renderRecords();
renderNew();
renderGear();
renderBasket();
updateOpenStatus();
setInterval(updateOpenStatus, 60000);
