const policies = [
  {id:"INS-20481", customer:"Priya Sharma", initials:"PS", type:"Health", agent:"Rahul Verma", premium:18500, status:"Active", due:"Oct 30, 2026"},
  {id:"INS-19302", customer:"Arjun Kumar", initials:"AK", type:"Auto", agent:"Sneha Patel", premium:12400, status:"Pending", due:"Nov 02, 2026"},
  {id:"INS-18455", customer:"Meera Reddy", initials:"MR", type:"Auto", agent:"Rahul Verma", premium:9800, status:"Active", due:"Nov 04, 2026"},
  {id:"INS-17290", customer:"Vikram Singh", initials:"VS", type:"Home", agent:"Ananya Das", premium:22600, status:"Active", due:"Nov 12, 2026"},
  {id:"INS-16518", customer:"Kavya Nair", initials:"KN", type:"Life", agent:"Sneha Patel", premium:15600, status:"Expired", due:"Oct 22, 2026"}
];
const agents = [
  {name:"Rahul Verma", email:"rahul@example.com", phone:"+91 98765 12001", status:"Active"},
  {name:"Sneha Patel", email:"sneha@example.com", phone:"+91 98765 12002", status:"Pending"},
  {name:"Ananya Das", email:"ananya@example.com", phone:"+91 98765 12003", status:"Active"}
];
const customers = [
  {name:"Priya Sharma", email:"priya@example.com", phone:"+91 98765 10001", policy:"INS-20481", status:"Active"},
  {name:"Arjun Kumar", email:"arjun@example.com", phone:"+91 98765 10002", policy:"INS-19302", status:"Pending"},
  {name:"Meera Reddy", email:"meera@example.com", phone:"+91 98765 10003", policy:"INS-18455", status:"Active"}
];
const claims = [
  {id:"CLM-1008", customer:"Priya Sharma", type:"Health", amount:25000, status:"Review"},
  {id:"CLM-1007", customer:"Arjun Kumar", type:"Auto", amount:18000, status:"Pending"},
  {id:"CLM-1006", customer:"Meera Reddy", type:"Auto", amount:12000, status:"Active"}
];
const reminders = [
  {title:"Health policy renewal", customer:"Priya Sharma", id:"INS-20481", date:"Oct 30", detail:"In 2 days", type:"orange-bg", symbol:"↻"},
  {title:"Premium payment due", customer:"Arjun Kumar", id:"INS-19302", date:"Nov 02", detail:"In 5 days", type:"blue-bg", symbol:"＄"},
  {title:"Auto policy renewal", customer:"Meera Reddy", id:"INS-18455", date:"Nov 04", detail:"In 7 days", type:"purple-bg", symbol:"↻"}
];
let currentPage = "overview";
let activeRecords = policies;
let toastTimer;

const $ = (selector) => document.querySelector(selector);
const money = (amount) => "₹" + Number(amount).toLocaleString("en-IN");
const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
function notify(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}
function statusClass(status) {
  const normalized = String(status).toLowerCase();
  if (normalized === "active" || normalized === "approved" || normalized === "paid") return "active";
  if (normalized === "pending") return "pending";
  if (normalized === "expired" || normalized === "rejected" || normalized === "overdue") return "expired";
  return "review";
}
function typeClass(type) {
  const t = String(type).toLowerCase();
  return ["health","auto","home","life"].includes(t) ? t : "life";
}
function policyIcon(type) {
  return ({Health:"✚",Auto:"⌁",Home:"⌂",Life:"♡"})[type] || "▤";
}
function renderRows(records, page=currentPage) {
  const body = $("#policyTableBody");
  body.innerHTML = "";
  if (!records.length) {
    body.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:32px;color:#8a95a4">No matching records found.</td></tr>';
    $("#tableCount").textContent = "Showing 0 records";
    return;
  }
  records.forEach((record, index) => {
    let first, second, type, agent, premium, status, icon;
    if (page === "agents") {
      first = record.name; second = record.email; type = "Agent"; agent = record.phone; premium = "—"; status = record.status; icon = "♧";
    } else if (page === "customers") {
      first = record.name; second = record.email; type = "Customer"; agent = record.policy; premium = "—"; status = record.status; icon = "♙";
    } else if (page === "claims") {
      first = record.id; second = record.customer; type = record.type; agent = "Claims team"; premium = money(record.amount); status = record.status; icon = "◈";
    } else {
      first = record.customer; second = record.id; type = record.type; agent = record.agent; premium = money(record.premium); status = record.status; icon = policyIcon(record.type);
    }
    const tr = document.createElement("tr");
    tr.innerHTML = `<td><div class="policy-cell"><div class="policy-icon ${typeClass(type)}">${escapeHTML(icon)}</div><div><strong>${escapeHTML(first)}</strong><small>${escapeHTML(second)}</small></div></div></td><td><span class="type-tag">${escapeHTML(type)}</span></td><td>${escapeHTML(agent)}</td><td style="font-weight:700;color:#354153">${escapeHTML(premium)}</td><td><span class="status ${statusClass(status)}">${escapeHTML(status)}</span></td><td><button class="row-action" data-row="${index}" aria-label="Record actions">⋯</button></td>`;
    body.appendChild(tr);
  });
  $("#tableCount").textContent = `Showing ${records.length} of ${records.length} records`;
  body.querySelectorAll(".row-action").forEach(button => button.addEventListener("click", () => rowAction(records[Number(button.dataset.row)], page)));
}
function rowAction(record, page) {
  if (page === "agents" && record.status === "Pending") {
    if (confirm(`Approve agent ${record.name}?`)) {
      record.status = "Active";
      renderRows(activeRecords, currentPage);
      notify(`${record.name} approved in this demo.`);
    }
    return;
  }
  const label = record.customer || record.name || record.id;
  notify(`Selected: ${label}. This is a frontend demo action.`);
}
function renderReminders() {
  $("#reminderList").innerHTML = reminders.map(r => `<div class="reminder-row"><div class="reminder-symbol ${r.type}">${r.symbol}</div><div class="reminder-info"><strong>${escapeHTML(r.title)}</strong><span>${escapeHTML(r.customer)} · ${escapeHTML(r.id)}</span></div><div class="reminder-date"><strong>${escapeHTML(r.date)}</strong><span>${escapeHTML(r.detail)}</span></div></div>`).join("");
}
function setPage(page) {
  currentPage = page;
  document.querySelectorAll(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.page === page));
  const config = {
    overview:{title:"Good morning, welcome back ✦",subtitle:"Here’s what’s happening with your insurance portfolio today.",table:"Recent policies",sub:"A quick look at recently added policies",records:policies},
    policies:{title:"Policy management",subtitle:"Review, search and manage insurance policies.",table:"All policies",sub:"Policy records across your portfolio",records:policies},
    customers:{title:"Customer directory",subtitle:"Manage policyholders and their contact information.",table:"All customers",sub:"Customer records in your workspace",records:customers},
    agents:{title:"Agent management",subtitle:"Review agents and approve pending registrations.",table:"Registered agents",sub:"Agent accounts and approval status",records:agents},
    payments:{title:"Premium payments",subtitle:"Track premium amounts and follow up on due payments.",table:"Payment overview",sub:"Premium records linked to policies",records:policies},
    claims:{title:"Claims management",subtitle:"Review submitted claims and follow their status.",table:"Recent claims",sub:"Claims submitted by policyholders",records:claims},
    alerts:{title:"SMS & reminders",subtitle:"Review upcoming renewals and send demo reminders.",table:"Policies needing attention",sub:"Send an on-screen reminder preview for a selected policy",records:policies.filter(p => p.status !== "Active" || p.due.includes("Oct") || p.due.includes("Nov"))}
  };
  const c = config[page] || config.overview;
  $("#pageTitle").textContent = c.title;
  $("#pageSubtitle").textContent = c.subtitle;
  $("#tableTitle").textContent = c.table;
  $("#tableSubtitle").textContent = c.sub;
  activeRecords = c.records;
  $("#searchInput").value = "";
  renderRows(activeRecords, page);
  if (page === "alerts") $("#newPolicyButton").textContent = "＋ Send reminder";
  else if (page === "agents") $("#newPolicyButton").textContent = "＋ Register agent";
  else if (page === "customers") $("#newPolicyButton").textContent = "＋ Add customer";
  else if (page === "claims") $("#newPolicyButton").textContent = "＋ File claim";
  else $("#newPolicyButton").textContent = "＋ New policy";
}
function field(label, name, placeholder="", type="text", full=false, options=null) {
  const input = options
    ? `<select id="${name}" name="${name}" required>${options.map(o=>`<option value="${escapeHTML(o)}">${escapeHTML(o)}</option>`).join("")}</select>`
    : `<input id="${name}" name="${name}" type="${type}" placeholder="${escapeHTML(placeholder)}" ${type==="number"?'min="0"':''} required>`;
  return `<div class="field ${full?"full":""}"><label for="${name}">${label}</label>${input}</div>`;
}
function openForm(kind) {
  const title = $("#modalTitle"), description = $("#modalDescription"), fields = $("#modalFields");
  let html = "";
  if (kind === "policy") {
    title.textContent = "Create a policy";
    description.textContent = "Add a policy record to the demo workspace.";
    html = field("Customer name","customerName","e.g. Ananya Rao") + field("Policy type","policyType","","text",false,["Health","Auto","Home","Life"]) + field("Agent name","agentName","e.g. Rahul Verma") + field("Annual premium (₹)","premium","15000","number") + field("Due date","dueDate","","date") + field("Status","policyStatus","","text",false,["Active","Pending"]);
  } else if (kind === "agent") {
    title.textContent = "Register an agent"; description.textContent = "New agent registrations are pending admin approval in this demo.";
    html = field("Agent name","agentName","Full name") + field("Email address","agentEmail","name@example.com","email") + field("Phone number","agentPhone","+91 98765 00000") + field("Status","agentStatus","","text",false,["Pending","Active"]);
  } else if (kind === "customer") {
    title.textContent = "Add a customer"; description.textContent = "Create a customer record for policy management.";
    html = field("Customer name","customerName","Full name") + field("Email address","customerEmail","name@example.com","email") + field("Phone number","customerPhone","+91 98765 00000") + field("Policy ID","customerPolicy","INS-00000");
  } else if (kind === "claim") {
    title.textContent = "File a claim"; description.textContent = "Add a sample claim record.";
    html = field("Customer name","claimCustomer","Full name") + field("Policy type","claimType","","text",false,["Health","Auto","Home","Life"]) + field("Claim amount (₹)","claimAmount","10000","number") + field("Status","claimStatus","","text",false,["Pending","Review"]);
  } else {
    title.textContent = "Send a reminder"; description.textContent = "Preview a reminder message. No SMS will actually be sent from this static website.";
    html = field("Policyholder","alertCustomer","Customer name") + field("Mobile number","alertPhone","+91 98765 00000","tel") + field("Reminder type","alertType","","text",false,["Premium payment due","Policy renewal","Overdue payment"]) + field("Due date","alertDate","","date");
  }
  fields.innerHTML = html;
  $("#recordForm").dataset.kind = kind;
  $("#recordDialog").showModal();
}
function handleSave(event) {
  event.preventDefault();
  const kind = $("#recordForm").dataset.kind;
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  if (kind === "policy") {
    policies.unshift({id:"INS-"+Math.floor(20000+Math.random()*70000),customer:data.customerName,initials:data.customerName.split(/\s+/).map(x=>x[0]).join("").slice(0,2).toUpperCase(),type:data.policyType,agent:data.agentName,premium:Number(data.premium),status:data.policyStatus,due:data.dueDate || "Not set"});
    $("#statPolicies").textContent = Number($("#statPolicies").textContent.replace(",","")) + 1;
    notify("Policy saved to the current demo session.");
    setPage("policies");
  } else if (kind === "agent") {
    agents.unshift({name:data.agentName,email:data.agentEmail,phone:data.agentPhone,status:data.agentStatus});
    notify("Agent registration added to the demo workspace.");
    setPage("agents");
  } else if (kind === "customer") {
    customers.unshift({name:data.customerName,email:data.customerEmail,phone:data.customerPhone,policy:data.customerPolicy,status:"Active"});
    notify("Customer added to the demo workspace.");
    setPage("customers");
  } else if (kind === "claim") {
    claims.unshift({id:"CLM-"+Math.floor(1000+Math.random()*9000),customer:data.claimCustomer,type:data.claimType,amount:Number(data.claimAmount),status:data.claimStatus});
    notify("Claim record added to the demo workspace.");
    setPage("claims");
  } else {
    const message = `InsureEasy reminder preview for ${data.alertCustomer}: ${data.alertType}. Due date: ${data.alertDate || "please check your policy details"}. Please log in to review your policy.`;
    notify("Reminder preview prepared. SMS delivery is not connected.");
    alert(message);
    setPage("alerts");
  }
  $("#recordDialog").close();
}
document.querySelectorAll(".nav-item").forEach(item => item.addEventListener("click", () => setPage(item.dataset.page)));
document.querySelectorAll("[data-goto]").forEach(button => button.addEventListener("click", () => setPage(button.dataset.goto)));
$("#newPolicyButton").addEventListener("click", () => {
  const kind = currentPage === "agents" ? "agent" : currentPage === "customers" ? "customer" : currentPage === "claims" ? "claim" : currentPage === "alerts" ? "alert" : "policy";
  openForm(kind);
});
$("#recordForm").addEventListener("submit", handleSave);
$("#closeModal").addEventListener("click", () => $("#recordDialog").close());
$("#cancelModal").addEventListener("click", () => $("#recordDialog").close());
$("#searchInput").addEventListener("input", event => {
  const q = event.target.value.toLowerCase().trim();
  const filtered = activeRecords.filter(record => Object.values(record).some(value => String(value).toLowerCase().includes(q)));
  renderRows(filtered, currentPage);
});
$("#filterButton").addEventListener("click", () => {
  const choice = prompt("Filter by status: type Active, Pending, Expired, or leave blank to show all.");
  if (choice === null) return;
  if (!choice.trim()) { renderRows(activeRecords, currentPage); return; }
  const filtered = activeRecords.filter(record => String(record.status).toLowerCase() === choice.trim().toLowerCase());
  renderRows(filtered, currentPage);
  notify(`Status filter applied: ${choice}`);
});
$("#exportButton").addEventListener("click", () => {
  const rows = [["Policy ID","Customer","Type","Agent","Premium","Status","Due date"],...policies.map(p=>[p.id,p.customer,p.type,p.agent,p.premium,p.status,p.due])];
  const csv = rows.map(row=>row.map(value=>`"${String(value).replace(/"/g,'""')}"`).join(",")).join("\r\n");
  const blob = new Blob([csv],{type:"text/csv;charset=utf-8;"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href=url; a.download="insureeasy-policies.csv"; a.click(); URL.revokeObjectURL(url);
  notify("Policy report exported as CSV.");
});
$("#portfolioPeriod").addEventListener("click", () => notify("Portfolio chart is displaying sample monthly data."));
$("#profileButton").addEventListener("click", () => notify("Sample User · Demo workspace"));
$("#helpButton").addEventListener("click", () => alert("InsureEasy demo help\n\n• Use the left navigation to view policies, agents, customers, claims and reminders.\n• Use the top-right action to add sample records.\n• Search and filter the table, or export policies to CSV.\n• This frontend demo does not connect to a real database, login service or SMS gateway."));
renderReminders();
renderRows(policies, "overview");
