const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let columns = Math.floor(canvas.width / 20);
let drops = Array(columns).fill(1);

function drawMatrixRain() {
  ctx.fillStyle = "rgba(0, 31, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0f0";
  ctx.font = "20px monospace";

  for (let i = 0; i < drops.length; i++) {
    const char = "$";
    ctx.fillText(char, i * 20, drops[i] * 20);
    if (drops[i] * 20 > canvas.height || Math.random() > 0.95) {
      drops[i] = 0;
    }
    drops[i]++;
  }

  requestAnimationFrame(drawMatrixRain);
}

drawMatrixRain();

let count = localStorage.getItem("registrationCount") || 0;
document.getElementById("count").innerText = count;

function register() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message");

  if (name && email) {
    count++;
    localStorage.setItem("registrationCount", count);
    document.getElementById("count").innerText = count;
    message.innerHTML = "🎉 Registration Successful!";
  } else {
    message.innerHTML = "❗ Please fill in both fields.";
  }
}
