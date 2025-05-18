// Initialize EmailJS with your public key
(function() {
    emailjs.init("aTplpx662MEXiSJE5"); // Replace with your actual EmailJS public key
})();

// Handle newsletter form submission
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('#newsletter-form');
    const emailInput = document.querySelector('#newsletter-email');
    const submitButton = document.querySelector('#newsletter-submit');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Disable the submit button while processing
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Prepare the email parameters
            const templateParams = {
                to_email: emailInput.value,
                to_name: emailInput.value.split('@')[0], // Use part before @ as name
                message: 'Thank you for subscribing to our newsletter!'
            };

            // Send the email using EmailJS
            emailjs.send('service_l32v4u9', 'template_kruo6lo', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Thank you for subscribing to our newsletter!');
                    emailInput.value = ''; // Clear the input
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    alert('Sorry, there was an error. Please try again later.');
                })
                .finally(function() {
                    // Re-enable the submit button
                    submitButton.disabled = false;
                    submitButton.textContent = 'SignUp';
                });
        });
    }
}); 