const year = document.querySelector('#year');
year.textContent = new Date().getFullYear();

const menuToggle = document.querySelector('#menuToggle');
const navLinks = document.querySelector('#navLinks');
const topbar = document.querySelector('#topbar');
const navItems = [...document.querySelectorAll('.nav-links a')];
const sections = navItems
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const markActiveLink = () => {
  const scrollY = window.scrollY + 160;
  let currentId = sections[0]?.id;

  for (const section of sections) {
    if (scrollY >= section.offsetTop) currentId = section.id;
  }

  navItems.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
};

window.addEventListener('scroll', () => {
  topbar.classList.toggle('scrolled', window.scrollY > 10);
  markActiveLink();
});

markActiveLink();

const canvas = document.querySelector('#bg-canvas');
const ctx = canvas.getContext('2d');
let dots = [];
let animationFrame;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const dotCount = Math.min(58, Math.max(28, Math.floor(window.innerWidth / 26)));
  dots = Array.from({ length: dotCount }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 1.8 + 0.8,
    speedX: (Math.random() - 0.5) * 0.24,
    speedY: (Math.random() - 0.5) * 0.24,
    opacity: Math.random() * 0.35 + 0.12,
  }));
}

function drawBackground() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (const dot of dots) {
    dot.x += dot.speedX;
    dot.y += dot.speedY;

    if (dot.x < -10) dot.x = window.innerWidth + 10;
    if (dot.x > window.innerWidth + 10) dot.x = -10;
    if (dot.y < -10) dot.y = window.innerHeight + 10;
    if (dot.y > window.innerHeight + 10) dot.y = -10;

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(92, 100, 112, ${dot.opacity})`;
    ctx.fill();
  }

  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 112) {
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.strokeStyle = `rgba(120, 128, 138, ${0.11 * (1 - distance / 112)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  if (!prefersReducedMotion) {
    animationFrame = requestAnimationFrame(drawBackground);
  }
}

resizeCanvas();
drawBackground();

window.addEventListener('resize', () => {
  cancelAnimationFrame(animationFrame);
  resizeCanvas();
  drawBackground();
});
