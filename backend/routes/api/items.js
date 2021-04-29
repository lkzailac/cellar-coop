const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');

const { Item } = require('../../db/models')
const { Listing } = require('../../db/models')
const { Designer } = require('../../db/models')
const { Category } = require('../../db/models')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');


const {
    singleMulterUpload,
    singlePublicFileUpload,
} = require('../../awsS3');

//get all items
router.get('/', restoreUser, asyncHandler(async(req, res) => {
    const items = await Item.findAll({
        order: [['id']],
        include: [{model:Designer}, {model:Category}],

    });

    return res.json(items);
}))

//get one item detail
router.get('/:id', restoreUser, asyncHandler(async(req, res) => {
    const id = parseInt(req.params.id, 10)
    console.log('item id from api', id);

    if(id ){
        const myItem = await Item.findByPk(id);

        return res.json(myItem);
    }
}))


////////Post route to Sell- creates new Item and new Listing

//validate new Item
const validateItem = [
    check('designerId')
        .exists({checkFalsy: true})
        .withMessage('Please select a Designer.'),
    check('originalPrice_USD')
        .exists({ checkFalsy: true}),
    check('category')
        .exists({ checkFalsy: true})
        .withMessage("Please select a Category"),
    handleValidationErrors,
];

//Sell
router.post('/listings', singleMulterUpload('photo'), validateItem, requireAuth, asyncHandler( async(req, res) => {
    const { userId, description, originalPrice_USD, priceToRent_USD, priceToBuy_USD, sizeSInventory, sizeMInventory, sizeLInventory, designerId, category} = req.body;
    const photo = await singlePublicFileUpload(req.file);


    const myCategory = await Category.findOne({ where: { name: category}})
    const categoryId = myCategory.id;


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

    const newItem = await Item.findOne({ where: {description}})
    const itemId = newItem.id

    //create new Listing
    await Listing.create({
        userId,
        itemId
    })

    return res.json({ item })
}));


//delete created item
// router.post('/:id', requireAuth, asyncHandler(async(req, res)=> {
//     const { listingId } = req.body;
//     console.log('listingid to delete from back end', listingId)

//     await Item.destroy({ where: { itemId }})

//     return res.json({ itemId });
// }))

module.exports = router;
