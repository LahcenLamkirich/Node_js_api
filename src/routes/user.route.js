const express = require("express") ;
const router = express.Router() ;

const userController = require('../controllers/user.controller') ;

// Get All the users : 
router.get('/', userController.getUsersList);
// get User by Id : 
router.get('/:id', userController.getUserById);
// create new User : 
router.post('/', userController.createNewUser);
// update a user : 
router.put('/:id', userController.UpdateUser) ;
// delete a user : 
router.delete('/:id', userController.DeleteUser) ;



module.exports = router ; 