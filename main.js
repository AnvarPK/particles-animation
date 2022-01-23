const canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");
const cWidth = window.innerWidth;
const cHeight = window.innerHeight;
canvas.height = cHeight;
canvas.width = cWidth;
const particleArray = [];
let hue = 0;

const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("click", function (e) {
  const { x, y } = e;
  mouse.x = x;
  mouse.y = y;
  for (let i = 0; i < 10; i++) {
    particleArray.push(new Particle());
  }
});

canvas.addEventListener("mousemove", function (e) {
  const { x, y } = e;
  mouse.x = x;
  mouse.y = y;
  for (let i = 0; i < 5; i++) {
    particleArray.push(new Particle());
  }
});

addEventListener("resize", function () {
  canvas.height = window.innerWidth;
  canvas.width = window.innerHeight;
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = "hsl(" + hue + ", 100%, 50%)";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function handleParticle() {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();

    for (let j = i; j < particleArray.length; j++) {
      const dx = particleArray[i].x - particleArray[j].x;
      const dy = particleArray[i].y - particleArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particleArray[i].color;
        // ctx.lineWidth = particleArray[i].size/10;
        ctx.lineWidth = 0.2;
        ctx.moveTo(particleArray[i].x, particleArray[i].y);
        ctx.lineTo(particleArray[j].x, particleArray[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
    if (particleArray[i].size <= 0.3) {
      particleArray.splice(i, 1);
      i--; //to avoid blink effect
    }
  }
}

console.log(particleArray);
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticle();
  hue++;
  requestAnimationFrame(animate);
}

animate();
