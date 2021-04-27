const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { Item } = require('../../db/models')


//get all items
router.get('/', asyncHandler(async(req, res) => {
    const items = await Item.findAll();
    return res.json(items);
}))

module.exports = router;
