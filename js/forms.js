// Initialize EmailJS with your public key
(function() {
    emailjs.init("aTplpx662MEXiSJE5"); // Your public key
})();

// Handle contact form submission
document.addEventListener('DOMContentLoaded', function() {
    // Contact form handler
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            const templateParams = {
                from_name: contactForm.querySelector('#name').value,
                from_email: contactForm.querySelector('#email').value,
                subject: contactForm.querySelector('#subject').value,
                message: contactForm.querySelector('#message').value,
            };

            emailjs.send('service_l32v4u9', 'template_kruo6lo', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    alert('Sorry, there was an error. Please try again later.');
                })
                .finally(function() {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                });
        });
    }

    // Booking form handler
    const bookingForm = document.querySelector('#booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            const templateParams = {
                from_name: bookingForm.querySelector('input[placeholder="Your Name"]').value,
                from_email: bookingForm.querySelector('input[placeholder="Your Email"]').value,
                service: bookingForm.querySelector('select').value,
                date: bookingForm.querySelector('input[placeholder="Service Date"]').value,
                special_request: bookingForm.querySelector('textarea').value,
                type: 'Booking Request'
            };

            emailjs.send('service_l32v4u9', 'template_kruo6lo', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Thank you for your booking request! We will confirm your appointment soon.');
                    bookingForm.reset();
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    alert('Sorry, there was an error. Please try again later.');
                })
                .finally(function() {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Book Now';
                });
        });
    }

    // Newsletter form handler (keeping the existing implementation)
    const newsletterForm = document.querySelector('#newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('#newsletter-email');
            const submitButton = newsletterForm.querySelector('#newsletter-submit');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            const templateParams = {
                to_email: emailInput.value,
                to_name: emailInput.value.split('@')[0],
                message: 'Thank you for subscribing to our newsletter!'
            };

            emailjs.send('service_l32v4u9', 'template_kruo6lo', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Thank you for subscribing to our newsletter!');
                    emailInput.value = '';
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    alert('Sorry, there was an error. Please try again later.');
                })
                .finally(function() {
                    submitButton.disabled = false;
                    submitButton.textContent = 'SignUp';
                });
        });
    }
}); 