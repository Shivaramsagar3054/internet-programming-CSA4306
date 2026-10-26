const products = [
{id:1,name:"The Everyday Linen Shirt",category:"Women",type:"Casual wear",price:1890,oldPrice:2290,rating:4.8,reviews:124,tag:"BESTSELLER",sizes:["XS","S","M","L","XL"],color:"Oatmeal",image:"https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=85",desc:"An easy, breathable linen blend with a relaxed shape. Wear it tucked, loose, or layered over your favorite basics.",review:"The fabric feels beautiful and the fit is just right. — Ananya R."},
{id:2,name:"Weekend Denim Jacket",category:"Men",type:"Casual wear",price:2790,oldPrice:3290,rating:4.7,reviews:86,tag:"NEW",sizes:["S","M","L","XL","XXL"],color:"Indigo",image:"https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=85",desc:"A classic denim layer with a modern cut, sturdy stitching, and just the right amount of structure.",review:"My new go-to layer. Great quality for the price. — Rahul K."},
{id:3,name:"Soft Knit Everyday Dress",category:"Women",type:"Casual wear",price:2490,oldPrice:2990,rating:4.9,reviews:203,tag:"LOVED",sizes:["XS","S","M","L"],color:"Sage",image:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=85",desc:"Soft-touch knit meets a flattering, easy silhouette. A one-piece outfit for coffee dates, travel days, and everything between.",review:"So versatile — dressed up or down, it works every time. — Meera S."},
{id:4,name:"Minimal Leather Sneakers",category:"Men",type:"Footwear",price:3190,oldPrice:3790,rating:4.6,reviews:91,tag:"",sizes:["UK 6","UK 7","UK 8","UK 9","UK 10"],color:"Off-white",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",desc:"Clean lines, cushioned comfort, and a versatile finish that pairs with denim, chinos, or relaxed tailoring.",review:"Comfortable from day one and easy to style. — Arjun P."},
{id:5,name:"Little Explorer Hoodie",category:"Kids",type:"Casual wear",price:1190,oldPrice:1490,rating:4.8,reviews:62,tag:"",sizes:["2–3Y","4–5Y","6–7Y","8–9Y"],color:"Terracotta",image:"https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=85",desc:"A cozy, easy-care hoodie designed for little adventures. Soft on the skin and roomy enough to play in.",review:"Wash-friendly and very comfortable for my child. — Priya M."},
{id:6,name:"Everyday Crossbody Bag",category:"Accessories",type:"Accessories",price:1690,oldPrice:1990,rating:4.7,reviews:110,tag:"BESTSELLER",sizes:["One size"],color:"Caramel",image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=85",desc:"Your everyday essentials, beautifully organized. A compact crossbody with adjustable strap and clean hardware.",review:"Fits my essentials perfectly and looks premium. — Divya N."},
{id:7,name:"Tailored City Trousers",category:"Men",type:"Formal wear",price:2290,oldPrice:2790,rating:4.5,reviews:49,tag:"",sizes:["30","32","34","36","38"],color:"Charcoal",image:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=85",desc:"Smart, comfortable trousers with a refined taper. A polished essential for office days and special occasions.",review:"Sharp look and comfortable enough for a full workday. — Karan D."},
{id:8,name:"Weekend Canvas Tote",category:"Accessories",type:"Accessories",price:890,oldPrice:1090,rating:4.6,reviews:74,tag:"UNDER ₹1K",sizes:["One size"],color:"Natural",image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=85",desc:"A roomy canvas tote for market runs, campus days, and weekend plans. Lightweight, durable, and easy to carry.",review:"Surprisingly roomy and looks great. — Sneha T."},
{id:9,name:"Sunday Cotton Co-ord",category:"Women",type:"Casual wear",price:2990,oldPrice:3690,rating:4.8,reviews:135,tag:"TRENDING",sizes:["XS","S","M","L","XL"],color:"Cream",image:"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85",desc:"A coordinated cotton set that makes getting dressed feel effortless. Wear together or mix each piece into your wardrobe.",review:"The easiest outfit in my wardrobe. Love the fabric. — Isha V."},
{id:10,name:"Classic Everyday Backpack",category:"Accessories",type:"Accessories",price:2190,oldPrice:2590,rating:4.5,reviews:58,tag:"",sizes:["One size"],color:"Olive",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85",desc:"A thoughtfully designed backpack with useful compartments and comfortable straps for commutes and short trips.",review:"Good pockets and a comfortable fit. — Nikhil B."},
{id:11,name:"Mini Occasion Dress",category:"Kids",type:"Occasion wear",price:1590,oldPrice:1890,rating:4.7,reviews:44,tag:"",sizes:["2–3Y","4–5Y","6–7Y","8–9Y"],color:"Blush",image:"https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=85",desc:"A sweet occasion-ready dress with a comfortable lining and easy movement for parties and family celebrations.",review:"Lovely for celebrations and comfortable all day. — Kavya R."},
{id:12,name:"Everyday Sunglasses",category:"Accessories",type:"Accessories",price:1290,oldPrice:1590,rating:4.4,reviews:37,tag:"",sizes:["One size"],color:"Tortoiseshell",image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=85",desc:"A timeless frame with a modern edge. The finishing touch for sunny days and city strolls.",review:"Lightweight and flattering. — Tara P."}
];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const money = n => "₹" + n.toLocaleString("en-IN");
let activeCategory="All", searchTerm="", activeProduct=null, selectedSize="", authMode="login", toastTimer;
let cart = [], wishlist = [], orders = [], currentUser = null;
const productGrid=$("#productGrid"), overlay=$("#overlay"), toast=$("#toast");

function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2500)}
function setCategory(category){activeCategory=category;$$(".filter-chip").forEach(b=>b.classList.toggle("active",b.dataset.category===category));renderProducts();$("#shop").scrollIntoView({behavior:"smooth",block:"start"})}
function filteredProducts(){
 let list=products.filter(p=>(activeCategory==="All"||p.category===activeCategory)&&(`${p.name} ${p.category} ${p.type} ${p.color}`).toLowerCase().includes(searchTerm.toLowerCase()));
 const price=$("#priceFilter").value;
 if(price==="under1500")list=list.filter(p=>p.price<1500);
 if(price==="1500to3000")list=list.filter(p=>p.price>=1500&&p.price<=3000);
 if(price==="over3000")list=list.filter(p=>p.price>3000);
 const sort=$("#sortFilter").value;
 if(sort==="low")list.sort((a,b)=>a.price-b.price);
 if(sort==="high")list.sort((a,b)=>b.price-a.price);
 if(sort==="rating")list.sort((a,b)=>b.rating-a.rating);
 return list;
}
function renderProducts(){
 const list=filteredProducts();$("#resultsLabel").textContent=`${list.length} ${list.length===1?"piece":"pieces"}`;
 $("#emptyState").classList.toggle("hidden",list.length!==0);
 productGrid.innerHTML=list.map(p=>`<article class="product-card"><div class="product-image" data-details="${p.id}"><img src="${p.image}" alt="${p.name}" loading="lazy">${p.tag?`<span class="product-tag">${p.tag}</span>`:""}<button class="wish-btn ${wishlist.includes(p.id)?"active":""}" data-wish="${p.id}" aria-label="Save ${p.name}">${wishlist.includes(p.id)?"♥":"♡"}</button><button class="quick-add" data-quick="${p.id}">Quick add +</button></div><div class="product-info"><span class="product-category">${p.category} · ${p.type}</span><h3 data-details="${p.id}">${p.name}</h3><div class="product-meta"><div><span class="price">${money(p.price)}</span><span class="old-price">${money(p.oldPrice)}</span></div><span class="rating">★ ${p.rating} <span class="muted">(${p.reviews})</span></span></div></div></article>`).join("");
}
function openPanel(id){closeAll(false);overlay.classList.remove("hidden");$(id).classList.remove("hidden");document.body.style.overflow="hidden"}
function closeAll(reset=true){$$(".drawer,.modal").forEach(el=>el.classList.add("hidden"));overlay.classList.add("hidden");document.body.style.overflow="";if(reset)$("#searchStrip").classList.add("hidden")}
function togglePanel(id){if(!$(id).classList.contains("hidden"))closeAll();else openPanel(id)}
function addToCart(id,size){
 const p=products.find(x=>x.id===id);if(!p)return;
 if(p.sizes.length>1&&!size){openProduct(id);showToast("Choose a size to continue");return}
 const existing=cart.find(x=>x.id===id&&x.size===(size||p.sizes[0]));
 if(existing)existing.qty++;else cart.push({id,size:size||p.sizes[0],qty:1});
 updateCounts();renderCart();showToast(`${p.name} added to your bag`);
}
function updateCounts(){$("#cartCount").textContent=cart.reduce((n,x)=>n+x.qty,0);$("#wishCount").textContent=wishlist.length;$("#drawerCartCount").textContent=`(${cart.reduce((n,x)=>n+x.qty,0)})`}
function renderCart(){
 const el=$("#cartItems");
 if(!cart.length){el.innerHTML='<div class="empty-drawer">Your bag is waiting for something lovely.<br><br><a href="#shop" data-close>Explore the collection ↗</a></div>';}
 else el.innerHTML=cart.map(item=>{const p=products.find(x=>x.id===item.id);return `<div class="cart-row"><img src="${p.image}" alt="${p.name}"><div><h3>${p.name}</h3><p>Size: ${item.size} · ${p.color}</p><span class="price">${money(p.price)}</span><div class="qty-control"><button data-qty="${p.id}|${item.size}|-1" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button data-qty="${p.id}|${item.size}|1" aria-label="Increase quantity">+</button></div></div><button class="remove-btn" data-remove="${p.id}|${item.size}">Remove</button></div>`}).join("");
 $("#cartSubtotal").textContent=money(cart.reduce((sum,item)=>sum+products.find(p=>p.id===item.id).price*item.qty,0));
}
function renderWishlist(){
 const el=$("#wishlistItems");
 if(!wishlist.length){el.innerHTML='<div class="empty-drawer">Your wishlist is a blank canvas.<br><br>Save pieces you love to build your style moodboard.</div>';return}
 el.innerHTML=wishlist.map(id=>{const p=products.find(x=>x.id===id);return `<div class="saved-row"><img src="${p.image}" alt="${p.name}"><div><h3>${p.name}</h3><p>${p.category} · ${p.color}</p><span class="price">${money(p.price)}</span><br><button data-quick="${p.id}">Add to bag</button> <button data-wish="${p.id}">Remove</button></div></div>`}).join("");
}
function toggleWish(id){wishlist=wishlist.includes(id)?wishlist.filter(x=>x!==id):[...wishlist,id];updateCounts();renderProducts();renderWishlist();showToast(wishlist.includes(id)?"Saved to your wishlist":"Removed from wishlist")}
function openProduct(id){const p=products.find(x=>x.id===id);if(!p)return;activeProduct=p;selectedSize=p.sizes[0];$("#productModalContent").innerHTML=`<div class="product-detail"><img src="${p.image}" alt="${p.name}"><div class="product-detail-copy"><p class="eyebrow">${p.category.toUpperCase()} · ${p.type.toUpperCase()}</p><h2>${p.name}</h2><div class="rating">★ ${p.rating} <span class="muted">(${p.reviews} reviews)</span></div><div class="detail-price">${money(p.price)} <span class="old-price">${money(p.oldPrice)}</span></div><p class="detail-desc">${p.desc}</p><p class="tiny"><strong>Color:</strong> ${p.color}</p><p class="tiny"><strong>Choose your size</strong></p><div class="size-row">${p.sizes.map((s,i)=>`<button class="size-option ${i===0?"active":""}" data-size="${s}">${s}</button>`).join("")}</div><a class="size-guide" id="sizeGuide">Size guide ↗</a><button class="primary-btn full" id="detailAdd">Add to bag — ${money(p.price)} <span>→</span></button><div class="review-box"><strong>★★★★★ Customer note</strong><br>“${p.review}”</div><p class="tiny muted">Free shipping over ₹1,999 · Easy 14-day returns</p></div></div>`;openPanel("productModal")}
function openAccount(){authMode="login";setAuthMode();$("#authMessage").textContent=currentUser?`Signed in as ${currentUser.email} (demo).`:"Demo account only. Do not enter a real password.";openPanel("accountModal")}
function setAuthMode(){ $$(".auth-tabs button").forEach(b=>b.classList.toggle("active",b.dataset.auth===authMode));$("#nameLabel").classList.toggle("hidden",authMode!=="register");$("#accountName").required=authMode==="register";$("#authSubmit").innerHTML=(authMode==="login"?"Log in":"Create account")+' <span>→</span>'; }
function openCheckout(){if(!cart.length){showToast("Your bag is empty");return}closeAll(false);const subtotal=cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0);$("#checkoutSummary").innerHTML=`${cart.reduce((n,i)=>n+i.qty,0)} item(s) · Subtotal <strong>${money(subtotal)}</strong><br><span class="muted">Demo order · no payment will be collected.</span>`;$("#checkoutName").value=currentUser?.name||"";$("#checkoutEmail").value=currentUser?.email||"";openPanel("checkoutModal")}
function openOrders(){closeAll(false);$("#ordersContent").innerHTML=orders.length?orders.map(o=>`<div class="order-card"><h3>Order ${o.id}</h3><span class="status-pill">${o.status}</span><p>Placed: ${o.date}<br>Items: ${o.items}<br>Total: ${money(o.total)}<br>Delivery: ${o.address}</p></div>`).join(""):'<div class="empty-drawer">No orders yet.<br>Your next favorite is waiting.</div>';openPanel("ordersModal")}

productGrid.addEventListener("click",e=>{
 const wish=e.target.closest("[data-wish]");if(wish){e.stopPropagation();toggleWish(Number(wish.dataset.wish));return}
 const quick=e.target.closest("[data-quick]");if(quick){e.stopPropagation();const p=products.find(x=>x.id===Number(quick.dataset.quick));addToCart(p.id,p.sizes[0]);return}
 const detail=e.target.closest("[data-details]")||e.target.closest(".product-image");if(detail){const id=Number(detail.dataset.details||detail.closest(".product-image")?.dataset.details);if(id)openProduct(id)}
});
document.addEventListener("click",e=>{
 const cat=e.target.closest("[data-category]");if(cat&&cat.dataset.category){setCategory(cat.dataset.category);return}
 const nav=e.target.closest("[data-nav-category]");if(nav){setCategory(nav.dataset.navCategory);return}
 const qty=e.target.closest("[data-qty]");if(qty){const [id,size,delta]=qty.dataset.qty.split("|");const item=cart.find(x=>x.id===Number(id)&&x.size===size);if(item){item.qty+=Number(delta);if(item.qty<=0)cart=cart.filter(x=>x!==item);updateCounts();renderCart()}return}
 const remove=e.target.closest("[data-remove]");if(remove){const [id,size]=remove.dataset.remove.split("|");cart=cart.filter(x=>!(x.id===Number(id)&&x.size===size));updateCounts();renderCart();return}
 const wish=e.target.closest("[data-wish]");if(wish){toggleWish(Number(wish.dataset.wish));return}
 const quick=e.target.closest("[data-quick]");if(quick){const p=products.find(x=>x.id===Number(quick.dataset.quick));addToCart(p.id,p.sizes[0]);return}
 const size=e.target.closest("[data-size]");if(size){selectedSize=size.dataset.size;$$("[data-size]").forEach(b=>b.classList.toggle("active",b.dataset.size===selectedSize));return}
 if(e.target.closest("[data-close]")){closeAll();return}
 if(e.target===overlay)closeAll();
 if(e.target.closest("#detailAdd")&&activeProduct){addToCart(activeProduct.id,selectedSize);closeAll();return}
 if(e.target.closest("#sizeGuide")){showToast("Size guide: XS/S = 32–36, M/L = 38–42, XL = 44–46. Check product label for exact fit.");return}
 if(e.target.closest("#returnsLink")){e.preventDefault();showToast("Demo policy: request a return or exchange within 14 days of delivery.");return}
 if(e.target.closest("#contactLink")){e.preventDefault();showToast("Demo contact: hello@stylehub.example");return}
});
$("#cartToggle").addEventListener("click",()=>{renderCart();togglePanel("cartDrawer")});
$("#wishlistToggle").addEventListener("click",()=>{renderWishlist();togglePanel("wishlistDrawer")});
$("#accountBtn").addEventListener("click",()=>{openAccount()});
$("#searchToggle").addEventListener("click",()=>{$("#searchStrip").classList.toggle("hidden");if(!$("#searchStrip").classList.contains("hidden"))$("#searchInput").focus()});
function doSearch(){searchTerm=$("#searchInput").value.trim();renderProducts();$("#shop").scrollIntoView({behavior:"smooth"})}
$("#searchSubmit").addEventListener("click",doSearch);$("#searchInput").addEventListener("keydown",e=>{if(e.key==="Enter")doSearch()});
$("#categoryFilters").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(b)setCategory(b.dataset.category)});
$("#priceFilter").addEventListener("change",renderProducts);$("#sortFilter").addEventListener("change",renderProducts);
$("#saleShopBtn").addEventListener("click",()=>{activeCategory="All";searchTerm="";$("#searchInput").value="";$("#priceFilter").value="all";renderProducts()});
$("#checkoutBtn").addEventListener("click",openCheckout);
$$("[data-auth]").forEach(b=>b.addEventListener("click",()=>{authMode=b.dataset.auth;setAuthMode()}));
$("#accountForm").addEventListener("submit",e=>{e.preventDefault();currentUser={name:authMode==="register"?$("#accountName").value.trim():"",email:$("#accountEmail").value.trim()};$("#authMessage").textContent=`${authMode==="login"?"Logged in":"Account created"} for ${currentUser.email} (demo only).`;showToast(authMode==="login"?"Demo login successful":"Demo account created");setTimeout(closeAll,650)});
$("#checkoutForm").addEventListener("submit",e=>{e.preventDefault();const total=cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0);const items=cart.map(i=>`${products.find(p=>p.id===i.id).name} (${i.size}) ×${i.qty}`).join(", ");const order={id:"SH"+Date.now().toString().slice(-7),date:new Date().toLocaleDateString("en-IN"),items,total,address:$("#checkoutAddress").value.trim(),status:"Order confirmed"};orders.unshift(order);currentUser={name:$("#checkoutName").value.trim(),email:$("#checkoutEmail").value.trim()};cart=[];updateCounts();renderCart();closeAll();showToast(`Order ${order.id} placed! Demo confirmation saved.`);setTimeout(openOrders,700)});
$("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();$("#newsletterMessage").textContent=`You're on the list! Demo signup for ${$("#newsletterEmail").value}.`;showToast("Thanks for joining the Style Letter!")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeAll()});
renderProducts();renderCart();renderWishlist();updateCounts();
