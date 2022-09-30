const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cookieparser = require('cookie-parser');
const swaggerOptions = require('./swagger.json');
const { authenticateToken, generateJwtToken } = require('./jwt');

const registerRoute = require('./routes/register.js');
const userRoute = require('./routes/users.js');
const loginRoute = require('./routes/login.js');

const app = express();

app.use(cors({ 
    credentials: true, 
    origin: [
        'http://localhost:3000',
        'https://fe-one-source-v3.herokuapp.com',
        'https://one-source-integration-app.herokuapp.com'
    ]
}));
app.use(express.json());
app.use(cookieparser());

const swaggerDocument = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v0/register', registerRoute);
app.use('/api/v0/users', userRoute);
app.use('/api/v0/authorize', loginRoute);

app.get('/api/v0/projects', authenticateToken, (req, res) => {
    const user = req.user;
});

app.get('/api/v0/deleteCookies', (req, res) => {
    if (req.cookies?.jwt) {
        for (let cookie of Object.keys(req.cookies)) {
            res.clearCookie(cookie);
        }
    }
    res.send();
});

app.get('/api/v0/logout', (req, res) => {
    if (req.cookies?.jwt) {
        res.clearCookie('jwt');
    }
    console.log(req.cookies);
    res.send();
});

app.get('/api/v0/refresh', (req, res) => {
    if (req.cookies?.jwt) {

        const refreshToken = req.cookies.jwt;
        console.log(refreshToken);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(406);
            } else {
                const accessToken = generateJwtToken(decoded, '10m', 'access');
                res.status(200);
                res.send({ accessToken: accessToken });
            }
        });
    }

});

module.exports = app;
