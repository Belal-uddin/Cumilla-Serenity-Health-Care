

// Function to fetch all doctors and populate the table
async function fetchDoctors() {
    try {
        const response = await fetch('http://localhost:3000/api/doctors/getDoctors');
        if (response.ok) {
            const doctors = await response.json();

            populateDoctorTable(doctors);
        } else {
            console.error('Failed to fetch doctors');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to populate the table with doctor data
function populateDoctorTable(doctors) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // Clear any existing data

    doctors.forEach((doctor) => {
        const row = document.createElement('tr');

        const formattedDob = new Date(doctor.dob).toISOString().slice(0, 10);
        const doctorId = doctor.id;

        row.innerHTML = `
            <td>${doctor.fullName}</td>
            <td>${formattedDob}</td>
            <td>${doctor.qualification}</td>
            <td>${doctor.specialist}</td>
            <td>${doctor.email}</td>
            <td>${doctor.mobile}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

// Fetch and display doctors on page load
document.addEventListener('DOMContentLoaded', fetchDoctors);


document.querySelector('tbody').addEventListener('click', async (event) => {
    const row = event.target.closest('tr');
    const email = row.querySelector('td:nth-child(5)').innerText;

    if (event.target.classList.contains('edit-btn')) {
        // Redirect to edit.html with email as a query parameter
        window.location.href = `./Edit_Doctor/edit.html?email=${encodeURIComponent(email)}`;
    } else if (event.target.classList.contains('delete-btn')) {
        // Show confirmation popup
        const confirmation = prompt('Are you sure you want to delete this doctor? If yes, type "y"');

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