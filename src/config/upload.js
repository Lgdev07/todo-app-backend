const multer = require('multer')
const path = require('path')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')

const storageTypes ={
    local: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            const name = path.basename(file.originalname, ext)
            file.key = `${name}-${Date.now()}${ext}`
            
            cb(null, file.key)
        }
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'todo-upload',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            const name = path.basename(file.originalname, ext)

            cb(null, `${name}-${Date.now()}${ext}`)
        }
    })
}

module.exports = {
    storage: storageTypes[process.env.STORAGE_TYPE]
}