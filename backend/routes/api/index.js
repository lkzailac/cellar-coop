const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

//use the routers
router.use('/session', sessionRouter);
router.use('/users', usersRouter);



module.exports = router;
