const express = require('express');
const router = express.Router();
const { ServiceFee } = require('../models');

router.get('/', async(req,res) => {
  const listOfOption =  await ServiceFee.findAll();
  res.json(listOfOption); 
})

module.exports = router