const express = require("express");
const router = express.Router();
const {Supplies} = require("../models");

router.get('/', async(req,res) => {
  const listOfSupplies = await Supplies.findAll();
  res.json(listOfSupplies);
})

module.exports = router