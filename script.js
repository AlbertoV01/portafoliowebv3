/**
 * ========================================================
 * AAA GAME UI INTERACTION ENGINE (Cyberpunk / Destiny 2)
 * File: script.js
 * ========================================================
 */

// 1. HOLOGRAPHIC SCANNER & DYNAMIC MOUSE-FOLLOW GLOW
function initHoloScanner() {
  const cards = document.querySelectorAll('.mission-card');
  
  cards.forEach(card => {
    // Dynamically calculate cursor position relative to the card
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Set CSS variables for holographic spotlight & scanner beam
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    // Optional audio feedback on entering target card
    card.addEventListener('mouseenter', () => {
      if (window.AudioEngine && typeof window.AudioEngine.play === 'function') {
        window.AudioEngine.play('hover');
      }
    });
  });
}

// 2. HERO SECTION SUBTITLE TYPING EFFECT ANIMATION
function initHeroTyping() {
  const subtitleEl = document.getElementById('hero-typing-subtitle');
  if (!subtitleEl) return;

  const titles = [
    "ING. EN SISTEMAS COMPUTACIONALES",
    "DESARROLLADOR DE SOFTWARE",
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function typeSequence() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      subtitleEl.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      subtitleEl.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 65 + Math.random() * 45; // Organic mechanical keystroke jitter
    }

    // Finished typing full word
    if (!isDeleting && charIndex === currentTitle.length) {
      typingSpeed = 2400; // Wait time at completed title
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting, proceed to next title
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 450;
    }

    setTimeout(typeSequence, typingSpeed);
  }

  // Clear placeholder and begin typing sequence
  subtitleEl.textContent = '';
  setTimeout(typeSequence, 600);
}

// 3. FUNCTIONAL MISSION / PROJECT FILTER (Todas, Web, Mobile, AI/Cloud)
function filterMissions(category) {
  if (window.AudioEngine && typeof window.AudioEngine.play === 'function') {
    window.AudioEngine.play('click');
  }

  const cards = document.querySelectorAll('.mission-card');
  const buttons = document.querySelectorAll('.mission-filter-btn');

  // Update button active state styling
  buttons.forEach(btn => {
    const filterValue = btn.getAttribute('data-filter');
    if (filterValue === category) {
      btn.className = 'mission-filter-btn px-4 py-2 bg-cyanGlow text-black border border-cyanGlow font-bold uppercase tracking-wider clip-tag shadow-cyan-glow transition-all cursor-pointer';
    } else {
      btn.className = 'mission-filter-btn px-4 py-2 bg-panel text-slate-300 border border-slate-800 hover:border-cyanGlow font-bold uppercase tracking-wider clip-tag transition-all cursor-pointer';
    }
  });

  // Filter mission cards with smooth holographic reveal
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
      card.style.opacity = '0';
      card.style.transform = 'translateY(12px) scale(0.98)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, 15);
    } else {
      card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      card.style.opacity = '0';
      card.style.transform = 'translateY(12px) scale(0.98)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 200);
    }
  });

  // Refresh vector icons
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Expose filterMissions to window for inline onclick handlers
window.filterMissions = filterMissions;

// Initialize all interactions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initHoloScanner();
  initHeroTyping();
});

// Fallback in case DOMContentLoaded has already fired
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initHoloScanner();
  initHeroTyping();
}
