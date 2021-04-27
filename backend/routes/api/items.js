const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { Item } = require('../../db/models')
const { setTokenCookie, restoreUser } = require('../../utils/auth');

//get all items
router.get('/', restoreUser, asyncHandler(async(req, res) => {
    const items = await Item.findAll();
    console.log('items from api route', items)
    return res.json(items);
}))

module.exports = router;
