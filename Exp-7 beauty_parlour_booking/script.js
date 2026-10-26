const services = [
  {id:"hair",name:"Hair Styling",price:799,duration:60,description:"A fresh cut, blow-dry, or style made just for you.",image:"https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=700&q=80"},
  {id:"facial",name:"Glow Facial",price:1199,duration:60,description:"A refreshing facial for a healthy, radiant glow.",image:"https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80"},
  {id:"nails",name:"Nail Care",price:599,duration:45,description:"A little colour, care, and polish for your hands.",image:"https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=700&q=80"},
  {id:"makeup",name:"Party Makeup",price:2499,duration:90,description:"Feel confident and camera-ready for your big moment.",image:"https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=700&q=80"},
  {id:"spa",name:"Relaxing Spa",price:1599,duration:75,description:"Slow down and enjoy a restorative self-care session.",image:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=700&q=80"},
  {id:"wax",name:"Waxing",price:499,duration:30,description:"A comfortable, professional treatment tailored to you.",image:"https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=700&q=80"},
  {id:"bridal",name:"Bridal Beauty",price:5999,duration:150,description:"Thoughtful, personalised beauty for your special day.",image:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80"},
  {id:"brows",name:"Brow & Lash",price:899,duration:45,description:"Define your look with delicate brow and lash care.",image:"https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=700&q=80"}
];
const stylists = [
  {id:"ananya",name:"Ananya Rao",role:"Senior Hair Stylist",specialty:"Hair styling · Colour",image:"https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=300&q=80"},
  {id:"meera",name:"Meera Shah",role:"Skin Care Specialist",specialty:"Facials · Skin wellness",image:"https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=300&q=80"},
  {id:"sana",name:"Sana Iyer",role:"Makeup Artist",specialty:"Makeup · Bridal beauty",image:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80"}
];
const $=s=>document.querySelector(s);
const state={appointments:[]};
const money=n=>"₹"+n.toLocaleString("en-IN");
const serviceGrid=$("#serviceGrid");
const serviceSelect=$("#serviceSelect");
const stylistSelect=$("#stylistSelect");
const timeSelect=$("#timeSelect");
const dateInput=$("#appointmentDate");
const toast=$("#toast");
let toastTimer;

function renderServices(){
  serviceGrid.innerHTML=services.map((s,i)=>`<article class="service-card"><div class="service-image"><img src="${s.image}" alt="${s.name}" loading="lazy"><span class="service-number">0${i+1}</span></div><div class="service-info"><h3>${s.name}</h3><p>${s.description}</p><div class="service-meta"><strong>${money(s.price)}</strong><span>${s.duration} min</span><button data-book-service="${s.id}">Book ↗</button></div></div></article>`).join("");
  serviceSelect.innerHTML='<option value="">Choose a service</option>'+services.map(s=>`<option value="${s.id}">${s.name} — ${money(s.price)}</option>`).join("");
}
function renderStylists(){
  $("#stylistGrid").innerHTML=stylists.map(s=>`<article class="stylist-card"><img src="${s.image}" alt="${s.name}" loading="lazy"><div><h3>${s.name}</h3><p>${s.role}</p><span>✦ ${s.specialty}</span></div></article>`).join("");
  stylistSelect.innerHTML='<option value="">Choose a stylist</option>'+stylists.map(s=>`<option value="${s.id}">${s.name} — ${s.role}</option>`).join("");
}
function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2800);}
function localDateString(date){const y=date.getFullYear(),m=String(date.getMonth()+1).padStart(2,"0"),d=String(date.getDate()).padStart(2,"0");return `${y}-${m}-${d}`;}
function setupDate(){dateInput.min=localDateString(new Date());dateInput.value=dateInput.min;renderTimes();}
function renderTimes(){
  const date=dateInput.value;
  const options=["09:00 AM","10:00 AM","11:00 AM","12:00 PM","01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM","06:00 PM"];
  const now=new Date();
  const available=options.filter(t=>{
    if(date!==localDateString(now))return true;
    const [clock,period]=t.split(" ");let [h,m]=clock.split(":").map(Number);
    if(period==="PM"&&h!==12)h+=12;if(period==="AM"&&h===12)h=0;
    return h>now.getHours()||(h===now.getHours()&&m>now.getMinutes());
  });
  timeSelect.innerHTML=available.length?'<option value="">Choose a time</option>'+available.map(t=>`<option value="${t}">${t}</option>`).join(""):'<option value="">No more slots today</option>';
  updateSummary();
}
function updateSummary(){
  const service=services.find(s=>s.id===serviceSelect.value);
  const stylist=stylists.find(s=>s.id===stylistSelect.value);
  const date=dateInput.value;
  const time=timeSelect.value;
  const detail=service?`${money(service.price)} · ${service.duration} minutes${stylist?" · "+stylist.name:""}${date?" · "+date:""}${time?" at "+time:""}`:"Select a service to see the estimated price and duration.";
  $("#bookingSummary").innerHTML=`<span>✿</span><div><strong>${service?service.name:"Your appointment summary"}</strong><small>${detail}</small></div>`;
}
serviceGrid.addEventListener("click",e=>{
  const button=e.target.closest("[data-book-service]");if(!button)return;
  serviceSelect.value=button.dataset.bookService;updateSummary();$("#booking").scrollIntoView({behavior:"smooth"});
});
[serviceSelect,stylistSelect,dateInput,timeSelect].forEach(el=>el.addEventListener("change",()=>{if(el===dateInput)renderTimes();else updateSummary();}));
$("#bookingForm").addEventListener("submit",e=>{
  e.preventDefault();
  const service=services.find(s=>s.id===serviceSelect.value);
  const stylist=stylists.find(s=>s.id===stylistSelect.value);
  if(!service||!stylist){showToast("Please select a service and stylist.");return;}
  const date=dateInput.value;
  const time=timeSelect.value;
  if(!date||!time){showToast("Please select an available date and time.");return;}
  const duplicate=state.appointments.some(a=>a.stylistId===stylist.id&&a.date===date&&a.time===time&&a.status==="Booked");
  if(duplicate){showToast("That demo slot is already booked. Please choose another time.");return;}
  const appointment={id:"GS"+Date.now().toString().slice(-7),name:$("#customerName").value.trim(),email:$("#customerEmail").value.trim(),serviceId:service.id,service:service.name,price:service.price,duration:service.duration,stylistId:stylist.id,stylist:stylist.name,date,time,notes:$("#bookingNotes").value.trim(),status:"Booked"};
  state.appointments.push(appointment);renderAppointments();e.target.reset();setupDate();updateSummary();
  showToast("Appointment booked in this demo!");$("#appointmentsDialog").showModal();
});
function renderAppointments(){
  const container=$("#appointmentList");
  if(!state.appointments.length){container.innerHTML='<div class="empty-appointments">No appointments yet.<br>Choose a service and book a little time for yourself.</div>';return;}
  container.innerHTML=state.appointments.slice().reverse().map(a=>`<article class="appointment-item"><div><h3>${a.service}</h3><p>${a.date} · ${a.time}<br>With ${a.stylist} · ${money(a.price)}<br>Booking ID: ${a.id}<br>Status: ${a.status}${a.notes?"<br>Note: "+escapeHtml(a.notes):""}</p></div>${a.status==="Booked"?`<button data-cancel="${a.id}">Cancel</button>`:""}</article>`).join("");
}
function escapeHtml(value){return value.replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}
$("#appointmentList").addEventListener("click",e=>{
  const button=e.target.closest("[data-cancel]");if(!button)return;
  const appointment=state.appointments.find(a=>a.id===button.dataset.cancel);
  if(appointment){appointment.status="Cancelled";renderAppointments();showToast("Appointment cancelled in this demo.");}
});
$("#myAppointments").addEventListener("click",()=>{$("#appointmentsDialog").showModal();renderAppointments();});
$("#closeAppointments").addEventListener("click",()=>$("#appointmentsDialog").close());
$("#bookMore").addEventListener("click",()=>{$("#appointmentsDialog").close();$("#booking").scrollIntoView({behavior:"smooth"});});
$("#menuToggle").addEventListener("click",()=>$("#nav").classList.toggle("open"));
$("#nav").addEventListener("click",e=>{if(e.target.closest("a"))$("#nav").classList.remove("open");});
$("#year").textContent=new Date().getFullYear();
renderServices();renderStylists();setupDate();renderAppointments();updateSummary();
