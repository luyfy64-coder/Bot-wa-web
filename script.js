// ===== Cursor glow =====
const glow = document.getElementById('cursorGlow');
let mx = 0, my = 0, gx = 0, gy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
});

function animateGlow(){
  gx += (mx - gx) * 0.15;
  gy += (my - gy) * 0.15;
  if (glow) glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%,-50%)`;
  requestAnimationFrame(animateGlow);
}
animateGlow();

// ===== Navbar scroll =====
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, {passive:true});

// ===== Reveal on scroll =====
const io = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if(e.isIntersecting){
      setTimeout(() => e.target.classList.add('on'), i * 60);
      io.unobserve(e.target);
    }
  });
}, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== Counter animation =====
function countUp(el, target, dur = 1800){
  if (!el) return;
  const start = performance.now();
  const suffix = target === 99 ? '.9' : '+';
  const step = now => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('id-ID');
    if(p < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString('id-ID') + suffix;
  };
  requestAnimationFrame(step);
}

const statsEl = document.querySelector('.stats');
if (statsEl) {
  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        countUp(document.getElementById('stat1'), 12);
        countUp(document.getElementById('stat2'), 5000);
        countUp(document.getElementById('stat3'), 99);
        statObserver.disconnect();
      }
    });
  }, {threshold:0.5});
  statObserver.observe(statsEl);
}

// ===== Smooth close other details =====
document.querySelectorAll('details').forEach(d => {
  d.addEventListener('toggle', () => {
    if(d.open){
      document.querySelectorAll('details').forEach(o => {
        if(o !== d) o.open = false;
      });
    }
  });
});

// ===== Button ripple =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e){
    const r = document.createElement('span');
    const size = Math.max(this.offsetWidth, this.offsetHeight);
    const rect = this.getBoundingClientRect();
    r.style.cssText = `
      position:absolute;width:${size}px;height:${size}px;
      left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px;
      background:rgba(255,255,255,.4);border-radius:50%;
      transform:scale(0);animation:ripple .6s ease-out;pointer-events:none;
    `;
    if(getComputedStyle(this).position === 'static') this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(r);
    setTimeout(() => r.remove(), 600);
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple{to{transform:scale(2.5);opacity:0}}`;
document.head.appendChild(rippleStyle);

// ===== Demo chat animation loop =====
(function initDemoLoop(){
  const body = document.querySelector('.chat-body');
  if(!body) return;

  setInterval(() => {
    body.querySelectorAll('.bubble').forEach(b => {
      b.style.animation = 'none';
      b.offsetHeight;
      b.style.animation = '';
    });
  }, 8000);
})();

// ===== Hover tilt pada phone =====
const phone = document.querySelector('.demo-phone');
if(phone){
  phone.addEventListener('mousemove', e => {
    const r = phone.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    phone.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
  });
  phone.addEventListener('mouseleave', () => {
    phone.style.transform = '';
  });
}
