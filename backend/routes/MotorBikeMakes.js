const express = require("express");
const router = express.Router();
const { MotorBikeMakes } = require('../models')


router.get('/', async (req,res) => {
    const listOfOption = await MotorBikeMakes.findAll();
    res.json(listOfOption);
})

module.exports = router