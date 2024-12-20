// Event listener for the form submission
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); 

    const mobile_email = document.getElementById('mobile_email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        // Make a POST request to the server to authenticate
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile_email, password, role })
        });

        const result = await response.json();


        // Check if the login was successful
        if (response.ok && result.success) {
            
            localStorage.setItem('token',result.token);
            localStorage.setItem('role', role);
            localStorage.setItem('id',result.id);

            history.replaceState(null, null, window.location.href);

            // Redirect to the corresponding dashboard based on role
            switch (role) {
                case 'user':
                    window.location.href = '/frontend/pages/Users/userDashboard.html';
                    break;
                case 'doctor':
                    window.location.href = '/frontend/pages/Doctors/doctorDashboard.html';
                    break;
                case 'admin':
                    window.location.href = '/frontend/pages/Admin/dashboard.html';
                    break;
                default:
                    console.error('Invalid role specified');
                    alert('Invalid role specified.');
            }
          } else {
            // Display error message if login failed
            alert(`Login failed:11 ${result.message}`);

        } 
        
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});
