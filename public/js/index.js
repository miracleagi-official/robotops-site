/**
 * Landing Page JavaScript
 * - Header/Footer Include
 * - Smooth Scroll
 * - FAQ Accordion
 * - Form Validation
 * - Mobile Menu Toggle
 * - Mobile Fixed CTA
 */

document.addEventListener('DOMContentLoaded', function() {

  // ========================================
  // Header & Footer Include
  // ========================================

  const headerEl = document.getElementById('header');
  const footerEl = document.getElementById('footer');

  if (headerEl) {
    fetch('inc/header.html')
      .then(res => res.text())
      .then(html => {
        headerEl.innerHTML = html;
        initMobileMenu();
        initSmoothScroll();
      })
      .catch(err => console.error('Header load failed:', err));
  }

  if (footerEl) {
    fetch('inc/footer.html')
      .then(res => res.text())
      .then(html => {
        footerEl.innerHTML = html;
      })
      .catch(err => console.error('Footer load failed:', err));
  }

  // ========================================
  // Smooth Scroll (for anchor links)
  // ========================================

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('header')?.offsetHeight || 70;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          const nav = document.querySelector('.nav');
          if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            document.body.classList.remove('no-scroll');
          }
        }
      });
    });
  }

  // Initialize smooth scroll for elements already in DOM
  initSmoothScroll();

  // ========================================
  // Mobile Menu Toggle
  // ========================================

  function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');

    if (mobileToggle && nav) {
      mobileToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
      });
    }
  }

  // ========================================
  // FAQ Accordion
  // ========================================

  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    if (question) {
      question.addEventListener('click', function() {
        // Close other open items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });

        // Toggle current item
        item.classList.toggle('active');
      });
    }
  });

  // ========================================
  // Form Validation & Submission
  // ========================================

  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const companyInput = this.querySelector('input[name="company"]');
      const phoneInput = this.querySelector('input[name="phone"]');
      const privacyCheck = this.querySelector('input[name="privacy"]');

      // Validation
      let isValid = true;
      let errorMessage = '';

      // Company name validation
      if (!companyInput.value.trim()) {
        isValid = false;
        errorMessage = '회사명 또는 성함을 입력해주세요.';
        companyInput.focus();
      }
      // Phone validation
      else if (!phoneInput.value.trim()) {
        isValid = false;
        errorMessage = '연락처를 입력해주세요.';
        phoneInput.focus();
      }
      // Phone format validation (basic Korean phone number)
      else if (!/^[0-9-]{9,14}$/.test(phoneInput.value.replace(/\s/g, ''))) {
        isValid = false;
        errorMessage = '올바른 연락처 형식을 입력해주세요.';
        phoneInput.focus();
      }
      // Privacy agreement validation
      else if (!privacyCheck.checked) {
        isValid = false;
        errorMessage = '개인정보 수집 및 이용에 동의해주세요.';
      }

      if (!isValid) {
        alert(errorMessage);
        return;
      }

      // Form data
      const formData = {
        company: companyInput.value.trim(),
        phone: phoneInput.value.trim(),
        timestamp: new Date().toISOString()
      };

      console.log('Form submitted:', formData);

      // Success feedback
      alert('신청이 완료되었습니다.\n담당자가 빠른 시일 내에 연락드리겠습니다.');

      // Reset form
      this.reset();

      // Here you would typically send the data to a server
      // Example:
      // fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
    });
  }

  // ========================================
  // Mobile Fixed CTA Visibility
  // ========================================

  const mobileFixedCta = document.getElementById('mobileFixedCta');
  const heroSection = document.getElementById('hero');
  const ctaSection = document.getElementById('cta');

  function updateMobileCtaVisibility() {
    if (!mobileFixedCta || !heroSection) return;

    const heroBottom = heroSection.getBoundingClientRect().bottom;
    const ctaTop = ctaSection ? ctaSection.getBoundingClientRect().top : window.innerHeight + 100;
    const windowHeight = window.innerHeight;

    // Show when hero is scrolled past and CTA section is not in view
    if (heroBottom < 0 && ctaTop > windowHeight) {
      mobileFixedCta.style.display = 'block';
    } else {
      mobileFixedCta.style.display = 'none';
    }
  }

  // Check on scroll
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(updateMobileCtaVisibility);
  });

  // Initial check
  updateMobileCtaVisibility();

  // ========================================
  // Scroll Animation (Optional Enhancement)
  // ========================================

  function animateOnScroll() {
    const elements = document.querySelectorAll('.card, .solution-item, .process-item, .case-card, .guarantee-card');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  // Initialize scroll animation
  animateOnScroll();

});
