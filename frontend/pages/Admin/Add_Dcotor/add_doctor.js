document.getElementById('from-body').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevents the default form submission behavior

    // Disable the submit button to prevent multiple submissions
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    const fullName = document.getElementById('fullName').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const qualification = document.getElementById('qualification').value;
    const specialist = document.getElementById('specialist').value;
    const mobile = document.getElementById('mobile').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Password matching check
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        submitButton.disabled = false; // Re-enable the button
        return;
    }

    // Create the data object to send
    const data = {
        fullName,
        dob,
        email,
        qualification,
        specialist,
        mobile,
        password,
    };

    try {
        const response = await fetch('http://localhost:3000/api/doctors/addDoctors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            // const result = await response.json();
            alert('Doctor added successfully');
            this.reset(); // Reset the form fields
            // await fetchDoctors(); // Refresh the doctor list
        } else {
            const error = await response.json();
            alert(`Failed to add doctor: ${error.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    } finally {
        submitButton.disabled = false; // Re-enable the button after the request
    }
});