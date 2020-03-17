const express = require("express");
const router = express.Router();
const { User } = require("../models");
const getCurrentWeather = require("../lib/getCurrentWeather");
const { CourierClient } = require("@trycourier/courier");

const courier = CourierClient();

// Retrieve all users
router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Find One User with Current Weather
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  const { profile } = await courier.getProfile({ recipientId: id });
  const weather = await getCurrentWeather(user.zipCode, user.tempScale);
  res.json({
    ...user.toJSON(),
    weather,
    email: profile.email || "",
    phone_number: profile.phone_number || ""
  });
});

// Create user
router.post("/", async (req, res) => {
  const { body: payload } = req;
  const { phone_number, email, ...rest } = payload;
  const newUser = await User.create(rest);
  await courier.replaceProfile({
    recipientId: newUser.id,
    profile: {
      phone_number: phone_number && phone_number.length ? phone_number : undefined,
      email: email && email.length ? email : undefined
    }
  });
  res.status(201).json({ ...newUser, phone_number, email });
});

// Update user
router.put("/:id", async (req, res) => {
  const {
    body: payload,
    params: { id }
  } = req;
  const { phone_number, email, ...rest } = payload;
  try {
    const numUpdated = await User.update(rest, { where: { id } });
    await courier.replaceProfile({
      recipientId: id,
      profile: {
        phone_number: phone_number && phone_number.length ? phone_number : undefined,
        email: email && email.length ? email : undefined
      }
    });

    res.json({ status: "ok", numUpdated });
  } catch (ex) {
    console.error(ex);
    res.sendStatus(400);
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const numRows = await User.destroy({ where: { id } });
  await courier.replaceProfile({
    recipientId: id,
    profile: {}
  });
  res.json({ status: "ok", numRows });
});

module.exports = router;
