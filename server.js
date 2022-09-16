const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger.json');


// const { users } = require('./db')
const app = express();

app.use(cors());
app.use('/', require('./routes/api.js'));
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


module.exports = app;
