const express = require('express');
const bodyParser = require('body-parser') ;
const path = require('path') ; 
const UserModel = require('./src/models/user.model') ;
var bcrypt = require('bcrypt') ;
const saltRounds = 15 ;

// create Express App 
const app = express();
// setup the sever port 
const port = process.env.PORT || 5000 ;

// Parse request data content tupe application/x-www-form 
app.use(bodyParser.urlencoded({
    extended:false
}));
// Parse request data content tupe application/JSON
app.use(bodyParser.json());

// import user routes 
const userRoutes = require('./src/routes/user.route') ; 
const dbConn = require('./config/db.config');

// create user routes 

app.use('/users', userRoutes);
// The views :
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    let sql = "SELECT * FROM users" ;
    let query = dbConn.query(sql, (err,rows) => {
        if(err) throw err; 
        res.render('user_index', {
            title: 'Liste des utilisateurs',
            user: rows
        });
    });
});

app.get('/add', function(req, res){
    res.render('user_add', {
        title: 'Add User',
    });
});

app.post('/save', (req,res) => {
    let data = {username: req.body.username, email: req.body.email, password: bcrypt.hashSync(req.body.password, saltRounds), role: req.body.role } ;
    let sql = "INSERT INTO users SET ?" ;
    dbConn.query(sql, data, (err, results) => {
        if(err) throw err ;
        res.redirect('/') ;
    });
});

app.get('/edit/:userId', (req, res) => {
    const userId = req.params.userId ;
    //let sql = "SELECT * FROM users where id = ?",userId ;
    let query = dbConn.query("SELECT * FROM users where id = ?", userId, (err,resultss) => {
        if(err) throw err; 
        res.render('user_edit', {
            title: 'Edit User',
            user: resultss[0]
        });
    });
});

app.post('/update', (req,res) => {
    const userId = req.body.id ;
    //let sql = "INSERT INTO users SET ?" ;
    dbConn.query("UPDATE users SET username='" + req.body.username + "' , email= '" + req.body.email + "', password = '" + req.body.password + "', role= '" + req.body.role + "' WHERE id = " + userId, 
        function (err, results){
        if(err) throw err ;
        res.redirect('/') ;
    });
});


app.get('/delete/:userId', (req, res) => {
    const userId = req.params.userId ;
    //let sql = "SELECT * FROM users where id = ?",userId ;
    let query = dbConn.query("DELETE FROM users where id = ?", userId, (err,resultss) => {
        if(err) throw err; 
        res.redirect('/') ;
    });
});


app.listen(port, () => {
    console.log(`Express server is running in http://localhost:${port}`)
});

// app.listen(5000, function(error){
//     if(error) throw error
//     console.log("Server created Successfully") 
// });
