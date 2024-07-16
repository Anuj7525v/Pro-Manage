const express = require('express');
const { updateUser, getUser } = require('../controllers/userController');
const verifyAuth = require('../middleware/IdentifyAuth');


const router = express.Router();

router.patch('/update', verifyAuth, updateUser);
router.get('/all', verifyAuth, getUser);

module.exports = router;