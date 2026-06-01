const Task = require('../models/task');

const canAccessTask = (task, user) => {
    // Admin-created tasks are visible only to Admin.
    if (task.createdByRole === 'Admin' && user.accountType !== 'Admin') {
        return false;
    }

    return task.user.toString() === user.id || user.accountType === 'Admin';
};

// logic for creating a task both admin and  user can cretae the task

exports.createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Title is required.'
            });
        }

        const newTask = await Task.create({
            title,
            description,
            status,
            dueDate,
            user: req.user.id,
            createdByRole: req.user.accountType
        });

        return res.status(201).json({
            success: true,
            message: 'Task created successfully.',
            data: newTask
        });
    } catch (err) {
        console.error('Error during task creation:', err);
        return res.status(500).json({
            success: false,
            message: 'An error occurred during task creation. Please try again later.'
        });
    }
};

exports.getTasks = async (req, res) => {
    try {
        // Admin sees every task. User sees only their own tasks.
        // Because of this, User will never see tasks created by Admin.
        const query = req.user.accountType === 'Admin' ? {} : { user: req.user.id };
        const tasks = await Task.find(query)
            .populate('user', 'firstName lastName email')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (err) {
        console.error('Error fetching tasks:', err);
        return res.status(500).json({
            success: false,
            message: 'Error while fetching tasks.'
        });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found.'
            });
        }

        if (!canAccessTask(task, req.user)) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to view this task.'
            });
        }

        return res.status(200).json({
            success: true,
            data: task
        });
    } catch (err) {
        console.error('Error fetching task:', err);
        return res.status(500).json({
            success: false,
            message: 'Error while fetching task.'
        });
    }
};

// update task logic (both user and admin)
exports.updateTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;
        const taskToUpdate = await Task.findById(req.params.id);

        if (!taskToUpdate) {
            return res.status(404).json({
                success: false,
                message: 'Task not found.'
            });
        }

        if (!canAccessTask(taskToUpdate, req.user)) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to update this task.'
            });
        }

        if (title !== undefined) taskToUpdate.title = title;
        if (description !== undefined) taskToUpdate.description = description;
        if (status !== undefined) taskToUpdate.status = status;
        if (dueDate !== undefined) taskToUpdate.dueDate = dueDate || undefined;

        await taskToUpdate.save();

        return res.status(200).json({
            success: true,
            message: 'Task updated successfully.',
            data: taskToUpdate
        });
    } catch (err) {
        console.error('Error updating task:', err);
        return res.status(500).json({
            success: false,
            message: 'Error while updating task.'
        });
    }
};


exports.deleteTask = async (req, res) => {
    try {
        const taskToDelete = await Task.findById(req.params.id);

        if (!taskToDelete) {
            return res.status(404).json({
                success: false,
                message: 'Task not found.'
            });
        }

        if (!canAccessTask(taskToDelete, req.user)) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this task.'
            });
        }

        await Task.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: 'Task deleted successfully.'
        });
    } catch (err) {
        console.error('Error during task deletion:', err);
        return res.status(500).json({
            success: false,
            message: 'An error occurred during task deletion.'
        });
    }
};
