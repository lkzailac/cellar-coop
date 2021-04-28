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

module.exports = router;
