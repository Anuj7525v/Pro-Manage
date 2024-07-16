const express = require('express');
const {createTask, deleteTask, updateTask, getTasks, getTask, analytics} = require('../controllers/task');
const { verifyAuth } = require('../middleware/IdentifyAuth');

const router = express.Router();

router.get('/alltask', verifyAuth, getTasks);
router.post('/createtask', verifyAuth, createTask);
router.get('/analytics', verifyAuth, analytics);
router.get('/viewtask/:taskId', getTask);
router.patch('/updatetask/:taskId', verifyAuth, updateTask);
router.delete('/deletetask/:taskId', verifyAuth, deleteTask);

module.exports = router;