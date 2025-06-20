// ===================================
// NAVIGATION MODULE - FIXED
// navigation.js
// ===================================

class NavigationManager {
    constructor() {
        this.navbar = null;
        this.hamburger = null;
        this.navMenu = null;
        this.isMenuOpen = false;
        this.scrollThreshold = 50;
        this.lastScrollTop = 0;
    }

    init() {
        this.setupElements();
        this.setupScrollEffect();
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        this.setupActiveSection();
        this.setupLanguageButtons();
        this.addActiveStyles();
    }

    setupElements() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        
        if (!this.navbar) {
            console.warn('Navbar element not found');
            return;
        }
    }

    setupScrollEffect() {
        let ticking = false;

        const updateNavbar = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > this.scrollThreshold) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            this.handleNavbarVisibility(scrollTop);
            this.lastScrollTop = scrollTop;
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    handleNavbarVisibility(scrollTop) {
        if (window.innerWidth <= 768) {
            if (scrollTop > this.lastScrollTop && scrollTop > 100) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    this.scrollToElement(target);
                    
                    if (this.isMenuOpen) {
                        this.closeMobileMenu();
                    }
                    
                    history.pushState(null, null, targetId);
                }
            });
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.closeMobileMenu();
                }
            });
        });
    }

    setupLanguageButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('language-btn')) {
                if (this.isMenuOpen) {
                    setTimeout(() => {
                        this.closeMobileMenu();
                    }, 300);
                }
            }
        });

        const languageButtons = document.querySelectorAll('.language-btn');
        languageButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    setTimeout(() => {
                        this.closeMobileMenu();
                    }, 300);
                }
            });
        });
    }

    scrollToElement(element) {
        const navbarHeight = this.navbar ? this.navbar.offsetHeight : 0;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight - 20;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    setupMobileMenu() {
        if (!this.hamburger || !this.navMenu) return;

        this.hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMobileMenu();
        });

        document.addEventListener('click', (e) => {
            if (this.isMenuOpen) {
                if (!this.navMenu.contains(e.target) && 
                    !this.hamburger.contains(e.target)) {
                    this.closeMobileMenu();
                }
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });

        this.navMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' || 
                e.target.classList.contains('language-btn') ||
                e.target.classList.contains('nav-link')) {
                
                setTimeout(() => {
                    this.closeMobileMenu();
                }, 150);
            }
        });
    }

    toggleMobileMenu() {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.isMenuOpen = true;
        this.hamburger.classList.add('active');
        this.navMenu.classList.add('active');
        
        document.body.style.overflow = 'hidden';
        
        this.navMenu.style.opacity = '0';
        this.navMenu.style.transform = 'translateX(-100%)';
        
        this.navMenu.offsetHeight;
        
        setTimeout(() => {
            this.navMenu.style.opacity = '1';
            this.navMenu.style.transform = 'translateX(0)';
        }, 10);

        this.animateHamburger(true);
        document.body.classList.add('mobile-menu-open');
    }

    closeMobileMenu() {
        if (!this.isMenuOpen) return;
        
        this.isMenuOpen = false;
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        
        document.body.style.overflow = '';
        document.body.classList.remove('mobile-menu-open');
        
        this.animateHamburger(false);
        
        setTimeout(() => {
            this.navMenu.style.opacity = '';
            this.navMenu.style.transform = '';
        }, 300);
    }

    animateHamburger(isOpen) {
        const spans = this.hamburger.querySelectorAll('span');
        
        if (spans.length >= 3) {
            if (isOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    }

    setupActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        if (sections.length === 0 || navLinks.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.setActiveNavLink(entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    setActiveNavLink(sectionId) {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            if (href === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    scrollToSection(sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
            this.scrollToElement(target);
            if (this.isMenuOpen) {
                this.closeMobileMenu();
            }
        }
    }

    addActiveStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .nav-link.active {
                color: var(--primary-gold) !important;
            }
            
            .nav-link.active::after {
                width: 100% !important;
            }
            
            @media (max-width: 768px) {
                .nav-menu {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(10, 10, 10, 0.98);
                    backdrop-filter: blur(20px);
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    transform: translateX(-100%);
                    opacity: 0;
                    z-index: 999;
                    padding-top: 80px;
                }
                
                .nav-menu.active {
                    transform: translateX(0);
                    opacity: 1;
                }
                
                .nav-item {
                    margin: 1.5rem 0;
                    opacity: 0;
                    animation: slideInFromLeft 0.3s ease forwards;
                }
                
                .nav-menu.active .nav-item {
                    opacity: 1;
                }
                
                .nav-menu.active .nav-item:nth-child(1) { animation-delay: 0.1s; }
                .nav-menu.active .nav-item:nth-child(2) { animation-delay: 0.15s; }
                .nav-menu.active .nav-item:nth-child(3) { animation-delay: 0.2s; }
                .nav-menu.active .nav-item:nth-child(4) { animation-delay: 0.25s; }
                .nav-menu.active .nav-item:nth-child(5) { animation-delay: 0.3s; }
                .nav-menu.active .nav-item:nth-child(6) { animation-delay: 0.35s; }
                .nav-menu.active .nav-item:nth-child(7) { animation-delay: 0.4s; }
                
                .nav-link {
                    font-size: 1.3rem;
                    padding: 1rem 2rem;
                    color: var(--light-text);
                    text-decoration: none;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                    display: block;
                    text-align: center;
                }
                
                .nav-link:hover {
                    background: rgba(212, 175, 55, 0.1);
                    color: var(--primary-gold);
                    transform: translateX(10px);
                }
                
                .language-selector {
                    margin-top: 2rem;
                    opacity: 0;
                    animation: slideInFromLeft 0.3s ease forwards;
                    animation-delay: 0.5s;
                }
                
                .hamburger span {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                body.mobile-menu-open {
                    overflow: hidden !important;
                }
                
                @keyframes slideInFromLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    forceCloseMenu() {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        }
    }

    safeInit() {
        try {
            this.init();
        } catch (error) {
            console.error('Navigation initialization failed:', error);
        }
    }
}

window.NavigationManager = NavigationManager;