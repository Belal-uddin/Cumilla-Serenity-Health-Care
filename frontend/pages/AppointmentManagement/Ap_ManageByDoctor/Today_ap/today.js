document.addEventListener('DOMContentLoaded', async ()=>{

    const tableBody = document.querySelector(".requested-appointment-table tbody");
    const id = localStorage.getItem('id');
    const fetchAppointments =  async () =>{
        try{
            const response = await fetch(`http://localhost:3000/appointment/getTodayAppointments/${id}`);
            // console.log("hello from here");
            // console.log(response);

            if(!response.ok){
                throw new Error(`${response.status}`);
            }

            const appointments = await response.json();
            tableBody.innerHTML = "";

            // Get today's date in "day/month/year" format
            const today = new Date().toLocaleDateString("en-GB");

            // console.log(appointments.length);

            // Filter appointments for today's date
            const todayAppointments = appointments.filter(appointment => {
              const appointmentDate = new Date(appointment.appointment_date).toLocaleDateString("en-GB");
              return appointmentDate === today;
            });

            if (todayAppointments.length === 0) {
              // Show message if no appointments are for today
              tableBody.innerHTML = "<tr><td colspan='5'>No appointments for today.</td></tr>";
              return;
            }


            todayAppointments.forEach(appointment =>{
                
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
                    <button class="action-btn seen-btn" data-id="${appointmentId}" data-status="seen">Seen</button> 
                    <button class="action-btn absent-btn" data-id="${appointmentId}" data-status="absent">Absent</button>
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
        if (event.target.classList.contains('seen-btn') || event.target.classList.contains('absent-btn')) {
            const button = event.target;
            const appointmentId = button.getAttribute('data-id');
            const status = button.getAttribute('data-status');
            // console.log(appointmentId + " " + status)
            try {
                const response = await fetch(`http://localhost:3000/appointment/modifyForToday`, {
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
                // alert(`Appointment ${status === 'seen' ? 'absent' : 'rejected'} successfully!`);
                fetchAppointments(); // Refresh the table
            } catch (error) {
                console.error("Error updating appointment status:", error);
                alert("Failed to update appointment status.");
            }
        }
    });

    fetchAppointments();

})