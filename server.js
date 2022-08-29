const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const User = require('./models/user')
const app = express();

const dbURI = process.env.dbURI

const PORT = process.env.PORT || 3000

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}, and connected to db`)
        });
    })
    .catch((err) => console.log(err))

app.use(express.json());


app.get('/', (req, res) => {
    User.findById('630c7c0587b93b3d0b16977e')
        .then(result => {
            res.send(result.name)
        })
        .catch(err => console.log(err))
    // res.send('server up and running');
});