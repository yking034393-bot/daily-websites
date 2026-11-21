// The Story Nook — book catalogue, search/filter, basket, and forms.

const BOOKS = [
  { title: "The Midnight Garden", author: "Elena Marsh", genre: "fiction", price: 14.99, emoji: "🌙", color: "#2e4a6b", blurb: "A gardener grows other people's lost memories — and one of them is her own." },
  { title: "The Salt Road", author: "Amara Okafor", genre: "fiction", price: 12.99, emoji: "🌊", color: "#3f6b4f", blurb: "Two sisters walk the old salt road home, carrying a secret neither will name." },
  { title: "The Lighthouse Keeper's Daughter", author: "Tom Wren", genre: "fiction", price: 13.50, emoji: "🕯️", color: "#8f6b2d", blurb: "A storm, a shipwreck, and a letter that was never meant to be found." },
  { title: "A Quiet Kind of Brave", author: "Nadia Rahman", genre: "fiction", price: 11.99, emoji: "🕊️", color: "#7a4a6b", blurb: "A teacher, a runaway teenager, and one long summer that changes them both." },
  { title: "The Vanishing at Willow House", author: "Clara Beaumont", genre: "mystery", price: 12.99, emoji: "🔍", color: "#4a3a5e", blurb: "A house party, a missing heiress, and a detective who was never invited." },
  { title: "The Last Chapter Club", author: "Marcus Doyle", genre: "mystery", price: 13.99, emoji: "🗝️", color: "#5e3a2d", blurb: "A retired bookseller solves murders the police have already closed." },
  { title: "Murder on the Night Train", author: "Iris Kaur", genre: "mystery", price: 11.50, emoji: "🚂", color: "#2d4a4a", blurb: "Eight passengers, one locked carriage, and a ticket nobody remembers buying." },
  { title: "The Moonlight Bakery", author: "Sofia Lindqvist", genre: "children", price: 8.99, emoji: "🧁", color: "#b4552d", blurb: "Milo bakes cakes that make dreams come true — until one goes very wrong." },
  { title: "Pip and the Great Kite Race", author: "Daniel Osei", genre: "children", price: 7.99, emoji: "🪁", color: "#3f6b8f", blurb: "Pip builds the fastest kite in the village, then loses it to the wind." },
  { title: "The Dragon in the Library", author: "Hana Sato", genre: "children", price: 9.99, emoji: "🐉", color: "#6b4a2d", blurb: "A tiny dragon eats the library's books — and starts telling the stories himself." },
  { title: "How to Grow a Forest", author: "Dr. Ruth Adler", genre: "nonfiction", price: 18.99, emoji: "🌳", color: "#3f6b4f", blurb: "A hopeful, practical guide to planting trees and restoring wild places." },
  { title: "The History of Tea", author: "James Whitfield", genre: "nonfiction", price: 16.99, emoji: "🍵", color: "#7a6b2d", blurb: "From mountain terraces to the tea shop on your street — the story in your cup." },
  { title: "Letters Never Sent", author: "Maya Chen", genre: "poetry", price: 10.99, emoji: "💌", color: "#8f3f5e", blurb: "Forty poems about the things we almost said, and the people we almost kept." },
  { title: "Field Notes from the Edge", author: "Oliver Grant", genre: "poetry", price: 9.99, emoji: "🌾", color: "#4a5e2d", blurb: "Poems from coast paths, allotments, and the quiet hours before dawn." },
  { title: "The Cartographer's Wife", author: "Elena Marsh", genre: "fiction", price: 14.50, emoji: "🗺️", color: "#2e4a6b", blurb: "She maps the world her husband sailed away to find — and finds herself instead." },
  { title: "One Winter in the Village", author: "Agnes Novak", genre: "nonfiction", price: 15.99, emoji: "❄️", color: "#4a6b8f", blurb: "A year of slow living, shared meals, and neighbours who become family." }
];

const grid = document.getElementById("bookGrid");
const searchInput = document.getElementById("searchInput");
const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");
const basketCountEl = document.getElementById("basketCount");
const toast = document.getElementById("toast");

let activeGenre = "all";
let basket = [];
let toastTimer = null;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function formatPrice(n) {
  return "£" + n.toFixed(2);
}

function renderBooks() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = BOOKS.filter((book) => {
    const matchesGenre = activeGenre === "all" || book.genre === activeGenre;
    const matchesQuery = !query ||
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query);
    return matchesGenre && matchesQuery;
  });

  grid.innerHTML = "";
  filtered.forEach((book) => {
    const card = document.createElement("article");
    card.className = "book-card";
    card.innerHTML =
      '<div class="book-cover" style="background:' + book.color + '22;color:' + book.color + '">' + book.emoji + "</div>" +
      "<h3>" + book.title + "</h3>" +
      '<p class="book-author">by ' + book.author + "</p>" +
      '<span class="book-genre">' + book.genre + "</span>" +
      '<p class="book-blurb">' + book.blurb + "</p>" +
      '<div class="book-foot"><span class="book-price">' + formatPrice(book.price) + '</span>' +
      '<button class="add-btn" type="button">Add to basket</button></div>';
    card.querySelector(".add-btn").addEventListener("click", () => addToBasket(book.title));
    grid.appendChild(card);
  });

  resultsCount.textContent = filtered.length + (filtered.length === 1 ? " book" : " books") + " in stock";
  emptyState.hidden = filtered.length !== 0;
}

function addToBasket(title) {
  basket.push(title);
  basketCountEl.textContent = basket.length;
  showToast("Added “" + title + "” to your basket.");
}

document.getElementById("genreFilters").addEventListener("click", (event) => {
  const btn = event.target.closest(".filter-btn");
  if (!btn) return;
  document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  activeGenre = btn.dataset.genre;
  renderBooks();
});

searchInput.addEventListener("input", renderBooks);

// Hero staff-pick button and any [data-add] buttons.
document.querySelectorAll("[data-add]").forEach((btn) => {
  btn.addEventListener("click", () => addToBasket(btn.dataset.add));
});

// Basket button shows a summary.
document.getElementById("basketBtn").addEventListener("click", () => {
  if (basket.length === 0) {
    showToast("Your basket is empty — browse the shelves to find your next read.");
  } else {
    showToast("Basket: " + basket.length + (basket.length === 1 ? " book" : " books") + " — " + basket.join(", ") + ".");
  }
});

// Event RSVP buttons.
document.querySelectorAll("[data-rsvp]").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.textContent = "✓ You're booked in";
    btn.disabled = true;
    showToast("You're booked in for “" + btn.dataset.rsvp + "”. See you there!");
  });
});

// Book club sign-up.
document.getElementById("clubForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("clubName").value.trim();
  const club = document.getElementById("clubChoice").value;
  document.getElementById("clubMsg").textContent =
    "Welcome to " + club + ", " + name + "! We'll email your first meeting details.";
  event.target.reset();
});

// Newsletter sign-up.
document.getElementById("newsForm").addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("newsMsg").textContent =
    "Thanks for subscribing! The Sunday Shelf lands in your inbox this weekend.";
  event.target.reset();
});

renderBooks();
