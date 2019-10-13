require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors')

app.options('*', cors())

app.use(express.json())

const dataRouter = require('./routes/data.js')

app.use('/data', dataRouter)

app.listen(process.env.PORT, () => console.log('Server started'))