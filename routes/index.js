const express = require("express");
const router = express.Router();
const UsersRoute = require("./users");

router.use("/Users", UsersRoute);

module.exports = router;
