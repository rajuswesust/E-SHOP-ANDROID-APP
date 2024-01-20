const jwt = require("jsonwebtoken");

function isPublicRoute(req, api) {
    if (req.originalUrl === (`${api}/users/login`)) {
        return true;
    }
    if (req.originalUrl === (`${api}/users/signup`)) {
        return true;
    }

    if (req.originalUrl === (`${api}/users`)) {
        return true;
    }
    if (req.originalUrl.match(/\/api\/v1\/products(.*)/) && req.method === 'GET') {
        return true;
    }
    if (req.originalUrl.match(/\/api\/v1\/products(.*)/) && req.method === 'POST') {
        return true;
    }
    if (req.originalUrl.match(/\/api\/v1\/categories(.*)/) && req.method === 'GET') {
        return true;
    }
    if (req.originalUrl.match(/public\/uploads(.*)/) && req.method === 'GET') {
        return true;
    }
    else {
        return false;
    }
}


const jwtAuthentication = (req, res, next) => {

    const { authorization } = req.headers;
    const jwtSecretKey = process.env.JWT_SECRET_KEY
    const api = process.env.API_URL;

    try {
        if (isPublicRoute(req, api)) {
            return next();
        }

        const token = authorization.split(' ')[1];

        const data = jwt.verify(token, jwtSecretKey);

        const { userId, isAdmin } = data;

        if (!isAdmin && req.originalUrl.match(/\/api\/v1\/users(.*)/) && req.method === ('PUT')) {

            return next();
        }
        // else if (!isAdmin && req.originalUrl.match(/\/api\/v1\/products(.*)/) && req.method === 'POST') {
        //     return true;
        // }
        else if (!isAdmin && req.originalUrl.match(/\/api\/v1\/users(.*)/) && req.method === ('DELETE')) {
            return next();
        }
        else if (!isAdmin && req.originalUrl.match(/\/api\/v1\/users(.*)/) && req.method === ("GET")) {
            return next();
        }

        else if (!isAdmin) {
            throw "UnauthorizedError";
        }

        next();

    } catch (error) {
        next({
            name: "UnauthorizedError",
        });
    }
}

module.exports = jwtAuthentication;