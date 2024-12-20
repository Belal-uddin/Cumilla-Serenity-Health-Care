document.getElementById('addDoctorForm').addEventListener('submit', async function (e) {
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
            const result = await response.json();
            alert('Doctor added successfully');
            this.reset(); // Reset the form fields
            await fetchDoctors(); // Refresh the doctor list
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
    if (event.target.classList.contains('edit-btn')) {
        const row = event.target.closest('tr');
        const email = row.querySelector('td:nth-child(5)').innerText;

        // Redirect to edit.html with email as a query parameter
        window.location.href = `./Edit_Doctor/edit.html?email=${encodeURIComponent(email)}`;
    }
});
