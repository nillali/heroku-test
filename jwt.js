const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
    });
    req.user = user;
    next();
};

const checkCookie = (req, res, next) => {
    if (req.cookies?.jwt) {
        console.log(req.cookies.jwt);
        res.clearCookie('jwt');
    }
    next();
};


const generateJwtToken = (user, type) => {

    if (type === 'access') {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
    } else {
        return token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    }

};

const cookieSettings = {
    // httpOnly: true, 
    sameSite: 'None', 
    secure: true, 
    maxAge: 24 * 60 * 60 * 1000 
};


// header:
// Authorization: Bearer <token>

module.exports = { authenticateToken, generateJwtToken, checkCookie, cookieSettings };