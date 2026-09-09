document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect & Active Section Tracking
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');

    function handleScroll() {
        if (window.scrollY > 30) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 2. Smooth Scroll Navigation
    const smoothScrollBtns = document.querySelectorAll('.nav-link[data-section], .btn-solid[data-section]');
    smoothScrollBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                const mobileOverlay = document.getElementById('mobileOverlay');
                if (mobileOverlay && mobileOverlay.classList.contains('active')) {
                    mobileOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // 3. Hamburger Mobile Menu
    const hamburger = document.getElementById('hamburger');
    const mobileOverlay = document.getElementById('mobileOverlay');
    if (hamburger && mobileOverlay) {
        hamburger.addEventListener('click', () => {
            mobileOverlay.classList.toggle('active');
            if (mobileOverlay.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // 4. Typing Effect for Hero Subtitle
    const typingElement = document.getElementById('typingText');
    if (typingElement) {
        const roles = [
            'Web Developer & Digital Solutions Expert',
            'WordPress & WooCommerce Specialist',
            'Shopify & Custom E-Commerce Builder',
            'Full-Stack Modern Frontend Engineer',
            'AI Chatbot & Automation Solutions'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 65;

        function typeLoop() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 30;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 65;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 400;
            }

            setTimeout(typeLoop, typingSpeed);
        }

        setTimeout(typeLoop, 800);
    }

    // 5. Line-Mask Text Reveal Animation
    const lineMasks = document.querySelectorAll('.line-mask.animate-in-view');
    const textObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const mask = entry.target;
                mask.classList.add('revealed');
                const words = mask.querySelectorAll('.mask-word');
                words.forEach((word, i) => {
                    word.style.transitionDelay = `${i * 0.1}s`;
                });
                observer.unobserve(mask);
            }
        });
    }, { threshold: 0.15 });

    lineMasks.forEach(mask => textObserver.observe(mask));

    // 6. ORIGINAL ANGLED CAROUSEL (Squarespace-style with 1.5s Auto-Scroll)
    const cards = document.querySelectorAll('.angled-carousel__card');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    let currentCardIndex = 0;
    let autoScrollInterval = null;
    let isHovered = false;

    if (cards.length > 0) {
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            cards.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.classList.add('carousel-dot');
                if (i === currentCardIndex) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentCardIndex = i;
                    updateCarousel();
                    resetTimer();
                });
                dotsContainer.appendChild(dot);
            });
        }

        const dots = document.querySelectorAll('.carousel-dot');

        function updateCarousel() {
            const total = cards.length;
            cards.forEach((card, i) => {
                let offset = i - currentCardIndex;
                if (offset > total / 2) offset -= total;
                if (offset < -total / 2) offset += total;

                const sign = offset > 0 ? 1 : -1;
                const absOffset = Math.abs(offset);

                if (absOffset === 0) {
                    card.style.transform = 'translate(-50%, -50%) scale(1)';
                    card.style.opacity = '1';
                    card.style.zIndex = '10';
                    card.style.filter = 'brightness(1)';
                    card.classList.add('active');
                } else if (absOffset === 1) {
                    card.style.transform = `translate(-50%, -50%) translateX(${sign * 102}%) translateY(4%) scale(0.88) rotate(${sign * 2.5}deg)`;
                    card.style.opacity = '0.9';
                    card.style.zIndex = '5';
                    card.style.filter = 'brightness(0.8)';
                    card.classList.remove('active');
                } else if (absOffset === 2) {
                    card.style.transform = `translate(-50%, -50%) translateX(${sign * 204}%) translateY(8%) scale(0.78) rotate(${sign * 5}deg)`;
                    card.style.opacity = '0.25';
                    card.style.zIndex = '1';
                    card.style.filter = 'brightness(0.5)';
                    card.classList.remove('active');
                } else {
                    card.style.transform = `translate(-50%, -50%) translateX(${sign * 300}%) scale(0.6)`;
                    card.style.opacity = '0';
                    card.style.zIndex = '0';
                    card.classList.remove('active');
                }
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentCardIndex);
            });
        }

        function nextSlide() {
            currentCardIndex = (currentCardIndex + 1) % cards.length;
            updateCarousel();
        }

        function prevSlide() {
            currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
            updateCarousel();
        }

        function startAutoScroll() {
            stopAutoScroll();
            autoScrollInterval = setInterval(() => {
                if (!isHovered) {
                    nextSlide();
                }
            }, 1500);
        }

        function stopAutoScroll() {
            if (autoScrollInterval) clearInterval(autoScrollInterval);
        }

        function resetTimer() {
            stopAutoScroll();
            startAutoScroll();
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetTimer();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetTimer();
            });
        }

        cards.forEach((card, i) => {
            card.addEventListener('click', () => {
                if (i !== currentCardIndex) {
                    currentCardIndex = i;
                    updateCarousel();
                    resetTimer();
                }
            });
        });

        const carouselEl = document.querySelector('.angled-carousel');
        if (carouselEl) {
            carouselEl.addEventListener('mouseenter', () => isHovered = true);
            carouselEl.addEventListener('mouseleave', () => isHovered = false);

            let touchStartX = 0;
            carouselEl.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
                isHovered = true;
            }, { passive: true });

            carouselEl.addEventListener('touchend', e => {
                const touchEndX = e.changedTouches[0].screenX;
                if (touchStartX - touchEndX > 40) {
                    nextSlide();
                    resetTimer();
                } else if (touchEndX - touchStartX > 40) {
                    prevSlide();
                    resetTimer();
                }
                setTimeout(() => isHovered = false, 2000);
            }, { passive: true });
        }

        updateCarousel();
        startAutoScroll();
    }

    // 7. Hero Particle Canvas (Electric Blue Starfield)
    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
            initParticles();
        }

        function initParticles() {
            particles = [];
            const count = Math.min(Math.floor(width / 22), 55);
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    radius: Math.random() * 1.6 + 0.8,
                    alpha: Math.random() * 0.35 + 0.15,
                    color: Math.random() > 0.3 ? '#3B82F6' : '#60A5FA'
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.shadowBlur = 8;
                ctx.shadowColor = '#3B82F6';
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = '#3B82F6';
                        ctx.globalAlpha = (1 - dist / 100) * 0.14;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            });

            ctx.globalAlpha = 1;
            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', resize);
        resize();
        draw();
    }

    // 8. Contact Form Handler (Direct Gmail Compose)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const subject = document.getElementById('subject')?.value || '';
            const message = document.getElementById('message')?.value || '';

            const gmailUrl = `https://mail.google.com/mail/?view=cm&to=nishantagrawalqwe@gmail.com&su=${encodeURIComponent(subject || 'Project Inquiry from ' + name)}&body=${encodeURIComponent('Hi Nishant,\n\n' + message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
            window.open(gmailUrl, '_blank');

            alert('Thank you for reaching out! Your message draft has been prepared. I will get back to you soon.');
            contactForm.reset();
        });
    }

    // 9. Scroll To Top Button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 350) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
