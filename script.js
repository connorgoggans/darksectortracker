let maxHealth = 12;
let currentHealth = 12;
let healthHistory = [currentHealth];

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
  currentHealth += amount;
  if (currentHealth > maxHealth) currentHealth = maxHealth;
  if (currentHealth < 0) currentHealth = 0;

  healthHistory.push(currentHealth);
  renderHealth();
  drawChart();
}

function resetHealth() {
  currentHealth = maxHealth;
  healthHistory = [currentHealth];
  renderHealth();
  drawChart();
}

function drawChart() {
  const canvas = document.getElementById("healthChart");
  const ctx = canvas.getContext("2d");

  // Clear canvas
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

  // Plot line
  if (pointCount > 1) {
    ctx.strokeStyle = "#0f0";
    ctx.lineWidth = 2;
    ctx.beginPath();
    const xStep = width / (pointCount - 1);
    for (let i = 0; i < pointCount; i++) {
      const x = margin + i * xStep;
      const y = canvas.height - margin - (points[i] / maxHealth) * height;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }

  // Draw dots
  for (let i = 0; i < pointCount; i++) {
    const x = margin + i * (width / (pointCount - 1));
    const y = canvas.height - margin - (points[i] / maxHealth) * height;
    ctx.fillStyle = "#0f0";
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fill();
  }
}
