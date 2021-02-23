const express = require('express')
const cors = require('cors')
const postsRouter = require('./routes/posts')
const { CORS } = require('../config')

const app = express()

app.use(cors(CORS))
app.use(express.json())
app.use('/posts', postsRouter)

module.exports = app
