const products=[
{id:"p1",name:"Nova X Pro Smartphone",category:"Phones",price:64999,oldPrice:69999,rating:4.8,tag:"Best seller",description:"A vivid display, fast performance, and a versatile camera system for everyday creativity.",image:"https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=600&q=80"},
{id:"p2",name:"AirLite Ultrabook 14",category:"Laptops",price:74999,oldPrice:82999,rating:4.9,tag:"Save ₹8,000",description:"A lightweight everyday laptop for focused work, study, and creative projects.",image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80"},
{id:"p3",name:"TabView 11 Tablet",category:"Tablets",price:32999,oldPrice:35999,rating:4.6,tag:"Popular",description:"A bright tablet display for reading, streaming, sketching, and staying productive.",image:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80"},
{id:"p4",name:"Sonic Wireless Headphones",category:"Accessories",price:5999,oldPrice:7499,rating:4.7,tag:"Hot deal",description:"Comfortable over-ear headphones with rich sound for work, travel, and downtime.",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"},
{id:"p5",name:"Pulse Smartwatch",category:"Accessories",price:8999,oldPrice:9999,rating:4.5,tag:"New",description:"A clean everyday smartwatch design with useful activity and notification features.",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"},
{id:"p6",name:"CreatorBook Pro 16",category:"Laptops",price:119999,oldPrice:129999,rating:4.9,tag:"Pro pick",description:"A powerful laptop concept for multitasking, content creation, and demanding projects.",image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"},
{id:"p7",name:"Mini Bluetooth Speaker",category:"Accessories",price:2499,oldPrice:2999,rating:4.4,tag:"Budget pick",description:"Compact portable audio for your desk, room, or weekend getaway.",image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80"},
{id:"p8",name:"PocketCam Action Camera",category:"Accessories",price:14999,oldPrice:16999,rating:4.6,tag:"Adventure",description:"A compact camera concept for capturing trips, outdoor moments, and everyday action.",image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80"},
{id:"p9",name:"Nova X Smartphone",category:"Phones",price:39999,oldPrice:44999,rating:4.5,tag:"Great value",description:"A balanced smartphone pick with a stylish finish and an all-day everyday feel.",image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"},
{id:"p10",name:"ReadEasy E-Tablet",category:"Tablets",price:18999,oldPrice:21999,rating:4.3,tag:"Everyday",description:"A versatile screen for digital notes, casual reading, and entertainment.",image:"https://images.unsplash.com/photo-1561154643-7a9d7e6e1a7d?auto=format&fit=crop&w=600&q=80"},
{id:"p11",name:"Mechanical Keyboard",category:"Accessories",price:4299,oldPrice:4999,rating:4.7,tag:"Desk upgrade",description:"A satisfying keyboard for a tidier, more comfortable desk setup.",image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80"},
{id:"p12",name:"Studio Wireless Earbuds",category:"Accessories",price:3499,oldPrice:4299,rating:4.6,tag:"Staff pick",description:"Small wireless earbuds for commutes, calls, and playlists on the move.",image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=600&q=80"}
];
const $=s=>document.querySelector(s);
const state={category:"All",search:"",sort:"featured",cart:[],wishlist:[],orders:[],selectedProduct:null,drawerMode:"cart"};
const money=n=>"₹"+Math.round(n).toLocaleString("en-IN");
const toast=$("#toast");
let toastTimer;
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function getProduct(id){return products.find(p=>p.id===id);}
function renderProducts(){
 let list=products.filter(p=>(state.category==="All"||p.category===state.category)&&(p.name+" "+p.category+" "+p.description).toLowerCase().includes(state.search.toLowerCase()));
 if(state.sort==="priceLow")list.sort((a,b)=>a.price-b.price);
 if(state.sort==="priceHigh")list.sort((a,b)=>b.price-a.price);
 if(state.sort==="rating")list.sort((a,b)=>b.rating-a.rating);
 $("#productGrid").innerHTML=list.length?list.map(p=>`<article class="product-card"><div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-tag">${p.tag}</span><button class="wish-btn ${state.wishlist.includes(p.id)?"active":""}" data-wish="${p.id}" aria-label="Add ${p.name} to wishlist">${state.wishlist.includes(p.id)?"♥":"♡"}</button></div><div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><p>${p.description}</p><div class="product-rating"><span>★★★★★</span> &nbsp;${p.rating.toFixed(1)} / 5</div><div class="product-price-row"><strong class="product-price">${money(p.price)}</strong><span class="old-price">${money(p.oldPrice)}</span><span class="discount">${Math.round((1-p.price/p.oldPrice)*100)}% off</span></div><div class="product-actions"><button data-add="${p.id}">Add to cart</button><button class="details" data-details="${p.id}">Details</button></div></div></article>`).join(""):'<div class="empty-products">No products found. Try a different search or category.</div>';
}
function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2600);}
function updateCounts(){
 $("#cartCount").textContent=state.cart.reduce((n,i)=>n+i.quantity,0);
 $("#wishCount").textContent=state.wishlist.length;
}
function openDrawer(mode){
 state.drawerMode=mode;
 $("#drawer").classList.add("open");$("#overlay").classList.add("show");$("#drawer").setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
 renderDrawer();
}
function closeDrawer(){$("#drawer").classList.remove("open");$("#overlay").classList.remove("show");$("#drawer").setAttribute("aria-hidden","true");document.body.style.overflow="";}
function renderDrawer(){
 const isCart=state.drawerMode==="cart";
 $("#drawerEyebrow").textContent=isCart?"YOUR PICKS":"SAVED FOR LATER";
 $("#drawerTitle").innerHTML=isCart?`Your cart <span>(${state.cart.reduce((n,i)=>n+i.quantity,0)})</span>`:"Your wishlist";
 $("#drawerFooter").classList.toggle("hidden",!isCart);
 if(isCart){
   $("#subtotal").textContent=money(state.cart.reduce((n,i)=>n+i.price*i.quantity,0));
   $("#drawerBody").innerHTML=state.cart.length?state.cart.map(i=>`<div class="cart-item"><img src="${i.image}" alt="${i.name}"><div><h3>${i.name}</h3><p>${i.category}</p><strong>${money(i.price*i.quantity)}</strong><div class="quantity-controls"><button data-qty="${i.id}" data-change="-1" aria-label="Decrease quantity">−</button><span>${i.quantity}</span><button data-qty="${i.id}" data-change="1" aria-label="Increase quantity">+</button></div></div><button class="remove-item" data-remove="${i.id}" aria-label="Remove item">×</button></div>`).join(""):'<div class="empty-drawer">Your cart is looking a little empty.<br>Find something clever to add to it.</div>';
 }else{
   $("#drawerBody").innerHTML=state.wishlist.length?state.wishlist.map(id=>{const p=getProduct(id);return `<div class="wish-row"><img src="${p.image}" alt="${p.name}"><div><strong>${p.name}</strong><small>${money(p.price)}</small></div><button data-wish-add="${p.id}">Add to cart</button><button data-wish-remove="${p.id}" aria-label="Remove from wishlist">×</button></div>`}).join(""):'<div class="empty-drawer">No saved products yet.<br>Tap the ♡ on a product to keep it here.</div>';
 }
 updateCounts();
}
function addToCart(id,quantity=1){
 const p=getProduct(id);if(!p)return;
 const found=state.cart.find(i=>i.id===id);
 if(found)found.quantity+=quantity;else state.cart.push({...p,quantity});
 updateCounts();showToast(`${p.name} added to cart.`);
}
function toggleWishlist(id){
 state.wishlist=state.wishlist.includes(id)?state.wishlist.filter(x=>x!==id):[...state.wishlist,id];
 renderProducts();updateCounts();
 showToast(state.wishlist.includes(id)?"Added to wishlist.":"Removed from wishlist.");
}
function openProduct(id){
 const p=getProduct(id);if(!p)return;state.selectedProduct=p;
 $("#productDetails").innerHTML=`<div class="detail-layout"><img src="${p.image}" alt="${p.name}"><div><span class="product-category">${p.category}</span><h2>${p.name}</h2><div class="product-rating"><span>★★★★★</span> ${p.rating.toFixed(1)} / 5</div><p>${p.description}</p><div class="detail-price">${money(p.price)} <span class="old-price">${money(p.oldPrice)}</span></div><p>Demo product listing. Specifications and stock are illustrative.</p></div></div>`;
 $("#productQty").value="1";$("#productDialog").showModal();
}
$("#productGrid").addEventListener("click",e=>{
 const wish=e.target.closest("[data-wish]");if(wish){toggleWishlist(wish.dataset.wish);return;}
 const add=e.target.closest("[data-add]");if(add){addToCart(add.dataset.add);return;}
 const detail=e.target.closest("[data-details]");if(detail)openProduct(detail.dataset.details);
});
$("#categoryTabs").addEventListener("click",e=>{
 const b=e.target.closest("[data-category]");if(!b)return;state.category=b.dataset.category;
 $("#categoryTabs").querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));renderProducts();
});
$("#searchInput").addEventListener("input",e=>{state.search=e.target.value;renderProducts();if(!$("#products").matches(":hover")){}});
$("#sortSelect").addEventListener("change",e=>{state.sort=e.target.value;renderProducts();});
document.querySelectorAll("[data-jump-category]").forEach(a=>a.addEventListener("click",()=>{state.category=a.dataset.jumpCategory;$("#categoryTabs").querySelectorAll("button").forEach(b=>b.classList.toggle("active",b.dataset.category===state.category));renderProducts();}));
$("#cartOpen").addEventListener("click",()=>openDrawer("cart"));
$("#wishlistOpen").addEventListener("click",()=>openDrawer("wishlist"));
$("#drawerClose").addEventListener("click",closeDrawer);
$("#overlay").addEventListener("click",closeDrawer);
$("#drawerBody").addEventListener("click",e=>{
 const remove=e.target.closest("[data-remove]");if(remove){state.cart=state.cart.filter(i=>i.id!==remove.dataset.remove);renderDrawer();return;}
 const qty=e.target.closest("[data-qty]");if(qty){const item=state.cart.find(i=>i.id===qty.dataset.qty);if(item){item.quantity+=Number(qty.dataset.change);if(item.quantity<=0)state.cart=state.cart.filter(i=>i.id!==item.id);}renderDrawer();return;}
 const add=e.target.closest("[data-wish-add]");if(add){addToCart(add.dataset.wishAdd);openDrawer("wishlist");return;}
 const rem=e.target.closest("[data-wish-remove]");if(rem){state.wishlist=state.wishlist.filter(id=>id!==rem.dataset.wishRemove);renderProducts();renderDrawer();}
});
$("#productClose").addEventListener("click",()=>$("#productDialog").close());
$("#productForm").addEventListener("submit",e=>{e.preventDefault();if(!state.selectedProduct)return;addToCart(state.selectedProduct.id,Number($("#productQty").value));$("#productDialog").close();openDrawer("cart");});
$("#checkoutBtn").addEventListener("click",()=>{
 if(!state.cart.length){showToast("Add a product before checkout.");return;}
 const order={id:"TS"+Date.now().toString().slice(-7),items:state.cart.map(i=>({...i})),total:state.cart.reduce((n,i)=>n+i.price*i.quantity,0),status:"Order received",date:new Date().toLocaleDateString()};
 state.orders.push(order);state.cart=[];updateCounts();renderDrawer();closeDrawer();renderOrders();$("#ordersDialog").showModal();showToast("Demo order created. No payment was processed.");
});
function renderOrders(){
 $("#ordersBody").innerHTML=state.orders.length?state.orders.slice().reverse().map(o=>`<article class="order-card"><h3>Order ${o.id}</h3><p>Date: ${o.date}<br>Items: ${o.items.map(i=>escapeHtml(i.name)+" × "+i.quantity).join(", ")}<br>Total: ${money(o.total)}</p><span class="order-status ${o.status==="Cancelled"?"cancelled":""}">${o.status}</span><div class="order-actions">${o.status!=="Cancelled"?`<button data-order-cancel="${o.id}">Cancel order</button>`:""}<button data-order-next="${o.id}">Update demo status</button></div></article>`).join(""):'<div class="empty-drawer">No orders yet. Orders created at demo checkout appear here.</div>';
}
$("#ordersBody").addEventListener("click",e=>{
 const cancel=e.target.closest("[data-order-cancel]");if(cancel){const o=state.orders.find(x=>x.id===cancel.dataset.orderCancel);if(o)o.status="Cancelled";renderOrders();return;}
 const next=e.target.closest("[data-order-next]");if(next){const o=state.orders.find(x=>x.id===next.dataset.orderNext);if(o){const statuses=["Order received","Processing","Shipped","Delivered"];o.status=statuses[(statuses.indexOf(o.status)+1)%statuses.length];}renderOrders();}
});
$("#ordersClose").addEventListener("click",()=>$("#ordersDialog").close());
$("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();showToast("Thanks for signing up! (Demo only)");e.target.reset();});
$("#menuToggle").addEventListener("click",()=>$("#nav").classList.toggle("open"));
$("#nav").addEventListener("click",e=>{if(e.target.closest("a"))$("#nav").classList.remove("open");});
$("#year").textContent=new Date().getFullYear();
renderProducts();updateCounts();renderOrders();
