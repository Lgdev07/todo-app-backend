const Task = require('../models/Task')

module.exports = {
    async store(req, res) {
        const { task_id } = req.params

        const task = Task.findById(task_id)

        task.active = false

        res.json(task)
    }
}