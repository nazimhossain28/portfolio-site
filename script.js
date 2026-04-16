// ============================================
// Navigation
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ============================================
// Abstract toggle (event delegation, no inline JS)
// ============================================
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action="toggle-abstract"]');
  if (!btn) return;
  const content = btn.nextElementSibling;
  const isVisible = content.classList.contains('visible');
  content.classList.toggle('visible');
  btn.textContent = isVisible ? 'Show Abstract' : 'Hide Abstract';
});

// ============================================
// Scroll animations
// ============================================
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.timeline-item, .experience-card, .research-card, .achievement-card, .contact-card, .about-content, .interest-tags'
  );

  elements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

// ============================================
// Active nav link on scroll
// ============================================
function initActiveNavTracking() {
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navAnchors.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = 'var(--primary)';
      }
    });
  });
}

// ============================================
// Back to Top
// ============================================
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================
// Timeline scroll progress
// ============================================
function initTimelineProgress() {
  const timeline = document.getElementById('educationTimeline');
  const progressBar = document.getElementById('timelineProgress');
  const items = timeline.querySelectorAll('.timeline-item');
  if (!items.length) return;

  window.addEventListener('scroll', () => {
    const triggerPoint = window.innerHeight * 0.45;
    let lastActiveIndex = -1;

    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < triggerPoint) {
        lastActiveIndex = index;
      }
    });

    items.forEach((item, index) => {
      item.classList.remove('active', 'passed');
      if (index < lastActiveIndex) {
        item.classList.add('passed');
      } else if (index === lastActiveIndex) {
        item.classList.add('active');
      }
    });

    // Update progress bar height
    if (lastActiveIndex >= 0) {
      const activeItem = items[lastActiveIndex];
      const timelineRect = timeline.getBoundingClientRect();
      const markerTop = activeItem.offsetTop + 6 + 7; // top offset + half marker
      progressBar.style.height = markerTop + 'px';
    } else {
      progressBar.style.height = '0px';
    }
  });
}

// ============================================
// Init
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initActiveNavTracking();
  initBackToTop();
  initTimelineProgress();
  document.getElementById('footerYear').textContent = new Date().getFullYear();
});
