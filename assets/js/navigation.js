// ===================================
// NAVIGATION MODULE - FIXED COMPLETE
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
        if (window.innerWidth <= 768 && !this.isMenuOpen) {
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
                    
                    // ✅ CERRAR MENÚ MÓVIL
                    if (this.isMenuOpen) {
                        this.closeMobileMenu();
                    }
                    
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    setupLanguageButtons() {
        // ✅ CERRAR MENÚ AL CAMBIAR IDIOMA
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('language-btn')) {
                if (this.isMenuOpen) {
                    setTimeout(() => {
                        this.closeMobileMenu();
                    }, 200);
                }
            }
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

        // ✅ TOGGLE MENÚ CON HAMBURGER
        this.hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMobileMenu();
        });

        // ✅ CERRAR AL HACER CLIC FUERA
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen) {
                if (!this.navMenu.contains(e.target) && 
                    !this.hamburger.contains(e.target)) {
                    this.closeMobileMenu();
                }
            }
        });

        // ✅ CERRAR CON ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });

        // ✅ CERRAR AL REDIMENSIONAR
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });

        // ✅ CERRAR AL HACER CLIC EN ENLACES
        this.navMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link') ||
                e.target.tagName === 'A') {
                setTimeout(() => {
                    this.closeMobileMenu();
                }, 100);
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
        
        // ✅ ACTIVAR CLASES
        this.hamburger.classList.add('active');
        this.navMenu.classList.add('active');
        document.body.classList.add('mobile-menu-open');
        
        // ✅ PREVENIR SCROLL
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        
        console.log('✅ Menú abierto');
    }

    closeMobileMenu() {
        if (!this.isMenuOpen) return;
        
        this.isMenuOpen = false;
        
        // ✅ REMOVER CLASES
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
        
        // ✅ RESTAURAR SCROLL
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        
        console.log('✅ Menú cerrado');
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

    forceCloseMenu() {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        }
    }

    safeInit() {
        try {
            this.init();
            console.log('✅ NavigationManager inicializado correctamente');
        } catch (error) {
            console.error('❌ Error en NavigationManager:', error);
        }
    }
}

window.NavigationManager = NavigationManager;