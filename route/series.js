const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");
const series = require("../controllers/series");
const Series = require("../models/series");

router
  .route("/")
  .get(catchAsync(series.index))
  .post(requireAuth, catchAsync(series.createSeries));

router
  .route("/:id")
  .get(catchAsync(series.showSeries))
  .delete(requireAuth, catchAsync(series.deleteSeries));

module.exports = router;
