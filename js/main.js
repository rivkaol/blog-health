/* ===================================
   Main JavaScript — Rivka Holtzberg
   =================================== */

// Header scroll effect
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Close mobile nav on outside click
document.addEventListener('click', (e) => {
  if (mobileNav && mobileNav.classList.contains('open') &&
      !mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Scroll reveal animation
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Animated counter for stats
function animateCounter(el, target, duration = 1600) {
  const start = performance.now();
  const isPlus = el.dataset.suffix === '+';
  el.textContent = '0' + (isPlus ? '+' : '');

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(eased * target);
    el.textContent = value + (isPlus ? '+' : '');
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('[data-count]');
      counters.forEach(counter => {
        animateCounter(counter, parseInt(counter.dataset.count));
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);

// Newsletter form submission
document.querySelectorAll('.newsletter-form, .footer-newsletter-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button');
    if (!input || !input.value) return;
    btn.textContent = 'נרשמת!';
    btn.style.background = 'var(--color-green-dark)';
    input.value = '';
    setTimeout(() => {
      btn.textContent = 'הרשמה';
      btn.style.background = '';
    }, 3000);
  });
});

// Freebie download forms
document.querySelectorAll('.freebie-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const success = form.nextElementSibling;
    if (success && success.classList.contains('freebie-success')) {
      form.style.display = 'none';
      success.style.display = 'block';
    }
  });
});

// Contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'ההודעה נשלחה!';
    btn.style.background = 'var(--color-green-dark)';
    contactForm.reset();
    setTimeout(() => {
      btn.textContent = 'שליחה';
      btn.style.background = '';
    }, 4000);
  });
}

// Blog category filter
const filterBtns = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');

if (filterBtns.length && blogCards.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;
      blogCards.forEach(card => {
        const show = category === 'all' || card.dataset.category === category;
        card.style.display = show ? 'block' : 'none';
      });
    });
  });
}
