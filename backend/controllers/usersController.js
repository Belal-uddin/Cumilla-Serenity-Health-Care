const db = require('../config/db.js');
// const { hashPassword } = require('../utils/hashPassword.js');

exports.getUsers = async (req,res)=>{
    try{
        const [all] = await db.query('SELECT id,name,age,profession,email,mobile FROM users');
        // console.log(all);
        res.json(all);
    }catch(error){
        console.error('Error when fetching users: ',error);
        res.status(500).json({message: 'Error when fetching users'});
    }
}