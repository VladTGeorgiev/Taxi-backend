require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true, useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

const dataRouter = require('./routes/data.js')

app.use('/data', dataRouter)

app.listen(process.env.PORT, () => console.log('Server started'))