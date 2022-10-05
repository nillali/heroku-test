const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cookieparser = require('cookie-parser');
const swaggerOptions = require('./swagger.json');
const { authenticateToken, generateJwtToken } = require('./jwt');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

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


app.get('/api/v0/deleteCookies', (req, res) => {
    if (req.cookies?.jwt) {
        for (let cookie of Object.keys(req.cookies)) {
            res.clearCookie(cookie);
        }
    }
    res.send();
});

app.patch('/api/v0/admin/add-access', async(req, res) => {
    console.log('in add access');
    const accessToken = req.headers.authorization.replace('Bearer ', '');
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(406);
            return res.send({ error: 'You are not authorized to make this change' });
        } 
    });    
    const accessLevel = req.body.accessLevel;
    if (accessLevel !== 'admin' && accessLevel !== 'developer' && accessLevel !== 'support') {
        res.status(401);
        return res.send({ error: 'Access type not valid' });
    }
    let newAccessArr = [];
    try {
        const user = await User.find({email: req.body.email});
        if (user[0] === undefined) {
            return res.status(401).send({ error: 'Email is not registered' });
        }
        if (user[0].accessLevel.includes(accessLevel)) {
            return res.status(401).send({ error: 'User already has access' });
        }
        if (typeof user[0].accessLevel === 'string') {
            newAccessArr = [user[0].accessLevel];
        } else {
            newAccessArr = [...user[0].accessLevel];
        }
        newAccessArr.push(accessLevel);
        newAccessArr.sort(); 
    } catch (err) {
        console.log(err);
    }
    try {
        await User.findOneAndUpdate({email: req.body.email}, {accessLevel: newAccessArr});
    } catch (err) {
        console.log(err);
    }
    res.status(200);
    res.send({success: 'Access level successfully added' });

});

app.patch('/api/v0/admin/remove-access', async(req, res) => {
    console.log('in remove access');
    const accessToken = req.headers.authorization.replace('Bearer ', '');
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(406);
            return res.send({ error: 'You are not authorized to make this change' });
        } 
    });    
    const accessLevel = req.body.accessLevel;
    if (accessLevel !== 'admin' && accessLevel !== 'developer' && accessLevel !== 'support') {
        return res.status(401).send({ error: 'Access type not valid' });
    }
    let newAccessArr = [];
    try {
        const user = await User.find({email: req.body.email});
        if (user[0] === undefined) {
            return res.status(401).send({ error: 'Email is not registered' });
        }
        if (!user[0].accessLevel.includes(accessLevel)) {
            return res.status(401).send({ error: `User did not have access type ${accessLevel}` });
        }
        console.log(typeof user[0].accessLevel);
        if (typeof user[0].accessLevel === 'object') {
            newAccessArr = user[0].accessLevel.filter(type => type !== accessLevel);
        }
    } catch (err) {
        console.log(err);
    }
    try {
        await User.findOneAndUpdate({email: req.body.email}, {accessLevel: newAccessArr});
    } catch (err) {
        console.log(err);
    }
    console.log(newAccessArr);
    res.status(200);
    res.send({success: 'Access level successfully removed' });

});

app.get('/api/v0/logout', (req, res) => {
    if (req.cookies?.jwt) {
        res.clearCookie('jwt');
    }
    console.log(req.cookies);
    res.send();
});

app.get('/api/v0/refresh', (req, res) => {
    if (!req.cookies?.jwt) {
        res.status(401);
    } else {
        const refreshToken = req.cookies.jwt;
        console.log('in refreshtoken');

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(406);
            } else {
                const tokenPayload = {
                    name: decoded.name,
                    accessLevel: decoded.accessLevel
                };
                const accessToken = generateJwtToken(tokenPayload, 'access');
                console.log(accessToken);
                res.status(200);
                res.send({ accessToken: accessToken });
            }
        });
    }

});

module.exports = app;
