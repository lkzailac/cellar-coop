const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');


const { User } = require('../../db/models');
const { Item } = require('../../db/models');
const { Designer } = require('../../db/models');
const { Category } = require('../../db/models');
const { Listing } = require('../../db/models');
const { Booking } = require('../../db/models')


//validate sign up
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email address.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

//Sign up
router.post('', validateSignup, asyncHandler( async(req, res) => {
    const { email, password } = req.body;
    const user = await User.signup({ email, password });

    await setTokenCookie(res, user);
    return res.json({ user });
}))

//Profile page Routes

////get Profile Page
router.get('/:id', requireAuth, restoreUser, asyncHandler(async(req, res) => {
    const id = parseInt(req.params.id, 10)
    if(id ){
        const myUser = await User.findByPk(id);
        return res.json(myUser);
    }


}))

//update user profile
router.post('/:id', requireAuth, asyncHandler(async(req, res) => {

    const {firstName, lastName, height_in, weight_lbs, dressSize} = req.body;
    const id = parseInt(req.params.id, 10);
    const user = await User.findByPk(id);


    const updatedUser = await user.update({
        firstName, lastName, height_in, weight_lbs, dressSize
    })
    // console.log('updated user api route', updatedUser)
    return res.json(updatedUser);

}))

// get user's bookings
router.get('/:id/bookings', requireAuth, asyncHandler( async(req, res) => {
    const id = parseInt(req.params.id, 10);

    if(id) {
        const bookings = await Booking.findAll({
            include: [{model:Item, include: [{model:Designer}]}],
            where: {
                userId: id
            },
        });
        return res.json(bookings);
    }
}))

//post new booking
router.post('/:id/bookings', asyncHandler( async(req, res) => {
    const { booking } = req.body;

    // console.log('req body from route ', req.body)
    const newBooking = await Booking.create({
        size: booking.size,
        startDate: booking.startDate,
        returnDate: booking.returnDate,
        rent: booking.rent,
        buy: booking.buy,
        itemId: booking.itemId,
        userId: booking.userId
    })

    return res.json(newBooking)
}))

//get user's listings
router.get('/:id/listings', requireAuth, asyncHandler( async(req, res) => {
    const id = parseInt(req.params.id, 10);

    if(id) {
        const listings = await Listing.findAll({
            where: {
                userId: id
            },
            include: [{model:Item, include: [{model:Designer}, {model:Category}]}],

        });
        return res.json(listings);
    }
}))

//delete created listing

router.post('/listings/:id', requireAuth, asyncHandler(async(req, res)=> {
    const { listingId } = req.body;
    const id = parseInt(listingId, 10);

//    console.log('listingid to delete from back end', id)

    const thisListing = await Listing.findByPk(listingId);
    const itemId = thisListing.itemId;

    await Listing.destroy({ where: { id: listingId }})
    await Item.destroy({ where: { id: itemId }})

    return res.json({ listingId });
}))

//get designer list
router.get('/:id/designers', asyncHandler(async(req, res) => {
    const designers = await Designer.findAll();

    return res.json(designers);
}))






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
