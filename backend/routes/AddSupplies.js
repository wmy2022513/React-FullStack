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

router.get('/byinvoiceid/:invoice_id', async(req,res) => {
  const invoice_id = req.params.invoice_id;
  const findByBookId = await AddSupplies.findAll({
    where: { invoice_id: invoice_id},
  })

  res.json(findByBookId)
})

router.delete("/byinvoiceid/:invoice_id", async (req, res) => {
  const invoice_id = req.params.invoice_id;

  try {
    await AddSupplies.destroy({
      where: {
        invoice_id: invoice_id,
      },
    });
    res.json("DELETED SUCCESSFULLY");
  } catch (error) {
    console.error("Error while deleting:", error);
    res.status(500).json("INTERNAL SERVER ERROR");
  }
});


module.exports = router;
