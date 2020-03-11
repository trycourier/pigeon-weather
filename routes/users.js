const express = require("express");
const router = express.Router();
const { User } = require("../models");
const axios = require("axios");

const getCurrentWeather = async (zip, tempScale) => {
  const units = tempScale === "F" ? "imperial" : "metric";
  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        zip,
        units,
        appid: process.env.OPENWEATHER_API_KEY
      }
    }
  );
  let weather = {
    conditions: data.weather[0],
    temp: {
      scale: tempScale,
      current: data.main.temp,
      feels_like: data.main.feels_like,
      high: data.main.temp_max,
      low: data.main.temp_min
    },
    city: data.name 
  };
  weather.conditions.image = `https://openweathermap.org/img/wn/${weather.conditions.icon}@2x.png`
  return weather;
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
  const weather = await getCurrentWeather(user.zipCode, user.tempScale);
  res.json({ ...user.toJSON(), weather });
});

// Create user
router.post("/", async (req, res) => {
  const { body: payload } = req;
  const newUser = await User.create(payload);
  res.status(201).json(newUser);
});

// Update user
router.put("/:id", async (req, res) => {
  const {
    body: payload,
    params: { id }
  } = req;
  const numUpdated = await User.update(payload, { where: { id } });
  res.json({ status: "ok", numUpdated });
});

// Delete user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const numRows = await User.destroy({ where: { id } });
  res.json({ status: "ok", numRows });
});

module.exports = router;
