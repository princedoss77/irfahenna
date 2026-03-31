// ===================================
// Image Loading Optimization
// ===================================

// Progressive image loading with fade-in effect
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    // Create intersection observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Load the image
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                
                // Add loaded class when image loads
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                    img.classList.add('loaded');
                }, { once: true });
                
                // Stop observing this image
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px' // Start loading 50px before image enters viewport
    });
    
    // Observe all lazy images
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// ===================================
// Navigation & Scroll Handling
// ===================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===================================
// Back to Top Button
// ===================================

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Gallery Filtering
// ===================================

const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

// Function to filter gallery items
function filterGallery(filterValue) {
    galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
            // Add fade-in animation
            item.style.animation = 'fadeIn 0.5s ease-out';
        } else {
            item.style.display = 'none';
        }
    });
}

// Initialize gallery with Arabic filter on page load (for faster mobile loading)
document.addEventListener('DOMContentLoaded', () => {
    filterGallery('arabic');
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        filterGallery(filterValue);
    });
});

// ===================================
// Contact Form Handling with Modal Popup
// ===================================

const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModal');
const modalOkBtn = document.getElementById('modalOkBtn');

// Function to show modal
function showSuccessModal() {
    successModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Function to hide modal
function hideSuccessModal() {
    successModal.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
}

// Close modal on button click
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', hideSuccessModal);
}

if (modalOkBtn) {
    modalOkBtn.addEventListener('click', hideSuccessModal);
}

// Close modal on overlay click
if (successModal) {
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            hideSuccessModal();
        }
    });
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal.classList.contains('active')) {
        hideSuccessModal();
    }
});

// Form submission handling using Web3Forms
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission
        
        // Get form data for validation
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateForm(data)) {
            return false;
        }
        
        // If validation passes, show loading message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // ==================================================
            // REPLACE 'YOUR_ACCESS_KEY_HERE' WITH YOUR ACTUAL KEY
            // Get it FREE from: https://web3forms.com
            // Just enter irfabu09@gmail.com and get the key!
            // ==================================================
            
            const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE';
            
            // Add access key to form data
            formData.append('access_key', WEB3FORMS_ACCESS_KEY);
            
            // Submit to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success modal
                showSuccessModal();
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Submission failed');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Oops! There was a problem submitting your form. Please email us directly at irfabu09@gmail.com or try again.');
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

function validateForm(data) {
    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.service || !data.date) {
        showNotification('Please fill in all required fields.', 'error');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
    if (!phoneRegex.test(data.phone)) {
        showNotification('Please enter a valid phone number.', 'error');
        return false;
    }
    
    // Date validation (not in the past)
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showNotification('Please select a future date.', 'error');
        return false;
    }
    
    return true;
}

// ===================================
// Notification System
// ===================================

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-content i {
        font-size: 1.5rem;
    }
    
    @media (max-width: 768px) {
        .notification {
            left: 20px;
            right: 20px;
            max-width: none;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Intersection Observer for Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    observer.observe(card);
});

// Observe gallery items
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.9)';
    item.style.transition = `opacity 0.5s ease-out ${index * 0.05}s, transform 0.5s ease-out ${index * 0.05}s`;
    observer.observe(item);
});

// Observe testimonial cards
document.querySelectorAll('.testimonial-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`;
    observer.observe(card);
});

// ===================================
// Loading State
// ===================================

window.addEventListener('load', () => {
    // Remove any loading states
    document.body.classList.add('loaded');
    
    // Initialize any lazy-loaded content
    console.log('Website loaded successfully!');
});

// ===================================
// Prevent Date Input from Selecting Past Dates
// ===================================

const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// ===================================
// Gallery Item Click Handler (Optional Modal)
// ===================================

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('.gallery-overlay h4')?.textContent || 'Gallery Image';
        const description = item.querySelector('.gallery-overlay p')?.textContent || 'Henna Design';
        
        showNotification(`${title} - ${description}`, 'success');
        // In a real application, you might want to open a modal with a larger image
    });
});

// ===================================
// Dynamic Year in Footer
// ===================================

const updateFooterYear = () => {
    const yearElements = document.querySelectorAll('.footer-bottom p');
    yearElements.forEach(el => {
        if (el.textContent.includes('2025')) {
            el.textContent = el.textContent.replace('2025', new Date().getFullYear());
        }
    });
};

updateFooterYear();

// ===================================
// Scroll Progress Indicator
// ===================================

const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 5px;
        background: linear-gradient(90deg, #FF6B9D 0%, #FFA500 25%, #FFD700 50%, #4CAF50 75%, #2196F3 100%);
        background-size: 200% 100%;
        z-index: 10000;
        transition: width 0.1s ease-out;
        width: 0%;
        box-shadow: 0 2px 10px rgba(212, 20, 90, 0.3);
        animation: rainbowScroll 3s linear infinite;
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent += `
        @keyframes rainbowScroll {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    });
};

createScrollProgress();

// ===================================
// Smooth Reveal for About Section Images
// ===================================

const aboutImage = document.querySelector('.about-image');
if (aboutImage) {
    aboutImage.style.opacity = '0';
    aboutImage.style.transform = 'translateX(-50px)';
    aboutImage.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(aboutImage);
}

const aboutText = document.querySelector('.about-text');
if (aboutText) {
    aboutText.style.opacity = '0';
    aboutText.style.transform = 'translateX(50px)';
    aboutText.style.transition = 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s';
    observer.observe(aboutText);
}

// ===================================
// Console Welcome Message
// ===================================

console.log('%c🌿 Welcome to Irfa Henna 🌿', 'font-size: 20px; color: #8B4513; font-weight: bold;');
console.log('%cBeautiful Henna Art for Your Special Moments', 'font-size: 14px; color: #D2691E;');
console.log('%cWebsite created with ❤️', 'font-size: 12px; color: #666;');

// ===================================
// Service Worker Registration (Optional - for PWA)
// ===================================

// Uncomment to enable PWA features
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
*/

