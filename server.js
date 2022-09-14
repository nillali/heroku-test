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
const PORT = process.env.PORT || 3001
const userName = process.env.userName
const allUsers = process.env.allUsers
const authorizeUser = process.env.authorizeUser
const registerUser = process.env.registerUser

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
 * /api/v0/authorize:
 *   post:
 *     tags:
 *     - users
 *     summary: Authorize user
 *     description: Check if email and password provided by user matches
 *     responses:
 *       200:
 *         description: The user's details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Name of user
 *                   example: Isabelle
 *                 email:
 *                   type: string
 *                   description: Email to user
 *                   example: isabelle@mail.com
 *                 phone:
 *                   type: string
 *                   description: Phone number to user
 *                   example: +46 123 789 78
 *                 pwd:
 *                   type: string
 *                   description: Password to account
 *                   example: SuperSecretPassword
 *                 accessLevel:
 *                   type: string
 *                   description: Access level
 *                   example: Developer
 *       401:
 *         description: Email not registred or does not match password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *                   example: Email not registered.
 */

app.post(authorizeUser, (req, res) => {
    User.find()
        .then(result => {
            const user = result.find(element => element.email === req.body.email)
            if (user) {
                if (user.pwd === req.body.pwd) {
                    res.send(user)
                } else {
                    res.status(401)
                    res.send({ error: "Password and email do not match." })
                }
            } else {
                res.status(401)
                res.send({ error: "Email not registered." })
            }
        })
        .catch(err => console.log(err))
})


/**
 * @openapi
 * /api/v0/register:
 *   post:
 *     tags:
 *     - users
 *     summary: Register user
 *     description: Registers user to database
 *     responses:
 *       200:
 *         description: The user's details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Name of user
 *                   example: Isabelle
 *                 email:
 *                   type: string
 *                   description: Email to user
 *                   example: isabelle@mail.com
 *                 phone:
 *                   type: string
 *                   description: Phone number to user
 *                   example: +46 123 789 78
 *                 pwd:
 *                   type: string
 *                   description: Password to account
 *                   example: SuperSecretPassword
 *                 accessLevel:
 *                   type: string
 *                   description: Access level
 *                   example: Developer
 *       409:
 *         description: Email is already registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *                   example: Email is already registered.
 */

app.post(registerUser, (req, res) => {
    User.find()
        .then(result => {
            const user = result.find(element => element.email === req.body.email)
            if (user) {
                res.status(409)
                res.send({ error: "Email is already registered." })
            } else {
                const newUser = new User({ ...req.body, accessLevel: "developer" })
                newUser.save()
                res.send(newUser)
            }
        })
        .catch(err => console.log(err))
})




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
            const employees = result.map(employee => ({
                id: employee.id, name: employee.name, email: employee.email, phone: employee.phone
            }))
            res.send(employees)
        })
        .catch((err) => {
            console.log(err);
        });
});

