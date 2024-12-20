 // Function to fetch department from URL parameters
 function getDepartmentFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('department');
}

// Function to fetch doctors by department and populate the table
async function fetchDoctors() {
    alert('doctorlist');
    const department = getDepartmentFromUrl();

    try {
        const response = await fetch(`http://localhost:3000/api/doctors/getDoctorsByDepartment?department=${department}`);
        const data = await response.json();
        
        if (response.ok) {
            const doctorsTableBody = document.getElementById('doctorsTableBody');
            data.doctors.forEach(doctor => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${doctor.fullName}</td>
                    <td>${doctor.dob}</td>
                    <td>${doctor.email}</td>
                    <td>${doctor.qualification}</td>
                    <td>${doctor.specialist}</td>
                    <td>${doctor.mobile}</td>
                `;
                doctorsTableBody.appendChild(row);
            });
        } else {
            console.error('Failed to fetch doctors:', data.error);
        }
    } catch (error) {
        console.error('Error fetching doctors:', error);
    }
}

// Call fetchDoctors when the page loads
document.addEventListener('DOMContentLoaded', fetchDoctors);