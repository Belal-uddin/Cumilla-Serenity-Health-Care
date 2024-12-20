const db = require('../config/db');
const { comparePassword } = require('../utils/verifyPassword'); 

// Verify admin credentials with email or mobile
exports.verifyAdminPassword = async (mobile_email, password) => {
    const query = `SELECT * FROM adminCredentials WHERE (email = ?)`;
    const [rows] = await db.query(query, [mobile_email]);


    if (rows.length === 0) {
        console.error('No matching admin found.');
        return null;
    }

    //  const doctor = rows[0]; 
    const admin = rows[0];
    console.log(admin);

    if (admin && password === admin.password) {
        return admin; // Return admin details if login is successful
    }
    console.log('Invalid pass');
    console.error('Invalid password');
    return null; // Return null if credentials don't match
};


// Verify doctor credentials with email or mobile
exports.verifyDoctorCredentials = async (mobile_email, password) => {
    const query = `SELECT * FROM doctors WHERE (email = ? OR mobile = ?)`;
    const [rows] = await db.query(query, [mobile_email, mobile_email]); // Use destructuring to access rows directly

    // Log the results directly to see if any data is returned
    console.log('1: Query rows:', rows);

    if (rows.length === 0) {
        console.error('No matching doctor found.');
        return null;
    }

    const doctor = rows[0]; 
    console.log('2: Doctor found:', doctor);

    if (doctor && doctor.password && await comparePassword(password, doctor.password)) {
        return doctor; 
    }

    console.error('Password does not match or is missing.');
    return null; 
};





exports.verifyUserCredentials = async (mobile_email, password) => {
    const query = `SELECT * FROM users WHERE (email = ? OR mobile = ?)`;
    const [rows] = await db.query(query, [mobile_email, mobile_email]); // Use destructuring to access rows directly

    // Log the results directly to see if any data is returned
    console.log('Query rows:', rows);

    if (rows.length === 0) {
        console.error('No matching user found.');
        return null;
    }

    const user = rows[0]; // Access the first record in rows array
    console.log('User found:', user);

    if (user && user.password && await comparePassword(password, user.password)) {
        return user; // Return user details if login is successful
    }

    console.error('Password does not match or is missing.');
    return null; // Return null if credentials don't match
};
