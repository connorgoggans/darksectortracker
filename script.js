let maxHealth = 12;
let currentHealth = 12;
let healthHistory = [currentHealth]; // track health changes over time
let healthChanges = ['start']; // track color changes (green/red)
let selectedCharacter = ''; // for storing selected character name

const characterImages = {
  Abbot: "images/abbot.jpg",
  Cook: "images/cook.jpg",
  Miller: "images/miller.jpg",
  Tailor: "images/tailor.jpg",
  Smith: "images/smith.jpg",
  Tanner: "images/tanner.jpg"
};

function startTracking() {
  const charSelect = document.getElementById("charSelect").value;
  const nameInput = document.getElementById("charNameInput").value.trim();

  // Display the character image
  document.getElementById("charDisplay").innerText = nameInput + "'s Health";

  // Show the corresponding image
  if (characterImages[charSelect]) {
    document.getElementById("characterImage").src = characterImages[charSelect];
    document.getElementById("charImage").classList.remove("hidden");
  } else {
    document.getElementById("charImage").classList.add("hidden");
  }

  // Hide the name input section if not using a custom name
  if (charSelect === "Custom") {
    document.getElementById("customNameSection").style.display = "block";
  } else {
    document.getElementById("customNameSection").style.display = "none";
  }

  document.getElementById("character-setup").classList.add("hidden");
  document.getElementById("tracker").classList.remove("hidden");

  renderHealth();
  drawChart();
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
  const previousHealth = currentHealth;
  currentHealth += amount;

  // Ensure health is within bounds
  if (currentHealth > maxHealth) currentHealth = maxHealth;
  if (currentHealth < 0) currentHealth = 0;

  // Track the change direction (green for +, red for -)
  healthChanges.push(amount >= 0 ? 'green' : 'red');
  healthHistory.push(currentHealth);

  renderHealth();
  drawChart();
}

function resetHealth() {
  currentHealth = maxHealth;
  healthHistory = [currentHealth];
  healthChanges = ['start'];
  renderHealth();
  drawChart();
}

function drawChart() {
  const canvas = document.getElementById("healthChart");
  const ctx = canvas.getContext("2d");

  // Clear canvas before drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const margin = 20;
  const width = canvas.width - margin * 2;
  const height = canvas.height - margin * 2;

  const points = healthHistory;
  const pointCount = points.length;

  // Draw axes
  ctx.strokeStyle = "#888";
  ctx.lineWidth = 1;

  // Y-axis
  ctx.beginPath();
  ctx.moveTo(margin, margin);
  ctx.lineTo(margin, canvas.height - margin);
  ctx.stroke();

  // X-axis
  ctx.beginPath();
  ctx.moveTo(margin, canvas.height - margin);
  ctx.lineTo(canvas.width - margin, canvas.height - margin);
  ctx.stroke();

  // Plot line and fill color based on change direction
  ctx.lineWidth = 2;
  let xStep = width / (pointCount - 1);
  for (let i = 1; i < pointCount; i++) {
    const prevX = margin + (i - 1) * xStep;
    const prevY = canvas.height - margin - (points[i - 1] / maxHealth) * height;
    const x = margin + i * xStep;
    const y = canvas.height - margin - (points[i] / maxHealth) * height;

    // Set line color based on the health change
    ctx.strokeStyle = healthChanges[i] === 'green' ? '#0f0' : '#f00';
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Draw the point
    ctx.fillStyle = healthChanges[i] === 'green' ? '#0f0' : '#f00';
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fill();
  }
}
