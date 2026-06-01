const router = require('express').Router();
const { signup, login, logout, getMe } = require('../controllers/Auth');
const { auth } = require('../middleware/auth');
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require('../controllers/TaskControl');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', auth, getMe);

router.route('/tasks')
    .get(auth, getTasks)
    .post(auth, createTask);

router.route('/tasks/:id')
    .get(auth, getTaskById)
    .put(auth, updateTask)
    .patch(auth, updateTask)
    .delete(auth, deleteTask);

module.exports = router;
