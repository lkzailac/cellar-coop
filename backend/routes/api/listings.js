const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');

const singlePublicFileUpload = require('../../awsS3')
const singleMulterUpload = require('../../awsS3')

const { User } = require('../../db/models');
const { Item } = require('../../db/models');
const { Designer } = require('../../db/models');
const { Category } = require('../../db/models');
const { Listing } = require('../../db/models');


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


//Sell- creates new Item and new Listing
router.post('/users/:id/', singleMulterUpload('image'), validateItem, asyncHandler( async(req, res) => {
    const { designer, category, priceToRent_USD, priceToBuy_USD, originalPrice_USD, size, description } = req.body;
    const photo = await singlePublicFileUpload(req.file);
    const sizeSInventory;
    const sizeMInventory;
    const sizeLInventory;

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



module.exports = router;
