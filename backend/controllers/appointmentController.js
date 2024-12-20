const { all } = require('../app.js');
const db = require('../config/db.js');

exports.postAppointment = async (req, res) => {
    const { userId,patientName, age, appointmentDate, description, applicantId, department, doctorId } = req.body;

    // console.log(patientName + ' ' + doctorId);jm 

    // Define the SQL query to insert a new appointment
    const query = `
        INSERT INTO appointment (patient_name, patient_age, appointment_date, description, applicant_id, department, doctor_id, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
    `;

    try {
        // Execute the query with the values from req.body
        const result = await db.query(query, [patientName, age, appointmentDate, description, applicantId, department, doctorId]);

        // Respond with a success message and the appointment ID
        res.status(201).json({
            success: true,
            message: 'Appointment created successfully',
            appointmentId: result.insertId  // Assuming `insertId` is available from the query result
        });
    } catch (error) {
        console.error('Error inserting appointment:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating appointment. Please try again later.'
        });
    }
};



exports.getAppointments = async (req, res) => {
    const doctorID = req.params.id;
    console.log(doctorID);
    
    try {
        const [patients] = await db.query(
            'SELECT appointment_id, appointment_date, patient_name, patient_age, description FROM appointment WHERE status = ? AND doctor_id = ?',
            ['pending', doctorID]
        );


        res.json(patients);
    } catch (error) {
        console.error('Error when fetching appointments:', error);
        res.status(500).json({ message: 'Error when fetching appointments' });
    }
};



exports.appointmentHistory = async(req,res)=>{
    console.log('Request received with ID:', req.params.id); // Debug
    const userId = req.params.id;
    try{
        const [allAppointments] = await db.query(
            `SELECT 
                appointment.appointment_date, 
                appointment.patient_name, 
                appointment.department, 
                doctors.fullName,
                appointment.status 
             FROM 
                appointment 
             INNER JOIN 
                doctors 
             ON 
                appointment.doctor_id = doctors.id 
             WHERE 
                appointment.applicant_id = ?`, 
            [userId]
        );

        console.log('qyery result: ',allAppointments);

        if (!allAppointments || allAppointments.length === 0) {
            return res.status(404).json({ message: 'History Null.' });
        }

        res.json(allAppointments);
    }catch{
        res.status(500).json({message:'Error when fetching appointment history'})
    }
}



// appointment modified by doctor [accepted or rejected]
exports.appointmentModify = async(req,res)=>{
    const { id, status } = req.body;

    if (!id || !status) {
        return res.status(400).json({ message: "Invalid data" });
    }

    try {
        // Update the appointment status in the database
        const query = 'UPDATE appointment SET status = ? WHERE appointment_id = ?';
        await db.query(query, [status, id]);

        res.status(200).json({ message: `Appointment status updated to ${status}` });
    } catch (error) {
        console.error("Error updating appointment status:", error);
        res.status(500).json({ message: "Failed to update appointment status" });
    }
}





// get all appointments for today
exports.getTodayAppointments = async (req, res) => {
    const doctorID = req.params.id;
    console.log(doctorID);
    
    try {
        const [patients] = await db.query(
            'SELECT appointment_id, appointment_date, patient_name, patient_age, description FROM appointment WHERE status = ? AND doctor_id = ?',
            ['accepted', doctorID]
        );

        res.json(patients);
    } catch (error) {
        console.error('Error when fetching appointments:', error);
        res.status(500).json({ message: 'Error when fetching appointments' });
    }
};

// appointment history for doctor dashboard
exports.appointments_history = async (req,res)=>{
    const doctorID = req.params.id;
    
    try {
        const [patients] = await db.query(
            'SELECT appointment_id, appointment_date, patient_name, patient_age, description FROM appointment WHERE status = ? AND doctor_id = ?',
            ['seen', doctorID]
        );

        res.json(patients);
    } catch (error) {
        console.error('Error when fetching appointments:', error);
        res.status(500).json({ message: 'Error when fetching appointments' });
    }
}

// today appointment modified by doctor [accepted or rejected]
exports.appointmentSeenOrAbsent = async(req,res)=>{
    const { id, status } = req.body;

    if (!id || !status) {
        return res.status(400).json({ message: "problem in appointment seen or absent" });
    }

    try {
        // Update the appointment status in the database
        const query = 'UPDATE appointment SET status = ? WHERE appointment_id = ?';
        await db.query(query, [status, id]);

        res.status(200).json({ message: `Appointment status updated to ${status}` });
    } catch (error) {
        console.error("Error updating appointment status:", error);
        res.status(500).json({ message: "Failed to update appointment status" });
    }
}


