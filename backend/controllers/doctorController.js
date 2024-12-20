const { param } = require('../app.js');
const db = require('../config/db.js');
const { hashPassword } = require('../utils/hashPassword.js');


// for adding doctors to database doctor table
exports.addDoctor = async (req, res) => {
    const { fullName, dob, email, qualification, specialist, mobile,password } = req.body;


    // hash the password
    const hashedPassword = await hashPassword(password);

    // SQL query to insert a new doctor into the 'doctors' table
    const query = `
        INSERT INTO doctors (fullName, dob, email, qualification, specialist, mobile,role,password) 
        VALUES (?, ?, ?, ?, ?, ?, ?,?)
    `;

    try {
        // Insert the doctor into the database
        db.query(query, [fullName, dob, email, qualification, specialist, mobile,'doctor',hashedPassword], (err, result) => {
            if (err) {
                console.error('Error adding doctor:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Send a successful response with the doctor ID
            res.status(201).json({ message: 'Doctor added successfully!', doctorId: result.insertId });
        });
    } catch (error) {
        console.error('Error adding doctor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



// for retirving all doctors from database doctor table
exports.getDoctors = async (req,res) =>{
    try{
        const [all] = await db.query('SELECT * FROM doctors');
        res.json(all);
    }catch(error){
        console.error('Error when fetching doctors: ',error);
        res.status(500).json({message: 'Error when fetching doctors'});
    }
}



// for doctor page, list of doctors,departmentwise
exports.getDoctorsByDepartment = async(req,res)=>{
    const {department} = req.query;
    console.log(department);
    const query = `SELECT * FROM doctors WHERE specialist = ?`;
    try{
        const [all] = await db.query(query, [department]);
        console.log(all);
        res.status(200).json(all);
    }catch(error){
        console.error('Error fetching doctors by department:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

exports.getDoctorByEmail = async(req,res)=>{
    const requestedEmail = req.query.email;
    const query = `SELECT * FROM doctors WHERE email = ?`;
    try{
        const [retrievedDoctor] = await db.query(query,[requestedEmail]);
        if (retrievedDoctor) {
            console.log(retrievedDoctor);
            res.status(200).json(retrievedDoctor[0]);
        } else {
            res.status(404).json({ message: "Doctor not found" });
        }
    }catch(error){
        console.error("Error fetching doctor by email");
        res.status(500).json({error:'Internal server error'});
    }

}


// for appointment page, response only id,name,qualification
exports.availabeDoctors = async(req,res)=>{
    const department = req.query.department;
    const query = `SELECT * FROM doctors WHERE specialist = ?`;
    try{
        const [all] = await db.query(query,[department]);
        const doctors = all.map(doctor => ({
            id: doctor.id,
            name: doctor.fullName,
            qualification: doctor.qualification
        }));

        console.log(doctors);
        res.status(200).json(doctors);
    }catch(error){
          console.error('Error fetching doctors',error);
        res.status(500).json({error: 'Internal error in server'}); 
    }
}



exports.editDoctor = async(req,res)=>{
    const {fullName,dob,qualification,specialist,mobile,email} = req.body;

    if(!email){
        return res.status(400).json({message:'Email is required to identify doctor'});
    }

    try{
        const query = `UPDATE doctors SET fullName = ?, dob = ?, qualification = ?, specialist = ?, mobile = ? WHERE email = ?`;
        const values = [fullName,dob,qualification,specialist,mobile,email];


        const result = await db.query(query,values);

        if(result.affectedRows === 0){
            return res.status(404).json({message:'Doctor not found or no changes were made'});
        }

        res.status(200).json({message:'Doctor updated successfully'});

    }catch(error){
        console.error('Error updating doctor',error);
        res.status(500).json({message:'An error occured while updating doctor.', error:error.message});
    }
}