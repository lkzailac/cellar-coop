const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const itemsRouter = require('./items.js');


//use the routers
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/items', itemsRouter);



module.exports = router;
