
const express = require('express');
const { registerUser,updatePassword, loginUser,allUsers, checkUserByEmail } = require('../controllers/user');
const {auth} = require("../middleware/IdentifyAuth");


const router = express.Router();


// http://localhost:3000/api/auth/register
router.post('/register' , registerUser);


// http://localhost:3000/api/auth/login
router.post('/login',  loginUser);




// http://localhost:3000/api/auth/all
router.get ('/all',auth,allUsers);


router.post('/check-user', checkUserByEmail);

 


// http://localhost:3000/api/auth/updatepassword
router.put ('/updatepassword',auth, updatePassword)


module.exports = router;
