document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (token) {
        navbar.innerHTML = `
            <div class="left">Cumilla Serenity Health Care</div>
            <div class="right">
                <ul>
                    <li><a href="/frontend/pages/Home/home.html">Home</a></li>
                    <li><a href="/frontend/pages/Doctors/doctors.html">Doctors</a></li>
                    ${getDashboardLink(role)}
                    <li><a href="#" id="logoutButton">Logout</a></li>
                </ul>
            </div>
        `;

        // Add event listener for logout
        document.getElementById('logoutButton').addEventListener('click', function () {
            localStorage.removeItem('token'); // Remove token from localStorage
            window.location.href = '/frontend/pages/Login/login.html'; // Redirect to login page
        });

    } else {
        // User is not logged in, show login button
        navbar.innerHTML = `
            <div class="left">Cumilla Serenity Health Care</div>
            <div class="right">
                <ul>
                    <li><a href="../Home/home.html">Home</a></li>
                    <li><a href="../Doctors/doctors.html">Doctors</a></li>
                    <li><a href="/frontend/pages/Login/login.html">Login</a></li>
                    <li><a href="../Register/register.html">Register</a></li>
                </ul>
            </div>
        `;
    }
});


function getDashboardLink(role) {
    switch (role) {
        case 'admin':
            return '<li><a href="/frontend/pages/Admin/dashboard.html">Dashboard</a></li>';
        case 'doctor':
            return '<li><a href="/frontend/pages/Doctors/doctorDashboard.html">Dashboard</a></li>';
        case 'user':
            return '<li><a href="/frontend/pages/Users/userDashboard.html">Dashboard</a></li>';
        default:
            return ''; // If the role is not recognized, no dashboard link is added
    }
}

