gsap.registerPlugin(ScrollTrigger);

// Navbar entrance
gsap.from(".gsap-nav", { y: -50, opacity: 0, duration: 1, ease: "power3.out" });

// Sequential fade-ins
gsap.utils.toArray('.gsap-up').forEach((element) => {
  gsap.fromTo(element,
    { y: 40, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    }
  );
});

// Form Validation Logic
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('successMsg');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      // Name validation
      const name = document.getElementById('name');
      if (!name.value.trim()) {
        name.parentElement.classList.add('error');
        isValid = false;
      } else {
        name.parentElement.classList.remove('error');
      }

      // Email validation
      const email = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        email.parentElement.classList.add('error');
        isValid = false;
      } else {
        email.parentElement.classList.remove('error');
      }

      // Message validation
      const message = document.getElementById('message');
      if (!message.value.trim()) {
        message.parentElement.classList.add('error');
        isValid = false;
      } else {
        message.parentElement.classList.remove('error');
      }

      if (isValid) {
        // Send email using FormSubmit API
        const btn = document.getElementById('submitBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Sending...</span>';
        btn.disabled = true;

        fetch('https://formsubmit.co/ajax/kannpraveen3773@gmail.com', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name.value,
            email: email.value,
            message: message.value,
            _subject: "New Portfolio Message from " + name.value
          })
        })
          .then(response => response.json())
          .then(data => {
            form.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;

            // Show success
            successMsg.classList.remove('hidden');

            // Hide success message after 5 seconds
            setTimeout(() => {
              successMsg.classList.add('hidden');
            }, 5000);
          })
          .catch(error => {
            console.error("Error:", error);
            btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> <span>Error</span>';
            setTimeout(() => { btn.innerHTML = originalText; btn.disabled = false; }, 3000);
          });
      }
    });

    // Remove error states dynamically on input
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        input.parentElement.classList.remove('error');
        successMsg.classList.add('hidden');
      });
    });
  }
});
