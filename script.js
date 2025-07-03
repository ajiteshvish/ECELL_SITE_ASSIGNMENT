document.addEventListener('DOMContentLoaded', function() {
  // Navigation menu toggle
  const navLinks = document.getElementById('navLinks');
  const openMenu = document.getElementById('openMenu');
  const closeMenu = document.getElementById('closeMenu');
  
  if (openMenu && closeMenu && navLinks) {
    openMenu.addEventListener('click', function() {
      navLinks.classList.add('active');
    });
    
    closeMenu.addEventListener('click', function() {
      navLinks.classList.remove('active');
    });
  }
  
  // Header scroll effect
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.style.backgroundColor = 'rgba(5, 7, 20, 0.95)';
      header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
      header.style.backgroundColor = 'rgba(5, 7, 20, 0.8)';
      header.style.boxShadow = 'none';
    }
  });
  
  // Stats counter animation
  const stats = document.querySelectorAll('.stat-number');
  
  function animateStats() {
    stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const count = +stat.innerText;
      const increment = target / 50;
      
      if (count < target) {
        stat.innerText = Math.ceil(count + increment);
        setTimeout(animateStats, 40);
      } else {
        stat.innerText = target;
      }
    });
  }
  
  // Events slider
  const eventsSlider = document.querySelector('.events-slider');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const eventCards = document.querySelectorAll('.event-card');
  let currentIndex = 0;
  
  if (eventsSlider && prevBtn && nextBtn && eventCards.length > 0) {
    const cardWidth = eventCards[0].offsetWidth + 30; // Card width + gap
    
    function updateSlider() {
      eventsSlider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      eventsSlider.style.transition = 'transform 0.5s ease';
    }
    
    nextBtn.addEventListener('click', function() {
      if (currentIndex < eventCards.length - 1) {
        currentIndex++;
        updateSlider();
      }
    });
    
    prevBtn.addEventListener('click', function() {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });
    
    // Reset slider position on window resize
    window.addEventListener('resize', function() {
      currentIndex = 0;
      updateSlider();
    });
  }
  
  // Form submission handling
  const contactForm = document.getElementById('contactForm');
  const newsletterForm = document.getElementById('newsletterForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      
      submitBtn.innerText = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(function() {
        submitBtn.innerText = 'Message Sent!';
        contactForm.reset();
        
        setTimeout(function() {
          submitBtn.innerText = originalText;
          submitBtn.disabled = false;
        }, 2000);
      }, 1500);
    });
  }
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulate form submission
      const submitBtn = newsletterForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;
      
      setTimeout(function() {
        submitBtn.innerHTML = '<i class="fas fa-check"></i>';
        newsletterForm.reset();
        
        setTimeout(function() {
          submitBtn.innerHTML = originalHTML;
          submitBtn.disabled = false;
        }, 2000);
      }, 1500);
    });
  }
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        
        // Trigger stats animation when about section is visible
        if (entry.target.id === 'about') {
          animateStats();
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all sections for animation
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
        
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Parallax effect for hero section
  const heroSection = document.querySelector('.hero');
  
  window.addEventListener('scroll', function() {
    if (heroSection) {
      const scrollPosition = window.scrollY;
      heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
  });
  
  // Add hover effect for team members
  document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 10px 30px rgba(0, 240, 255, 0.2)';
    });
    
    member.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
  });
});