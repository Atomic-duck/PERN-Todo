require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")

// router
const ListTodo = require('./router/listTodo')
const BucketList = require('./router/bucketList')
const Authentication = require('./router/authentication')

// middleware
const verifyToken = require('./middleware/auth')

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ListTodo Route
app.use('/api/v1/listtodo', verifyToken, ListTodo)

// BucketList Route
app.use('/api/v1/bucketlist', verifyToken, BucketList)

// Authenticating Route
app.use('/api/v1/authentication', Authentication)

app.listen(8080, () => {
   console.log("Listening on port 8080")
})