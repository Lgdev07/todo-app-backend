const User = require('../models/User')
const aws = require('aws-sdk')
const s3 = new aws.S3()
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

module.exports = {
    async store(req, res) {
        const { login, password, email } = req.body
        const { key, location: url="" } = req.file

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
                photo: key,
                photo_url: url
            })
    
            return res.json(user)
        } catch {
            return res.status(500).send()
        }

    },

    async destroy(req, res) {
        const user = await User.findById(req.params.id)
        
        if (process.env.STORAGE_TYPE === 's3'){
            await s3.deleteObject({
                Bucket: 'todo-upload',
                Key: user.photo
            }, () => {})
        } else {
            promisify(fs.unlink)(
                path.resolve(__dirname, '..', '..', 'uploads', user.photo)
            )
        }
        
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