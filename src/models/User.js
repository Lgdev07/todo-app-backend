const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    login: String,
    password: String,
    email: String,
    photo: String
}, {
    toJSON: {
        virtuals: true
    }
})

UserSchema.virtual('photo_url').get(function(){
    return `http://localhost:3335/files/${this.photo}`
})

module.exports = mongoose.model('User', UserSchema)