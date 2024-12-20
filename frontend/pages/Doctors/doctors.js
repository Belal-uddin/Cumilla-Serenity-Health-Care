async function displayDoctors(department) {
    // Clear the department list view and set the header
    const departmentDiv = document.querySelector('.department');
    departmentDiv.innerHTML = `<h2 class="styled-heading">DOCTORS IN ${department.toUpperCase()}</h2>`;

    // Create table structure for doctors with a specific class
    const table = document.createElement('table');
    table.className = 'doctors-table'; // Assign a class to the table
    table.innerHTML = `
        <thead>
            <tr>
                <th>Full Name</th>
                <th>DOB</th>
                <th>Email</th>
                <th>Qualification</th>
                <th>Specialist</th>
                <th>Mobile</th>
               
            </tr>
        </thead>
        <tbody id="doctorsTableBody">
            <!-- Doctors will be populated here -->
        </tbody>
    `;
    departmentDiv.appendChild(table);

    // Fetch and populate doctors data
    try {
        const response = await fetch(`http://localhost:3000/api/doctors/getDoctorsByDepartment?department=${department}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const doctors = await response.json();
        const doctorsTableBody = document.getElementById('doctorsTableBody');

        doctors.forEach(doctor => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${doctor.fullName}</td>
                <td>${new Date(doctor.dob).toLocaleDateString()}</td>
                <td>${doctor.email}</td>
                <td>${doctor.qualification}</td>
                <td>${doctor.specialist}</td>
                <td>${doctor.mobile}</td>
               
            `;
            doctorsTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching doctors:', error);
        departmentDiv.innerHTML += `<p style="color: red;">Failed to load doctors. Please try again later.</p>`;
    }
}


//  <td>${doctor.role}</td>
//  <th>Role</th>