const mysql = require('mysql2/promise');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'manobotar_haspatall',
})

// db.connect((err)=>{
//     if(err){
//         console.error("Connection error: ",err);
//         return;
//     }
//     console.log("Connected to MySQL database");
// })
db.getConnection()
    .then(() => {
        console.log("Connected to MySQL database");
    })
    .catch(err => {
        console.error("Connection error: ", err);
    });

module.exports = db;