const express = require("express");
const router = express.Router();
const {Bookings} = require("../models");



router.post("/", async (req, res) => {
  const {
    customerName,
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
    booking_id,
    booking_seq
  } = req.body;
  Bookings.create({
    customerName: customerName,
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
    booking_id: booking_id,
    booking_seq: booking_seq
  });
  res.json("SUCCESS");
});

router.get("/", async (req, res) => {
  const listOfBookings = await Bookings.findAll();
  res.json(listOfBookings);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const booking = await Bookings.findByPk(id);
  res.json(booking);
});

module.exports = router;
