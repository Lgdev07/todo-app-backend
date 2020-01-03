const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const { login, password, email } = req.body
        const { filename } = req.file

        const user_exists = await User.findOne({
            login
        })

        if (user_exists) return res.status(400).json({
            error: "User already exists"
        })

        try{
            const user = await User.create({
                login,
                password, 
                email,
                photo: filename
            })
    
            return res.json(user)
        } catch {
            return res.status(500).send()
        }

    },

    async destroy(req, res) {
        await User.findByIdAndDelete(req.params.id)

        res.send()
    },

    async index(req, res) {
        const users = await User.find()

        res.json(users)
    },

    async show(req, res) {

        const { id } = req.params

        const user = await User.findById(id)

        res.json(user)
    },

    async update(req, res) {
        const user = await User.findByIdAndUpdate(req.params.id, res.body, {new: true})

        res.json(user)
    }
}