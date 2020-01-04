const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = {
    async show(req, res) {

        const { login, password } = req.body

        const user = await User.findOne({
            login,
        })

        try {
            if(await bcrypt.compare(password, user.password)){
                res.json(user)
            }else{
                return res.status(400).send('Incorrect Password')
            }
        } catch {
            res.status(500).send()
        }
        
        
    },
}