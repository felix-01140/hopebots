// Initialize EmailJS with your public key
(function() {
    emailjs.init("aTplpx662MEXiSJE5"); // Your public key
})();

// Handle footer newsletter form submission
document.addEventListener('DOMContentLoaded', function() {
    // Update all footer newsletter forms
    document.querySelectorAll('.footer form, .footer .position-relative').forEach(function(container) {
        if (!container.closest('#newsletter-form')) { // Don't modify the main newsletter form
            // Convert div to form if needed
            let form = container.tagName === 'FORM' ? container : document.createElement('form');
            form.id = 'footer-newsletter-form';
            
            // If we created a new form, move the content into it
            if (container.tagName !== 'FORM') {
                form.innerHTML = container.innerHTML;
                container.parentNode.replaceChild(form, container);
            }

            // Update input and button
            let input = form.querySelector('input[type="text"]');
            if (input) {
                input.type = 'email';
                input.id = 'footer-newsletter-email';
                input.required = true;
            }

            let button = form.querySelector('button');
            if (button) {
                button.type = 'submit';
                button.id = 'footer-newsletter-submit';
            }
        }
    });

    // Handle footer newsletter form submission
    const footerNewsletterForms = document.querySelectorAll('#footer-newsletter-form');
    footerNewsletterForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const submitButton = form.querySelector('button[type="submit"]');
            
            if (!emailInput || !submitButton) return;

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
    });
}); 