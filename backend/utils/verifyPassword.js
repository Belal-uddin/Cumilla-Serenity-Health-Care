const bcrypt = require('bcryptjs'); 


exports.comparePassword = async (inputPassword, storedPassword) => {
    try {
        return await bcrypt.compare(inputPassword, storedPassword);
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
    }
};
