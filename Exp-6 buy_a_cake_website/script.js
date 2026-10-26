const cakes = [
  { id: 1, name: "Midnight Chocolate", category: "Chocolate", price: 699, rating: "4.9", description: "Rich chocolate sponge with silky ganache.", tag: "Bestseller", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80" },
  { id: 2, name: "Berry Blush", category: "Fruit", price: 849, rating: "4.8", description: "Vanilla cream, fresh berries and soft sponge.", tag: "Fresh favourite", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=80" },
  { id: 3, name: "Vanilla Cloud", category: "Celebration", price: 599, rating: "4.9", description: "Light vanilla layers with whipped buttercream.", tag: "Classic", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=700&q=80" },
  { id: 4, name: "Red Velvet Love", category: "Celebration", price: 799, rating: "4.8", description: "Velvety cocoa cake with cream cheese frosting.", tag: "For two", image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=700&q=80" },
  { id: 5, name: "Caramel Dream", category: "Chocolate", price: 749, rating: "4.7", description: "Chocolate cake layered with salted caramel.", tag: "Customer pick", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80" },
  { id: 6, name: "Mango Sunshine", category: "Fruit", price: 699, rating: "4.8", description: "A sunny mango mousse cake with fruit pieces.", tag: "Seasonal", image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=700&q=80" },
  { id: 7, name: "Confetti Party", category: "Celebration", price: 899, rating: "5.0", description: "Colourful sprinkles for your happiest day.", tag: "Party favourite", image: "https://images.unsplash.com/photo-1557979619-445218f326b9?auto=format&fit=crop&w=700&q=80" },
  { id: 8, name: "Strawberry Kiss", category: "Fruit", price: 749, rating: "4.9", description: "Fresh strawberry cream and delicate vanilla.", tag: "Made with love", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=80" }
];

const state = { category: "All", search: "", cart: [], selected: null };
const $ = (selector) => document.querySelector(selector);
const cakeGrid = $("#cakeGrid");
const customDialog = $("#customDialog");
const toast = $("#toast");
let toastTimer;

function formatPrice(price) { return "₹" + Math.round(price).toLocaleString("en-IN"); }
function renderCakes() {
  const visible = cakes.filter(c => (state.category === "All" || c.category === state.category) && (c.name + " " + c.description + " " + c.category).toLowerCase().includes(state.search.toLowerCase()));
  cakeGrid.innerHTML = visible.length ? visible.map(c => `
    <article class="cake-card">
      <div class="cake-photo"><img src="${c.image}" alt="${c.name}" loading="lazy"><span class="cake-tag">${c.tag}</span><button class="quick-add" data-add="${c.id}" aria-label="Customise ${c.name}">+</button></div>
      <div class="cake-info"><div class="cake-title-row"><h3>${c.name}</h3><span class="cake-price">${formatPrice(c.price)}</span></div><p class="cake-description">${c.description}</p><div class="cake-rating"><span>★★★★★</span> &nbsp;${c.rating} · ${c.category}</div></div>
    </article>`).join("") : `<div class="empty-state">No cakes found. Try another search or category.</div>`;
}
function showToast(message) {
  toast.textContent = message; toast.classList.add("show"); clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}
function openCart() {
  $("#cartDrawer").classList.add("open"); $("#overlay").classList.add("show");
  $("#cartDrawer").setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden";
}
function closeCart() {
  $("#cartDrawer").classList.remove("open"); $("#overlay").classList.remove("show");
  $("#cartDrawer").setAttribute("aria-hidden", "true"); document.body.style.overflow = "";
}
function openCustom(id) {
  state.selected = cakes.find(c => c.id === id);
  $("#selectedCake").innerHTML = `<img src="${state.selected.image}" alt=""><div><strong>${state.selected.name}</strong><small>From ${formatPrice(state.selected.price)}</small></div>`;
  $("#cakeSize").value = "1"; $("#cakeMessage").value = ""; $("#deliveryAddress").value = "";
  customDialog.showModal();
}
function renderCart() {
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  $("#cartCount").textContent = count; $("#drawerCount").textContent = `(${count})`;
  $("#subtotal").textContent = formatPrice(state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
  $("#cartItems").innerHTML = state.cart.length ? state.cart.map(item => `
    <div class="cart-item"><img src="${item.image}" alt="${item.name}"><div><h3>${item.name}</h3><p>${item.size} · ${item.message ? "Message: " + escapeHtml(item.message) : "No message"}</p><strong>${formatPrice(item.price)} × ${item.quantity}</strong></div><button class="remove-item" data-remove="${item.key}" aria-label="Remove ${item.name}">×</button></div>`).join("") : `<div class="cart-empty"><span>♡</span>Your bag is waiting for something sweet.<br>Explore our cakes and add your favourite.</div>`;
}
function escapeHtml(value) { return value.replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch])); }

$("#filters").addEventListener("click", e => {
  const button = e.target.closest("[data-category]"); if (!button) return;
  state.category = button.dataset.category;
  $("#filters").querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b === button)); renderCakes();
});
$("#searchInput").addEventListener("input", e => { state.search = e.target.value; renderCakes(); });
cakeGrid.addEventListener("click", e => { const button = e.target.closest("[data-add]"); if (button) openCustom(Number(button.dataset.add)); });
$("#customForm").addEventListener("submit", e => {
  e.preventDefault(); if (!state.selected) return;
  const size = $("#cakeSize"); const multiplier = Number(size.value);
  const sizeLabel = size.options[size.selectedIndex].text.split(" · ")[1];
  const item = { ...state.selected, key: Date.now(), price: Math.round(state.selected.price * multiplier), size: sizeLabel, message: $("#cakeMessage").value.trim(), address: $("#deliveryAddress").value.trim(), quantity: 1 };
  state.cart.push(item); renderCart(); customDialog.close(); showToast(`${item.name} added to your bag!`); openCart();
});
$("#cartButton").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#overlay").addEventListener("click", closeCart);
$("#cartItems").addEventListener("click", e => {
  const button = e.target.closest("[data-remove]"); if (!button) return;
  state.cart = state.cart.filter(item => String(item.key) !== button.dataset.remove); renderCart(); showToast("Cake removed from your bag.");
});
$("#closeDialog").addEventListener("click", () => customDialog.close());
$("#checkoutButton").addEventListener("click", () => {
  if (!state.cart.length) { showToast("Your bag is empty—pick a cake first."); return; }
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderRef = "BC" + Math.random().toString(36).slice(2, 8).toUpperCase();
  const lines = state.cart.map(i => `${i.name} (${i.size}) — ${formatPrice(i.price)}${i.message ? " | Message: " + i.message : ""}\nDeliver to: ${i.address}`).join("\n\n");
  const receipt = `ORDER SUMMARY ${orderRef}\n\n${lines}\n\nSubtotal: ${formatPrice(total)}\n\nDemo only: no payment has been taken.`;
  alert(receipt); showToast("Demo checkout complete. No payment was processed."); state.cart = []; renderCart(); closeCart();
});
$("#accountBtn").addEventListener("click", () => showToast("Account sign-in can be connected to a backend."));
$("#newsletterForm").addEventListener("submit", e => { e.preventDefault(); showToast("Thanks for subscribing!"); e.target.reset(); });
$("#menuToggle").addEventListener("click", () => {
  const nav = $("#mainNav"); const isOpen = nav.classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded", String(isOpen));
});
$("#mainNav").addEventListener("click", e => { if (e.target.closest("a")) { $("#mainNav").classList.remove("open"); $("#menuToggle").setAttribute("aria-expanded", "false"); } });
$("#year").textContent = new Date().getFullYear();
renderCakes(); renderCart();
