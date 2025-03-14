const { validatePassword } = require('../services/validationServices.js');
const { hashPassword } = require('../utils/hashPassword.js');
const db = require('../config/db.js'); 
const loginService = require('../services/loginServices.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();




// registration logic
exports.register = async (req, res) => {
    const { name, age, profession, email, mobile, role, password } = req.body;

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
        return res.status(400).json({ error: passwordValidation.message });
    }

    try {
        // Hash the password
        const hashedPassword = await hashPassword(password);

        // SQL query to insert a new user into the 'users' table
        const query = `
            INSERT INTO users (name, age, profession, email, mobile, role, password) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        // Execute the query using async/await
        const [result] = await db.execute(query, [name, age, profession, email, mobile, role, hashedPassword]);

        console.log("User registered successfully:", result.insertId);
        return res.status(201).json({ message: "Registration successful!", userId: result.insertId });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// login logic
exports.login = async (req,res)=>{
    const {mobile_email,password,role} = req.body;

    try {
        let result;
        if (role === 'admin') {
            result = await loginService.verifyAdminPassword(mobile_email,password);
        } else if (role === 'doctor') {
            result = await loginService.verifyDoctorCredentials(mobile_email,password);
        } else if (role === 'user') {
            result = await loginService.verifyUserCredentials(mobile_email,password);
        } else {
            return res.status(400).json({ success: false, message: 'Invalid role' });
        }
        
        if (result) {

            const token = jwt.sign({id:result.id, role:role},process.env.JWT_SECRET,{expiresIn:'1h'});
            res.json({ success: true, message: `${role} login successful`,token ,id:result.id});

        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error at login authController', error });
    }
}