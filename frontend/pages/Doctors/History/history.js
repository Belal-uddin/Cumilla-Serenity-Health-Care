document.addEventListener('DOMContentLoaded', async ()=>{

    const tableBody = document.querySelector(".requested-appointment-table tbody");
    const id = localStorage.getItem('id');
    const fetchAppointments =  async () =>{
        try{
            const response = await fetch(`http://localhost:3000/appointment/appointments_history/${id}`);
            // console.log("hello from here");
            // console.log(response);

            if(!response.ok){
                throw new Error(`${response.status}`);
            }

            const appointments = await response.json();
            tableBody.innerHTML = "";


            if (appointments.length === 0) {
              // Show message if no appointments are for today
              tableBody.innerHTML = "<tr><td colspan='5'>History is blank.</td></tr>";
              return;
            }


            appointments.forEach(appointment =>{
                
                // converting the date in day/month/year formate
                const appointmentDate = new Date(appointment.appointment_date).toLocaleDateString("en-GB");
                // const appointmentId = appointment.appointment_id;
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${appointmentDate}</td>
                <td>${appointment.patient_name}</td>
                <td>${appointment.patient_age}</td>
                <td>${appointment.description}</td>
                `;
                tableBody.appendChild(row);
            })
        }catch (error) {
            console.error("Error fetching appointments:", error);
            tableBody.innerHTML = "<tr><td colspan='5'>Failed to load appointments.</td></tr>";
        }
    }

    fetchAppointments();

})