// ================= INIT DATA =================
if(!localStorage.getItem("bankData")){
  localStorage.setItem("bankData", JSON.stringify({
    balance: 1530.03,
    currency: "EUR",
    transactions: [
      { name:"LIDL SOFIA", type:"Card payment", amount:-12.40 },
      { name:"DSK ATM Sofia", type:"Deposit", amount:150.00 },
      { name:"KAUFLAND BG", type:"Shopping", amount:-18.75 },
      { name:"SHELL BULGARIA", type:"Fuel", amount:-19.20 },
      { name:"DSK ATM Sofia", type:"Deposit", amount:100.00 }
    ]
  }));
}

// ================= GET DATA =================
function getData(){
  return JSON.parse(localStorage.getItem("bankData"));
}

// ================= RENDER BALANCE =================
function renderBalance(){
  const data = getData();

  const balanceEl = document.getElementById("balance");
  const bgnEl = document.getElementById("bgn");

  if(balanceEl){
    balanceEl.innerText = data.balance.toFixed(2) + " EUR";
  }

  if(bgnEl){
    bgnEl.innerText = (data.balance * 1.95).toFixed(2) + " BGN";
  }

  const detailsBalance = document.getElementById("details-balance");
  if(detailsBalance){
    detailsBalance.innerText = data.balance.toFixed(2) + " EUR";
  }
}

// ================= RENDER HOME =================
function renderHomeTransactions(){
  const data = getData();
  const el = document.getElementById("home-transactions");

  if(!el) return;

  el.innerHTML = data.transactions.slice(0,2).map(tx => `
    <div class="home-tx">
      <div>
        <strong>${tx.name}</strong>
        <p>${tx.type}</p>
      </div>
      <span class="${tx.amount > 0 ? 'green' : ''}">
        ${tx.amount > 0 ? '+' : ''}${tx.amount.toFixed(2)} EUR
      </span>
    </div>
  `).join('');
}

// ================= RENDER DETAILS =================
function renderTransactions(){
  const data = getData();
  const el = document.getElementById("transactions");

  if(!el) return;

  el.innerHTML = data.transactions.map(tx => `
    <div class="transaction ${tx.amount > 0 ? 'positive' : ''}">
      <div>
        <strong>${tx.name}</strong>
        <p>${tx.type}</p>
      </div>
      <span>
        ${tx.amount > 0 ? '+' : ''}${tx.amount.toFixed(2)} EUR
      </span>
    </div>
  `).join('');
}

// ================= ADD TRANSACTION =================
function addTransaction(name, type, amount){
  const data = getData();

  data.transactions.unshift({ name, type, amount });
  data.balance += amount;

  localStorage.setItem("bankData", JSON.stringify(data));

  renderBalance();
  renderHomeTransactions();
  renderTransactions();
}

// ================= NAVIGATION =================
function goTo(page){
  document.body.classList.add("fade-out");

  setTimeout(() => {
    window.location.href = page;
  }, 200);
}

// ================= LINK ANIMATION =================
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const href = link.getAttribute("href");

    document.body.classList.add("fade-out");

    setTimeout(() => {
      window.location = href;
    }, 200);
  });
});

// ================= INIT =================
window.onload = () => {
  renderBalance();
  renderHomeTransactions();
  renderTransactions();

  document.body.classList.add("fade-in");

  setTimeout(() => {
    document.body.classList.remove("fade-in");
  }, 200);
};