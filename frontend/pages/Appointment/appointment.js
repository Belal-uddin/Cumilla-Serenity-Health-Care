document.addEventListener('DOMContentLoaded', () => {


    // :::::::::: code to make option in department and doctor ::::::::::::

    const departmentSelect = document.getElementById('department');
    const doctorSelect = document.getElementById('doctor');

    // event listener for department selection
    departmentSelect.addEventListener('change', async () => {
        const department = departmentSelect.value;
        doctorSelect.innerHTML = ''; // Clear previous options

        try {
            // Fetch doctors based on selected department
            const response = await fetch(`http://localhost:3000/api/doctors/availabeDoctors?department=${department}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            
            const doctors = await response.json();


            // Populate the doctor dropdown with names
            doctors.forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.id; // Assuming each doctor has a unique id
                option.textContent = doctor.name + '(' + doctor.qualification + ')'; 
                doctorSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching doctors:', error);
            alert('Failed to load doctors. Please try again later.');
        }
    });





    // :::::::::: code to save data in database appointment table  ::::::::::::

    const appointmentForm = document.getElementById('appointmentForm');
    appointmentForm.addEventListener('submit',async (e) =>{
        e.preventDefault();

        const userId = localStorage.getItem('id');
        const appointmentData = {
            patientName: document.getElementById('patientName').value,
            age: document.getElementById('age').value,
            appointmentDate: document.getElementById('date').value,
            description: document.getElementById('description').value,
            applicantId: userId,
            department: document.getElementById('department').value,
            doctorId: document.getElementById('doctor').value
        }
        console.log(appointmentData);
        try {
            const response = await fetch('http://localhost:3000/appointment/postAppointment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointmentData)
            });

            if (response.ok) {
                alert('Appointment submitted successfully!');
                document.getElementById('appointmentForm').reset();
            } else {
                alert('Error submitting appointment.');
            }
        } catch (error) {
            console.error('Error submitting appointment:', error);
            alert('Error submitting appointment.');
        }
    })

});
