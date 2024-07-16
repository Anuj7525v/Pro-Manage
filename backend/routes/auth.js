const express = require('express');
const {login, register} = require('../controllers/user');

const router = express.Router();

router.use((req, res, ) => {
    res.send("From authRoute");
  });

  
router.post('/login', login);
router.post('/register', register);
module.exports = router;