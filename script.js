/* ══════════════════════════════════════════
   Samaksh Bhardwaj — Portfolio Animations
   ══════════════════════════════════════════ */
document.querySelector('#copyright-year').textContent = new Date().getFullYear();

/* ── Page-load curtain ── */
const curtain = document.querySelector('.samaksh-curtain');
window.addEventListener('load', () => {
  setTimeout(() => curtain.classList.add('open'), 600);
  setTimeout(() => curtain.style.display = 'none', 1500);
});

/* ── Custom cursor ── */
const cur = document.querySelector('.s-cursor');
const trail = document.querySelector('.s-trail');
let mx = -100, my = -100, tx = -100, ty = -100;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx - 4 + 'px'; cur.style.top = my - 4 + 'px'; });
(function loop() { tx += (mx - tx) * 0.15; ty += (my - ty) * 0.15; trail.style.left = tx - 18 + 'px'; trail.style.top = ty - 18 + 'px'; requestAnimationFrame(loop); })();
const hoverSel = 'a,button,.samaksh-capabilities li,.samaksh-project-visual,.samaksh-email-address';
document.addEventListener('mouseover', e => { if (e.target.closest(hoverSel)) { cur.classList.add('grow'); trail.classList.add('grow'); } });
document.addEventListener('mouseout', e => { if (e.target.closest(hoverSel)) { cur.classList.remove('grow'); trail.classList.remove('grow'); } });
document.addEventListener('mouseleave', () => { cur.classList.add('hide'); trail.classList.add('hide'); });
document.addEventListener('mouseenter', () => { cur.classList.remove('hide'); trail.classList.remove('hide'); });

/* ── Magnetic nav links ── */
document.querySelectorAll('.samaksh-section-navigation a').forEach(link => {
  link.addEventListener('mousemove', e => { const r = link.getBoundingClientRect(); link.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`; });
  link.addEventListener('mouseleave', () => link.style.transform = '');
});

/* ── Project cards: hover preview on wodniack-style list rows ── */
const workPreview = document.querySelector('.work-preview');
const previewInner = workPreview ? workPreview.querySelector('.work-preview-inner') : null;
const previewItems = previewInner ? previewInner.children : null;

document.querySelectorAll('.samaksh-work-row').forEach((row, i) => {
  const name = row.dataset.preview;
  /* Stagger reveal applied after observer is defined (work section below) */
  row.dataset.stagger = i * 0.08;

  /* Hover: move + flip floating preview */
  row.addEventListener('mousemove', e => {
    if (!previewInner) return;
    const r = row.getBoundingClientRect();
    const relX = e.clientX - r.left;
    const overLeft = relX < r.width / 2;
    const overTop = (e.clientY - window.innerHeight / 2) < 0;

    const pw = workPreview.offsetWidth || 380;
    const ph = workPreview.offsetHeight || 260;
    let px, py;
    if (overLeft) { px = r.left + r.width + 24; } else { px = r.left - 24 - pw; }
    py = overTop ? r.top + r.height + 24 : r.top - 24 - ph;
    px = Math.max(16, Math.min(px, window.innerWidth - pw - 16));
    py = Math.max(16, Math.min(py, window.innerHeight - ph - 16));
    workPreview.style.left = px + 'px';
    workPreview.style.top = py + 'px';
    workPreview.style.right = 'auto';
  });
  row.addEventListener('mouseenter', () => {
    if (!previewInner) return;
    workPreview.classList.add('active');
    [...previewItems].forEach(el => el.classList.remove('active'));
    const target = previewInner.querySelector('.work-preview-' + name);
    if (target) target.classList.add('active');
  });
  row.addEventListener('mouseleave', () => {
    if (workPreview) workPreview.classList.remove('active');
  });
});

/* ── Ripple effect on CTA links ── */
document.querySelectorAll('.samaksh-email-address, .samaksh-email-shortcut, .samaksh-project-links a, .samaksh-social-links a').forEach(el => {
  el.style.position = 'relative';
  el.style.overflow = 'hidden';
  el.addEventListener('click', function(e) {
    const sp = document.createElement('span');
    sp.classList.add('samaksh-ripple');
    const r = this.getBoundingClientRect();
    const s = Math.max(r.width, r.height);
    sp.style.width = sp.style.height = s + 'px';
    sp.style.left = (e.clientX - r.left - s / 2) + 'px';
    sp.style.top = (e.clientY - r.top - s / 2) + 'px';
    this.appendChild(sp);
    setTimeout(() => sp.remove(), 600);
  });
});

/* ── Scroll progress bar ── */
const pbar = document.querySelector('.samaksh-progress-bar');
function updateProg() { const s = window.scrollY, t = document.documentElement.scrollHeight - window.innerHeight; pbar.style.width = t > 0 ? (s / t * 100) + '%' : '0%'; }
window.addEventListener('scroll', updateProg, { passive: true });
updateProg();

/* ── Glitch effect on h1 hover ── */
const h1 = document.querySelector('.samaksh-opening h1');
if (h1) { h1.setAttribute('data-text', h1.textContent); h1.addEventListener('mouseenter', () => h1.classList.add('g-active')); h1.addEventListener('mouseleave', () => h1.classList.remove('g-active')); }

/* ── Floating particles ── */
const pCont = document.querySelector('.samaksh-particles');
if (pCont) { for (let i = 0; i < 20; i++) { const p = document.createElement('span'); p.classList.add('samaksh-particle'); p.style.left = Math.random() * 100 + '%'; p.style.top = (60 + Math.random() * 40) + '%'; p.style.animationDuration = (6 + Math.random() * 10) + 's'; p.style.animationDelay = (Math.random() * 8) + 's'; p.style.width = p.style.height = (2 + Math.random() * 3) + 'px'; pCont.appendChild(p); } }

/* ── Falling sakura petals ── */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
  const petalLayer = document.createElement('div');
  petalLayer.className = 's-petals';
  petalLayer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(petalLayer);
  const glyphs = ['❀', '✿', '✾', '🌸', '💮'];
  for (let i = 0; i < 12; i++) {
    const petal = document.createElement('span');
    petal.className = 's-petal';
    petal.textContent = glyphs[i % glyphs.length];
    petal.style.left = Math.random() * 100 + '%';
    petal.style.fontSize = 12 + Math.random() * 14 + 'px';
    petal.style.animationDuration = 11 + Math.random() * 12 + 's';
    petal.style.animationDelay = -Math.random() * 20 + 's';
    petalLayer.appendChild(petal);
  }
}

/* ── Word-by-word heading reveal ── */
function splitWords(sel) {
  document.querySelectorAll(sel).forEach(el => {
    const html = el.innerHTML;
    el.classList.add('samaksh-word-reveal');
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    let out = '';
    function walk(n) {
      if (n.nodeType === 3) { n.textContent.split(/(\s+)/).forEach(w => { out += w.trim() ? `<span class="samaksh-word">${w}</span>` : w; }); }
      else if (n.nodeType === 1) { let tag = `<${n.tagName.toLowerCase()}`; for (const a of n.attributes) tag += ` ${a.name}="${a.value}"`; tag += '>'; out += tag; n.childNodes.forEach(walk); out += `</${n.tagName.toLowerCase()}>`; }
    }
    tmp.childNodes.forEach(walk);
    el.innerHTML = out;
  });
}
splitWords('.samaksh-approach h2');
splitWords('.samaksh-work-introduction h2');
splitWords('.samaksh-contact h2');

/* ══════════════════════════════════════════
   UNIFIED SCROLL REVEAL — ONE OBSERVER
   ══════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const cls = el.dataset.reveal;
    if (cls) el.classList.add(...cls.split(' '));
    /* Word reveal: set staggered delays */
    if (el.classList.contains('samaksh-word-reveal')) {
      el.querySelectorAll('.samaksh-word').forEach((w, i) => { w.style.transitionDelay = (i * 0.05) + 's'; });
    }
    revealObserver.unobserve(el);
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

/* Helper: tag an element for reveal */
function rev(selector, classes, delay) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.dataset.reveal = classes;
    if (delay) el.style.transitionDelay = (delay(i, el) || 0) + 's';
    revealObserver.observe(el);
  });
}

/* ── Approach section ── */
rev('.samaksh-approach .samaksh-index', 'sr v');
rev('.samaksh-approach h2', 'sr v');
rev('.samaksh-approach div > p', 'sr v', () => 0.3);

/* Approach quote mark */
const aq = document.createElement('span');
aq.classList.add('samaksh-approach-quote');
aq.textContent = '"';
document.querySelector('.samaksh-approach')?.prepend(aq);
aq.dataset.reveal = 'v';
revealObserver.observe(aq);

/* Approach h2 letter-spacing */
const aH2 = document.querySelector('.samaksh-approach h2');
if (aH2) { const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) { setTimeout(() => aH2.classList.add('spaced'), 600); obs.disconnect(); } }, { threshold: 0.3 }); obs.observe(aH2); }

/* Capability tags orbital */
document.querySelectorAll('.samaksh-capabilities li').forEach((li, i) => {
  li.style.transitionDelay = (i * 0.1 + 0.3) + 's';
  li.dataset.reveal = 'sr-s v';
  revealObserver.observe(li);
});

/* Capability wave on hover */
document.querySelectorAll('.samaksh-capabilities').forEach(ul => {
  ul.addEventListener('mouseenter', () => {
    ul.querySelectorAll('li').forEach((li, i) => {
      setTimeout(() => { li.classList.add('wave'); setTimeout(() => li.classList.remove('wave'), 400); }, i * 80);
    });
  });
});

/* ── Work section ── */
rev('.samaksh-work-introduction .samaksh-index', 'sr v');
rev('.samaksh-work-introduction h2', 'sr v');

/* Work heading scale on scroll */
const wH2 = document.querySelector('.samaksh-work-introduction h2');
if (wH2) { let t = false; window.addEventListener('scroll', () => { if (!t) { requestAnimationFrame(() => { const p = 1 - (wH2.getBoundingClientRect().top / window.innerHeight); wH2.style.transform = `scale(${Math.max(Math.min(1 + p * 0.03, 1.04), 1)})`; t = false; }); t = true; } }, { passive: true }); }

/* Project list rows — staggered reveal (observer defined above) */
document.querySelectorAll('.samaksh-work-row').forEach((row, i) => {
  row.dataset.reveal = 'v';
  row.style.transitionDelay = (row.dataset.stagger || (i * 0.08)) + 's';
  revealObserver.observe(row);
});

/* ── Contact section ── */
rev('.samaksh-contact .samaksh-index', 'sr v');
rev('.samaksh-contact h2', 'sr-mask v');

/* Contact decorative line */
const cLine = document.createElement('span');
cLine.classList.add('samaksh-contact-line');
document.querySelector('.samaksh-contact h2')?.after(cLine);
cLine.dataset.reveal = 'v';
revealObserver.observe(cLine);

/* Email address: letter-by-letter reveal */
const emailEl = document.querySelector('.samaksh-email-address');
if (emailEl) {
  const arrow = emailEl.querySelector('span');
  const text = emailEl.textContent.trim();
  emailEl.textContent = '';
  text.split('').forEach((ch, i) => {
    const s = document.createElement('span');
    s.classList.add('samaksh-email-char');
    s.textContent = ch === ' ' ? '\u00A0' : ch;
    s.style.opacity = '0';
    s.style.transform = 'translateY(8px)';
    s.style.transitionDelay = (i * 0.035) + 's';
    emailEl.appendChild(s);
  });
  if (arrow) emailEl.appendChild(arrow);

  const eObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('v');
        entry.target.querySelectorAll('.samaksh-email-char').forEach(ch => { ch.classList.add('on'); ch.style.opacity = '1'; ch.style.transform = 'translateY(0)'; });
        eObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3, rootMargin: '0px 0px -10% 0px' });
  eObs.observe(emailEl);
}

/* Social links bounce-in */
document.querySelectorAll('.samaksh-social-links a').forEach((a, i) => {
  a.dataset.reveal = 'sr-bounce v';
  a.style.transitionDelay = (i * 0.15 + 0.4) + 's';
  revealObserver.observe(a);
});

/* Footer reveal */
const ft = document.querySelector('.samaksh-footer');
if (ft) { ft.dataset.reveal = 'v'; revealObserver.observe(ft); }

/* ── Side progress dots ── */
const workSec = document.querySelector('.samaksh-selected-work');
const cards = document.querySelectorAll('.samaksh-project');
if (workSec && cards.length) {
  const ctn = document.createElement('div');
  ctn.classList.add('samaksh-work-progress');
  cards.forEach(() => { const d = document.createElement('span'); d.classList.add('samaksh-work-progress-dot'); ctn.appendChild(d); });
  document.body.appendChild(ctn);
  const dots = ctn.querySelectorAll('.samaksh-work-progress-dot');
  dots[0]?.classList.add('on');

  const pObs = new IntersectionObserver(e => { ctn.classList.toggle('vis', e[0].isIntersecting); }, { threshold: 0.1 });
  pObs.observe(workSec);

  cards.forEach((card, i) => {
    const dObs = new IntersectionObserver(e => { if (e[0].isIntersecting) { dots.forEach(d => d.classList.remove('on')); dots[i]?.classList.add('on'); } }, { threshold: 0.5 });
    dObs.observe(card);
  });
}

/* ── Smooth nav active state ── */
const secs = document.querySelectorAll('section[id]');
const nLinks = document.querySelectorAll('.samaksh-section-navigation a');
const sObs = new IntersectionObserver(e => { e.forEach(en => { if (en.isIntersecting) nLinks.forEach(l => { l.style.color = l.getAttribute('href') === '#' + en.target.id ? '#c93a66' : ''; }); }); }, { threshold: 0.3 });
secs.forEach(s => sObs.observe(s));

/* ══════════════════════════════════════════
   WODNIACK-STYLE CREATIVE ANIMATIONS
   ══════════════════════════════════════════ */

/* ── Text scramble effect (hero) ── */
const scrambleEl = document.querySelector('.samaksh-scramble');
if (scrambleEl) {
  const target = scrambleEl.dataset.text || 'SAMAKSH';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=';
  let interval;
  function display() {
    let frame = 0;
    clearInterval(interval);
    interval = setInterval(() => {
      const done = Math.floor(frame / 4);
      let out = '';
      for (let i = 0; i < target.length; i++) {
        if (i < done) out += target[i];
        else if (target[i] === ' ') out += ' ';
        else out += chars[Math.floor(Math.random() * chars.length)];
      }
      scrambleEl.textContent = out;
      if (frame >= target.length * 4) { clearInterval(interval); scrambleEl.textContent = target; }
      frame++;
    }, 30);
  }
  scrambleEl.addEventListener('mouseenter', display);
  /* Play once on load after curtain */
  setTimeout(display, 900);
}

/* ── Binary backdrop generator ── */
const binaryEl = document.querySelector('.samaksh-binary');
if (binaryEl) {
  for (let i = 0; i < 14; i++) {
    const line = document.createElement('span');
    let bits = '';
    for (let j = 0; j < 90; j++) bits += Math.round(Math.random());
    line.textContent = bits;
    line.style.animationDelay = (i * 0.15) + 's';
    binaryEl.appendChild(line);
  }
}

/* ── Blur-reveal on section content (GSAP-like) ── */
const blurObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('v'); blurObserver.unobserve(entry.target); } });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.samaksh-opening-summary p').forEach(el => { el.classList.add('sr-blur'); blurObserver.observe(el); });
