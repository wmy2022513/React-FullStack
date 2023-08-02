const express = require('express');
const router = express.Router();
const {AddSupplies} = require('../models');


router.post('/', async (req, res) => {
  const addsupplies = req.body;

  AddSupplies.create(addsupplies);
  res.json("SUCCESS")
})

router.get('/', async (req, res) => {
  const listOfSupplies = await AddSupplies.findAll();
  res.json(listOfSupplies)
})

router.get('/bybookingid/:booking_id', async(req,res) => {
  const booking_id = req.params.booking_id;
  const findByBookId = await AddSupplies.findAll({
    where: { booking_id: booking_id},
  })

  res.json(findByBookId)
})

router.delete("/bybookingid/:booking_id", async (req, res) => {
  const booking_id = req.params.booking_id;

  try {
    await AddSupplies.destroy({
      where: {
        booking_id: booking_id,
      },
    });
    res.json("DELETED SUCCESSFULLY");
  } catch (error) {
    console.error("Error while deleting:", error);
    res.status(500).json("INTERNAL SERVER ERROR");
  }
});


module.exports = router;
