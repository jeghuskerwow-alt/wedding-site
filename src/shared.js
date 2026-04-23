/**
 * Shared JavaScript for Victor & Astrid Wedding Website
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initFaq();
  initRsvp();
});

/**
 * Deltager du? Form logic
 */
function initRsvp() {
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpSuccess = document.getElementById('rsvp-success');

  if (rsvpForm && rsvpSuccess) {
    rsvpForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = rsvpForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      submitBtn.innerText = 'Sender...';
      submitBtn.disabled = true;

      const formData = new FormData(rsvpForm);
      
      try {
        const response = await fetch(rsvpForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          rsvpForm.classList.add('hidden');
          rsvpSuccess.classList.remove('hidden');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const data = await response.json();
          if (data && data.errors) {
            alert('Fejl: ' + data.errors.map(error => error.message).join(", "));
          } else {
            alert('Der opstod en fejl hos Formspree. Prøv venligst igen senere.');
          }
          submitBtn.innerText = originalText;
          submitBtn.disabled = false;
        }
      } catch (error) {
        console.error('Submission error:', error);
        alert('Der opstod en netværksfejl. Tjek venligst din internetforbindelse og prøv igen.');
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      }
    });
  }
}

/**
 * Navigation logic: Sticky header and Mobile menu
 */
function initNavigation() {
  const nav = document.querySelector('nav');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('bg-white', 'shadow-sm', 'py-4');
      nav.classList.remove('bg-transparent', 'py-6');
      nav.classList.add('text-black');
      nav.classList.remove('text-white');
    } else {
      // Only remove if we are on a page with a dark hero (like index)
      if (nav.dataset.transparent === 'true') {
        nav.classList.remove('bg-white', 'shadow-sm', 'py-4');
        nav.classList.add('bg-transparent', 'py-6');
        nav.classList.remove('text-black');
        nav.classList.add('text-white');
      }
    }
  });

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

/**
 * FAQ Accordion logic
 */
function initFaq() {
  const faqButtons = document.querySelectorAll('.faq-btn');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      
      // Toggle current
      content.classList.toggle('hidden');
      if (icon) {
        icon.classList.toggle('rotate-180');
      }
      
      // Close others (optional, but nice)
      faqButtons.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.nextElementSibling.classList.add('hidden');
          const otherIcon = otherBtn.querySelector('.faq-icon');
          if (otherIcon) otherIcon.classList.remove('rotate-180');
        }
      });
    });
  });
}

