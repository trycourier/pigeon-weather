const express = require("express");
const router = express.Router();
const { User } = require("../models");
const getCurrentWeather = require("../lib/getCurrentWeather");
const { CourierClient } = require("@trycourier/courier");

const courier = CourierClient();

const buildUIData = ({ email = "", phone_number = "", slack = null }) => {
  let channels = [];

  if (phone_number && phone_number.length) {
    channels.push({ name: "SMS", icon: "mobile alternate" });
  }

  if (email && email.length) {
    channels.push({ name: "Email", icon: "mail" });
  }

  if (slack) {
    channels.push({ name: "Slack", icon: "slack" });
  }

  return { channels };
};

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
    phone_number: profile.phone_number || "",
    slack: profile.slack || { email: "" }
  });
});

// Create user
router.post("/", async (req, res) => {
  const { body: payload } = req;
  const { phone_number, email, slack, ...rest } = payload;
  const profile = {
    phone_number:
      phone_number && phone_number.length ? phone_number : undefined,
    email: email && email.length ? email : undefined,
    slack: slack &&
      slack.email && {
        access_token: process.env.SLACK_BOT_TOKEN,
        email: slack.email
      }
  };
  const uiData = buildUIData(profile);
  const newUser = await User.create({ ...rest, uiData });
  await courier.replaceProfile({
    recipientId: newUser.id,
    profile
  });
  res.status(201).json({ ...newUser, phone_number, email, slack });
});

// Update user
router.put("/:id", async (req, res) => {
  const {
    body: payload,
    params: { id }
  } = req;
  const { phone_number, email, slack, ...rest } = payload;
  const profile = {
    phone_number:
      phone_number && phone_number.length ? phone_number : undefined,
    email: email && email.length ? email : undefined,
    slack: slack &&
      slack.email && {
        access_token: process.env.SLACK_BOT_TOKEN,
        email: slack.email
      }
  };
  try {
    const uiData = buildUIData(profile);
    const numUpdated = await User.update(
      { ...rest, uiData },
      { where: { id } }
    );
    await courier.replaceProfile({
      recipientId: id,
      profile
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
