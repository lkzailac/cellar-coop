const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const {
    singleMulterUpload,
    singlePublicFileUpload,
} = require('../../awsS3');

const { User } = require('../../db/models');
const { Item } = require('../../db/models');
const { Designer } = require('../../db/models');
const { Category } = require('../../db/models');
const { Listing } = require('../../db/models');


//validate sign up
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email address.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

//Sign up
router.post('', validateSignup, asyncHandler( async(req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);
    return res.json({ user });
}))

//Profile page Routes

////////Post route to Sell- creates new Item and new Listing

//validate new Item
const validateItem = [
    check('designer')
        .exists({checkFalsy: true})
        .withMessage('Please select a Designer.'),
    check('photo')
        .exists({checkFalsy: true})
        .withMessage('Please upload a Photo.'),
    check('originalPrice_USD')
        .exists({ checkFalsy: true}),
    check('categoryId')
        .exists({ checkFalsy: true})
        .withMessage("Please select a Category"),
    handleValidationErrors,
];

//Sell
router.post('/:id/listing', singleMulterUpload('photo'), validateItem, requireAuth, asyncHandler( async(req, res) => {
    const { designer, category, priceToRent_USD, priceToBuy_USD, originalPrice_USD, size, description } = req.body;
    const photo = await singlePublicFileUpload(req.file);
    let sizeSInventory;
    let sizeMInventory;
    let sizeLInventory;

    const myDesigner = await Designer.findOne({ where: { name: designer}});
    const designerId = myDesigner.id;

    const myCategory = await Category.findOne({ where: { name: category}})
    const categoryId = myCategory.id;

    if(size === 's') {
        sizeSInventory = 1;
        sizeMInventory = 0;
        sizeLInventory = 0;
    } else if (size === 'm') {
        sizeSInventory = 0;
        sizeMInventory = 1;
        sizeLInventory = 0;
    } else {
        sizeSInventory = 0;
        sizeMInventory = 0;
        sizeLInventory = 1;
    }
    //create new Item
    const item = await Item.create({
        photo,
        description,
        originalPrice_USD,
        priceToBuy_USD,
        priceToRent_USD,
        sizeSInventory,
        sizeMInventory,
        sizeLInventory,
        designerId,
        categoryId
    })

    const itemId = await Item({ where: {description}})
    const userId = req.params.id;

    //create new Listing
    await Listing.create({
        userId,
        itemId
    })

    return res.json({ item })
}));


//test sign up validations
// fetch('/api/users', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `woaaC7oW-8UHAgOl_g7O-8lZ7PHWmqz4lK6k`
//     },
//     body: JSON.stringify({
//       email: 'Spidey@email.com',
//       username: 'S',
//       password: 'password'
//     })
//   }).then(res => res.json()).then(data => console.log(data));

//test for sign up
// fetch('/api/users', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `	EXoN5f0Q-DFtu2AUO2gSa4xdsWaObwIiXfAc`
//     },
//     body: JSON.stringify({
//       email: 'spidey@spider.man',
//       username: 'Spidey',
//       password: 'password'
//     })
//   }).then(res => res.json()).then(data => console.log(data));





module.exports = router;
