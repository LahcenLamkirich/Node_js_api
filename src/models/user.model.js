var dbConn = require("../../config/db.config");

// create an object of a User : 

var User = function (user){
    this.username = user.username;
    this.email = user.email ; 
    this.password = user.password ; 
    this.role = user.role ; 
    this.created_at = new Date(); 
    this.updated_at = new Date();
}

// get All Users : 
// here we have the function : ( getAll users : )

User.getAllUsers = (res) => {
    dbConn.query("SELECT * FROM users", (err,res1) => {
        if(err) {
            console.log("Error while fetching Users !!", err);
            res(null, err) ;
        }  
        else {
            console.log("Users fetched successfully ");
            res(null, res1) ;
        }
    });
}

// get user by id : 

User.getUserByIdF = (id, result) => {
    dbConn.query("SELECT * FROM users WHERE id=?", id, (err, res) => {
        if(err) {
            console.log("Error while fetching the data from the database !") ;
            result(null, err) ;
        }else {
            console.log("User by id fetched successfully ");
            result(null, res) ;
        }
    })
}
// Create A User : 
User.createNewUserF = (UserData, result )=> {
    dbConn.query('INSERT INTO users SET ? ', UserData, (err,res) => {
        if(err) {
            console.log("Error while inserting the data") ;
            result(null, err) ;
        } else {
            console.log("User created Succesfully ") ; 
            result(null, res)
        }
    })
}

// Update A User : 

User.UpdateUserF = (id, UserData, result)=> {
    dbConn.query("UPDATE users SET username=?,email=?, password=?,role=? WHERE id = ?", [
        UserData.username,
        UserData.email, 
        UserData.password,
        UserData.role,
        id], 
        (err, res) => {
            if(err) {
                console.log("error while Updating") ;
                result(null, err) ;
            } else {
                console.log("User Updated Successfully");
                result(null, res) ;
            }
        })
}

// Delete a User : 

User.DeleteUserF = (id, UserData, result) => {
    dbConn.query("DELETE FROM users WHERE id = ?", id, 
        (err, res) => {
            if(err) {
                console.log("error while Deleting") ;
                result(null, err) ;
            } else {
                console.log("User Deleteed Successfully");
                result(null, res) ;
            }
        })
}

module.exports = User ; 