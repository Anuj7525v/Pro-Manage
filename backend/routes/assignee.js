const express = require('express');
const verifyAuth = require('../middleware/IdentifyAuth');
const {
  getAssignees,
  createAssignee,
  getAssignee,
  updateAssignee,
  deleteAssignee,
} = require('../controllers/assignee');

const router = express.Router();
router.use(verifyAuth);

router.get('/allassignee', getAssignees);
router.post('/createassignee', createAssignee); 
router.get('/viewassignee/:assigneeId', getAssignee);
router.patch('/udpdateassignee/:assigneeId', updateAssignee);
router.delete('/deleteassignee/:assigneeId', deleteAssignee);


/*
function validateEmail(req, res, next) {
  const { email } = req.body;
  if (!isValidEmail(email)) {
    return res.status(400).json({
      status: 'error',
      message: '* Invalid email format',
    });
  }
  next();
}

function isValidEmail(email) {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}  */


module.exports = router;