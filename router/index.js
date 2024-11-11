const express = require('express')
const userRouter = require('./userRouter')
const transactionRouter = require('./transactionRouter')
const categoryRouter = require('./categoryRouter')
const middleware = require('../middleware/middleware')

const router = express()
router.use('/user',userRouter)
router.use('/transaction',transactionRouter)
router.use('/category',categoryRouter)
module.exports = router




