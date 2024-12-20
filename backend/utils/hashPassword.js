const bcrypt = require('bcryptjs'); 

exports.hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};
