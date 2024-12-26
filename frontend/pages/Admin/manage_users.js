
// Function to fetch all doctors and populate the table
async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3000/api/users/getUsers');
        if (response.ok) {
            const users = await response.json();
            populateUsersTable(users);
        } else {
            console.error('Failed to fetch doctors');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to populate the table with users data
function populateUsersTable(users) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; 

    users.forEach((user) => {
        const row = document.createElement('tr');

        const formattedDob = new Date(user.age).toISOString().slice(0, 10);

        row.innerHTML = `
            <td>${user.name}</td>
            <td>${formattedDob}</td>
            <td>${user.profession}</td>
            <td>${user.email}</td>
            <td>${user.mobile}</td>
            <td>
                
                <button class="delete-btn">Delete</button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

// Fetch and display doctors on page load
document.addEventListener('DOMContentLoaded', fetchUsers);


// Handle Edit and Delete buttons
document.querySelector('tbody').addEventListener('click', async (event) => {
    const row = event.target.closest('tr');
    const email = row.querySelector('td:nth-child(5)').innerText;
    if (event.target.classList.contains('delete-btn')) {
        // Show confirmation popup
        const confirmation = prompt('Are you sure you want to delete this user? If yes, type "y"');

        if (confirmation && confirmation.toLowerCase() === 'y') {
            try {
                const response = await fetch('http://localhost:3000/api/doctors/deleteDoctor', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }), // Send email as part of the request body
                });

                if (response.ok) {
                    alert('Doctor deleted successfully!');
                    fetchDoctors(); // Refresh the doctor list
                } else {
                    const error = await response.json();
                    alert(`Failed to delete doctor: ${error.message || 'Unknown error'}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        }
    }
});