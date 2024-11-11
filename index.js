const express = require('express')
const route = require('./router')
const dbConnect = require('./mongoDb')
const errorHandler = require('./middleware/errorHandler')
var cookieParser = require('cookie-parser')

dbConnect()

const app = express()
const PORT = 5010

app.use(express.json())
app.use(cookieParser())


app.use(route)
app.use(errorHandler)


app.listen(PORT,()=>
console.log("It's running  http://localhost:5010/")
)
