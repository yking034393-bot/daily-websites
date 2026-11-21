// Paws & Whiskers — adoptable pets data and interactions

const pets = [
  { name: "Milo", species: "dog", emoji: "🐶", breed: "Beagle mix", age: 1, ageLabel: "1 yr", size: "medium", fee: 120, desc: "A cheerful beagle who loves long walks, sniffing everything, and curling up at your feet afterwards." },
  { name: "Luna", species: "cat", emoji: "🐱", breed: "Tabby", age: 2, ageLabel: "2 yrs", size: "small", fee: 80, desc: "A gentle tabby who purrs the moment you sit down. Expert lap-warmer and sunbeam hunter." },
  { name: "Rocky", species: "dog", emoji: "🐕", breed: "German Shepherd mix", age: 4, ageLabel: "4 yrs", size: "large", fee: 150, desc: "Loyal, clever, and always up for a game of fetch. Best with an active family and a big garden." },
  { name: "Bella", species: "cat", emoji: "😺", breed: "Calico", age: 0.5, ageLabel: "6 mo", size: "small", fee: 90, desc: "A tiny calico tornado of curiosity. Loves string toys, cardboard boxes, and chin scratches." },
  { name: "Coco", species: "rabbit", emoji: "🐰", breed: "Holland Lop", age: 1, ageLabel: "1 yr", size: "small", fee: 50, desc: "A soft, calm lop who enjoys fresh greens and quiet company. Litter-trained and very polite." },
  { name: "Max", species: "dog", emoji: "🦮", breed: "Labrador", age: 7, ageLabel: "7 yrs", size: "large", fee: 60, desc: "A wise old soul with a grey muzzle and a golden heart. Perfect companion for quiet evenings." },
  { name: "Oliver", species: "cat", emoji: "🐈", breed: "British Shorthair", age: 6, ageLabel: "6 yrs", size: "medium", fee: 70, desc: "A dignified gentleman who enjoys windowsills, routine, and being admired from a respectful distance." },
  { name: "Daisy", species: "dog", emoji: "🐾", breed: "Cocker Spaniel", age: 0.8, ageLabel: "10 mo", size: "medium", fee: 140, desc: "A bouncy spaniel puppy with ears for days. Needs patience, play, and plenty of cuddles." },
  { name: "Hazel", species: "rabbit", emoji: "🐇", breed: "Mini Rex", age: 3, ageLabel: "3 yrs", size: "small", fee: 50, desc: "Velvet-soft and a little shy at first, but she'll binky for joy once she trusts you." },
  { name: "Simba", species: "cat", emoji: "🦁", breed: "Ginger Moggy", age: 3, ageLabel: "3 yrs", size: "medium", fee: 80, desc: "A confident ginger who runs the shelter like he owns it. Loves people, hates closed doors." },
  { name: "Ruby", species: "dog", emoji: "🐩", breed: "Poodle mix", age: 5, ageLabel: "5 yrs", size: "small", fee: 110, desc: "Smart, hypoallergenic, and endlessly affectionate. Already knows sit, stay, and shake." },
  { name: "Willow", species: "cat", emoji: "🐈‍⬛", breed: "Black Shorthair", age: 8, ageLabel: "8 yrs", size: "small", fee: 40, desc: "A calm senior lady who asks for little: a warm lap, a sunny spot, and someone to love." }
];

const petGrid = document.getElementById("petGrid");
const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");
const speciesFilter = document.getElementById("speciesFilter");
const ageFilter = document.getElementById("ageFilter");
const sizeFilter = document.getElementById("sizeFilter");
const searchInput = document.getElementById("searchInput");

document.getElementById("statPets").textContent = pets.length;

function ageGroup(age) {
  if (age < 1) return "young";
  if (age <= 5) return "adult";
  return "senior";
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function renderPets(list) {
  petGrid.innerHTML = "";
  resultsCount.textContent = list.length === pets.length
    ? `Showing all ${pets.length} adoptable pets`
    : `Showing ${list.length} of ${pets.length} pets`;
  emptyState.hidden = list.length !== 0;

  list.forEach((pet) => {
    const card = document.createElement("article");
    card.className = "pet-card";
    card.innerHTML = `
      <div class="pet-emoji" aria-hidden="true">${pet.emoji}</div>
      <div class="pet-body">
        <h3>${pet.name} <span>· ${pet.ageLabel} · ${pet.breed}</span></h3>
        <div class="pet-tags">
          <span class="tag">${capitalize(pet.species)}</span>
          <span class="tag">${capitalize(pet.size)}</span>
          <span class="tag">${ageGroup(pet.age) === "young" ? "Young" : ageGroup(pet.age) === "adult" ? "Adult" : "Senior"}</span>
        </div>
        <p>${pet.desc}</p>
        <p class="pet-fee">Adoption fee: $${pet.fee}</p>
        <button class="btn btn-primary adopt-btn" data-name="${pet.name}">Adopt ${pet.name}</button>
      </div>`;
    petGrid.appendChild(card);
  });
}

function applyFilters() {
  const species = speciesFilter.value;
  const age = ageFilter.value;
  const size = sizeFilter.value;
  const query = searchInput.value.trim().toLowerCase();

  const filtered = pets.filter((pet) => {
    if (species !== "all" && pet.species !== species) return false;
    if (age !== "all" && ageGroup(pet.age) !== age) return false;
    if (size !== "all" && pet.size !== size) return false;
    if (query && !pet.name.toLowerCase().includes(query) && !pet.breed.toLowerCase().includes(query)) return false;
    return true;
  });

  renderPets(filtered);
}

[speciesFilter, ageFilter, sizeFilter].forEach((el) => el.addEventListener("change", applyFilters));
searchInput.addEventListener("input", applyFilters);

// Adopt button: shows a friendly next-step message
petGrid.addEventListener("click", (event) => {
  const btn = event.target.closest(".adopt-btn");
  if (!btn) return;
  const name = btn.dataset.name;
  btn.textContent = `💛 Application started for ${name}!`;
  btn.disabled = true;
  resultsCount.textContent = `Wonderful choice! Visit the shelter or call (555) 014-7788 to meet ${name} and complete your application.`;
  resultsCount.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// Volunteer form
document.getElementById("volunteerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("volName").value.trim();
  const role = document.getElementById("volRole").value;
  document.getElementById("volMessage").textContent =
    `Thank you, ${name}! We've noted your interest in ${role.toLowerCase()} — our volunteer coordinator will email you this week. 🐾`;
  event.target.reset();
});

// Donation buttons
const donateMessage = document.getElementById("donateMessage");
document.querySelectorAll(".amount-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".amount-btn").forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    donateMessage.textContent = `Thank you! Your $${btn.dataset.amount} gift will go straight to food, vet care, and warm beds for the animals. 💛`;
  });
});

// Newsletter form
document.getElementById("newsletterForm").addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("newsMessage").textContent = "You're subscribed! Happy tails in your inbox every month. 🐾";
  event.target.reset();
});

// Mobile menu
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.addEventListener("click", (event) => {
  if (event.target.tagName === "A") mainNav.classList.remove("open");
});

renderPets(pets);
