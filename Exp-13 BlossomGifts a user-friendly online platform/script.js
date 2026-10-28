const products = [
 {id:1,name:"Blushing Rose Bouquet",category:"Flowers",price:1299,oldPrice:1599,emoji:"💐",art:"flowers",badge:"BESTSELLER",desc:"A dreamy bunch of fresh pink roses.",occasions:["Anniversary","Birthday","Just because"]},
 {id:2,name:"Sunshine Gift Basket",category:"Gift baskets",price:1899,oldPrice:2199,emoji:"🧺",art:"basket",badge:"POPULAR",desc:"A cheerful basket filled with little treats.",occasions:["Birthday","Thank you"]},
 {id:3,name:"Personalised Memory Box",category:"Personalized",price:999,oldPrice:0,emoji:"🎁",art:"personalized",badge:"MAKE IT YOURS",desc:"A keepsake box personalised for someone special.",occasions:["Anniversary","Birthday","Thank you"]},
 {id:4,name:"Strawberry Celebration Cake",category:"Cakes",price:1499,oldPrice:1699,emoji:"🎂",art:"cakes",badge:"FRESHLY MADE",desc:"A soft, sweet cake for a memorable moment.",occasions:["Birthday","Anniversary"]},
 {id:5,name:"Little Garden Plant Set",category:"Plants",price:799,oldPrice:999,emoji:"🪴",art:"plants",badge:"THOUGHTFUL PICK",desc:"Easy-care plants to brighten any space.",occasions:["Thank you","Just because"]},
 {id:6,name:"Classic Red Roses",category:"Flowers",price:1599,oldPrice:0,emoji:"🌹",art:"flowers",badge:"TIMELESS",desc:"A classic bouquet that says it all.",occasions:["Anniversary","Just because"]},
 {id:7,name:"Sweet Treats Hamper",category:"Gift baskets",price:1699,oldPrice:1899,emoji:"🍫",art:"basket",badge:"GIFT FAVOURITE",desc:"A delicious assortment for a happy day.",occasions:["Birthday","Thank you"]},
 {id:8,name:"Custom Photo Mug",category:"Personalized",price:599,oldPrice:0,emoji:"☕",art:"personalized",badge:"PERSONALISED",desc:"Make their morning with a favourite photo.",occasions:["Birthday","Thank you","Just because"]}
];
let cart = [];
let currentCategory = "All";
let currentSearch = "";
let currentOccasion = "";
let favorites = new Set();
let adminMode = false;
let nextId = 9;
let toastTimer;
const $ = s => document.querySelector(s);
const money = n => "₹" + Number(n).toLocaleString("en-IN");
const esc = v => String(v ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function notify(message){const t=$("#toast");t.textContent=message;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2600);}
function renderProducts(){
 let list=products.filter(p=>(currentCategory==="All"||currentCategory==="Occasions"||p.category===currentCategory)&&(!currentSearch||`${p.name} ${p.category} ${p.desc}`.toLowerCase().includes(currentSearch))&&(!currentOccasion||p.occasions.includes(currentOccasion)));
 const sort=$("#sortSelect").value;
 if(sort==="low")list.sort((a,b)=>a.price-b.price);else if(sort==="high")list.sort((a,b)=>b.price-a.price);else if(sort==="name")list.sort((a,b)=>a.name.localeCompare(b.name));
 $("#productHeading").textContent=currentOccasion?`${currentOccasion} favourites`:currentCategory==="All"?"Loved by everyone":currentCategory;
 $("#productGrid").innerHTML=list.map(p=>`<article class="product-card"><div class="product-art art-${p.art}"><span class="art-extra one">✿</span><span class="art-extra two">✧</span><span class="big-emoji">${p.emoji}</span><span class="product-badge">${esc(p.badge)}</span><button class="wishlist ${favorites.has(p.id)?"liked":""}" data-fav="${p.id}" aria-label="Add ${esc(p.name)} to wishlist">${favorites.has(p.id)?"♥":"♡"}</button></div><div class="product-info"><div class="product-category">${esc(p.category)}</div><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p><div class="product-bottom"><div class="price">${money(p.price)} ${p.oldPrice?`<span class="old-price">${money(p.oldPrice)}</span>`:""}</div><button class="add-button" data-add="${p.id}">＋ Add to cart</button></div></div></article>`).join("");
 $("#emptyState").hidden=!!list.length;
 $("#productGrid").hidden=!list.length;
 $("#productGrid").querySelectorAll("[data-add]").forEach(b=>b.addEventListener("click",()=>addToCart(Number(b.dataset.add))));
 $("#productGrid").querySelectorAll("[data-fav]").forEach(b=>b.addEventListener("click",()=>toggleFavorite(Number(b.dataset.fav))));
}
function selectCategory(category){
 currentCategory=category;currentOccasion="";
 document.querySelectorAll(".nav-link[data-category]").forEach(b=>b.classList.toggle("active",b.dataset.category===category));
 renderProducts();$("#products").scrollIntoView({behavior:"smooth",block:"start"});
}
function addToCart(id){const p=products.find(x=>x.id===id);const line=cart.find(x=>x.id===id);if(line)line.qty++;else cart.push({id,qty:1});updateCartCount();notify(`${p.name} added to your cart.`);}
function updateCartCount(){$("#cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);}
function toggleFavorite(id){if(favorites.has(id)){favorites.delete(id);notify("Removed from your favourites.");}else{favorites.add(id);notify("Saved to your favourites.");}renderProducts();}
function openModal(title,content,footer=""){
 $("#modalTitle").textContent=title;$("#modalContent").innerHTML=content;$("#modalFooter").innerHTML=footer;$("#modal").showModal();
}
function cartModal(){
 const items=cart.map(line=>({...line,product:products.find(p=>p.id===line.id)}));
 const total=items.reduce((s,x)=>s+x.product.price*x.qty,0);
 const content=items.length?`<div class="modal-list">${items.map(x=>`<div class="cart-line"><div class="cart-emoji">${x.product.emoji}</div><div class="cart-line-info"><strong>${esc(x.product.name)}</strong><small>${money(x.product.price)} each</small></div><div class="qty"><button data-qty="${x.id}" data-delta="-1">−</button><span>${x.qty}</span><button data-qty="${x.id}" data-delta="1">+</button></div></div>`).join("")}</div><div class="cart-total"><span>Subtotal</span><span>${money(total)}</span></div><p style="font-size:10px;color:#97888e">Delivery and payment are demonstrated only; checkout is not connected to a payment gateway.</p>`:`<div style="text-align:center;padding:30px 10px"><div style="font-size:42px">🧺</div><h3>Your cart is waiting for a little joy</h3><p style="color:#97888e">Add a gift and it will appear here.</p></div>`;
 const footer=items.length?`<button type="button" id="continueShopping">Keep shopping</button><button type="button" class="btn-primary" id="checkoutButton">Continue to checkout →</button>`:`<button type="button" id="continueShopping">Explore gifts</button>`;
 openModal("Your basket",content,footer);
 $("#modalContent").querySelectorAll("[data-qty]").forEach(b=>b.addEventListener("click",()=>{const id=Number(b.dataset.qty),delta=Number(b.dataset.delta),line=cart.find(x=>x.id===id);line.qty+=delta;if(line.qty<=0)cart=cart.filter(x=>x.id!==id);updateCartCount();cartModal();}));
 $("#continueShopping").addEventListener("click",()=>$("#modal").close());
 if($("#checkoutButton"))$("#checkoutButton").addEventListener("click",checkoutModal);
}
function checkoutModal(){
 const total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);
 openModal("Delivery details",`<p style="color:#97888e;font-size:11px;line-height:1.7">Tell us where to send your thoughtful gift. This demo does not save personal details or process payments.</p><div class="form-grid"><div class="field"><label for="recipient">Recipient name</label><input id="recipient" required placeholder="Full name"></div><div class="field"><label for="phone">Mobile number</label><input id="phone" required type="tel" placeholder="+91 98765 00000"></div><div class="field full"><label for="address">Delivery address</label><textarea id="address" required rows="2" placeholder="House, street, city and PIN code"></textarea></div><div class="field"><label for="deliveryDate">Delivery date</label><input id="deliveryDate" type="date" required></div><div class="field"><label for="deliveryTime">Preferred time</label><select id="deliveryTime"><option>Morning (9 AM–12 PM)</option><option>Afternoon (12 PM–4 PM)</option><option>Evening (4 PM–8 PM)</option></select></div><div class="field full"><label for="payment">Payment method (demo)</label><select id="payment"><option>UPI (demo)</option><option>Credit / debit card (demo)</option><option>Cash on delivery (demo)</option></select></div></div><div class="cart-total"><span>Order total</span><span>${money(total)}</span></div>`,`<button type="button" id="backToCart">Back</button><button type="button" class="btn-primary" id="placeOrder">Place demo order</button>`);
 $("#backToCart").addEventListener("click",cartModal);
 $("#placeOrder").addEventListener("click",()=>{if(!$("#recipient").value.trim()||!$("#phone").value.trim()||!$("#address").value.trim()||!$("#deliveryDate").value){notify("Please complete all required delivery details.");return;}const orderId="BG"+Math.floor(100000+Math.random()*900000);cart=[];updateCartCount();$("#modal").close();openModal("Your gift is on its way 🌷",`<div style="text-align:center;padding:20px 8px"><div style="font-size:48px">💐</div><h3 style="font:600 23px 'Playfair Display',serif">Thank you for choosing BlossomGifts!</h3><p style="color:#92848a;line-height:1.8">Your demo order <strong>${orderId}</strong> has been created on this page. No real payment or delivery has been initiated.</p></div>`,`<button type="button" id="doneButton" class="btn-primary">Continue shopping</button>`);$("#doneButton").addEventListener("click",()=>{$("#modal").close();});});
}
function openAccount(){
 openModal("Welcome to BlossomGifts",`<p style="font-size:11px;color:#92848a;line-height:1.7">Sign in or create a demo account to continue. Authentication is not connected to a server.</p><div class="form-grid"><div class="field full"><label for="accountEmail">Email address</label><input id="accountEmail" type="email" placeholder="you@example.com" required></div><div class="field full"><label for="accountPassword">Password</label><input id="accountPassword" type="password" placeholder="Enter any demo password" required></div></div>`,`<button type="button" id="registerDemo">Create account</button><button type="button" class="btn-primary" id="loginDemo">Sign in</button>`);
 $("#loginDemo").addEventListener("click",()=>{if(!$("#accountEmail").value||!$("#accountPassword").value){notify("Enter an email and password for the demo.");return;}$("#modal").close();notify("Demo sign-in complete. No credentials were saved.");});
 $("#registerDemo").addEventListener("click",()=>{if(!$("#accountEmail").value||!$("#accountPassword").value){notify("Enter an email and password to register in the demo.");return;}$("#modal").close();notify("Demo account created for this session only.");});
}
function adminPanel(){
 const rows=products.map(p=>`<tr><td>${esc(p.name)}</td><td>${esc(p.category)}</td><td>${money(p.price)}</td><td><button data-edit="${p.id}">Edit price</button> <button data-delete="${p.id}">Remove</button></td></tr>`).join("");
 openModal("Admin product management",`<p style="font-size:11px;color:#92848a;line-height:1.7">Manage product listings in this browser session. Changes are not saved to a database.</p><table class="admin-table"><thead><tr><th>PRODUCT</th><th>CATEGORY</th><th>PRICE</th><th>ACTIONS</th></tr></thead><tbody>${rows}</tbody></table>`,`<button type="button" id="addProduct">＋ Add product</button><button type="button" class="btn-primary" id="closeAdmin">Done</button>`);
 $("#modalContent").querySelectorAll("[data-edit]").forEach(b=>b.addEventListener("click",()=>{const p=products.find(x=>x.id===Number(b.dataset.edit));const value=prompt(`Enter new price for ${p.name}:`,p.price);if(value===null)return;if(value.trim()===""||!Number.isFinite(Number(value))||Number(value)<0){notify("Please enter a valid price.");return;}p.price=Number(value);adminPanel();renderProducts();notify("Product price updated for this session.");}));
 $("#modalContent").querySelectorAll("[data-delete]").forEach(b=>b.addEventListener("click",()=>{const p=products.find(x=>x.id===Number(b.dataset.delete));if(confirm(`Remove ${p.name} from the demo catalogue?`)){products.splice(products.indexOf(p),1);adminPanel();renderProducts();notify("Product removed from this session.");}}));
 $("#addProduct").addEventListener("click",addProductForm);
 $("#closeAdmin").addEventListener("click",()=>$("#modal").close());
}
function addProductForm(){
 openModal("Add a new gift",`<div class="form-grid"><div class="field full"><label for="newName">Product name</label><input id="newName" required placeholder="e.g. Garden Rose Bundle"></div><div class="field"><label for="newCategory">Category</label><select id="newCategory"><option>Flowers</option><option>Gift baskets</option><option>Personalized</option><option>Cakes</option><option>Plants</option></select></div><div class="field"><label for="newPrice">Price (₹)</label><input id="newPrice" type="number" min="0" required placeholder="999"></div><div class="field"><label for="newEmoji">Product emoji</label><input id="newEmoji" value="🎁" required></div><div class="field"><label for="newBadge">Badge</label><input id="newBadge" value="NEW"></div><div class="field full"><label for="newDesc">Description</label><input id="newDesc" placeholder="A thoughtful gift for someone special"></div></div>`,`<button type="button" id="cancelAdd">Cancel</button><button type="button" class="btn-primary" id="saveProduct">Add product</button>`);
 $("#cancelAdd").addEventListener("click",adminPanel);
 $("#saveProduct").addEventListener("click",()=>{const name=$("#newName").value.trim(),price=$("#newPrice").value,category=$("#newCategory").value;if(!name||price===""||Number(price)<0){notify("Enter a product name and valid price.");return;}products.unshift({id:nextId++,name,category,price:Number(price),oldPrice:0,emoji:$("#newEmoji").value||"🎁",art:({"Flowers":"flowers","Gift baskets":"basket","Personalized":"personalized","Cakes":"cakes","Plants":"plants"})[category],badge:$("#newBadge").value||"NEW",desc:$("#newDesc").value||"A thoughtful gift for someone special.",occasions:["Birthday","Thank you"]});adminPanel();renderProducts();notify("New product added to this session.");});
}
document.querySelectorAll(".nav-link[data-category],.category-card").forEach(b=>b.addEventListener("click",()=>selectCategory(b.dataset.category)));
$("#searchForm").addEventListener("submit",e=>{e.preventDefault();currentSearch=$("#searchInput").value.toLowerCase().trim();currentCategory="All";currentOccasion="";document.querySelectorAll(".nav-link[data-category]").forEach(b=>b.classList.toggle("active",b.dataset.category==="All"));renderProducts();$("#products").scrollIntoView({behavior:"smooth"});});
$("#sortSelect").addEventListener("change",renderProducts);
$("#resetFilters").addEventListener("click",()=>{currentCategory="All";currentSearch="";currentOccasion="";$("#searchInput").value="";$("#sortSelect").value="featured";document.querySelectorAll(".nav-link[data-category]").forEach(b=>b.classList.toggle("active",b.dataset.category==="All"));renderProducts();});
$("#showAll").addEventListener("click",()=>$("#resetFilters").click());
document.querySelectorAll("[data-occasion]").forEach(b=>b.addEventListener("click",()=>{currentOccasion=b.dataset.occasion;currentCategory="All";currentSearch="";$("#searchInput").value="";renderProducts();$("#products").scrollIntoView({behavior:"smooth"});}));
$("#shopNow").addEventListener("click",()=>{selectCategory("All");});
$("#occasionButton").addEventListener("click",()=>$("#occasions").scrollIntoView({behavior:"smooth"}));
$("#cartButton").addEventListener("click",cartModal);
$("#accountButton").addEventListener("click",openAccount);
$("#adminNav").addEventListener("click",adminPanel);
$("#closeModal").addEventListener("click",()=>$("#modal").close());
$("#modal").addEventListener("click",e=>{if(e.target===$("#modal"))$("#modal").close();});
renderProducts();
