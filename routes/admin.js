const routes = require('express').Router({});
const jwt = require('jsonwebtoken');
const User = require('../models/user');

routes.get('/delete-cookies', (req, res) => {
    if (req.cookies?.jwt) {
        for (let cookie of Object.keys(req.cookies)) {
            res.clearCookie(cookie);
        }
    }
    res.send();
});

routes.patch('/add-access', async(req, res) => {
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
        const doc = await User.find({email: req.body.email});
        const user = doc[0];
        if (user === undefined) {
            return res.status(401).send({ error: 'Email is not registered' });
        }
        if (user.accessLevel.includes(accessLevel)) {
            return res.status(401).send({ error: 'User already has access' });
        }
        if (typeof user.accessLevel === 'string') {
            newAccessArr = [user.accessLevel];
        } else {
            newAccessArr = [...user.accessLevel];
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

routes.patch('/remove-access', async(req, res) => {
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
        const doc = await User.find({email: req.body.email});
        const user = doc[0];
        if (user === undefined) {
            return res.status(401).send({ error: 'Email is not registered' });
        }
        if (!user.accessLevel.includes(accessLevel)) {
            return res.status(401).send({ error: `User did not have access type ${accessLevel}` });
        }
        if (typeof user.accessLevel === 'object') {
            newAccessArr = user.accessLevel.filter(type => type !== accessLevel);
        }
    } catch (err) {
        console.log(err);
    }
    try {
        await User.findOneAndUpdate({email: req.body.email}, {accessLevel: newAccessArr});
    } catch (err) {
        console.log(err);
    }
    res.status(200);
    res.send({success: 'Access level successfully removed' });

});

module.exports = routes;