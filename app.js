const express = require('express');
require('dotenv').config();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger.json');

const registerRoute = require("./routes/register.js");
const userRoute = require("./routes/users.js");
const loginRoute = require("./routes/login.js");
const app = express();

app.use(cors());

app.use(express.json());

const swaggerDocument = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use("/api/v0/register", registerRoute);
app.use("/api/v0/users", userRoute);
app.use("/api/v0/authorize", loginRoute);

module.exports = app
