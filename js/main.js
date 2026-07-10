/* ==========================================================
   DEEKSHITH GOWDA — Portfolio Main JavaScript
   Premium Dark-Themed Developer Portfolio
   All features wrapped in DOMContentLoaded
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ----------------------------------------------------------
     1. PAGE LOADER
     ---------------------------------------------------------- */
  const loader = document.getElementById('loader');

  window.addEventListener('load', () => {
    if (!loader) return;
    setTimeout(() => {
      loader.classList.add('loader-hidden');
      loader.addEventListener('transitionend', () => {
        loader.style.display = 'none';
      }, { once: true });
    }, 1500);
  });

  // Fallback: if transitionend never fires, hide after 3s total
  setTimeout(() => {
    if (loader && !loader.classList.contains('loader-hidden')) {
      loader.classList.add('loader-hidden');
      loader.style.display = 'none';
    }
  }, 3500);

  /* ----------------------------------------------------------
     2. AOS INITIALIZATION
     ---------------------------------------------------------- */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }

  /* ----------------------------------------------------------
     3. TYPED.JS TYPING EFFECT
     ---------------------------------------------------------- */
  const typingTarget = document.getElementById('typingText');
  if (typingTarget && typeof Typed !== 'undefined') {
    new Typed('#typingText', {
      strings: [
        'Java Full Stack Developer',
        'Backend Developer',
        'Spring & Hibernate Developer',
        'Java Enthusiast',
        'Building Scalable Web Applications'
      ],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 1500,
      loop: true,
    });
  }

  /* ----------------------------------------------------------
     4. NAVBAR SCROLL EFFECT  +  15. HIDE ON SCROLL DOWN
     ---------------------------------------------------------- */
  const navbar = document.querySelector('.navbar');
  const header = document.getElementById('main-header');
  let lastScrollY = window.scrollY;

  const handleNavbarScroll = () => {
    const currentScrollY = window.scrollY;

    // 4 — Add / remove 'scrolled' class
    if (navbar) {
      if (currentScrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // 15 — Hide on scroll down, show on scroll up
    if (header) {
      if (currentScrollY > 400 && currentScrollY > lastScrollY) {
        header.classList.add('nav-hidden');
      } else {
        header.classList.remove('nav-hidden');
      }
    }

    lastScrollY = currentScrollY;
  };

  /* ----------------------------------------------------------
     5. MOBILE MENU TOGGLE
     ---------------------------------------------------------- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const mobileOverlay = document.getElementById('mobileOverlay');

  const closeMenu = () => {
    if (menuToggle) menuToggle.classList.remove('active');
    if (navLinks) navLinks.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      if (navLinks) navLinks.classList.toggle('active');
      if (mobileOverlay) mobileOverlay.classList.toggle('active');
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMenu);
  }

  // Close menu on nav-link click (mobile)
  const navLinkItems = document.querySelectorAll('#navLinks .nav-link');
  navLinkItems.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  /* ----------------------------------------------------------
     6. ACTIVE NAV LINK ON SCROLL
     ---------------------------------------------------------- */
  const sections = document.querySelectorAll(
    '#hero, #about, #skills, #projects, #experience, #certificates, #contact'
  );

  const highlightNavLink = () => {
    const scrollPos = window.scrollY + 150; // offset for fixed navbar

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinkItems.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  /* ----------------------------------------------------------
     10. BACK TO TOP BUTTON
     ---------------------------------------------------------- */
  const backToTop = document.getElementById('backToTop');

  const handleBackToTopVisibility = () => {
    if (!backToTop) return;
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------
     CONSOLIDATED SCROLL LISTENER
     (features 4, 6, 10, 15 all fire on scroll)
     ---------------------------------------------------------- */
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        handleNavbarScroll();
        highlightNavLink();
        handleBackToTopVisibility();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  /* ----------------------------------------------------------
     7. SKILLS TAB SWITCHING
     ---------------------------------------------------------- */
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillPanels = document.querySelectorAll('.skill-panel');

  /**
   * Animate progress bars inside a given panel element.
   * Resets widths to 0 first, then sets them to data-width.
   */
  const animateProgressBars = (panel) => {
    if (!panel) return;
    const bars = panel.querySelectorAll('.skill-progress');
    // Reset first
    bars.forEach((bar) => {
      bar.style.transition = 'none';
      bar.style.width = '0%';
    });
    // Force reflow so the reset takes effect before animating
    void panel.offsetWidth;
    // Animate to target
    requestAnimationFrame(() => {
      bars.forEach((bar) => {
        const target = bar.getAttribute('data-width') || 0;
        bar.style.transition = 'width 1s ease-in-out';
        bar.style.width = `${target}%`;
      });
    });
  };

  skillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      skillTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const tabValue = tab.getAttribute('data-tab');

      // Switch panels
      skillPanels.forEach((panel) => panel.classList.remove('active'));
      const activePanel = document.getElementById(`panel-${tabValue}`);
      if (activePanel) {
        activePanel.classList.add('active');
        animateProgressBars(activePanel);
      }
    });
  });

  /* ----------------------------------------------------------
     8. SKILL PROGRESS BAR ANIMATION (Intersection Observer)
     ---------------------------------------------------------- */
  const skillsSection = document.getElementById('skills');

  if (skillsSection) {
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate the currently-active panel
            const activePanel = skillsSection.querySelector('.skill-panel.active');
            if (activePanel) {
              animateProgressBars(activePanel);
            }
            skillsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    skillsObserver.observe(skillsSection);
  }

  /* ----------------------------------------------------------
     9. STATS COUNTER ANIMATION
     ---------------------------------------------------------- */
  const statsSection = document.querySelector('.stats-section');
  let statsAnimated = false;

  const animateCounters = () => {
    if (statsAnimated) return;
    statsAnimated = true;

    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
      const duration = 2000; // ms
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);

        stat.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target;
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    statsObserver.observe(statsSection);
  }

  /* ----------------------------------------------------------
     11. PARTICLES CANVAS
     ---------------------------------------------------------- */
  const canvas = document.getElementById('particles-canvas');

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 80;
    const CONNECTION_DISTANCE = 120;
    const LINE_OPACITY = 0.08;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1; // 1-3px
        this.opacity = Math.random() * 0.3 + 0.3; // 0.3-0.6
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = -(Math.random() * 0.5 + 0.2); // float upward
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around
        if (this.y + this.radius < 0) {
          this.y = canvas.height + this.radius;
          this.x = Math.random() * canvas.width;
        }
        if (this.x < -this.radius) {
          this.x = canvas.width + this.radius;
        }
        if (this.x > canvas.width + this.radius) {
          this.x = -this.radius;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
        ctx.closePath();
      }
    }

    // Create particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            const opacity = LINE_OPACITY * (1 - distance / CONNECTION_DISTANCE);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    };

    let animationId;

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      drawConnections();
      animationId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    // Handle resize
    window.addEventListener('resize', () => {
      resizeCanvas();
      // Re-distribute particles that fell outside bounds
      particles.forEach((p) => {
        if (p.x > canvas.width) p.x = Math.random() * canvas.width;
        if (p.y > canvas.height) p.y = Math.random() * canvas.height;
      });
    });
  }

  /* ----------------------------------------------------------
     12. CURSOR GLOW (desktop only)
     ---------------------------------------------------------- */
  const cursorGlow = document.getElementById('cursorGlow');
  const isTouchDevice =
    'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (cursorGlow && !isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
  } else if (cursorGlow) {
    // Hide glow on touch devices
    cursorGlow.style.display = 'none';
  }

  /* ----------------------------------------------------------
     13. CONTACT FORM
     ---------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formToast = document.getElementById('formToast');
  const toastClose = document.getElementById('toastClose');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('formSubmit');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: new FormData(contactForm),
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          contactForm.reset();
          formToast.classList.add('active');
        } else {
          alert('Oops! There was a problem submitting your form');
        }
      } catch (error) {
        alert('Oops! There was a problem submitting your form');
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // Close toast
  if (toastClose) {
    toastClose.addEventListener('click', () => {
      formToast.classList.remove('active');
    });
  }
  if (formToast) {
    formToast.addEventListener('click', (e) => {
      if (e.target === formToast) formToast.classList.remove('active');
    });
  }

  /* ----------------------------------------------------------
     14. SMOOTH SCROLL (anchor links)
     ---------------------------------------------------------- */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return; // skip bare '#' links

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });


  /* ----------------------------------------------------------
     END — All features initialised
     ---------------------------------------------------------- */
});

/* ==============================================================
   VIDEO DEMO MODAL — Global Functions
   ============================================================== */
function openVideoModal() {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('demoVideo');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeVideoModal(e) {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('demoVideo');
  // Only close if clicking overlay itself or the close button
  if (e && e.target !== modal && !e.target.closest('.video-modal-close')) return;
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (video) {
    video.pause();
  }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('videoModal');
    if (modal && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      const video = document.getElementById('demoVideo');
      if (video) video.pause();
    }
  }
});
