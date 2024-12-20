document.addEventListener('DOMContentLoaded', async ()=>{

    const tableBody = document.querySelector(".requested-appointment-table tbody");
    const id = localStorage.getItem('id');
    const fetchAppointments =  async () =>{
        try{
            const response = await fetch(`http://localhost:3000/appointment/getAppointments/${id}`);
            console.log("hello from here");
            console.log(response);

            if(!response.ok){
                throw new Error(`${response.status}`);
            }

            const appointments = await response.json();
            tableBody.innerHTML = "";

            if (appointments.length === 0) {
                // Show message if no appointments are available
                tableBody.innerHTML = "<tr><td colspan='5' >No pending appointments.</td></tr>";
                return;
            }


            appointments.forEach(appointment =>{
                
                // converting the date in day/month/year formate
                const appointmentDate = new Date(appointment.appointment_date).toLocaleDateString("en-GB");
                const appointmentId = appointment.appointment_id;
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${appointmentDate}</td>
                <td>${appointment.patient_name}</td>
                <td>${appointment.patient_age}</td>
                <td>${appointment.description}</td>
                <td>
                    <button class="action-btn approve-btn" data-id="${appointmentId}" data-status="accepted">Approve</button> 
                    <button class="action-btn reject-btn" data-id="${appointmentId}" data-status="rejected">Reject</button>
                </td>
                `;
                tableBody.appendChild(row);
            })
        }catch (error) {
            console.error("Error fetching appointments:", error);
            tableBody.innerHTML = "<tr><td colspan='5'>Failed to load appointments.</td></tr>";
        }
    }



     // Event delegation for approve/reject buttons
     tableBody.addEventListener('click', async (event) => {
        if (event.target.classList.contains('approve-btn') || event.target.classList.contains('reject-btn')) {
            const button = event.target;
            const appointmentId = button.getAttribute('data-id');
            const status = button.getAttribute('data-status');
            console.log(appointmentId + " " + status)
            try {
                const response = await fetch(`http://localhost:3000/appointment/modify`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: appointmentId,
                        status: status,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`${response.status}`);
                }

                // Optionally refresh the table or show success message
                alert(`Appointment ${status === 'accepted' ? 'approved' : 'rejected'} successfully!`);
                fetchAppointments(); // Refresh the table
            } catch (error) {
                console.error("Error updating appointment status:", error);
                alert("Failed to update appointment status.");
            }
        }
    });

    fetchAppointments();

})