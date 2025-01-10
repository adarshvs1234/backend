const express = require('express')
const route = require('./router')
const dbConnect = require('./mongoDb')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')

dbConnect()

const app = express()
const PORT = 5010

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials:true
  }

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(route)
app.use(errorHandler)


app.listen(PORT,()=>
console.log("It's running  http://localhost:5010/")
)
