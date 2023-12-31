const express = require("express");
const router = express.Router();
const {Bookings} = require("../models");
const {validateToken} = require("../middlewares/AuthMiddleware");

const { Users} = require("../models");

router.post("/", validateToken ,async (req, res) => {
  const {
    username,
    customerName,
    email,
    phoneNumber,
    licenseDetails,
    vehicleType,
    vehicleBrand,
    year,
    model,
    engineType,
    service,
    serviceFee,
    selectedDate,
    selectedTime,
    userDescription,
    service_status,
    invoice_id,
    booking_seq
  } = req.body;
  Bookings.create({
    username:username,
    customerName: customerName,
    email:email,
    phoneNumber: phoneNumber,
    licenseDetails: licenseDetails,
    vehicleType: vehicleType,
    vehicleBrand: vehicleBrand,
    year: year,
    model: model,
    engineType: engineType,
    service: service,
    serviceFee: serviceFee,
    selectedDate: selectedDate,
    selectedTime: selectedTime,
    userDescription: userDescription,
    service_status: service_status,
    invoice_id:invoice_id,
    booking_seq: booking_seq
  });
  res.json("SUCCESS");
});

router.get("/", async (req, res) => {
  const listOfBookings = await Bookings.findAll();
  res.json(listOfBookings);
});




router.get("/:username", async (req, res) => {
  
  const username = req.params.username;
  const users = await Users.findOne({where: {username: username}});

  if (users.role === "customer") {
    const findUserBooking = await Bookings.findAll({
      where: {
        username: username,
      },
    });
    res.json(findUserBooking);
  }
  if(users.role ==="admin") {
    const findAll = await Bookings.findAll()
    res.json(findAll)
  }
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const booking = await Bookings.findByPk(id);
  res.json(booking);
});

//PUT request for updating service_status
router.put("/byId/:id", async (req,res) => {
  const id = req.params.id;
  const { service_status } = req.body;

  try {
    const existingBooking = await Bookings.findByPk(id);

    if(!existingBooking){
      return res.status(404).json({ error: "Booking not found"});
    }
    await existingBooking.update(
      {
      service_status: service_status,
      }
    );
    res.json("Service status updated successfully");
  } catch( error ) {
    console.error("Error updating service status", error);
    res.status(500).json({error: "Internal server error"});
  }

})

router.delete("/byId/:id", async(req,res)=> {
  const id = req.params.id;

  try{
    const booking = await Bookings.findByPk(id);

    if(!booking) {
      return res.status(404).json({error: "Booking not found"});
    }

      await Bookings.destroy({
        where: {
          id: id,
        },
      });
      res.json("DELETED SUCCESSFULLY");

  } catch(error){
    console.error("Error deleting booking", error);
    res.status(500).json({error: "Internal server error"});
  }

  


})

module.exports = router;
