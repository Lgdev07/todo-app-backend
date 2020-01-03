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

UserSchema.pre('save', function(){
    if (!this.photo_url){
        this.photo_url = `${process.env.APP_URL}/files/${this.photo}`
    }
})

module.exports = mongoose.model('User', UserSchema)