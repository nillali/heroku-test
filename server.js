const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/user')
const app = express();

app.use(cors())

const dbURI = process.env.dbURI || 3000
const PORT = process.env.PORT
const userName = process.env.userName

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}, and connected to db`)
        });
    })
    .catch((err) => console.log(err))

app.use(express.json());

app.get(userName, (req, res) => {
    User.findById('630c7d2b87b93b3d0b16977f')
        .then(result => {
            res.send({ name: result.name })
        })
        .catch(err => console.log(err))
})