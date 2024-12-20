
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
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

// Fetch and display doctors on page load
document.addEventListener('DOMContentLoaded', fetchUsers);
