const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/user");

/*-------------------------AUTHENTICATION ROUTE--------------------------*/
//signup route----------
router.post("/signup", catchAsync(users.signup));

//login route-------------

router.get("/login", (req, res) => {
  res.send("login");
});

router.post("/login", catchAsync(users.login));

//logout route-----

router.get("/logout", users.logout);

module.exports = router;
