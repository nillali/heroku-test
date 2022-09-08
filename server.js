const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/user')
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger.json');
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

const swaggerDocument = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * @openapi
 * /api/v0/user-name:
 *   get:
 *     description: Use to find a user
 *     responses:
 *       200:
 *         description: A successfull response
 */

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
});
