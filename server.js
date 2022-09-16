const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger.json');

const registerRoute = require("./routes/register.js");
const userRoute = require("./routes/users.js");
const loginRoute = require("./routes/login.js");

// const allUsers = "/api/v0/users";
// const authorizeUser = "/api/v0/authorize";
// const registerUser = "/api/v0/register";

// const { users } = require('./db')
const app = express();

app.use(cors());

const dbURI = process.env.dbURI
const PORT = process.env.PORT || 3001

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


app.use("/api/v0/register", registerRoute);
app.use("/api/v0/users", userRoute);
app.use("/api/v0/authorize", loginRoute);

module.exports = app;
