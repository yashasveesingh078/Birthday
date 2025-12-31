const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* Elegant pastel palette */
const colors = [
  "#c9b37e",
  "#d6c89a",
  "#bfa76f",
  "#e4d9b5",
  "#b7d6c5",
  "#d4c3e6"
];

const confetti = [];

for (let i = 0; i < 160; i++) {
  confetti.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 5 + 1,
    speed: Math.random() * 0.6 + 0.3,
    drift: Math.random() * 2 - 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: Math.random() > 0.5 ? "circle" : "square",
    angle: Math.random() * 360
  });
}

function draw() {
  ctx.clearRect(0, 0, w, h);

  confetti.forEach(c => {
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(c.angle);

    ctx.fillStyle = c.color;
    ctx.globalAlpha = 0.8;

    if (c.shape === "circle") {
      ctx.beginPath();
      ctx.arc(0, 0, c.r, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(-c.r, -c.r, c.r * 2, c.r * 2);
    }

    ctx.restore();
  });

  update();
  requestAnimationFrame(draw);
}

function update() {
  confetti.forEach(c => {
    c.y += c.speed;
    c.x += c.drift * 0.3;
    c.angle += 0.01;

    if (c.y > h) {
      c.y = -10;
      c.x = Math.random() * w;
    }
  });
}

draw();


