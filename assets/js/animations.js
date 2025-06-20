// ===================================
// ANIMATIONS MODULE
// animations.js
// ===================================

class AnimationManager {
    constructor() {
        this.observers = [];
        this.particles = [];
        this.isReducedMotion = false;
    }

    init() {
        this.checkReducedMotion();
        this.setupIntersectionObserver();
        this.setupPortfolioAnimations();
        this.setupServiceCardEffects();
        this.setupParallaxEffect();
        this.setupInteractiveParticles();
        this.setupFloatingElements();
        this.addAnimationStyles();
        this.setupPerformanceOptimization();
    }

    checkReducedMotion() {
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.isReducedMotion = true;
            document.documentElement.classList.add('reduced-motion');
        }
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        this.observers.push(observer);
    }

    animateElement(element) {
        if (this.isReducedMotion) {
            element.classList.add('visible');
            return;
        }

        const siblings = Array.from(element.parentNode.children).filter(
            child => child.classList.contains('fade-in')
        );
        const index = siblings.indexOf(element);
        const delay = index * 100;

        setTimeout(() => {
            element.classList.add('visible');
            
            if (element.classList.contains('service-card') || 
                element.classList.contains('portfolio-item')) {
                this.addRippleEffect(element);
            }
        }, delay);
    }

    addRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple-effect');
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }

    setupPortfolioAnimations() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            
            item.addEventListener('mouseenter', () => {
                if (this.isReducedMotion) return;
                
                const randomRotation = (Math.random() - 0.5) * 10;
                item.style.transform = `translateY(-10px) rotateY(${randomRotation}deg) scale(1.02)`;
                item.style.zIndex = '10';
                
                item.style.boxShadow = `
                    0 20px 40px rgba(212, 175, 55, 0.3),
                    0 0 30px rgba(212, 175, 55, 0.2)
                `;
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) rotateY(0deg) scale(1)';
                item.style.zIndex = '1';
                item.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
            });

            item.addEventListener('click', () => {
                if (this.isReducedMotion) return;
                
                item.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }

    setupServiceCardEffects() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach((card, index) => {
            if (!this.isReducedMotion) {
                card.style.animationDelay = `${index * 0.5}s`;
                card.classList.add('floating');
            }

            card.addEventListener('mouseenter', () => {
                if (this.isReducedMotion) {
                    card.style.transform = 'translateY(-5px)';
                    return;
                }
                
                card.style.transform = 'translateY(-15px) rotateY(8deg) rotateX(5deg)';
                card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                
                const icon = card.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                    icon.style.filter = 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.6))';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateY(0deg) rotateX(0deg)';
                card.style.transition = 'all 0.3s ease';
                
                const icon = card.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                    icon.style.filter = 'none';
                }
            });
        });
    }

    setupParallaxEffect() {
        if (this.isReducedMotion) return;

        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            const hero = document.querySelector('.hero');
            if (hero) {
                const speed = scrolled * 0.5;
                hero.style.backgroundPosition = `center ${speed}px`;
            }

            const floatingElements = document.querySelectorAll('.floating-element');
            floatingElements.forEach((element, index) => {
                const speed = 0.3 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    setupInteractiveParticles() {
        if (this.isReducedMotion) return;

        let lastParticleTime = 0;
        const particleInterval = 100;

        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            
            if (now - lastParticleTime < particleInterval) return;
            
            if (Math.random() > 0.95) {
                this.createParticle(e.clientX, e.clientY);
                lastParticleTime = now;
            }
        });

        document.addEventListener('click', (e) => {
            if (this.isReducedMotion) return;
            
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const offsetX = (Math.random() - 0.5) * 50;
                    const offsetY = (Math.random() - 0.5) * 50;
                    this.createParticle(e.clientX + offsetX, e.clientY + offsetY);
                }, i * 50);
            }
        });
    }

    createParticle(x, y, customColor = null) {
        const particle = document.createElement('div');
        const size = Math.random() * 6 + 2;
        const duration = Math.random() * 1000 + 800;
        const color = customColor || 'var(--primary-gold)';
        
        particle.style.cssText = `
            position: fixed;
            top: ${y - size/2}px;
            left: ${x - size/2}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: particleFloat ${duration}ms ease-out forwards;
            box-shadow: 0 0 10px ${color};
        `;
        
        document.body.appendChild(particle);
        this.particles.push(particle);
        
        setTimeout(() => {
            particle.remove();
            this.particles = this.particles.filter(p => p !== particle);
        }, duration);
    }

    setupFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            if (!this.isReducedMotion) {
                element.style.animationDelay = `${index * 2}s`;
            }

            element.addEventListener('mouseenter', () => {
                if (this.isReducedMotion) return;
                
                element.style.transform = 'scale(1.3) rotate(15deg)';
                element.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6B6B 100%)';
                element.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.6)';
                
                for (let i = 0; i < 8; i++) {
                    setTimeout(() => {
                        const angle = (360 / 8) * i;
                        const distance = 50;
                        const x = element.offsetLeft + element.offsetWidth/2 + Math.cos(angle * Math.PI/180) * distance;
                        const y = element.offsetTop + element.offsetHeight/2 + Math.sin(angle * Math.PI/180) * distance;
                        this.createParticle(x, y, '#FFD700');
                    }, i * 50);
                }
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'scale(1) rotate(0deg)';
                element.style.background = 'var(--gradient-primary)';
                element.style.boxShadow = 'none';
            });
        });
    }

    setupPerformanceOptimization() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });

        setInterval(() => {
            if (this.particles.length > 50) {
                const oldParticles = this.particles.splice(0, 25);
                oldParticles.forEach(particle => {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                });
            }
        }, 5000);
    }

    pauseAnimations() {
        document.documentElement.classList.add('animations-paused');
    }

    resumeAnimations() {
        document.documentElement.classList.remove('animations-paused');
    }

    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) translateY(-50px) rotate(180deg);
                }
            }

            @keyframes floating {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                25% { transform: translateY(-10px) rotate(2deg); }
                50% { transform: translateY(-20px) rotate(0deg); }
                75% { transform: translateY(-10px) rotate(-2deg); }
            }

            .floating {
                animation: floating 6s ease-in-out infinite;
            }

            .ripple-effect {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: ripple 1s ease-out forwards;
                pointer-events: none;
            }

            @keyframes ripple {
                to {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                }
            }

            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }

            .reduced-motion .floating {
                animation: none;
            }

            .animations-paused * {
                animation-play-state: paused !important;
            }

            .fade-in {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .fade-in.visible {
                opacity: 1;
                transform: translateY(0);
            }

            .portfolio-item,
            .service-card {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                will-change: transform, box-shadow;
            }

            .floating-element,
            .portfolio-item,
            .service-card {
                transform: translateZ(0);
                backface-visibility: hidden;
            }
        `;
        
        document.head.appendChild(style);
    }

    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.particles.forEach(particle => {
            if (particle.parentNode) {
                particle.remove();
            }
        });
        this.observers = [];
        this.particles = [];
    }
}

window.AnimationManager = AnimationManager;