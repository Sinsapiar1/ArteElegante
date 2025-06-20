// ===================================
// TRANSLATION SYSTEM MODULE - FIXED
// translations.js
// ===================================

class TranslationSystem {
    constructor() {
        this.currentLanguage = 'es';
        this.navigationManager = null;
        this.translations = {
            es: {
                'nav.home': 'Inicio',
                'nav.portfolio': 'Portafolio',
                'nav.about': 'Nosotros',
                'nav.services': 'Servicios',
                'nav.testimonials': 'Testimonios',
                'nav.contact': 'Contacto',
                'hero.subtitle': 'Donde tu Cabello Encuentra su Obra de Arte',
                'hero.cta': 'Agenda tu Cita',
                'portfolio.title': 'Nuestro Portafolio',
                'portfolio.classic.title': 'Corte Clásico',
                'portfolio.classic.subtitle': 'Elegancia atemporal',
                'portfolio.modern.title': 'Estilo Moderno',
                'portfolio.modern.subtitle': 'Tendencias actuales',
                'portfolio.color.title': 'Color Premium',
                'portfolio.color.subtitle': 'Transformación total',
                'portfolio.special.title': 'Peinado Especial',
                'portfolio.special.subtitle': 'Para ocasiones únicas',
                'portfolio.treatment.title': 'Tratamiento',
                'portfolio.treatment.subtitle': 'Cuidado profesional',
                'portfolio.unique.title': 'Diseño Único',
                'portfolio.unique.subtitle': 'Creatividad sin límites',
                'about.title': 'Sobre Cristian Rodriguez',
                'about.paragraph1': 'Con más de una década de experiencia en el arte de la peluquería, Cristian Rodriguez ha perfeccionado su técnica en las mejores escuelas de Europa. Su filosofía se basa en la creencia de que cada persona tiene un estilo único que debe ser descubierto y realzado.',
                'about.paragraph2': 'Ubicado en el corazón de Dinamarca, Arte Elegante no es solo una peluquería, es un espacio donde la creatividad se encuentra con la técnica profesional. Cristian se especializa en cortes de vanguardia, coloración avanzada y tratamientos de cuidado capilar que transforman no solo tu cabello, sino tu confianza.',
                'about.paragraph3': 'Su compromiso con la excelencia y la innovación lo ha convertido en el peluquero de confianza para clientes que buscan no solo un servicio, sino una experiencia transformadora.',
                'services.title': 'Nuestros Servicios',
                'services.cut.title': 'Corte y Peinado',
                'services.cut.description': 'Cortes personalizados según tu estilo y forma de rostro. Desde clásicos hasta las últimas tendencias.',
                'services.color.title': 'Coloración',
                'services.color.description': 'Técnicas avanzadas de color, mechas, balayage y tratamientos de color que realzan tu belleza natural.',
                'services.treatment.title': 'Tratamientos',
                'services.treatment.description': 'Tratamientos reparadores, hidratantes y nutritivos para mantener tu cabello saludable y brillante.',
                'services.events.title': 'Eventos Especiales',
                'services.events.description': 'Peinados únicos para bodas, eventos y ocasiones especiales. Convertimos tu día en algo memorable.',
                'services.beard.title': 'Barba y Bigote',
                'services.beard.description': 'Cuidado completo de barba y bigote con técnicas tradicionales y productos premium.',
                'services.consultation.title': 'Consultoría',
                'services.consultation.description': 'Asesoramiento personalizado para encontrar el estilo perfecto que complemente tu personalidad.',
                'testimonials.title': 'Lo que Dicen Nuestros Clientes',
                'testimonials.quote': '"Cristian es simplemente el mejor. No solo transformó mi cabello, sino que me ayudó a descubrir un nuevo yo. Su atención al detalle y profesionalismo son incomparables."',
                'testimonials.author': '- María Hansen',
                'contact.title': 'Contacto',
                'contact.form.title': 'Agenda tu Cita',
                'contact.form.name': 'Tu Nombre',
                'contact.form.email': 'Tu Email',
                'contact.form.phone': 'Tu Teléfono',
                'contact.form.service.placeholder': 'Selecciona un Servicio',
                'contact.form.service.cut': 'Corte y Peinado',
                'contact.form.service.color': 'Coloración',
                'contact.form.service.treatment': 'Tratamientos',
                'contact.form.service.event': 'Evento Especial',
                'contact.form.service.beard': 'Barba y Bigote',
                'contact.form.service.consultation': 'Consultoría',
                'contact.form.message': 'Mensaje adicional (opcional)',
                'contact.form.submit': 'Enviar Solicitud',
                'contact.form.success': '¡Solicitud Enviada!',
                'contact.info.title': 'Información de Contacto',
                'contact.info.address': 'Copenhague, Dinamarca',
                'contact.info.hours': 'Lun-Vie: 9:00-18:00<br>Sáb: 9:00-16:00',
                'footer.copyright': '© 2025 Arte Elegante - Cristian Rodriguez. Todos los derechos reservados.',
                'footer.subtitle': 'Peluquería Profesional en Dinamarca'
            },
            en: {
                'nav.home': 'Home',
                'nav.portfolio': 'Portfolio',
                'nav.about': 'About',
                'nav.services': 'Services',
                'nav.testimonials': 'Testimonials',
                'nav.contact': 'Contact',
                'hero.subtitle': 'Where Your Hair Finds Its Masterpiece',
                'hero.cta': 'Book Your Appointment',
                'portfolio.title': 'Our Portfolio',
                'portfolio.classic.title': 'Classic Cut',
                'portfolio.classic.subtitle': 'Timeless elegance',
                'portfolio.modern.title': 'Modern Style',
                'portfolio.modern.subtitle': 'Current trends',
                'portfolio.color.title': 'Premium Color',
                'portfolio.color.subtitle': 'Total transformation',
                'portfolio.special.title': 'Special Styling',
                'portfolio.special.subtitle': 'For unique occasions',
                'portfolio.treatment.title': 'Treatment',
                'portfolio.treatment.subtitle': 'Professional care',
                'portfolio.unique.title': 'Unique Design',
                'portfolio.unique.subtitle': 'Creativity without limits',
                'about.title': 'About Cristian Rodriguez',
                'about.paragraph1': 'With over a decade of experience in the art of hairdressing, Cristian Rodriguez has perfected his technique in the best schools in Europe. His philosophy is based on the belief that every person has a unique style that must be discovered and enhanced.',
                'about.paragraph2': 'Located in the heart of Denmark, Arte Elegante is not just a hair salon, it is a space where creativity meets professional technique. Cristian specializes in cutting-edge cuts, advanced coloring and hair care treatments that transform not only your hair, but your confidence.',
                'about.paragraph3': 'His commitment to excellence and innovation has made him the trusted hairdresser for clients seeking not just a service, but a transformative experience.',
                'services.title': 'Our Services',
                'services.cut.title': 'Cut & Styling',
                'services.cut.description': 'Personalized cuts according to your style and face shape. From classics to the latest trends.',
                'services.color.title': 'Coloring',
                'services.color.description': 'Advanced color techniques, highlights, balayage and color treatments that enhance your natural beauty.',
                'services.treatment.title': 'Treatments',
                'services.treatment.description': 'Restorative, moisturizing and nourishing treatments to keep your hair healthy and shiny.',
                'services.events.title': 'Special Events',
                'services.events.description': 'Unique hairstyles for weddings, events and special occasions. We make your day memorable.',
                'services.beard.title': 'Beard & Mustache',
                'services.beard.description': 'Complete beard and mustache care with traditional techniques and premium products.',
                'services.consultation.title': 'Consultation',
                'services.consultation.description': 'Personalized advice to find the perfect style that complements your personality.',
                'testimonials.title': 'What Our Clients Say',
                'testimonials.quote': '"Cristian is simply the best. He not only transformed my hair, but helped me discover a new me. His attention to detail and professionalism are unmatched."',
                'testimonials.author': '- Maria Hansen',
                'contact.title': 'Contact',
                'contact.form.title': 'Book Your Appointment',
                'contact.form.name': 'Your Name',
                'contact.form.email': 'Your Email',
                'contact.form.phone': 'Your Phone',
                'contact.form.service.placeholder': 'Select a Service',
                'contact.form.service.cut': 'Cut & Styling',
                'contact.form.service.color': 'Coloring',
                'contact.form.service.treatment': 'Treatments',
                'contact.form.service.event': 'Special Event',
                'contact.form.service.beard': 'Beard & Mustache',
                'contact.form.service.consultation': 'Consultation',
                'contact.form.message': 'Additional message (optional)',
                'contact.form.submit': 'Send Request',
                'contact.form.success': 'Request Sent!',
                'contact.info.title': 'Contact Information',
                'contact.info.address': 'Copenhagen, Denmark',
                'contact.info.hours': 'Mon-Fri: 9:00-18:00<br>Sat: 9:00-16:00',
                'footer.copyright': '© 2025 Arte Elegante - Cristian Rodriguez. All rights reserved.',
                'footer.subtitle': 'Professional Hair Salon in Denmark'
            },
            da: {
                'nav.home': 'Hjem',
                'nav.portfolio': 'Portfolio',
                'nav.about': 'Om Os',
                'nav.services': 'Tjenester',
                'nav.testimonials': 'Anmeldelser',
                'nav.contact': 'Kontakt',
                'hero.subtitle': 'Hvor Dit Hår Finder Sit Mesterværk',
                'hero.cta': 'Book Din Tid',
                'portfolio.title': 'Vores Portfolio',
                'portfolio.classic.title': 'Klassisk Klip',
                'portfolio.classic.subtitle': 'Tidløs elegance',
                'portfolio.modern.title': 'Moderne Stil',
                'portfolio.modern.subtitle': 'Aktuelle trends',
                'portfolio.color.title': 'Premium Farve',
                'portfolio.color.subtitle': 'Total forvandling',
                'portfolio.special.title': 'Special Styling',
                'portfolio.special.subtitle': 'Til unikke lejligheder',
                'portfolio.treatment.title': 'Behandling',
                'portfolio.treatment.subtitle': 'Professionel pleje',
                'portfolio.unique.title': 'Unikt Design',
                'portfolio.unique.subtitle': 'Kreativitet uden grænser',
                'about.title': 'Om Cristian Rodriguez',
                'about.paragraph1': 'Med over et årti af erfaring inden for frisørkunst har Cristian Rodriguez perfektioneret sin teknik på de bedste skoler i Europa. Hans filosofi er baseret på troen på, at hver person har en unik stil, der skal opdages og fremhæves.',
                'about.paragraph2': 'Beliggende i hjertet af Danmark er Arte Elegante ikke bare en frisørsalon, det er et rum, hvor kreativitet møder professionel teknik. Cristian specialiserer sig i banebrydende klip, avanceret farvning og hårplejebehandlinger, der transformerer ikke kun dit hår, men dit selvtillid.',
                'about.paragraph3': 'Hans engagement i ekspertise og innovation har gjort ham til den betroede frisør for klienter, der søger ikke bare en service, men en transformerende oplevelse.',
                'services.title': 'Vores Tjenester',
                'services.cut.title': 'Klip & Styling',
                'services.cut.description': 'Personlige klip efter din stil og ansigtsform. Fra klassikere til de seneste trends.',
                'services.color.title': 'Farvning',
                'services.color.description': 'Avancerede farveteknikker, highlights, balayage og farvebehandlinger, der fremhæver din naturlige skønhed.',
                'services.treatment.title': 'Behandlinger',
                'services.treatment.description': 'Genoprettende, fugtighedstilførende og nærende behandlinger for at holde dit hår sundt og skinnende.',
                'services.events.title': 'Særlige Begivenheder',
                'services.events.description': 'Unikke frisurer til bryllupper, begivenheder og særlige lejligheder. Vi gør din dag mindeværdig.',
                'services.beard.title': 'Skæg & Overskæg',
                'services.beard.description': 'Komplet skæg- og overskægpleje med traditionelle teknikker og premium produkter.',
                'services.consultation.title': 'Konsultation',
                'services.consultation.description': 'Personlig rådgivning for at finde den perfekte stil, der supplerer din personlighed.',
                'testimonials.title': 'Hvad Vores Klienter Siger',
                'testimonials.quote': '"Cristian er simpelthen den bedste. Han transformerede ikke kun mit hår, men hjalp mig med at opdage et nyt mig. Hans opmærksomhed på detaljer og professionalisme er uovertruffen."',
                'testimonials.author': '- Maria Hansen',
                'contact.title': 'Kontakt',
                'contact.form.title': 'Book Din Tid',
                'contact.form.name': 'Dit Navn',
                'contact.form.email': 'Din Email',
                'contact.form.phone': 'Dit Telefon',
                'contact.form.service.placeholder': 'Vælg en Tjeneste',
                'contact.form.service.cut': 'Klip & Styling',
                'contact.form.service.color': 'Farvning',
                'contact.form.service.treatment': 'Behandlinger',
                'contact.form.service.event': 'Særlig Begivenhed',
                'contact.form.service.beard': 'Skæg & Overskæg',
                'contact.form.service.consultation': 'Konsultation',
                'contact.form.message': 'Yderligere besked (valgfri)',
                'contact.form.submit': 'Send Anmodning',
                'contact.form.success': 'Anmodning Sendt!',
                'contact.info.title': 'Kontaktinformation',
                'contact.info.address': 'København, Danmark',
                'contact.info.hours': 'Man-Fre: 9:00-18:00<br>Lør: 9:00-16:00',
                'footer.copyright': '© 2025 Arte Elegante - Cristian Rodriguez. Alle rettigheder forbeholdes.',
                'footer.subtitle': 'Professionel Frisørsalon i Danmark'
            }
        };
    }
    
    init() {
        this.setupLanguageButtons();
        this.loadSavedLanguage();
        this.translatePage();
    }

    setNavigationManager(navigationManager) {
        this.navigationManager = navigationManager;
    }
    
    setupLanguageButtons() {
        const languageButtons = document.querySelectorAll('.language-btn');
        languageButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const newLanguage = e.target.getAttribute('data-lang');
                this.changeLanguage(newLanguage);
            });
        });
    }
    
    changeLanguage(newLanguage) {
        if (newLanguage === this.currentLanguage) return;
        
        document.querySelectorAll('.language-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === newLanguage) {
                btn.classList.add('active');
            }
        });
        
        document.body.style.opacity = '0.8';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            this.currentLanguage = newLanguage;
            this.translatePage();
            this.saveLanguage();
            document.body.style.opacity = '1';
            
            // ✅ CERRAR MENÚ MÓVIL AL CAMBIAR IDIOMA
            if (this.navigationManager && this.navigationManager.isMenuOpen) {
                setTimeout(() => {
                    this.navigationManager.closeMobileMenu();
                }, 100);
            }
        }, 300);
    }
    
    translatePage() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);
            if (translation) {
                element.innerHTML = translation;
            }
        });
        
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            const translation = this.getTranslation(key);
            if (translation) {
                element.placeholder = translation;
            }
        });
        
        document.documentElement.lang = this.currentLanguage;
    }
    
    getTranslation(key) {
        return this.translations[this.currentLanguage]?.[key] || 
               this.translations['es'][key] || 
               key;
    }
    
    getSuccessMessage() {
        return this.getTranslation('contact.form.success');
    }
    
    saveLanguage() {
        try {
            localStorage.setItem('arteElegante_language', this.currentLanguage);
        } catch (e) {
            window.selectedLanguage = this.currentLanguage;
        }
    }
    
    loadSavedLanguage() {
        try {
            const savedLanguage = localStorage.getItem('arteElegante_language') || 
                                 window.selectedLanguage || 
                                 'es';
            
            if (this.translations[savedLanguage]) {
                this.currentLanguage = savedLanguage;
                document.querySelectorAll('.language-btn').forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('data-lang') === savedLanguage) {
                        btn.classList.add('active');
                    }
                });
            }
        } catch (e) {
            this.currentLanguage = 'es';
        }
    }
    
    getCurrentLanguage() {
        return this.currentLanguage;
    }
}

window.TranslationSystem = TranslationSystem;