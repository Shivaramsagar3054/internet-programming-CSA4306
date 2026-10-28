const $ = id => document.getElementById(id);
let toastTimer, currentAuthMode = "login";
const demoUsers = [];
function toast(message){
  const el=$("toast");el.textContent=message;el.classList.add("show");
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2800);
}
function authField(name,label,type="text",placeholder="",required=true){
  return `<div class="auth-field"><label for="auth-${name}">${label}</label><input id="auth-${name}" name="${name}" type="${type}" placeholder="${placeholder}" ${required?"required":""} autocomplete="${type==="password"?"current-password":name==="email"?"email":"on"}"></div>`;
}
function setAuthMode(mode){
  currentAuthMode=mode;
  document.querySelectorAll(".auth-tab").forEach(b=>b.classList.toggle("active",b.dataset.authTab===mode));
  $("authTitle").textContent=mode==="login"?"Welcome back.":"Create your account.";
  $("authSubtitle").textContent=mode==="login"?"Sign in to manage your toll account.":"Register to start planning smoother journeys.";
  $("authSubmit").innerHTML=mode==="login"?'Log in <span>→</span>':'Create account <span>→</span>';
  let fields="";
  if(mode==="register"){
    fields+=authField("name","Full name","text","e.g. Priya Kumar");
    fields+=authField("phone","Mobile number","tel","e.g. 9876543210");
  }
  fields+=authField("email","Email address","email","you@example.com");
  fields+=authField("password","Password","password",mode==="login"?"Enter your password":"Create a password");
  if(mode==="register"){
    fields+=`<div class="auth-field"><label for="auth-role">Account type</label><select id="auth-role" name="role"><option value="User">Driver / User</option><option value="Toll Gate User">Toll gate staff (demo)</option><option value="Admin">Administrator (demo)</option></select></div>`;
  }
  $("authFields").innerHTML=fields;
}
function openAuth(mode){
  setAuthMode(mode);$("authModal").classList.add("open");
  setTimeout(()=>$("authFields").querySelector("input")?.focus(),60);
}
function closeAuth(){$("authModal").classList.remove("open")}
document.querySelectorAll("[data-open-auth]").forEach(b=>b.addEventListener("click",()=>openAuth(b.dataset.openAuth)));
document.querySelectorAll("[data-auth-tab]").forEach(b=>b.addEventListener("click",()=>setAuthMode(b.dataset.authTab)));
$("closeAuth").addEventListener("click",closeAuth);
$("authModal").addEventListener("click",e=>{if(e.target===$("authModal"))closeAuth()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeAuth()});
$("authForm").addEventListener("submit",e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(e.currentTarget).entries());
  if(currentAuthMode==="register"){
    if(demoUsers.some(u=>u.email.toLowerCase()===data.email.toLowerCase())){
      toast("This email has already been registered in this demo.");return;
    }
    demoUsers.push({name:data.name,email:data.email,phone:data.phone,role:data.role});
    closeAuth();
    toast(`Welcome, ${data.name}! Demo registration successful.`);
  }else{
    closeAuth();
    toast("Demo sign-in submitted. Authentication requires a backend.");
  }
});
$("menuToggle").addEventListener("click",()=>$("topnav").classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(a=>a.addEventListener("click",()=>{
  document.querySelectorAll(".nav-link").forEach(n=>n.classList.remove("active"));
  a.classList.add("active");$("topnav").classList.remove("open");
}));
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",()=>{
  const target=document.querySelector(a.getAttribute("href"));
  if(target){document.querySelectorAll(".nav-link").forEach(n=>n.classList.toggle("active",n.getAttribute("href")===a.getAttribute("href")));}
}));
