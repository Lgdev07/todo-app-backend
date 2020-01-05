const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: String,
    description: String,
    active: {
        type: Boolean,
        default: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Task', TaskSchema)