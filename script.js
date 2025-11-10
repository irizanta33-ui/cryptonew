
// script.js — logic for Crypto Intro Website (HTML version)
// Includes: dark mode toggle, mock crypto price simulator, and simple chart drawing.

// Dark mode toggle
const toggleBtn = document.getElementById("toggle-theme");
const html = document.documentElement;
let dark = localStorage.getItem("dark-mode") === "true";

function applyTheme() {
  if (dark) html.classList.add("dark");
  else html.classList.remove("dark");
  localStorage.setItem("dark-mode", dark);
}
applyTheme();

toggleBtn?.addEventListener("click", () => {
  dark = !dark;
  applyTheme();
  toggleBtn.textContent = dark ? "Light" : "Dark";
});

// Simple mock BTC price generator
let price = 30000;
const priceEl = document.getElementById("price-value");
const worthEl = document.getElementById("net-worth");
let cash = 10000;
let owned = 0;

function updateUI() {
  priceEl.textContent = `$${price.toLocaleString()}`;
  const worth = (cash + owned * price).toFixed(2);
  worthEl.textContent = `$${Number(worth).toLocaleString()}`;
}

function randomWalk() {
  const move = (Math.random() - 0.48) * price * 0.01; // +/-1%
  price = Math.max(1, price + move);
  updateUI();
}

setInterval(randomWalk, 1500);

// Buy/sell buttons
document.getElementById("buy100").addEventListener("click", () => buy(100));
document.getElementById("buy1000").addEventListener("click", () => buy(1000));
document.getElementById("sell25").addEventListener("click", () => sell(0.25));
document.getElementById("sellAll").addEventListener("click", () => sell(1));

function buy(amountUSD) {
  const canBuy = Math.min(amountUSD, cash);
  const qty = canBuy / price;
  owned += qty;
  cash -= canBuy;
  updateUI();
}

function sell(percent) {
  const sellQty = owned * percent;
  const proceeds = sellQty * price;
  owned -= sellQty;
  cash += proceeds;
  updateUI();
}

updateUI();
