document.addEventListener('DOMContentLoaded', () => {
    // Carousel Auto Scroll
    const studioCarouselElement = document.getElementById('studioCarousel');
    if (studioCarouselElement && typeof bootstrap !== 'undefined') {
      const carouselInstance = new bootstrap.Carousel(studioCarouselElement, {
        interval: 3000, // Automatically scrolls every 3 seconds
        ride: 'carousel',
        pause: 'hover',
        wrap: true
      });
      carouselInstance.cycle();
    }

    // Nav Side Drawer Responsiveness
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const navDrawer = document.getElementById('navDrawer');
    const navOverlay = document.getElementById('navOverlay');

    function openDrawer() {
      navDrawer.classList.add('open');
      navOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock background scrolling
    }

    function closeDrawer() {
      navDrawer.classList.remove('open');
      navOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }

    if (menuToggle) menuToggle.addEventListener('click', openDrawer);
    if (menuClose) menuClose.addEventListener('click', closeDrawer);
    if (navOverlay) navOverlay.addEventListener('click', closeDrawer);

    // Header Glassmorphism
    const siteHeader = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    });

    // Pricing Toggle
    const billingToggle = document.getElementById('billingToggle');
    const labelMonthly = document.getElementById('label-monthly');
    const labelYearly = document.getElementById('label-yearly');
    const priceValues = document.querySelectorAll('.price-value');

    if (billingToggle) {
      billingToggle.addEventListener('change', (e) => {
        const isYearly = e.target.checked;

        // Update Label Active States
        if (isYearly) {
          labelYearly.classList.add('active');
          labelMonthly.classList.remove('active');
        } else {
          labelMonthly.classList.add('active');
          labelYearly.classList.remove('active');
        }

        // Smooth Price Swap Transition
        priceValues.forEach((price) => {
          price.style.opacity = '0';
          price.style.transform = 'translateY(-5px)';

          setTimeout(() => {
            price.textContent = isYearly 
              ? price.getAttribute('data-yearly') 
              : price.getAttribute('data-monthly');
            
            price.style.opacity = '1';
            price.style.transform = 'translateY(0)';
          }, 150);
        });
      });

      priceValues.forEach((price) => {
        price.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      });
    }

    // Fade Up Animation When Scrolling
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
      root: null,
      threshold: 0.15, // Triggers when 15% of element is visible
      rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target); // Animate once for clean performance
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => scrollObserver.observe(el));

    // Smooth Scroll Anchor Navigation
    const navLinks = document.querySelectorAll('.nav-link, .btn-admin, .btn-member');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            
            // Close drawer if open on mobile
            closeDrawer();

            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });

});