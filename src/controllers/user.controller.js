// Here we will do all the functions : 
const User = require('../models/user.model');
const UserModel = require('../models/user.model') ;

// Get the users list (all the users in the database : ) 
exports.getUsersList = (req, res)=> {
    UserModel.getAllUsers((err, users) => {
        console.log("we Are here");
        if(err) 
        res.send(err) ;
        console.log("Users : ", users) ;
        res.send(users) ;
        
    })
}

// get User By id :
exports.getUserById = (req, res) => {
    UserModel.getUserByIdF(req.params.id, (err, user) => {
        console.log("we Are here");
        if(err) 
        res.send(err) ;
        console.log("The User is  : ", user) ;
        res.send(user) ;
    })
}


// create new User : 
exports.createNewUser = (req, res)=> {
    //console.log("request data : ", req.body);
    const userdata = new UserModel(req.body) ; 

    // check if it NULL :
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({sucess: false , message: "Please Fill in the blanks !!"})
    }else{
        UserModel.createNewUserF(userdata, (err, user) => {
            if(err) {
                res.send(err) ;
            }
                res.json({status:true, message: 'User Created successfully !', data: user.insertId})
        })
    }
}

// Update a User : 
exports.UpdateUser = (req, res)=> {
    const userdata = new UserModel(req.body) ; 
    // check if it NULL :
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({sucess: false , message: "Please Fill in the blanks !!"})
    }else{
        UserModel.UpdateUserF(req.params.id, userdata, (err, user) => {
            if(err) {
                res.send(err) ;
            }
                res.json({status:true, message: 'User Updated successfully !', data: user.insertId})
        })
    }
}

// Delete a User : 

exports.DeleteUser = (req, res) => {
    const userdata = new UserModel(req.body) ;
  
    UserModel.DeleteUserF(req.params.id, userdata, (err, user) => {
        if(err) {
            res.send(err) ;
        }
            res.json({status:true, message: 'User Deleted successfully !', data: user.insertId})
    })

}

