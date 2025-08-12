// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    // Toggle theme function
    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            body.removeAttribute('data-theme');
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    }

    // Add click event listener to dark mode toggle
    darkModeToggle.addEventListener('click', toggleTheme);

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Close mobile menu when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                navLinks.classList.remove('active');
                mobileMenuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // Testimonial Accordion Functionality
    const testimonialItems = document.querySelectorAll('.item-testimonial');
    
    testimonialItems.forEach(item => {
        const iconItem = item.querySelector('.icon-item');
        const content = item.querySelector('.content');
        
        if (iconItem && !item.classList.contains('active')) {
            iconItem.addEventListener('click', function() {
                // Close all other testimonials
                testimonialItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherIcon = otherItem.querySelector('.icon-item i');
                        if (otherIcon) {
                            otherIcon.classList.replace('fa-close', 'fa-plus');
                        }
                    }
                });

                // Toggle current testimonial
                item.classList.toggle('active');
                const icon = this.querySelector('i');
                
                if (item.classList.contains('active')) {
                    icon.classList.replace('fa-plus', 'fa-close');
                } else {
                    icon.classList.replace('fa-close', 'fa-plus');
                }
            });
        }

        // Handle close button for active testimonial
        if (item.classList.contains('active')) {
            iconItem.addEventListener('click', function() {
                item.classList.remove('active');
                const icon = this.querySelector('i');
                icon.classList.replace('fa-close', 'fa-plus');
            });
        }
    });

    // Smooth scrolling for navigation links
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.group-inps');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('Name').value;
            const email = document.getElementById('Email').value;
            const message = document.getElementById('Message').value;
            
            if (name && email && message) {
                // Show success message
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                
                // Reset form
                this.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 1000000;
            display: flex;
            align-items: center;
            gap: 1rem;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        `;

        // Add CSS animation
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.2rem;
                    cursor: pointer;
                    padding: 0;
                    margin-left: auto;
                }
            `;
            document.head.appendChild(style);
        }

        // Add to DOM
        document.body.appendChild(notification);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product-card, .card-text, .item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add CSS for animations
    if (!document.querySelector('#animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            .product-card,
            .card-text,
            .item {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .product-card.animate-in {
                transition-delay: 0.1s;
            }
            
            .card-text.animate-in {
                transition-delay: 0.2s;
            }
            
            .item.animate-in {
                transition-delay: 0.15s;
            }
        `;
        document.head.appendChild(style);
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        imageObserver.observe(img);
    });

    // Add scroll-to-top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-gradient);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        transform: translateY(20px);
    `;

    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
            scrollToTopBtn.style.transform = 'translateY(20px)';
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effect to scroll-to-top button
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
    });

    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.transform = window.pageYOffset > 300 ? 'translateY(0) scale(1)' : 'translateY(20px) scale(1)';
    });

    // Enhanced product card interactions
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Update navigation active state on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinksItems = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add active nav link styles
    if (!document.querySelector('#nav-active-styles')) {
        const style = document.createElement('style');
        style.id = 'nav-active-styles';
        style.textContent = `
            .nav-links a.active {
                color: #0075ff !important;
                font-weight: 600;
            }
        `;
        document.head.appendChild(style);
    }

    console.log('30TOL Website initialized successfully! 🚀');
});