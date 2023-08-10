const express = require('express');
const router = express.Router();
const {Bookings} = require('../models');
const {validateToken} = require('../middlewares/AuthMiddleware');

const {Users} = require('../models');

router.get("/user/:username", async (req, res) => {
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
  if (users.role === "admin") {
    const findAll = await Bookings.findAll();
    res.json(findAll);
  }
});

module.exports =  router
