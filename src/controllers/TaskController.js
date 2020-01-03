const Task = require('../models/Task')

module.exports = {
    async store(req, res) {

        const { name, description } = req.body
        const { user_id } = req.headers

        const task = await Task.create({
            name,
            description,
            created_by: user_id
        })

        await task.populate('created_by').execPopulate()

        res.json(task)

    },

    async index(req, res) {
        const { user_id } = req.headers
        const { active } = req.query

        const tasks = await Task.find({
            created_by: user_id,
            active
        })

        res.json(tasks)
    },

    async destroy(req, res) {
        await Task.findByIdAndDelete(req.params.id)

        res.send()
    },

    async show(req, res) {
        const task = await Task.findById(req.params.id)

        return res.json(task)
    }
}