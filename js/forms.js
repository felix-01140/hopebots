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

            const name = contactForm.querySelector('#name').value;
            const email = contactForm.querySelector('#email').value;
            const subject = contactForm.querySelector('#subject').value;
            const message = contactForm.querySelector('#message').value;

            // Send notification to admin
            const adminTemplateParams = {
                to_email: 'alelabsservices@gmail.com',
                subject: 'New Contact Form Submission',
                message: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
                type: 'admin_notification'
            };

            // Send confirmation to user
            const userTemplateParams = {
                to_email: email,
                to_name: name,
                subject: 'Thank you for contacting Alelabs',
                message: 'We have received your message and will get back to you shortly.',
                type: 'user_confirmation'
            };

            Promise.all([
                emailjs.send('service_l32v4u9', 'template_kruo6lo', adminTemplateParams),
                emailjs.send('service_l32v4u9', 'template_kruo6lo', userTemplateParams)
            ])
                .then(function(responses) {
                    console.log('SUCCESS!', responses);
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

            const name = bookingForm.querySelector('input[placeholder="Your Name"]').value;
            const email = bookingForm.querySelector('input[placeholder="Your Email"]').value;
            const service = bookingForm.querySelector('select').value;
            const date = bookingForm.querySelector('input[placeholder="Service Date"]').value;
            const special_request = bookingForm.querySelector('textarea').value;

            // Send notification to admin
            const adminTemplateParams = {
                to_email: 'alelabsservices@gmail.com',
                subject: 'New Booking Request',
                message: `New booking request:\n\nName: ${name}\nEmail: ${email}\nService: ${service}\nDate: ${date}\nSpecial Request: ${special_request}`,
                type: 'admin_notification'
            };

            // Send confirmation to user
            const userTemplateParams = {
                to_email: email,
                to_name: name,
                subject: 'Your Booking Request - Alelabs',
                message: `Thank you for booking with Alelabs!\n\nWe have received your request for ${service} on ${date}. We will confirm your appointment shortly.`,
                type: 'user_confirmation'
            };

            Promise.all([
                emailjs.send('service_l32v4u9', 'template_kruo6lo', adminTemplateParams),
                emailjs.send('service_l32v4u9', 'template_kruo6lo', userTemplateParams)
            ])
                .then(function(responses) {
                    console.log('SUCCESS!', responses);
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

    // Newsletter form handler
    const newsletterForm = document.querySelector('#newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('#newsletter-email');
            const submitButton = newsletterForm.querySelector('#newsletter-submit');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            const email = emailInput.value;
            const name = email.split('@')[0];

            // Send welcome email to subscriber
            const welcomeTemplateParams = {
                to_email: email,
                to_name: name,
                subject: 'Welcome to Alelabs Newsletter',
                message: `Hi ${name},\n\nWelcome aboard!\nWe're excited to have you as part of the Alelabs community.\n\nStay tuned for updates, insights, and exclusive content delivered straight to your inbox.\n\nBest regards,\nThe Alelabs Team`,
                type: 'welcome_email'
            };

            // Send notification to admin
            const adminTemplateParams = {
                to_email: 'alelabsservices@gmail.com',
                subject: 'New Newsletter Subscription',
                message: `New newsletter subscription from: ${email}`,
                type: 'admin_notification'
            };

            Promise.all([
                emailjs.send('service_l32v4u9', 'template_kruo6lo', welcomeTemplateParams),
                emailjs.send('service_l32v4u9', 'template_kruo6lo', adminTemplateParams)
            ])
                .then(function(responses) {
                    console.log('SUCCESS!', responses);
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