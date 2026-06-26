/**
 * InnovateX 2026 – Premium Landing Page Interactive Scripts
 * Features: Canvas Particles, Glow Effects, Scroll Reveals, Active Navs, Counter Animations, Forms
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. Custom Canvas Particle Background
       ========================================================================== */
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    let particlesArray = [];
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    
    const mouse = {
        x: null,
        y: null,
        radius: 120
    };
    
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        
        update() {
            // Screen boundaries wrap-around
            if (this.x > width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            
            // Mouse push interaction
            if (mouse.x !== null && mouse.y !== null) {
                let dx = this.x - mouse.x;
                let dy = this.y - mouse.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius + this.size) {
                    const force = (mouse.radius - distance) / mouse.radius; // 0 to 1
                    const angle = Math.atan2(dy, dx);
                    this.x += Math.cos(angle) * force * 4;
                    this.y += Math.sin(angle) * force * 4;
                }
            }
            
            this.x += this.directionX;
            this.y += this.directionY;
            
            this.draw();
        }
    }
    
    function initParticles() {
        particlesArray = [];
        // Scale number of particles by resolution
        const numberOfParticles = Math.floor((width * height) / 11000);
        const particleColors = ['#00f2fe', '#7303c0', '#ec38bc', '#4facfe'];
        
        for (let i = 0; i < numberOfParticles; i++) {
            let size = Math.random() * 2 + 1;
            let x = Math.random() * (width - size * 2) + size;
            let y = Math.random() * (height - size * 2) + size;
            let directionX = (Math.random() * 0.8) - 0.4;
            let directionY = (Math.random() * 0.8) - 0.4;
            let color = particleColors[Math.floor(Math.random() * particleColors.length)];
            
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }
    
    function connectParticles() {
        let opacityValue = 1;
        const maxDist = 120;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDist) {
                    opacityValue = 1 - (distance / maxDist);
                    ctx.strokeStyle = `rgba(0, 242, 254, ${opacityValue * 0.15})`;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connectParticles();
        
        animationFrameId = requestAnimationFrame(animateParticles);
    }
    
    // Manage resizing
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
    });
    
    // Performance optimization: Pause canvas rendering when the window is minimized or out of focus
    let isTabVisible = true;
    document.addEventListener('visibilitychange', () => {
        isTabVisible = !document.hidden;
        if (isTabVisible) {
            animateParticles();
        } else {
            cancelAnimationFrame(animationFrameId);
        }
    });

    initParticles();
    if (isTabVisible) animateParticles();

    /* ==========================================================================
       2. Mouse Glow Card Effect
       ========================================================================== */
    const cards = document.querySelectorAll('.event-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    /* ==========================================================================
       3. Mobile Navigation & Hamburger Trigger
       ========================================================================== */
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function toggleMenu() {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
    }
    
    hamburger.addEventListener('click', toggleMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    /* ==========================================================================
       4. Sticky Header & Active Link Scroll Tracking
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        // Sticky class
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active links highlighters
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // offset navbar height
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    /* ==========================================================================
       5. Scroll Reveal Elements (IntersectionObserver)
       ========================================================================== */
    const reveals = document.querySelectorAll('.reveal-fade, .reveal-slide');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       6. Animated Statistics Counters
       ========================================================================== */
    const statsSection = document.getElementById('statistics');
    const counters = document.querySelectorAll('.stat-number');
    let countersStarted = false;
    
    function startCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.innerText = target;
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.floor(current);
                }
            }, stepTime);
        });
    }
    
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    /* ==========================================================================
       7. Schedule Timeline Day Tabs Toggle
       ========================================================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const dayContents = document.querySelectorAll('.timeline-day-content');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetDay = btn.getAttribute('data-day');
            
            // Toggle buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Toggle schedules
            dayContents.forEach(content => {
                if (content.getAttribute('id') === targetDay) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    /* ==========================================================================
       8. FAQ Accordion Toggle
       ========================================================================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const body = item.querySelector('.accordion-body');
            const isActive = item.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.accordion-item').forEach(el => {
                el.classList.remove('active');
                el.querySelector('.accordion-body').style.maxHeight = null;
            });
            
            // If the item wasn't open, open it
            if (!isActive) {
                item.classList.add('active');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    /* ==========================================================================
       9. Registration & Contact Form AJAX handling (FormSubmit API)
       ========================================================================== */
    
    // Utility email validator
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    // Utility phone validator (Indian 10-digit style + optional country prefix)
    function validatePhone(phone) {
        const re = /^(?:\+91|0)?[6-9]\d{9}$/;
        return re.test(String(phone).replace(/\s/g, ''));
    }

    // Form inputs error handler
    function toggleInputError(inputEl, isValid) {
        const group = inputEl.closest('.form-group');
        if (!group) return;
        if (isValid) {
            group.classList.remove('invalid');
        } else {
            group.classList.add('invalid');
        }
    }

    // Setup Validation Events
    const setupLiveValidation = (inputEl, validationFn) => {
        inputEl.addEventListener('input', () => {
            toggleInputError(inputEl, validationFn(inputEl.value));
        });
        inputEl.addEventListener('blur', () => {
            toggleInputError(inputEl, validationFn(inputEl.value));
        });
    };

    // 9a. Registration Form Submission
    const regForm = document.getElementById('register-form');
    if (regForm) {
        const nameInput = document.getElementById('reg-fullname');
        const emailInput = document.getElementById('reg-email');
        const phoneInput = document.getElementById('reg-phone');
        const collegeInput = document.getElementById('reg-college');
        const teamNameInput = document.getElementById('reg-teamname');
        const teamSizeInput = document.getElementById('reg-teamsize');
        const domainInput = document.getElementById('reg-domain');
        const submitBtn = document.getElementById('register-submit');
        const statusBox = document.getElementById('register-status');

        // Live validation setup
        setupLiveValidation(nameInput, val => val.trim().length > 0);
        setupLiveValidation(emailInput, val => validateEmail(val));
        setupLiveValidation(phoneInput, val => validatePhone(val));
        setupLiveValidation(collegeInput, val => val.trim().length > 0);
        setupLiveValidation(teamNameInput, val => val.trim().length > 0);
        setupLiveValidation(teamSizeInput, val => val !== '');
        setupLiveValidation(domainInput, val => val !== '');

        regForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Run final check
            const isNameVal = nameInput.value.trim().length > 0;
            const isEmailVal = validateEmail(emailInput.value);
            const isPhoneVal = validatePhone(phoneInput.value);
            const isCollegeVal = collegeInput.value.trim().length > 0;
            const isTeamVal = teamNameInput.value.trim().length > 0;
            const isSizeVal = teamSizeInput.value !== '';
            const isDomainVal = domainInput.value !== '';

            toggleInputError(nameInput, isNameVal);
            toggleInputError(emailInput, isEmailVal);
            toggleInputError(phoneInput, isPhoneVal);
            toggleInputError(collegeInput, isCollegeVal);
            toggleInputError(teamNameInput, isTeamVal);
            toggleInputError(teamSizeInput, isSizeVal);
            toggleInputError(domainInput, isDomainVal);

            if (!isNameVal || !isEmailVal || !isPhoneVal || !isCollegeVal || !isTeamVal || !isSizeVal || !isDomainVal) {
                statusBox.className = 'form-status-box error';
                statusBox.textContent = 'Please fill out all fields correctly before submitting.';
                return;
            }

            // AJAX post submission via FormSubmit
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Submitting... <i class="fa-solid fa-spinner"></i>';
            statusBox.style.display = 'none';

            // Gather Data
            const formData = new FormData(regForm);
            const dataObject = {};
            formData.forEach((value, key) => {
                dataObject[key] = value;
            });

            try {
                const response = await fetch('https://formsubmit.co/ajax/bhabanisankar618@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(dataObject)
                });

                if (response.ok) {
                    const result = await response.json();
                    statusBox.className = 'form-status-box success';
                    statusBox.textContent = 'Registration successful! A verification email will be sent shortly.';
                    regForm.reset();
                } else {
                    throw new Error('Server returned error status');
                }
            } catch (err) {
                statusBox.className = 'form-status-box error';
                statusBox.textContent = 'Submission error! Please try again or reach out to bhabanisankar618@gmail.com.';
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Complete Registration <i class="fa-solid fa-paper-plane"></i>';
            }
        });
    }

    // 9b. Contact Form Submission
    const contactForm = document.getElementById('contact-message-form');
    if (contactForm) {
        const conName = document.getElementById('con-name');
        const conEmail = document.getElementById('con-email');
        const conSubject = document.getElementById('con-subject');
        const conMsg = document.getElementById('con-message');
        const conSubmit = document.getElementById('contact-submit');
        const conStatus = document.getElementById('contact-status');

        // Live validation setup
        setupLiveValidation(conName, val => val.trim().length > 0);
        setupLiveValidation(conEmail, val => validateEmail(val));
        setupLiveValidation(conSubject, val => val.trim().length > 0);
        setupLiveValidation(conMsg, val => val.trim().length > 0);

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const isName = conName.value.trim().length > 0;
            const isEmail = validateEmail(conEmail.value);
            const isSub = conSubject.value.trim().length > 0;
            const isMsg = conMsg.value.trim().length > 0;

            toggleInputError(conName, isName);
            toggleInputError(conEmail, isEmail);
            toggleInputError(conSubject, isSub);
            toggleInputError(conMsg, isMsg);

            if (!isName || !isEmail || !isSub || !isMsg) {
                conStatus.className = 'form-status-box error';
                conStatus.textContent = 'Please fill out all fields correctly before sending.';
                return;
            }

            conSubmit.classList.add('loading');
            conSubmit.disabled = true;
            conSubmit.innerHTML = 'Sending... <i class="fa-solid fa-spinner"></i>';
            conStatus.style.display = 'none';

            const formData = new FormData(contactForm);
            const dataObject = {};
            formData.forEach((value, key) => {
                dataObject[key] = value;
            });

            try {
                const response = await fetch('https://formsubmit.co/ajax/bhabanisankar618@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(dataObject)
                });

                if (response.ok) {
                    conStatus.className = 'form-status-box success';
                    conStatus.textContent = 'Message sent! Our support team will contact you soon.';
                    contactForm.reset();
                } else {
                    throw new Error('Server returned error status');
                }
            } catch (err) {
                conStatus.className = 'form-status-box error';
                conStatus.textContent = 'Failed to deliver message! Please email us at bhabanisankar618@gmail.com.';
            } finally {
                conSubmit.classList.remove('loading');
                conSubmit.disabled = false;
                conSubmit.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
            }
        });
    }
});
