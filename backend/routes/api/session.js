const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models/user');

const router = express.Router();


//middleware
const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors,
]

//Login
router.post('/', validateLogin, asyncHandler( async(req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.login({ credential, password });

    if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({ user });
}));

//Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({message: 'success'});
});

//Restore session user
router.get('/', restoreUser, (req, res) => {
    const { user } = req;

    if (user) {
        return res.json({ user: user.toSafeObject()});
    } else {
        return res.json({});
    }
})


//test login validations
// fetch('/api/session', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `woaaC7oW-8UHAgOl_g7O-8lZ7PHWmqz4lK6k`
//     },
//     body: JSON.stringify({ credential: 'Demo-lition', password: '' })
//   }).then(res => res.json()).then(data => console.log(data));

//test logout
// fetch('/api/session', {
//     method: 'DELETE',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `EXoN5f0Q-DFtu2AUO2gSa4xdsWaObwIiXfAc`
//     }
//   }).then(res => res.json()).then(data => console.log(data));


//test login
// fetch('/api/session', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `l80csGOU-CD5XOSAump7JtrVrirebqE0W5eg`
//     },
//     body: JSON.stringify({ credential: 'dem', password: 'password' })
// }).then(res => res.json()).then(data => console.log(data));




module.exports = router;
