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

app.get(userName, (req, res) => {
    User.find()
        .then(result => {
            const user = result.find(element => element.email === 'johanna@mail.com')
            if (user) {
                res.send({ name: user.name })
            } else {
                res.send({ name: "Not found" })
            }
        })
        .catch(err => console.log(err))
})
