const User = require('../models/User')

module.exports = {
    async show(req, res) {

        const { login, password } = req.body

        const user = await User.findOne({
            login,
            password
        })

        res.json(user)
    },
}