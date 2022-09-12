const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/user')
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger.json');
const { users } = require('./db')
const app = express();

app.use(cors())

const dbURI = process.env.dbURI
const PORT = process.env.PORT || 3000
const userName = process.env.userName
const allUsers = process.env.allUsers

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
 *     tags:
 *     - users
 *     summary: Retrieve the name of a single user
 *     description: Retrieve the name of a single user via their email
 *     responses:
 *       200:
 *         description: The user's name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Name of user
 *                   example: Isabelle
 *       401:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: boolean
 *                   description: Is false if user does not exist
 *                   example: false
 */

app.get(userName, (req, res) => {
    User.find()
        .then(result => {
            const user = result.find(element => element.email === 'johanna@mail.com')
            if (user) {
                res.send({ name: user.name })
            } else {
                res.status(401);
                res.send({ name: false })
            }
        })
        .catch(err => console.log(err))
});

/**
 * @openapi
 * /api/v0/users:
 *   get:
 *     tags:
 *     - users
 *     summary: Retrieve a list of all users
 *     description: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The employee ID
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name
 *                         example: Nilla
 *                       email:
 *                         type: string
 *                         description: The user's email
 *                         example: name@mail.com
 *                       phone:
 *                         type: string
 *                         description: The user's phone number
 *                         example: +46701231231
 */

app.get(allUsers, (req, res) => {
    User.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});

