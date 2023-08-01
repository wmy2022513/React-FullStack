const express = require('express');
const router = express.Router();
const {AddSupplies} = require('../models');


router.post('/', async (req, res) => {
  const addsupplies = req.body;

  AddSupplies.create(addsupplies);
  res.json("SUCCESS")
})

module.exports = router;
