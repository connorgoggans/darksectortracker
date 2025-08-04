let maxHealth = 12;
let currentHealth = 12;

function startTracking() {
  const nameInput = document.getElementById("charName").value.trim();
  if (!nameInput) {
    alert("Please enter a character name.");
    return;
  }

  document.getElementById("charDisplay").innerText = nameInput + "'s Health";
  document.getElementById("character-setup").classList.add("hidden");
  document.getElementById("tracker").classList.remove("hidden");

  renderHealth();
}

function renderHealth() {
  const healthBar = document.getElementById("healthBar");
  healthBar.innerHTML = "";

  for (let i = 0; i < maxHealth; i++) {
    const box = document.createElement("div");
    box.className = "health-box" + (i < currentHealth ? " filled" : "");
    healthBar.appendChild(box);
  }
}

function changeHealth(amount) {
  currentHealth += amount;
  if (currentHealth > maxHealth) currentHealth = maxHealth;
  if (currentHealth < 0) currentHealth = 0;
  renderHealth();
}

function resetHealth() {
  currentHealth = maxHealth;
  renderHealth();
}
