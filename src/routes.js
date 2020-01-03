const UserController = require('./controllers/UserController')
const TaskController = require('./controllers/TaskController')
const AuthController = require('./controllers/AuthController')
const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')

const routes = express.Router()
const upload = multer(uploadConfig)

routes.post('/users/register', upload.single('photo'), UserController.store)
routes.get('/users/:id', UserController.show)
routes.get('/users', UserController.index)
routes.delete('/users/:id', UserController.destroy)
routes.put('/users/:id', UserController.update)

routes.post('/tasks', TaskController.store)
routes.get('/tasks', TaskController.index)
routes.delete('/tasks/:id', TaskController.destroy)
routes.get('/tasks/:id', TaskController.show)

routes.post('/users/login', AuthController.show)

module.exports = routes