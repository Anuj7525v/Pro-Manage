const express = require('express');
const {createTask, deleteTask, updateTask, getTasks, getTask, analytics} = require('../controllers/taskController');
const { verifyAuth } = require('../middleware/IdentifyAuth');

const router = express.Router();

router.get('/alltask', verifyAuth, getTasks);
router.post('/createtask', verifyAuth, createTask);
router.get('/analytics', verifyAuth, analytics);
router.get('/:taskId', getTask);
router.patch('/:taskId', verifyAuth, updateTask);
router.delete('/:taskId', verifyAuth, deleteTask);

module.exports = router;