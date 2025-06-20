// ===================================
// MAIN APPLICATION INITIALIZER - UPDATED
// main.js
// ===================================

class ArteEleganteApp {
    constructor() {
        this.modules = {};
        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized) return;

        try {
            console.log('🎨 Inicializando Arte Elegante...');
            
            if (document.readyState === 'loading') {
                await this.waitForDOM();
            }

            await this.initializeModules();
            this.connectModules();
            this.setupGlobalEvents();
            this.showPageReady();
            
            this.isInitialized = true;
            console.log('✅ Arte Elegante inicializado correctamente');
            
        } catch (error) {
            console.error('❌ Error inicializando la aplicación:', error);
            this.handleInitError(error);
        }
    }

    waitForDOM() {
        return new Promise(resolve => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }

    async initializeModules() {
        console.log('🌐 Inicializando sistema de traducciones...');
        this.modules.translation = new TranslationSystem();
        this.modules.translation.init();

        console.log('🧭 Inicializando navegación...');
        this.modules.navigation = new NavigationManager();
        this.modules.navigation.safeInit();

        console.log('✨ Inicializando animaciones...');
        this.modules.animations = new AnimationManager();
        this.modules.animations.init();

        console.log('📝 Inicializando formularios...');
        this.modules.forms = new FormManager(this.modules.translation);
        this.modules.forms.init();

        await new Promise(resolve => setTimeout(resolve, 100));
    }

    connectModules() {
        this.modules.translation.setNavigationManager(this.modules.navigation);
    }

    setupGlobalEvents() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.onPageHidden();
            } else {
                this.onPageVisible();
            }
        });

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.onWindowResize();
            }, 150);
        });

        window.addEventListener('error', (e) => {
            this.handleError(e.error);
        });

        window.addEventListener('unhandledrejection', (e) => {
            this.handleError(e.reason);
        });

        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    onPageHidden() {
        console.log('👁️ Página oculta - pausando animaciones');
        if (this.modules.animations) {
            this.modules.animations.pauseAnimations();
        }
    }

    onPageVisible() {
        console.log('👁️ Página visible - reanudando animaciones');
        if (this.modules.animations) {
            this.modules.animations.resumeAnimations();
        }
    }

    onWindowResize() {
        console.log('📱 Ventana redimensionada');
        Object.values(this.modules).forEach(module => {
            if (typeof module.onResize === 'function') {
                module.onResize();
            }
        });
    }

    handleKeyboardShortcuts(e) {
        if (e.key === 'Escape') {
            if (this.modules.navigation?.isMenuOpen) {
                this.modules.navigation.closeMobileMenu();
            }
        }

        if (e.ctrlKey && e.shiftKey) {
            switch(e.key.toLowerCase()) {
                case 'e':
                    e.preventDefault();
                    this.modules.translation?.changeLanguage('es');
                    break;
                case 'g':
                    e.preventDefault();
                    this.modules.translation?.changeLanguage('en');
                    break;
                case 'd':
                    e.preventDefault();
                    this.modules.translation?.changeLanguage('da');
                    break;
            }
        }
    }

    showPageReady() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });

        setTimeout(() => {
            document.body.classList.add('app-ready');
        }, 500);
    }

    handleInitError(error) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #dc3545;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-family: Arial, sans-serif;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        errorDiv.textContent = 'Error cargando la página. Por favor, recarga.';
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    handleError(error) {
        console.error('🚨 Error en la aplicación:', error);
    }

    getModule(moduleName) {
        return this.modules[moduleName];
    }

    changeLanguage(lang) {
        if (this.modules.translation) {
            this.modules.translation.changeLanguage(lang);
        }
    }

    scrollToSection(sectionId) {
        if (this.modules.navigation) {
            this.modules.navigation.scrollToSection(sectionId);
        }
    }

    createParticles(x, y, count = 5) {
        if (this.modules.animations) {
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    const offsetX = (Math.random() - 0.5) * 50;
                    const offsetY = (Math.random() - 0.5) * 50;
                    this.modules.animations.createParticle(x + offsetX, y + offsetY);
                }, i * 100);
            }
        }
    }

    destroy() {
        console.log('🧹 Limpiando recursos...');
        
        Object.values(this.modules).forEach(module => {
            if (typeof module.destroy === 'function') {
                module.destroy();
            }
        });
        
        this.modules = {};
        this.isInitialized = false;
    }
}

const app = new ArteEleganteApp();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}

window.addEventListener('beforeunload', () => {
    app.destroy();
});

window.ArteEleganteApp = app;