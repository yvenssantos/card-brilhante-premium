/**
 * Card Brilhante Premium - Efeitos especiais e acessibilidade
 * - Efeito de brilho líquido, partículas, tilt 3D e animações GSAP
 */

/* -- Efeito de brilho líquido -- */
const card = document.querySelector('.card-premium');
const liquidGlow = document.querySelector('.liquid-glow');

function updateLiquidGlow(e) {
  const rect = card.getBoundingClientRect();
  const x = ((e.touches ? e.touches[0].clientX : e.clientX) - rect.left) / rect.width * 100;
  const y = ((e.touches ? e.touches[0].clientY : e.clientY) - rect.top) / rect.height * 100;
  liquidGlow.style.setProperty('--x', `${x}%`);
  liquidGlow.style.setProperty('--y', `${y}%`);
}
card.addEventListener('mousemove', updateLiquidGlow);
card.addEventListener('touchmove', updateLiquidGlow);
card.addEventListener('mouseleave', () => {
  liquidGlow.style.setProperty('--x', '50%');
  liquidGlow.style.setProperty('--y', '50%');
});

/* -- Partículas explosivas -- */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
  canvas.width = card.offsetWidth;
  canvas.height = card.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function Particle(x, y) {
  this.x = x; this.y = y;
  this.radius = 2 + Math.random() * 2;
  this.color = `rgba(255,85,0,${.45 + Math.random()*.4})`;
  this.vel = { x: (Math.random()-.5)*3.2, y: (Math.random()-.5)*3.2 };
  this.life = 0; this.ttl = 32+Math.random()*28;
}
function spawnParticles(x, y, n=13) {
  for (let i=0; i<n; i++)
    particles.push(new Particle(x, y));
}
function animateParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach((p,i) => {
    p.x += p.vel.x;
    p.y += p.vel.y;
    p.vel.y += 0.04;
    p.life++;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.radius,0,2*Math.PI);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = (1 - p.life/p.ttl);
    ctx.shadowColor = "#ff5500";
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.globalAlpha = 1;
    if (p.life > p.ttl) particles.splice(i,1);
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
card.addEventListener('pointerdown', e => {
  const rect = canvas.getBoundingClientRect();
  spawnParticles((e.clientX-rect.left),(e.clientY-rect.top));
});

/* -- 3D Tilt com fallback -- */
window.addEventListener('DOMContentLoaded', () => {
  if ('VanillaTilt' in window) {
    VanillaTilt.init(card, {
      glare: true,
      "max-glare": 0.32,
      scale: 1.07,
      speed: 600,
      reverse: false
    });
  }
});

/* -- GSAP Animações de entrada -- */
window.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined') {
    gsap.from(".card-premium", {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    });
    gsap.from(".card-content h1", { opacity:0, y:20, duration:0.9, delay:0.28 });
    gsap.from(".btn-premium", { opacity:0, scale:0.8, duration:0.7, delay:0.5 });
  }
});