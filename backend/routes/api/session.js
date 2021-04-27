const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();


//middleware
const validateLogin = [
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide your email.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide your password.'),
    handleValidationErrors,
]

//Login
router.post('/', validateLogin, asyncHandler( async(req, res, next) => {
    const { email, password } = req.body;
    const user = await User.login({ email, password });

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

//login Demo
router.post('/demo', asyncHandler( async(req, res, next) => {
    const { email, password } = req.body;
    const user = await User.login({ email, password });

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
//       "XSRF-TOKEN": `vBsMwgCH-lvWuyFXRMFGiYlCLP_Xfa_NeBcY`
//     },
//     body: JSON.stringify({ email: 'demo@user.com', password: '' })
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
//       "XSRF-TOKEN": `vBsMwgCH-lvWuyFXRMFGiYlCLP_Xfa_NeBcY``
//     },
//     body: JSON.stringify({ email: 'demo@user.com', password: 'password' })
// }).then(res => res.json()).then(data => console.log(data));




module.exports = router;
