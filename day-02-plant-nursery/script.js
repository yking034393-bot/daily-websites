const PLANTS = [
  { name: "Monstera Deliciosa", latin: "Monstera deliciosa", emoji: "🌿", price: 34, light: "bright", pet: false },
  { name: "Snake Plant", latin: "Sansevieria trifasciata", emoji: "🪴", price: 22, light: "low", pet: false },
  { name: "Golden Pothos", latin: "Epipremnum aureum", emoji: "🌱", price: 16, light: "low", pet: false },
  { name: "Fiddle-Leaf Fig", latin: "Ficus lyrata", emoji: "🌳", price: 48, light: "bright", pet: false },
  { name: "Calathea Orbifolia", latin: "Goeppertia orbifolia", emoji: "🍃", price: 29, light: "low", pet: true },
  { name: "String of Pearls", latin: "Curio rowleyanus", emoji: "🫧", price: 19, light: "bright", pet: false },
  { name: "Boston Fern", latin: "Nephrolepis exaltata", emoji: "🌿", price: 18, light: "low", pet: true },
  { name: "Aloe Vera", latin: "Aloe barbadensis miller", emoji: "🌵", price: 14, light: "bright", pet: false },
  { name: "Spider Plant", latin: "Chlorophytum comosum", emoji: "🕷️", price: 15, light: "low", pet: true },
  { name: "Olive Tree", latin: "Olea europaea", emoji: "🫒", price: 56, light: "bright", pet: true },
  { name: "ZZ Plant", latin: "Zamioculcas zamiifolia", emoji: "🌿", price: 26, light: "low", pet: false },
  { name: "Parlour Palm", latin: "Chamaedorea elegans", emoji: "🌴", price: 21, light: "low", pet: true }
];

const grid = document.getElementById("plantGrid");
const emptyNote = document.getElementById("emptyNote");
const cartCountEl = document.getElementById("cartCount");
const toast = document.getElementById("toast");
let cartCount = 0;
let toastTimer = null;

function lightLabel(light) {
  return light === "low" ? "☁️ Low light" : "☀️ Bright light";
}

function renderPlants(filter) {
  grid.innerHTML = "";
  const shown = PLANTS.filter((p) => {
    if (filter === "all") return true;
    if (filter === "pet") return p.pet;
    return p.light === filter;
  });

  emptyNote.hidden = shown.length > 0;

  shown.forEach((plant) => {
    const card = document.createElement("article");
    card.className = "plant-card";

    const emoji = document.createElement("div");
    emoji.className = "plant-emoji";
    emoji.textContent = plant.emoji;

    const body = document.createElement("div");
    body.className = "plant-body";

    const name = document.createElement("h3");
    name.textContent = plant.name;

    const latin = document.createElement("p");
    latin.className = "latin";
    latin.textContent = plant.latin;

    const tags = document.createElement("div");
    tags.className = "tags";
    const lightTag = document.createElement("span");
    lightTag.className = "tag";
    lightTag.textContent = lightLabel(plant.light);
    tags.appendChild(lightTag);
    if (plant.pet) {
      const petTag = document.createElement("span");
      petTag.className = "tag pet";
      petTag.textContent = "🐾 Pet friendly";
      tags.appendChild(petTag);
    }

    const foot = document.createElement("div");
    foot.className = "plant-foot";
    const price = document.createElement("span");
    price.className = "price";
    price.textContent = "$" + plant.price;
    const addBtn = document.createElement("button");
    addBtn.className = "add-btn";
    addBtn.type = "button";
    addBtn.textContent = "Add to basket";
    addBtn.addEventListener("click", () => {
      cartCount += 1;
      cartCountEl.textContent = cartCount;
      showToast(plant.name + " added to your basket 🌿");
    });
    foot.append(price, addBtn);

    body.append(name, latin, tags, foot);
    card.append(emoji, body);
    grid.appendChild(card);
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderPlants(btn.dataset.filter);
  });
});

document.getElementById("cartBtn").addEventListener("click", () => {
  showToast(
    cartCount === 0
      ? "Your basket is empty — add a plant to get started."
      : "You have " + cartCount + " plant" + (cartCount === 1 ? "" : "s") + " in your basket."
  );
});

document.getElementById("newsletterForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("newsletterEmail").value.trim();
  if (!email) return;
  document.getElementById("newsletterNote").textContent =
    "Thanks! Seasonal care tips are on their way to " + email + ".";
  event.target.reset();
  showToast("Welcome to the Green Thumb newsletter 🌱");
});

renderPlants("all");
