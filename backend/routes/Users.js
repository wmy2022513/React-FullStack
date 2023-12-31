const express = require("express");
const router = express.Router();
const {Users} = require("../models");
const bcrypt = require("bcrypt");
const {validateToken} = require("../middlewares/AuthMiddleware");
const {sign} = require("jsonwebtoken");

//register a user
router.post("/", async (req, res) => {
  const {username, password, role} = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      role: role,
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const {username, password} = req.body;
  const user = await Users.findOne({where: {username: username}});
  // if (!user) res.json({error: "User Doesn't Exist"}); //a more concise way to write if-else condition
  if (!user) {
    res.json({error: "User Doesn't Exist"});
    return;
  }
  bcrypt.compare(password, user.password).then(async (match) => {
    // if (!match) res.json({error: "Wrong Username And Password Combination"}) ;
    if (!match) {
      res.json({error: "Wrong Username And Password Combination"});
      return;
    }

    const accessToken = sign(
      {username: user.username, id: user.id, role:user.role},
      "importantsecret"
    );

    res.json({
      token: accessToken,
      username: username,
      id: user.id,
      role: user.role
    });
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
