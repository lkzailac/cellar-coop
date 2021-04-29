const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { Item } = require('../../db/models')
const { Designer } = require('../../db/models')
const { Category } = require('../../db/models')
const { setTokenCookie, restoreUser } = require('../../utils/auth');

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
    const id = parseInt(req.params.id);

    if(id ){
        const myItem = await Item.findByPk(id);
        return res.json(myItem);
    }
}))

module.exports = router;
