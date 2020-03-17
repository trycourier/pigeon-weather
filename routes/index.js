const express = require("express");
const router = express.Router();
const UsersRoute = require("./users");
const { User } = require("../models");
const { CourierClient } = require("@trycourier/courier");
const getCurrentWeather = require("../lib/getCurrentWeather");

const courier = CourierClient();

router.use("/Users", UsersRoute);

router.post("/send", async (req, res) => {
  const { userIds } = req.body;
  for (let id of userIds) {
    const user = await User.findOne({ where: { id } });
    const weather = await getCurrentWeather(user.zipCode, user.tempScale);
    const { messageId } = await courier.send({
      eventId: "CURRENT_FORECAST",
      recipientId: id,
      data: {
        weather
      }
    });
  }
  res.sendStatus(202);
});

module.exports = router;
