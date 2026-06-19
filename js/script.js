/* ==========================================================================
   PORTFOLIO ENGINE & INTERACTIVITY (PERSONAL PORTFOLIO 2026)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. PAGE LOADER & SCROLL PROGRESS
  // ==========================================================================
  const loader = document.getElementById('page-loader');
  const scrollProgress = document.getElementById('scroll-progress');
  
  // Dismiss page loader once layout compiles
  window.addEventListener('load', () => {
    if (loader) {
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 600);
    }
  });

  // Backup loader dismiss in case window load event already fired
  setTimeout(() => {
    if (loader && !loader.classList.contains('fade-out')) {
      loader.classList.add('fade-out');
    }
  }, 1500);

  // Monitor Scroll Progress
  window.addEventListener('scroll', () => {
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = scrolled + '%';
    }
  });

  // ==========================================================================
  // 2. STICKY NAVBAR & STYLING
  // ==========================================================================
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // ==========================================================================
  // 3. THEME TOGGLE CONTROLLER
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Retrieve previous choice or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  if (savedTheme === 'light') {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  } else {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('portfolio-theme', 'light');
      } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('portfolio-theme', 'dark');
      }
    });
  }

  // ==========================================================================
  // 4. MOBILE MENU ACCORDION OVERLAY
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNavContainer = document.getElementById('mobile-nav-container');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileNavContainer) {
    const toggleMenu = () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileToggle.classList.toggle('open');
      mobileNavContainer.classList.toggle('active');
      mobileNavContainer.setAttribute('aria-hidden', isExpanded);
      body.style.overflow = isExpanded ? '' : 'hidden'; // Lock scrolling
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close mobile menu on link clicks
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileNavContainer.classList.contains('active')) {
          toggleMenu();
        }
      });
    });
  }

  // ==========================================================================
  // 5. TYPEWRITER EFFECT (HERO SECTION)
  // ==========================================================================
  const typewriterText = document.getElementById('typewriter');
  const roles = [
    'Full Stack Developer',
    'AI & RAG Developer',
    'Blockchain Developer',
    'Computer Science Student',
    'ISIH Winner (2024 & 2025)'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    if (!typewriterText) return;
    
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typewriterText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Delete faster
    } else {
      typewriterText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at the end of word
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing new word
    }

    setTimeout(type, typingSpeed);
  }
  
  if (typewriterText) {
    type();
  }

  // ==========================================================================
  // 6. CANVAS PARTICLE SYSTEM
  // ==========================================================================
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let particleCount = 70;
    
    // Adjust density based on screen size
    if (window.innerWidth < 768) {
      particleCount = 30;
    }

    const mouse = {
      x: null,
      y: null,
      radius: 150
    };

    window.addEventListener('mousemove', (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.baseX = this.x;
        this.baseY = this.y;
      }

      update() {
        // Normal movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

        // Mouse attraction/repulsion effect (Parallax simulation)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            // Pull particles slightly towards mouse
            this.x += forceDirectionX * force * 1.2;
            this.y += forceDirectionY * force * 1.2;
          }
        }
      }

      draw() {
        // Draw individual particle
        const isLightTheme = body.classList.contains('light-theme');
        ctx.fillStyle = isLightTheme ? 'rgba(2, 132, 199, 0.4)' : 'rgba(0, 242, 254, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesArray = [];
      for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
      }
    }

    function connectParticles() {
      const isLightTheme = body.classList.contains('light-theme');
      const maxDistance = 120;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = isLightTheme 
              ? `rgba(2, 132, 199, ${opacity * 0.12})` 
              : `rgba(0, 242, 254, ${opacity * 0.12})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      connectParticles();
      requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
  }

  // ==========================================================================
  // 7. INTERSECTION OBSERVER FOR SCROLL REVEALS & METRICS
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right');
  const progressBars = document.querySelectorAll('.progress-bar-fill');
  const statsElements = document.querySelectorAll('.stat-number');
  
  let statsTriggered = false;

  const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const pageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Reveal elements
        if (entry.target.classList.contains('reveal-fade-up') || 
            entry.target.classList.contains('reveal-fade-left') || 
            entry.target.classList.contains('reveal-fade-right')) {
          entry.target.classList.add('reveal-in-view');
        }

        // Fill Skill Progress bars
        if (entry.target.classList.contains('progress-bar-fill')) {
          const targetWidth = entry.target.getAttribute('data-width');
          entry.target.style.width = targetWidth;
        }

        // Animate stats counter
        if (entry.target.classList.contains('stat-number') && !statsTriggered) {
          triggerStatsCounters();
        }

        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Register observers
  revealElements.forEach(el => pageObserver.observe(el));
  progressBars.forEach(bar => pageObserver.observe(bar));
  statsElements.forEach(stat => pageObserver.observe(stat));

  // Count up animation for stats
  function triggerStatsCounters() {
    statsTriggered = true;
    statsElements.forEach(stat => {
      const targetVal = parseFloat(stat.getAttribute('data-target'));
      const duration = 1500; // 1.5 seconds count duration
      const steps = 60;
      const stepTime = duration / steps;
      let currentVal = 0;
      const increment = targetVal / steps;
      const decimals = parseInt(stat.getAttribute('data-decimals')) || 0;

      let timer = setInterval(() => {
        currentVal += increment;
        if (currentVal >= targetVal) {
          currentVal = targetVal;
          clearInterval(timer);
        }
        stat.textContent = currentVal.toFixed(decimals);
      }, stepTime);
    });
  }

  // ==========================================================================
  // 8. ACTIVE NAVIGATION LINK HIGHLIGHT ON SCROLL
  // ==========================================================================
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const mNavLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    const updateActiveLink = (linkArray) => {
      linkArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    };

    updateActiveLink(navLinks);
    updateActiveLink(mNavLinks);
  });

  // ==========================================================================
  // 9. PROJECTS PORTFOLIO FILTER
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterType = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-categories').split(' ');
        if (filterType === 'all' || categories.includes(filterType)) {
          card.classList.remove('hidden');
          // Trigger slight reflow to restart animation/opacity
          card.style.opacity = '0';
          setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ==========================================================================
  // 10. PROJECT DETAILS MODAL INJECTION & DISPLAY
  // ==========================================================================
  const modal = document.getElementById('project-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalContentBody = document.getElementById('modal-content-body');
  const modalTriggers = document.querySelectorAll('.modal-trigger');

  const projectDetailsStore = {
    aspire: {
      title: "ASPIRE_PLAN",
      type: "AI-Powered Financial Planning Platform",
      problem: "Generic budgeting advice does not align with regional frameworks or dynamically shifting market risk thresholds.",
      solution: "Engineered a custom RAG architecture that maps user profiles against financial rulesets to generate contextual portfolio suggestions.",
      features: [
        "Personalized financial health dashboards and goal tracking metrics.",
        "Retrieval-Augmented Generation (RAG) pipeline for structured recommendation insights.",
        "Microservices backend layout ensuring modular system isolation and decoupled API processing.",
        "Account Aggregator Framework integration matching strict Indian financial compliance guidelines."
      ],
      tech: "React.js, Node.js, Express.js, MongoDB, JavaScript, NoSQL, Vector DBs",
      github: "https://github.com/BhabaniSankarBiswal/ASPIRE_PLAN",
      live: "https://aspireplann.netlify.app"
    },
    agrotech: {
      title: "AgroTech",
      type: "Assured Contract Farming Platform",
      problem: "Middlemen in crop pricing pipelines decrease farming profitability, while buyers experience quality variances.",
      solution: "Introduced a blockchain contract network where buyers lock payments in escrows released automatically upon verifiable crop grades.",
      features: [
        "Blockchain contract automation for instant crop quality verification triggers.",
        "Intermediary removal to optimize profits for small-scale agrarian setups.",
        "Visual farmer analytics dashboard tracking market price trends and crop cycle yields.",
        "Secure decentralized database architecture built on Solidity Smart Contracts."
      ],
      tech: "HTML5, CSS3, JavaScript, MongoDB, Blockchain, Smart Contracts, Web3.js",
      github: "https://github.com/BhabaniSankarBiswal/AgroTech",
      live: "https://agrotech27.netlify.app"
    },
    tasktide: {
      title: "TaskTide",
      type: "AI-Based Smart Productivity & Focus System",
      problem: "Traditional checklists fail to retain users long-term and lack hands-free task ingestion.",
      solution: "Gamified focus sessions using XP level streaks coupled with conversational AI task scheduling APIs.",
      features: [
        "Gamification loops including profile Experience Points (XP), daily streaks, and ranks.",
        "Natural language voice recognition to ingest tasks hands-free.",
        "OpenAI API scheduling suggestions that adapt to previous Pomodoro focus histories.",
        "Detailed graphical productivity metrics overlaying calendar performance."
      ],
      tech: "React.js, TypeScript, Tailwind CSS, OpenAI API, Web Audio APIs, Chart.js",
      github: "https://github.com/BhabaniSankarBiswal/tasktide",
      live: "https://tasktideee.netlify.app/"
    }
  };

  const openModal = (projectKey) => {
    const data = projectDetailsStore[projectKey];
    if (!data || !modal || !modalContentBody) return;

    // Build lists dynamically
    const featuresList = data.features.map(f => `<li>${f}</li>`).join('');

    modalContentBody.innerHTML = `
      <div class="modal-project-header">
        <h3 class="modal-project-title">${data.title}</h3>
        <div class="modal-project-type">${data.type}</div>
      </div>
      
      <div class="modal-section">
        <h4 class="modal-section-title">The Challenge</h4>
        <p class="modal-section-desc">${data.problem}</p>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">The Solution</h4>
        <p class="modal-section-desc">${data.solution}</p>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">Core Implementation Details</h4>
        <ul class="modal-list">${featuresList}</ul>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">Tech Stack</h4>
        <p class="modal-section-desc font-code">${data.tech}</p>
      </div>

      <div class="project-card-actions" style="margin-top: 2rem;">
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          <span>Repository</span>
        </a>
        <a href="${data.live}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary btn-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          <span>Launch Demo</span>
        </a>
      </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden'; // Lock background scroll
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    body.style.overflow = ''; // Release scroll lock
  };

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const projectKey = trigger.getAttribute('data-project');
      openModal(projectKey);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close modal when clicking on background overlay
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close modal on escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // ==========================================================================
  // 11. CONTACT FORM CLIENT-SIDE VALIDATION & SIMULATOR
  // ==========================================================================
  const form = document.getElementById('portfolio-contact-form');
  const successAlert = document.getElementById('form-success-box');
  const errorAlert = document.getElementById('form-error-box');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Reset Alerts
      successAlert.style.display = 'none';
      errorAlert.style.display = 'none';

      // Inputs
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      let isFormValid = true;

      // Validator Sub-functions
      const validateField = (input, errorId) => {
        const errorText = document.getElementById(errorId);
        if (!input.value.trim()) {
          input.classList.add('invalid-border');
          if (errorText) errorText.style.display = 'block';
          isFormValid = false;
        } else {
          input.classList.remove('invalid-border');
          if (errorText) errorText.style.display = 'none';
        }
      };

      // Specific Email validator
      const validateEmail = (input) => {
        const errorText = document.getElementById('error-email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!input.value.trim() || !emailRegex.test(input.value.trim())) {
          input.classList.add('invalid-border');
          if (errorText) errorText.style.display = 'block';
          isFormValid = false;
        } else {
          input.classList.remove('invalid-border');
          if (errorText) errorText.style.display = 'none';
        }
      };

      // Perform validation audits
      validateField(nameInput, 'error-name');
      validateEmail(emailInput);
      validateField(subjectInput, 'error-subject');
      validateField(messageInput, 'error-message-field');

      if (isFormValid) {
        // Disable submission button during simulated load state
        const submitBtn = document.getElementById('form-submit-btn');
        const submitBtnText = submitBtn.querySelector('span');
        const originalText = submitBtnText.textContent;
        
        submitBtn.disabled = true;
        submitBtnText.textContent = "Sending Message...";

        // Simulate fetch post API
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtnText.textContent = originalText;
          
          // Show Success Popup Alert
          successAlert.style.display = 'block';
          form.reset();
        }, 1500);
      } else {
        errorAlert.style.display = 'block';
      }
    });
  }

  // ==========================================================================
  // 12. BACK-TO-TOP FLOATING TRIGGER
  // ==========================================================================
  const backToTopBtn = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (backToTopBtn) {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
});
