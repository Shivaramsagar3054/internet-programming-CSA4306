const $ = (id) => document.getElementById(id);
const state = {
  users: [
    {id:1,name:"Maya Reddy",email:"maya.reddy@example.com",role:"Buyer",joined:"Oct 18, 2026",status:"Active"},
    {id:2,name:"Arjun Kumar",email:"arjun.k@example.com",role:"Seller",joined:"Oct 16, 2026",status:"Active"},
    {id:3,name:"Priya Sharma",email:"priya.s@example.com",role:"Seller",joined:"Oct 12, 2026",status:"Active"},
    {id:4,name:"Rahul Nair",email:"rahul.nair@example.com",role:"Buyer",joined:"Oct 09, 2026",status:"Inactive"},
    {id:5,name:"Nisha Patel",email:"nisha.p@example.com",role:"Buyer",joined:"Oct 05, 2026",status:"Active"}
  ],
  categories: [
    {id:1,name:"Electronics",emoji:"🎧",description:"Phones, audio and gadgets"},
    {id:2,name:"Furniture",emoji:"🪑",description:"Tables, chairs and home pieces"},
    {id:3,name:"Clothing",emoji:"🧥",description:"Pre-loved fashion and accessories"},
    {id:4,name:"Collectibles",emoji:"🪴",description:"Vintage finds and unique items"},
    {id:5,name:"Books",emoji:"📚",description:"Books, textbooks and comics"}
  ],
  products: [
    {id:101,name:"Wireless headphones",category:"Electronics",seller:"Arjun Kumar",price:1800,status:"Active",emoji:"🎧",description:"Good condition, clear sound and charging cable included."},
    {id:102,name:"Oak study desk",category:"Furniture",seller:"Priya Sharma",price:4200,status:"Active",emoji:"🪑",description:"Solid wooden desk with minor signs of use."},
    {id:103,name:"Denim jacket",category:"Clothing",seller:"Maya Reddy",price:950,status:"Active",emoji:"🧥",description:"Classic blue denim jacket, size M."},
    {id:104,name:"Vintage film camera",category:"Collectibles",seller:"Arjun Kumar",price:3200,status:"Draft",emoji:"📷",description:"Vintage camera for collectors; condition listed as-is."},
    {id:105,name:"Programming books set",category:"Books",seller:"Priya Sharma",price:700,status:"Sold",emoji:"📚",description:"Set of three programming books."}
  ],
  orders: [
    {id:"RN-2048",productId:101,item:"Wireless headphones",buyer:"Maya Reddy",date:"Oct 28, 2026",amount:1800,status:"Processing"},
    {id:"RN-2047",productId:102,item:"Oak study desk",buyer:"Rahul Nair",date:"Oct 27, 2026",amount:4200,status:"Shipped"},
    {id:"RN-2046",productId:103,item:"Denim jacket",buyer:"Nisha Patel",date:"Oct 26, 2026",amount:950,status:"Received"},
    {id:"RN-2045",productId:105,item:"Programming books set",buyer:"Maya Reddy",date:"Oct 24, 2026",amount:700,status:"Received"}
  ]
};
let nextUserId=6,nextCategoryId=6,nextProductId=106,editing=null,toastTimer;
const money = n => "₹" + Number(n).toLocaleString("en-IN");
const escapeHtml = s => String(s ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const statusClass = s => String(s).toLowerCase();
const statusBadge = s => `<span class="status ${statusClass(s)}">${escapeHtml(s)}</span>`;
const emptyRow = (cols,msg="No records found") => `<tr><td colspan="${cols}"><div class="empty-state"><strong>${msg}</strong>Try changing your search or add a new record.</div></td></tr>`;
function notify(message){const t=$("toast");t.textContent=message;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2600)}
function currentDate(){return new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"});}
$("dateLabel").textContent=currentDate().toUpperCase();
function goTo(page){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  const target=$(page+"Page");if(target)target.classList.add("active");
  document.querySelectorAll(".nav-item[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
  const names={overview:"Overview",users:"User management",categories:"Category management",products:"Commodity management",orders:"Order management"};
  $("breadcrumbTitle").textContent=names[page]||"Overview";
  $("pageTitle").innerHTML=page==="overview"?'Good day, Administrator <span>✦</span>':names[page];
  $("pageSubtitle").textContent=({overview:"Here’s what’s happening across your marketplace today.",users:"Manage accounts, roles and access to your marketplace.",categories:"Organize the items available across ReNewMarket.",products:"Review listings and keep item information up to date.",orders:"Track purchases and update shipping and receipt status."})[page];
  $("quickAddLabel").textContent=({overview:"Add new listing",users:"Add user",categories:"Add category",products:"Add listing",orders:"Manage orders"})[page];
  $("quickAddBtn").style.display=page==="orders"?"none":"inline-flex";
  $("sidebar").classList.remove("open");
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>goTo(b.dataset.page)));
document.querySelectorAll("[data-goto]").forEach(b=>b.addEventListener("click",()=>goTo(b.dataset.goto)));
$("menuBtn").addEventListener("click",()=>$("sidebar").classList.toggle("open"));
$("notificationBtn").addEventListener("click",()=>notify("You’re all caught up!"));
$("helpBtn").addEventListener("click",()=>notify("Support: support@renewmarket.example"));

function renderStats(){
  $("statUsers").textContent=state.users.length;
  $("statProducts").textContent=state.products.filter(p=>p.status==="Active").length;
  $("statOrders").textContent=state.orders.length;
  $("statCategories").textContent=state.categories.length;
  $("userNavCount").textContent=state.users.length;
  $("orderNavCount").textContent=state.orders.length;
  const recent=[...state.orders].slice(0,4);
  $("recentOrdersBody").innerHTML=recent.length?recent.map(o=>`<tr><td>${escapeHtml(o.id)}</td><td><div class="item-cell"><span class="item-thumb">${escapeHtml((state.products.find(p=>p.id===o.productId)||{}).emoji||"📦")}</span><div><strong>${escapeHtml(o.item)}</strong><small>Second-hand item</small></div></div></td><td>${escapeHtml(o.buyer)}</td><td>${money(o.amount)}</td><td>${statusBadge(o.status)}</td></tr>`).join(""):emptyRow(5);
  const counts=state.categories.map(c=>({...c,count:state.products.filter(p=>p.category===c.name).length})).sort((a,b)=>b.count-a.count);
  const max=Math.max(1,...counts.map(c=>c.count));
  $("categoryBreakdown").innerHTML=counts.slice(0,5).map(c=>`<div><div class="category-line-top"><span>${escapeHtml(c.emoji)} &nbsp;${escapeHtml(c.name)}</span><span>${c.count} listing${c.count===1?"":"s"}</span></div><div class="progress"><span style="width:${c.count/max*100}%"></span></div></div>`).join("");
}
function renderUsers(){
 const q=$("userSearch").value.toLowerCase(),role=$("userRoleFilter").value;
 const list=state.users.filter(u=>(`${u.name} ${u.email} ${u.role}`.toLowerCase().includes(q))&&(!role||u.role===role));
 $("usersBody").innerHTML=list.length?list.map(u=>`<tr><td><div class="item-cell"><span class="top-avatar">${escapeHtml(u.name.split(" ").map(x=>x[0]).slice(0,2).join(""))}</span><div><strong>${escapeHtml(u.name)}</strong><small>USR-${String(u.id).padStart(4,"0")}</small></div></div></td><td>${escapeHtml(u.email)}</td><td>${escapeHtml(u.role)}</td><td>${escapeHtml(u.joined)}</td><td>${statusBadge(u.status)}</td><td><div class="action-group"><button class="action-btn" data-edit-user="${u.id}">Edit</button><button class="action-btn danger" data-delete-user="${u.id}">Delete</button></div></td></tr>`).join(""):emptyRow(6);
}
function renderCategories(){
 const q=$("categorySearch").value.toLowerCase(),list=state.categories.filter(c=>(c.name+" "+c.description).toLowerCase().includes(q));
 $("categoryCount").textContent=`${list.length} categor${list.length===1?"y":"ies"}`;
 $("categoriesGrid").innerHTML=list.length?list.map(c=>`<article class="category-card"><div class="category-emoji">${escapeHtml(c.emoji)}</div><div><h3>${escapeHtml(c.name)}</h3><p>${escapeHtml(c.description)}</p></div><button class="action-btn" data-edit-category="${c.id}">Edit</button><button class="action-btn danger" data-delete-category="${c.id}">×</button></article>`).join(""):`<div class="empty-state">No categories found.</div>`;
}
function updateCategoryFilter(){
 const current=$("productCategoryFilter").value;
 $("productCategoryFilter").innerHTML='<option value="">All categories</option>'+state.categories.map(c=>`<option>${escapeHtml(c.name)}</option>`).join("");
 $("productCategoryFilter").value=state.categories.some(c=>c.name===current)?current:"";
}
function renderProducts(){
 updateCategoryFilter();
 const q=$("productSearch").value.toLowerCase(),cat=$("productCategoryFilter").value,status=$("productStatusFilter").value;
 const list=state.products.filter(p=>(`${p.name} ${p.seller} ${p.description}`.toLowerCase().includes(q))&&(!cat||p.category===cat)&&(!status||p.status===status));
 $("productsBody").innerHTML=list.length?list.map(p=>`<tr><td><div class="item-cell"><span class="item-thumb">${escapeHtml(p.emoji)}</span><div><strong>${escapeHtml(p.name)}</strong><small>ITEM-${p.id}</small></div></div></td><td>${escapeHtml(p.category)}</td><td>${escapeHtml(p.seller)}</td><td><strong>${money(p.price)}</strong></td><td>${statusBadge(p.status)}</td><td><div class="action-group"><button class="action-btn" data-edit-product="${p.id}">Edit</button><button class="action-btn danger" data-delete-product="${p.id}">Delete</button></div></td></tr>`).join(""):emptyRow(6);
}
function renderOrders(){
 const q=$("orderSearch").value.toLowerCase(),status=$("orderStatusFilter").value;
 const list=state.orders.filter(o=>(`${o.id} ${o.item} ${o.buyer}`.toLowerCase().includes(q))&&(!status||o.status===status));
 $("orderCount").textContent=`${list.length} order${list.length===1?"":"s"}`;
 $("ordersBody").innerHTML=list.length?list.map(o=>`<tr><td>${escapeHtml(o.id)}</td><td><div class="item-cell"><span class="item-thumb">${escapeHtml((state.products.find(p=>p.id===o.productId)||{}).emoji||"📦")}</span><div><strong>${escapeHtml(o.item)}</strong><small>Marketplace order</small></div></div></td><td>${escapeHtml(o.buyer)}</td><td>${escapeHtml(o.date)}</td><td><strong>${money(o.amount)}</strong></td><td><select class="inline-status" data-order-status="${escapeHtml(o.id)}" aria-label="Status for ${escapeHtml(o.id)}"><option ${o.status==="Processing"?"selected":""}>Processing</option><option ${o.status==="Shipped"?"selected":""}>Shipped</option><option ${o.status==="Received"?"selected":""}>Received</option></select></td><td><button class="action-btn danger" data-delete-order="${escapeHtml(o.id)}">Delete</button></td></tr>`).join(""):emptyRow(7);
}
function renderAll(){renderStats();renderUsers();renderCategories();renderProducts();renderOrders()}
["userSearch","userRoleFilter"].forEach(id=>$(id).addEventListener("input",renderUsers));
["categorySearch"].forEach(id=>$(id).addEventListener("input",renderCategories));
["productSearch","productCategoryFilter","productStatusFilter"].forEach(id=>$(id).addEventListener("input",renderProducts));
["orderSearch","orderStatusFilter"].forEach(id=>$(id).addEventListener("input",renderOrders));

function field(name,label,type="text",value="",options=null,full=false,required=true){
 const id="field_"+name;
 let control;
 if(type==="select") control=`<select id="${id}" name="${name}" ${required?"required":""}>${options.map(o=>`<option value="${escapeHtml(o)}" ${o===value?"selected":""}>${escapeHtml(o)}</option>`).join("")}</select>`;
 else if(type==="textarea") control=`<textarea id="${id}" name="${name}" ${required?"required":""}>${escapeHtml(value)}</textarea>`;
 else control=`<input id="${id}" name="${name}" type="${type}" value="${escapeHtml(value)}" ${required?"required":""} ${type==="number"?'min="0" step="1"':""}/>`;
 return `<div class="field ${full?"full":""}"><label for="${id}">${label}</label>${control}</div>`;
}
function openModal(title,fields,submitFn){
 editing=submitFn;$("modalTitle").textContent=title;$("modalFields").innerHTML=fields;$("modalBackdrop").classList.add("open");
 setTimeout(()=> $("modalFields").querySelector("input,select,textarea")?.focus(),60);
}
function closeModal(){$("modalBackdrop").classList.remove("open");$("modalForm").onsubmit=null;editing=null}
$("closeModal").addEventListener("click",closeModal);$("cancelModal").addEventListener("click",closeModal);
$("modalBackdrop").addEventListener("click",e=>{if(e.target===$("modalBackdrop"))closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
$("modalForm").addEventListener("submit",e=>{
 e.preventDefault();if(!editing)return;
 const data=Object.fromEntries(new FormData(e.currentTarget).entries());
 if(editing(data)===false)return;
 closeModal();renderAll();
});
function userModal(user=null){
 const isEdit=!!user;
 openModal(isEdit?"Edit user":"Add user",field("name","Full name","text",user?.name||"")+field("email","Email address","email",user?.email||"")+field("role","Account role","select",user?.role||"Buyer",["Buyer","Seller","Administrator"])+field("status","Account status","select",user?.status||"Active",["Active","Inactive"]),data=>{
 if(state.users.some(u=>u.email.toLowerCase()===data.email.toLowerCase()&&u.id!==user?.id)){notify("An account with this email already exists.");return false}
 if(user)Object.assign(user,data);else state.users.unshift({id:nextUserId++,...data,joined:new Date().toLocaleDateString("en-IN",{month:"short",day:"2-digit",year:"numeric"})});
 notify(user?"User details updated.":"User account created.");
 });
}
function categoryModal(category=null){
 openModal(category?"Edit category":"Add category",field("name","Category name","text",category?.name||"")+field("emoji","Icon / emoji","text",category?.emoji||"📦")+field("description","Description","text",category?.description||"",null,true),data=>{
 if(state.categories.some(c=>c.name.toLowerCase()===data.name.toLowerCase()&&c.id!==category?.id)){notify("That category already exists.");return false}
 if(category){const old=category.name;Object.assign(category,data);state.products.forEach(p=>{if(p.category===old)p.category=data.name})}else state.categories.push({id:nextCategoryId++,...data});
 notify(category?"Category updated.":"Category added.");
 });
}
function productModal(product=null){
 const categoryNames=state.categories.map(c=>c.name);if(!categoryNames.length){notify("Add a category before creating a listing.");return}
 const fields=field("name","Item name","text",product?.name||"")+field("category","Category","select",product?.category||categoryNames[0],categoryNames)+field("seller","Seller name","text",product?.seller||"")+field("price","Price (INR)","number",product?.price??"")+field("emoji","Item icon / emoji","text",product?.emoji||"📦")+field("status","Listing status","select",product?.status||"Active",["Active","Draft","Sold"])+field("description","Description","textarea",product?.description||"",null,true);
 openModal(product?"Edit commodity":"Add new listing",fields,data=>{
 if(Number(data.price)<0||data.price===""){notify("Enter a valid price.");return false}
 data.price=Number(data.price);
 if(product)Object.assign(product,data);else state.products.unshift({id:nextProductId++,...data});
 notify(product?"Listing updated.":"Listing created.");
 });
}
$("quickAddBtn").addEventListener("click",()=>{const page=document.querySelector(".page.active")?.id.replace("Page","");if(page==="users")userModal();else if(page==="categories")categoryModal();else productModal()});
$("addUserBtn").addEventListener("click",()=>userModal());
$("addCategoryBtn").addEventListener("click",()=>categoryModal());
$("addProductBtn").addEventListener("click",()=>productModal());

document.addEventListener("click",e=>{
 const b=e.target.closest("button");if(!b)return;
 if(b.dataset.editUser)userModal(state.users.find(x=>x.id===Number(b.dataset.editUser)));
 if(b.dataset.deleteUser){const u=state.users.find(x=>x.id===Number(b.dataset.deleteUser));if(u&&confirm(`Delete user "${u.name}"? This cannot be undone.`)){state.users=state.users.filter(x=>x.id!==u.id);notify("User deleted.");renderAll()}}
 if(b.dataset.editCategory)categoryModal(state.categories.find(x=>x.id===Number(b.dataset.editCategory)));
 if(b.dataset.deleteCategory){const c=state.categories.find(x=>x.id===Number(b.dataset.deleteCategory));if(!c)return;const used=state.products.some(p=>p.category===c.name);if(used){notify("Move or delete listings in this category before deleting it.");return}if(confirm(`Delete category "${c.name}"?`)){state.categories=state.categories.filter(x=>x.id!==c.id);notify("Category deleted.");renderAll()}}
 if(b.dataset.editProduct)productModal(state.products.find(x=>x.id===Number(b.dataset.editProduct)));
 if(b.dataset.deleteProduct){const p=state.products.find(x=>x.id===Number(b.dataset.deleteProduct));if(p&&confirm(`Delete listing "${p.name}"?`)){state.products=state.products.filter(x=>x.id!==p.id);notify("Listing deleted.");renderAll()}}
 if(b.dataset.deleteOrder){const o=state.orders.find(x=>x.id===b.dataset.deleteOrder);if(o&&confirm(`Delete order ${o.id}?`)){state.orders=state.orders.filter(x=>x.id!==o.id);notify("Order deleted.");renderAll()}}
});
document.addEventListener("change",e=>{
 if(e.target.matches("[data-order-status]")){const o=state.orders.find(x=>x.id===e.target.dataset.orderStatus);if(o){o.status=e.target.value;notify(`${o.id} marked ${o.status.toLowerCase()}.`);renderAll()}}
});
renderAll();
