const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/user')
const app = express();

app.use(cors())

const dbURI = process.env.dbURI
const PORT = process.env.PORT || 3000
const userName = process.env.userName

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}, and connected to db`)
        });
    })
    .catch((err) => console.log(err))

app.use(express.json());


app.get('/user-name', (req, res) => {
    User.findById('6363184dd61e3a39fe73af4c10')
        .then(result => {
            res.send({ name: result.name })
        })
        .catch(err => console.log(err))
})
