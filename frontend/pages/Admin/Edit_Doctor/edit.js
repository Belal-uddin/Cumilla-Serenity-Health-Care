// On edit.html page load, fetch doctor data and populate the form
document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');

    if (email) {
        try {
            const response = await fetch(`http://localhost:3000/api/doctors/getDoctorByEmail?email=${email}`);
            if (response.ok) {
                const doctor = await response.json();
                document.getElementById('fullName').value = doctor.fullName;
                document.getElementById('fullName').disabled = true;
                document.getElementById('dob').value = doctor.dob.slice(0, 10); // Format date
                document.getElementById('dob').disabled = true;
                document.getElementById('email').value = doctor.email; // Disabled
                document.getElementById('email').disabled = true;
                document.getElementById('qualification').value = doctor.qualification;
                document.getElementById('specialist').value = doctor.specialist;
                document.getElementById('mobile').value = doctor.mobile;
            } else {
                alert('Failed to fetch doctor data');
            }
        } catch (error) {
            console.error('Error fetching doctor data:', error);
            alert('An error occurred. Please try again.');
        }
    }
});



// Handle form submission for editing doctor data
document.getElementById('editDoctorForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const dob = document.getElementById('dob').value;
    const qualification = document.getElementById('qualification').value;
    const specialist = document.getElementById('specialist').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value; // Hidden/disabled field

    const data = { fullName, dob, qualification, specialist, mobile };

    try {
        const response = await fetch('http://localhost:3000/api/doctors/editDoctor', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data, email }), // Include email for identification
        });

        if (response.ok) {
            alert('Doctor updated successfully');
            window.location.href = '../dashboard.html'; // Redirect back to the doctor list
        } else {
            const error = await response.json();
            alert(`Failed to update doctor: ${error.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error updating doctor:', error);
        alert('An error occurred. Please try again.');
    }
});