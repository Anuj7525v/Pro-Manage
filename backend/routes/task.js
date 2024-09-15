const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/IdentifyAuth');
const {
    moveTask,
    createTask,
    getTasksForUser,
    updateTask,
    deleteTask,
    shareTask,
    updateChecklistItem
} = require('../controllers/task');


router.get('/', (req, res) => {
  res.status(200).json({ message: 'Dummy route is working!' });
});

router.post('/tasks', auth, createTask);
router.post('/tasks/movetask',auth,moveTask);
router.get('/tasks', auth, getTasksForUser);
router.put('/tasks/:taskId/checklist/:index', auth, updateChecklistItem);

router.put('/update/:id', auth, updateTask);
router.delete('/tasks/:id', auth, deleteTask);
router.get('/share/:id', shareTask); 


module.exports = router;
