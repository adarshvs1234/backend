const express = require('express')   
const userController = require('../controller/userController')
const middleware = require('../middleware/middleware')
const userRoute = express.Router() 
userRoute.post('/register',userController.register)
userRoute.post('/signin',userController.signIn)
userRoute.post('/logout',middleware,userController.logout)
userRoute.put('/change_password',middleware,userController.changePassword)
userRoute.put('/change_name',middleware,userController.changeName)


module.exports = userRoute 