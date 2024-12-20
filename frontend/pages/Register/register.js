document.getElementById('form-body').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const profession = document.getElementById('profession').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;
    const repassword = document.getElementById('repassword').value;
    
    if(password !== repassword) {
        alert('Passwords do not match!');
        return;
    }

    // Create the data object to send
    const data = {
        name,
        age,
        profession,
        email,
        mobile,
        role,
        password
    };

    // Send the data to the backend using fetch
    try {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        

        if (response.ok) {
            const result = await response.json();
            alert("Registration Successful");
            // Handle successful registration (e.g., redirect to login page)
        } else {
            alert('Registration failed!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
