const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    login: String,
    password: String,
    email: String,
    photo: String,
    photo_url: String,
}, {
    toJSON: {
        virtuals: true
    }
})

module.exports = mongoose.model('User', UserSchema)