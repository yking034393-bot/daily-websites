// Lens & Light Photography Studio — portfolio, services, booking

var PHOTOS = [
  { title: "Golden Hour Portrait", cat: "portraits", label: "Portrait", grad: "linear-gradient(135deg,#e8a87c,#b7791f)", desc: "Mara, shot at sunset on the old pier." },
  { title: "The First Dance", cat: "weddings", label: "Wedding", grad: "linear-gradient(135deg,#d9a5b3,#8a4a5e)", desc: "Maya & Tom, June 2026 — the first dance." },
  { title: "Mist Over the Valley", cat: "landscapes", label: "Landscape", grad: "linear-gradient(135deg,#7fa3b8,#2c4257)", desc: "Dawn in the northern valley, October 2026." },
  { title: "Launch Night", cat: "events", label: "Event", grad: "linear-gradient(135deg,#8a7fb8,#3a2c5e)", desc: "Product launch, city hall — Sofia on the floor." },
  { title: "Sisters in the Studio", cat: "portraits", label: "Portrait", grad: "linear-gradient(135deg,#c9b18a,#7a5a33)", desc: "A sibling portrait, studio session." },
  { title: "Vows by the Lake", cat: "weddings", label: "Wedding", grad: "linear-gradient(135deg,#9db8a0,#4a6b52)", desc: "Lakeside ceremony, golden afternoon light." },
  { title: "Coastline at Dusk", cat: "landscapes", label: "Landscape", grad: "linear-gradient(135deg,#e8c98a,#b75c1f)", desc: "The southern coast, last light of the day." },
  { title: "Festival Crowd", cat: "events", label: "Event", grad: "linear-gradient(135deg,#a87c9b,#5e2c4a)", desc: "Summer festival main stage, evening set." },
  { title: "The Newborn Series", cat: "portraits", label: "Portrait", grad: "linear-gradient(135deg,#d8c3a3,#96621a)", desc: "Baby Noor, two weeks old, studio session." },
  { title: "Confetti Exit", cat: "weddings", label: "Wedding", grad: "linear-gradient(135deg,#f0d9a0,#b7791f)", desc: "The confetti exit — every guest in frame." },
  { title: "Mountain Silence", cat: "landscapes", label: "Landscape", grad: "linear-gradient(135deg,#b8c9d9,#5e7a8a)", desc: "High pass, first snow of the season." },
  { title: "Gala Dinner", cat: "events", label: "Event", grad: "linear-gradient(135deg,#c9a87c,#6b4a2c)", desc: "Charity gala, candlelit speeches." }
];

var SERVICES = [
  {
    name: "Portrait Session",
    price: "$180",
    per: "per session",
    features: ["1 hour in studio or on location", "25 edited high-resolution images", "Private online gallery", "2 outfit changes"],
    featured: false
  },
  {
    name: "Wedding",
    price: "$1,450",
    per: "from",
    features: ["Full-day coverage (up to 10 hours)", "400+ edited images", "Second photographer", "Fine-art album included", "Engagement mini-session"],
    featured: true
  },
  {
    name: "Family Session",
    price: "$240",
    per: "per session",
    features: ["90 minutes, up to 8 people", "40 edited high-resolution images", "Private online gallery", "Print-ready files"],
    featured: false
  },
  {
    name: "Event Coverage",
    price: "$95",
    per: "per hour",
    features: ["Minimum 2 hours", "Edited images within 5 days", "Social-media sized copies", "On-site preview gallery"],
    featured: false
  }
];

var gallery = document.getElementById("gallery");
var resultsNote = document.getElementById("resultsNote");
var lightbox = document.getElementById("lightbox");
var lightboxPhoto = document.getElementById("lightboxPhoto");
var lightboxCaption = document.getElementById("lightboxCaption");
var currentFilter = "all";

function renderGallery() {
  gallery.innerHTML = "";
  var shown = PHOTOS.filter(function (p) {
    return currentFilter === "all" || p.cat === currentFilter;
  });
  shown.forEach(function (photo) {
    var item = document.createElement("button");
    item.className = "gallery-item";
    item.type = "button";
    item.setAttribute("aria-label", photo.title + " — open preview");
    item.innerHTML =
      '<span class="gallery-photo" style="background:' + photo.grad + '">' +
        '<span>' + photo.label + '</span>' +
      '</span>' +
      '<span class="gallery-caption"><strong>' + photo.title + '</strong>' +
      '<small>' + photo.desc + '</small></span>';
    item.addEventListener("click", function () { openLightbox(photo); });
    gallery.appendChild(item);
  });
  var label = currentFilter === "all" ? "all photos" : currentFilter;
  resultsNote.textContent = "Showing " + shown.length + " of " + PHOTOS.length + " " + label + ".";
}

function openLightbox(photo) {
  lightboxPhoto.style.background = photo.grad;
  lightboxCaption.textContent = photo.title + " — " + photo.desc;
  lightbox.hidden = false;
  document.getElementById("lightboxClose").focus();
}

function closeLightbox() {
  lightbox.hidden = true;
}

document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
});

document.querySelectorAll(".filter-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    currentFilter = btn.getAttribute("data-filter");
    renderGallery();
  });
});

var serviceGrid = document.getElementById("serviceGrid");
SERVICES.forEach(function (s) {
  var card = document.createElement("article");
  card.className = "service-card" + (s.featured ? " featured" : "");
  var badge = s.featured ? '<span class="badge">Most booked</span>' : "";
  var features = s.features.map(function (f) { return "<li>" + f + "</li>"; }).join("");
  card.innerHTML = badge +
    "<h3>" + s.name + "</h3>" +
    '<p class="price">' + s.price + " <small>" + s.per + "</small></p>" +
    "<ul>" + features + "</ul>" +
    '<a class="btn btn-primary" href="#booking">Book ' + s.name + "</a>";
  serviceGrid.appendChild(card);
});

renderGallery();

// Booking form
var bookingForm = document.getElementById("bookingForm");
var formError = document.getElementById("formError");
var formSuccess = document.getElementById("formSuccess");

bookingForm.addEventListener("submit", function (e) {
  e.preventDefault();
  formError.hidden = true;
  formSuccess.hidden = true;

  var name = bookingForm.elements["name"].value.trim();
  var email = bookingForm.elements["email"].value.trim();
  var type = bookingForm.elements["type"].value;
  var date = bookingForm.elements["date"].value;

  if (!name || !email || !type || !date) {
    formError.textContent = "Please fill in your name, email, session type and preferred date.";
    formError.hidden = false;
    return;
  }
  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    formError.textContent = "That email address doesn't look right — please check it.";
    formError.hidden = false;
    return;
  }

  var chosen = new Date(date + "T00:00:00");
  var readable = chosen.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  formSuccess.textContent = "Thank you, " + name + "! Your " + type.toLowerCase() +
    " request for " + readable + " has been received. We'll reply to " + email + " within one working day.";
  formSuccess.hidden = false;
  bookingForm.reset();
});

// Newsletter form
var newsletterForm = document.getElementById("newsletterForm");
var newsletterSuccess = document.getElementById("newsletterSuccess");
newsletterForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var email = document.getElementById("newsletterEmail").value.trim();
  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    newsletterSuccess.textContent = "Please enter a valid email address to subscribe.";
    newsletterSuccess.hidden = false;
    return;
  }
  newsletterSuccess.textContent = "You're in! Your first Photo of the Month will arrive soon.";
  newsletterSuccess.hidden = false;
  newsletterForm.reset();
});

// Mobile menu
var menuToggle = document.getElementById("menuToggle");
var mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", function () {
  var open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
});
mainNav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});
