document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('id');
    const apiUrl = `http://localhost:3000/appointment/getAppointmentHistory/${userId}`;

    const tableBody = document.querySelector('table tbody');

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch appointment history');
        }

        const data = await response.json();

        tableBody.innerHTML = '';

        data.forEach(appointment => {
            const formattedDate = new Date(appointment.appointment_date).toISOString().split('T')[0];
            
            // Capitalize the first letter of the status
            const formattedStatus = appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${appointment.patient_name}</td>
                <td>${appointment.department}</td>
                <td>${appointment.fullName}</td>
                <td class="status-cell ${appointment.status.toLowerCase()}">${formattedStatus}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        tableBody.innerHTML = '<tr><td colspan="5">No data available</td></tr>';
        console.error(error);
    }
});
