const expressJwt = require('express-jwt');
const { secretKey } = require('./constant');

// const jwtAuth = expressJwt({ secret: secretKey }).unless({ path: ['/index/load'] })
const jwtAuth = expressJwt({ secret: secretKey, algorithms: ['RS256'] }).unless({ path: ['/auth/login','/auth/addUser'] });
module.exports = jwtAuth;