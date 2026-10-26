const hospitals=[
 {id:"medcare-central",name:"MedCare Central Hospital",location:"Central District"},
 {id:"medcare-city",name:"MedCare City Clinic",location:"City Centre"},
 {id:"medcare-north",name:"MedCare North Hospital",location:"North District"}
];
const doctors=[
 {id:"d1",name:"Dr. Ananya Rao",specialty:"Cardiology",hospital:"medcare-central",experience:"12 years experience",fee:700,icon:"♡",image:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",bio:"Heart health and preventive cardiology."},
 {id:"d2",name:"Dr. Arjun Mehta",specialty:"Dermatology",hospital:"medcare-city",experience:"9 years experience",fee:500,icon:"✧",image:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80",bio:"Skin health and dermatological care."},
 {id:"d3",name:"Dr. Priya Nair",specialty:"Pediatrics",hospital:"medcare-central",experience:"10 years experience",fee:600,icon:"☼",image:"https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&q=80",bio:"Healthcare for infants and children."},
 {id:"d4",name:"Dr. Vikram Shah",specialty:"Orthopedics",hospital:"medcare-north",experience:"15 years experience",fee:800,icon:"✚",image:"https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80",bio:"Bone, joint, and mobility care."},
 {id:"d5",name:"Dr. Meera Iyer",specialty:"General Medicine",hospital:"medcare-city",experience:"8 years experience",fee:400,icon:"＋",image:"https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=300&q=80",bio:"Primary care and general consultations."},
 {id:"d6",name:"Dr. Rahul Verma",specialty:"Neurology",hospital:"medcare-north",experience:"11 years experience",fee:900,icon:"⌁",image:"https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=300&q=80",bio:"Neurological assessment and care."}
];
const departments=[
 {name:"Cardiology",icon:"♡",description:"Heart health and cardiovascular care."},
 {name:"Dermatology",icon:"✧",description:"Care for skin, hair, and nails."},
 {name:"Pediatrics",icon:"☼",description:"Medical care for infants and children."},
 {name:"Orthopedics",icon:"✚",description:"Bone, joint, and mobility care."},
 {name:"General Medicine",icon:"＋",description:"Everyday health and primary care."},
 {name:"Neurology",icon:"⌁",description:"Care for the brain and nervous system."},
 {name:"Ophthalmology",icon:"◉",description:"Eye health and vision services."},
 {name:"Gynecology",icon:"❀",description:"Women's health and wellness."}
];
const $=s=>document.querySelector(s);
const state={appointments:[]};
const money=n=>"₹"+n.toLocaleString("en-IN");
const specialtyFilter=$("#specialtyFilter"),bookingSpecialty=$("#bookingSpecialty"),bookingDoctor=$("#bookingDoctor"),hospitalSelect=$("#hospitalSelect");
const dateInput=$("#appointmentDate"),timeInput=$("#appointmentTime"),toast=$("#toast");
let toastTimer;
function renderDepartments(){
 $("#departmentGrid").innerHTML=departments.map(d=>`<article class="department-card"><span class="department-icon">${d.icon}</span><h3>${d.name}</h3><p>${d.description}</p><button data-department="${d.name}">Find a doctor →</button></article>`).join("");
}
function renderHospitalOptions(){
 hospitalSelect.innerHTML='<option value="">Choose a hospital</option>'+hospitals.map(h=>`<option value="${h.id}">${h.name}</option>`).join("");
}
function renderSpecialties(){
 const specialties=[...new Set(doctors.map(d=>d.specialty))].sort();
 specialtyFilter.innerHTML='<option value="All">All specialties</option>'+specialties.map(s=>`<option>${s}</option>`).join("");
 bookingSpecialty.innerHTML='<option value="">Choose a specialty</option>'+specialties.map(s=>`<option>${s}</option>`).join("");
}
function hospitalName(id){return hospitals.find(h=>h.id===id)?.name||"Hospital";}
function renderDoctors(){
 const q=$("#doctorSearch").value.trim().toLowerCase(),spec=specialtyFilter.value;
 const visible=doctors.filter(d=>(spec==="All"||d.specialty===spec)&&(d.name+" "+d.specialty+" "+d.bio+" "+hospitalName(d.hospital)).toLowerCase().includes(q));
 $("#doctorGrid").innerHTML=visible.length?visible.map(d=>`<article class="doctor-card"><div class="doctor-main"><img src="${d.image}" alt="${d.name}" loading="lazy"><div class="doctor-info"><h3>${d.name}</h3><p class="specialty">${d.specialty}</p><p>${d.experience}</p><p>${hospitalName(d.hospital)}</p><span class="doctor-fee">${money(d.fee)} <span style="font-weight:400;color:#6e818d">/ visit</span></span></div></div><div class="doctor-actions"><small>Sample profile · ${d.bio}</small><button data-doctor="${d.id}">Book visit →</button></div></article>`).join(""):'<div class="no-results">No doctors match your search. Try another specialty or keyword.</div>';
}
function renderBookingDoctors(){
 const specialty=bookingSpecialty.value,hospital=hospitalSelect.value;
 const list=doctors.filter(d=>(!specialty||d.specialty===specialty)&&(!hospital||d.hospital===hospital));
 bookingDoctor.innerHTML='<option value="">Choose a doctor</option>'+list.map(d=>`<option value="${d.id}">${d.name} — ${d.specialty}</option>`).join("");
 updateSummary();
}
function localDate(date){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;}
function renderTimes(){
 const date=dateInput.value;
 const slots=["09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","01:00 PM","01:30 PM","02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM"];
 const now=new Date();
 const open=slots.filter(t=>{
   if(date!==localDate(now))return true;
   let [clock,period]=t.split(" ");let [h,m]=clock.split(":").map(Number);
   if(period==="PM"&&h!==12)h+=12;if(period==="AM"&&h===12)h=0;
   return h>now.getHours()||(h===now.getHours()&&m>now.getMinutes());
 });
 timeInput.innerHTML=open.length?'<option value="">Choose a time slot</option>'+open.map(t=>`<option>${t}</option>`).join(""):'<option value="">No slots left today</option>';
 updateSummary();
}
function updateSummary(){
 const d=doctors.find(x=>x.id===bookingDoctor.value),h=hospitalName(hospitalSelect.value),date=dateInput.value,time=timeInput.value;
 $("#bookingSummary").innerHTML=`<span>✚</span><div><strong>${d?d.name+" · "+d.specialty:"Appointment summary"}</strong><small>${d?money(d.fee)+" consultation fee · ":"Select a doctor to see the consultation fee. "}${hospitalSelect.value?h+" · ":""}${date?date:""}${time?" · "+time:""}</small></div>`;
}
function showToast(msg){toast.textContent=msg;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2800);}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function scrollToBooking(){ $("#booking").scrollIntoView({behavior:"smooth"}); }
$("#doctorSearch").addEventListener("input",renderDoctors);
specialtyFilter.addEventListener("change",renderDoctors);
$("#departmentGrid").addEventListener("click",e=>{const b=e.target.closest("[data-department]");if(!b)return;specialtyFilter.value=[...specialtyFilter.options].some(o=>o.value===b.dataset.department)?b.dataset.department:"All";renderDoctors();$("#doctors").scrollIntoView({behavior:"smooth"});});
$("#doctorGrid").addEventListener("click",e=>{const b=e.target.closest("[data-doctor]");if(!b)return;const d=doctors.find(x=>x.id===b.dataset.doctor);bookingSpecialty.value=d.specialty;hospitalSelect.value=d.hospital;renderBookingDoctors();bookingDoctor.value=d.id;updateSummary();scrollToBooking();});
bookingSpecialty.addEventListener("change",()=>{renderBookingDoctors();});
hospitalSelect.addEventListener("change",()=>{renderBookingDoctors();});
bookingDoctor.addEventListener("change",updateSummary);
dateInput.addEventListener("change",renderTimes);
timeInput.addEventListener("change",updateSummary);
$("#bookingForm").addEventListener("submit",e=>{
 e.preventDefault();
 const d=doctors.find(x=>x.id===bookingDoctor.value),h=hospitals.find(x=>x.id===hospitalSelect.value);
 if(!d||!h){showToast("Please choose a hospital, specialty, and doctor.");return;}
 const date=dateInput.value,time=timeInput.value;
 if(!date||!time){showToast("Please choose an available date and time.");return;}
 const duplicate=state.appointments.some(a=>a.doctorId===d.id&&a.date===date&&a.time===time&&a.status==="Booked");
 if(duplicate){showToast("This demo slot is already booked. Please choose another.");return;}
 const a={id:"MC"+Date.now().toString().slice(-7),name:$("#patientName").value.trim(),email:$("#patientEmail").value.trim(),hospital:h.name,doctor:d.name,doctorId:d.id,specialty:d.specialty,fee:d.fee,date,time,reason:$("#visitReason").value.trim(),status:"Booked"};
 state.appointments.push(a);renderAppointments();e.target.reset();setupDate();renderBookingDoctors();showToast("Demo appointment booked successfully.");$("#appointmentsDialog").showModal();
});
function renderAppointments(){
 const box=$("#appointmentList");
 if(!state.appointments.length){box.innerHTML='<div class="empty-history">No appointments found in this session.<br>Book a doctor visit to see it here.</div>';return;}
 box.innerHTML=state.appointments.slice().reverse().map(a=>`<article class="appointment-item"><div><h3>${a.doctor} · ${a.specialty}</h3><p>${a.hospital}<br>${a.date} at ${a.time}<br>Patient: ${escapeHtml(a.name)} · Fee: ${money(a.fee)}<br>Booking ID: ${a.id}<br>Status: <strong>${a.status}</strong>${a.reason?"<br>Note: "+escapeHtml(a.reason):""}</p></div>${a.status==="Booked"?`<button data-cancel="${a.id}">Cancel</button>`:""}</article>`).join("");
}
function openAppointments(){$("#appointmentsDialog").showModal();renderAppointments();}
$("#viewAppointments").addEventListener("click",openAppointments);
$("#viewAppointments2").addEventListener("click",openAppointments);
$("#closeDialog").addEventListener("click",()=>$("#appointmentsDialog").close());
$("#appointmentList").addEventListener("click",e=>{const b=e.target.closest("[data-cancel]");if(!b)return;const a=state.appointments.find(x=>x.id===b.dataset.cancel);if(a){a.status="Cancelled";renderAppointments();showToast("Demo appointment cancelled.");}});
$("#bookAnother").addEventListener("click",()=>{$("#appointmentsDialog").close();scrollToBooking();});
$("#headerBook").addEventListener("click",scrollToBooking);
$("#menuToggle").addEventListener("click",()=>$("#nav").classList.toggle("open"));
$("#nav").addEventListener("click",e=>{if(e.target.closest("a"))$("#nav").classList.remove("open");});
function setupDate(){dateInput.min=localDate(new Date());dateInput.value=dateInput.min;renderTimes();}
$("#year").textContent=new Date().getFullYear();
renderDepartments();renderHospitalOptions();renderSpecialties();renderDoctors();renderBookingDoctors();setupDate();renderAppointments();
