const menu = [
  { name: "Espresso", desc: "Double shot, rich and smooth.", price: 3.00 },
  { name: "Flat White", desc: "Velvety milk, double ristretto.", price: 4.50 },
  { name: "Cappuccino", desc: "Espresso, steamed milk, foam.", price: 4.25 },
  { name: "Pour-Over", desc: "Single origin, brewed to order.", price: 5.00 },
  { name: "Cold Brew", desc: "Slow-steeped for 18 hours.", price: 4.75 },
  { name: "Mocha", desc: "Espresso, chocolate, steamed milk.", price: 5.25 },
  { name: "Chai Latte", desc: "Spiced black tea with milk.", price: 4.50 },
  { name: "Butter Croissant", desc: "Baked fresh every morning.", price: 3.50 }
];

const order = [];
const grid = document.getElementById("menuGrid");
const summary = document.getElementById("orderSummary");

menu.forEach((item) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "menu-item";
  btn.innerHTML = `<h3>${item.name}</h3><p>${item.desc}</p><span class="price">$${item.price.toFixed(2)}</span>`;
  btn.addEventListener("click", () => {
    order.push(item);
    const total = order.reduce((sum, i) => sum + i.price, 0);
    summary.textContent = `${order.length} item${order.length === 1 ? "" : "s"} · Total $${total.toFixed(2)} — ${order.map((i) => i.name).join(", ")}`;
  });
  grid.appendChild(btn);
});

document.getElementById("clearOrder").addEventListener("click", () => {
  order.length = 0;
  summary.textContent = "Your order is empty.";
});

document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("formNote").textContent = "Thanks — we'll get back to you soon.";
  e.target.reset();
});
