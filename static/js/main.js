// Theme Toggle Functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Navbar icons swap handled via src-light/src-dark attributes in HTML
}

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Set initial theme toggle icon
    const themeIcon = document.querySelector('.theme-toggle img');
    if (themeIcon) {
        themeIcon.src = savedTheme === 'light' ? 'assets/theme_dark.png' : 'assets/theme_light.png';
    }
}

// Hamburger Menu Toggle
function toggleMenu() {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}

// Smooth scrolling for navigation links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add click event listeners to navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();

    // Normalize nav links to correct base regardless of nesting depth
    (function normalizeNavLinks(){
        try {
            var pathname = window.location.pathname || '';
            var origin = window.location.origin || '';
            var marker = '/Test/';
            var idx = pathname.indexOf(marker);
            var siteBase = '';
            if (idx !== -1) {
                var basePath = pathname.substring(0, idx + marker.length);
                siteBase = origin ? (origin + basePath) : basePath;
            } else {
                // Fallback: use origin root or current directory
                siteBase = origin ? (origin + '/') : './';
            }

            function setHref(anchor, target){
                if (!anchor) return;
                anchor.setAttribute('href', siteBase + target);
            }

            // Desktop nav
            var desktopNav = document.querySelector('#desktop-nav');
            if (desktopNav){
                setHref(desktopNav.querySelector('a.logo-wrapper'), '');
                desktopNav.querySelectorAll('a').forEach(function(a){
                    var href = (a.getAttribute('href')||'').toLowerCase();
                    var text = (a.textContent||'').trim().toLowerCase();
                    if (href.indexOf('blog.html') !== -1 || text === 'blog') setHref(a, 'blog.html');
                    else if (href.indexOf('about.html') !== -1 || text === 'about') setHref(a, 'about.html');
                    else if (href.indexOf('search.html') !== -1 || text.indexOf('🔍') !== -1) setHref(a, 'search.html');
                    else if (href === '/' || href.indexOf('index.html') !== -1 || text === 'home') setHref(a, '');
                });
            }

            // Hamburger nav
            var mobileNav = document.querySelector('#hamburger-nav');
            if (mobileNav){
                setHref(mobileNav.querySelector('a.logo-wrapper'), '');
                mobileNav.querySelectorAll('a').forEach(function(a){
                    var href = (a.getAttribute('href')||'').toLowerCase();
                    var text = (a.textContent||'').trim().toLowerCase();
                    if (href.indexOf('blog.html') !== -1 || text === 'blog') setHref(a, 'blog.html');
                    else if (href.indexOf('about.html') !== -1 || text === 'about') setHref(a, 'about.html');
                    else if (href.indexOf('search.html') !== -1 || text.indexOf('🔍') !== -1) setHref(a, 'search.html');
                    else if (href === '/' || href.indexOf('index.html') !== -1 || text === 'home') setHref(a, '');
                });
            }
        } catch (e) {
            console.warn('Nav normalization failed:', e);
        }
    })();
    
    // Wire navbar theme icons
    const navToggle1 = document.getElementById('modeToggle');
    const navToggle2 = document.getElementById('modeToggle2');
    if (navToggle1) navToggle1.addEventListener('click', toggleTheme);
    if (navToggle2) navToggle2.addEventListener('click', toggleTheme);
    
    // Add smooth scrolling to all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
            
            // Close mobile menu if open
            const menu = document.querySelector('.menu-links');
            const icon = document.querySelector('.hamburger-icon');
            if (menu && menu.classList.contains('open')) {
                menu.classList.remove('open');
                icon.classList.remove('open');
            }
        });
    });
    
    // Add scroll effect to navigation (both desktop and mobile)
    let lastScrollTop = 0;
    const navs = document.querySelectorAll('#desktop-nav, #hamburger-nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const hide = scrollTop > lastScrollTop && scrollTop > 100;
        
        navs.forEach((n) => {
            if (!n) return;
            n.style.transform = hide ? 'translateY(-100%)' : 'translateY(0)';
        });
        
        lastScrollTop = scrollTop;
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.details-container, .article-container article, .project-details-container');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add typing effect to title
    const title = document.querySelector('.title');
    if (title && title.textContent === 'Justin Kombe Tonguino') {
        const text = title.textContent;
        title.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to social icons
    const socialIcons = document.querySelectorAll('#socials-container .icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1.2)';
            }, 150);
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Ensure hero scrolls normally (no parallax)
    const profileSection = document.querySelector('#profile');
    if (profileSection) {
        profileSection.style.transform = 'none';
    }
    
    // Add tooltip functionality
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: var(--bg-tertiary);
                color: var(--text-primary);
                padding: 0.5rem;
                border-radius: 0.5rem;
                font-size: 0.8rem;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 10);
            
            this.addEventListener('mouseleave', function() {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(tooltip);
                }, 300);
            });
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            const menu = document.querySelector('.menu-links');
            const icon = document.querySelector('.hamburger-icon');
            if (menu && menu.classList.contains('open')) {
                menu.classList.remove('open');
                icon.classList.remove('open');
            }
        }
    });
    
    // Add form validation for contact form (if exists)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add copy to clipboard functionality for email
    const emailElement = document.querySelector('a[href^="mailto:"]');
    if (emailElement) {
        emailElement.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.href.replace('mailto:', '');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showNotification('Email copied to clipboard!');
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification('Email copied to clipboard!');
            }
        });
    }
    
    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-primary);
            color: var(--bg-primary);
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Add lazy loading for images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
    
    // Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
    
    // Initialize Table of Contents for blog posts
    initializeTableOfContents();

    // Inject structured data (JSON-LD) for SEO
    injectStructuredData();
});

// ============================================
// TABLE OF CONTENTS (TOC) FUNCTIONALITY
// ============================================

// Initialize Table of Contents for blog posts
function initializeTableOfContents() {
    // Support both inline and sidebar TOC if present
    const inlineTocList = document.querySelector('#inline-toc .toc-list');
    if (inlineTocList) {
        initializeInlineTOC(inlineTocList);
    }

    const sidebarTocNav = document.querySelector('#post-toc nav');
    if (sidebarTocNav) {
        initializeSidebarTOC(sidebarTocNav);
    }
}

// Initialize inline TOC with existing anchors or auto-generate
function initializeInlineTOC(listRoot) {
    const content = document.querySelector('.post-content');
    if (!content || !listRoot) return;
    
    // Common heading ID mappings for consistency
    const headingMap = {
        'Introduction': 'introduction',
        'What is eJPT v2?': 'what-is-ejpt-v2',
        'Prerequisites': 'prerequisites',
        'Study Materials': 'study-materials',
        'Exam Experience': 'exam-experience',
        'Key Takeaways': 'key-takeaways',
        'Conclusion': 'conclusion',
        'Overview': 'overview',
        'Arch Linux': 'arch',
        'Pop!_OS': 'popos',
        'Head-to-Head Comparison': 'comparison',
        'My Personal Takeaways': 'takeaways'
    };
    
    let items = [];
    let currentH2Li = null;
    let currentSubUl = null;

    const existingAnchors = listRoot.querySelectorAll('a');
    if (existingAnchors.length) {
        // Use provided anchors to wire behavior
        existingAnchors.forEach((a) => {
            const id = a.getAttribute('href').replace('#', '');
            const h = document.getElementById(id) || content.querySelector('#' + id);
            if (h) items.push({ el: h, link: a });
        });
    } else {
        // Auto-generate TOC from headings
        content.querySelectorAll('h2, h3').forEach((h, idx) => {
            const text = h.textContent.replace(/#$/, '').trim();
            const id = headingMap[text] || h.id || ('sec-' + idx);
            h.id = id;
            
            const a = document.createElement('a');
            a.href = '#' + id;
            a.textContent = text;
            a.className = 'toc-depth-' + (h.tagName === 'H2' ? '2' : '3');
            
            const li = document.createElement('li');
            li.appendChild(a);
            
            if (h.tagName === 'H2') {
                listRoot.appendChild(li);
                currentH2Li = li;
                currentSubUl = document.createElement('ul');
                currentH2Li.appendChild(currentSubUl);
            } else {
                if (!currentSubUl) {
                    currentSubUl = document.createElement('ul');
                    listRoot.appendChild(currentSubUl);
                }
                currentSubUl.appendChild(li);
            }
            items.push({ el: h, link: a });
        });
    }
    
    setupTOCInteractions(listRoot, items);
}

// Initialize sidebar TOC (simpler pattern)
function initializeSidebarTOC(nav) {
    const content = document.querySelector('.post-content');
    if (!content || !nav) return;
    
    const headings = content.querySelectorAll('h2, h3');
    const items = [];
    
    headings.forEach((h, idx) => {
        if (!h.id) h.id = 'sec-' + idx;
        
        const a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent.replace(/#$/, '').trim();
        a.className = 'toc-depth-' + (h.tagName === 'H2' ? '2' : '3');
        
        nav.appendChild(a);
        items.push({ el: h, link: a });
    });
    
    setupTOCInteractions(nav, items);
}

// Setup common TOC interactions (smooth scrolling and active highlighting)
function setupTOCInteractions(container, items) {
    // Smooth scrolling for TOC links
    container.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });
    
    // Highlight active section on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const item = items.find(i => i.el === entry.target);
            if (!item) return;
            
            if (entry.isIntersecting) {
                items.forEach(i => i.link.classList.remove('active'));
                item.link.classList.add('active');
            }
        });
    }, { 
        rootMargin: '0px 0px -70% 0px', 
        threshold: 0.1 
    });
    
    items.forEach(item => observer.observe(item.el));
}

// ============================================
// END TABLE OF CONTENTS FUNCTIONALITY
// ============================================

// Export functions for global access
window.toggleMenu = toggleMenu;
window.toggleTheme = toggleTheme;
window.initializeTableOfContents = initializeTableOfContents;

// ============================================
// STRUCTURED DATA (JSON-LD) INJECTION
// ============================================
function injectStructuredData() {
    // Avoid duplicate injection across navigations
    if (document.getElementById('person-jsonld')) return;

    var origin = window.location.origin || '';
    // Fallback for local file viewing
    var siteRoot = origin ? (origin + '/') : '/';

    var person = {
        "@context": "https:\/\/schema.org",
        "@type": "Person",
        "name": "Justin Kombe Tonguino",
        "url": siteRoot,
        "image": siteRoot + "assets/profile.webp",
        "sameAs": [
            "https:\/\/www.linkedin.com\/in\/jkt112\/",
            "https:\/\/github.com\/justinkt101\/",
            "https:\/\/tryhackme.com\/p\/justinkt",
            "https:\/\/app.hackthebox.com\/profile\/justinkt"
        ],
        "jobTitle": "Cybersecurity Researcher",
        "worksFor": {
            "@type": "Organization",
            "name": "Asia Pacific University"
        },
        "inLanguage": "en",
        "knowsAbout": [
            "Red Teaming",
            "Penetration Testing",
            "Adversary Simulation",
            "CRTA",
            "MCRTA",
            "eJPT",
            "HackTheBox"
        ]
    };

    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'person-jsonld';
    script.text = JSON.stringify(person);
    document.head.appendChild(script);
}
