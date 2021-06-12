const mysql = require('mysql') ;

// create mysql connection 
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_api_database'
}) ;

dbConn.connect(function(err){
    if(err) throw err ; 
    console.log("Database Connected succesfully !!") ;
});

module.exports = dbConn ;

