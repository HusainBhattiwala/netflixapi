if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Series = require("./models/series");
const { SeriesSchema } = require("./schemas.js");
const ExpressError = require("./utils/ExpressError");
const catchAsync = require("./utils/catchAsync");
const seriesRoutes = require("./routes/series");
const userRoutes = require("./routes/user");
const app = express();

const dbUrl = process.env.DB_URL;

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("DATABASE CONNECTED!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNCTION ERROR!!!!");
    console.log(err);
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/series", seriesRoutes);
app.use("/", userRoutes);

/*---------------------SEARCH ROUTE----------------------*/
app.get(
  "/find",
  cors(),
  catchAsync(async (req, res) => {
    try {
      const search = req.query.search || "";
      const series = await Series.find({
        title: { $regex: search, $options: "i" },
      });
      res.send(series);
    } catch (err) {
      console.log(err);
      res.status(500).send("invalid search reults!!");
    }
  })
);

/*--------------------HOME ROUTE---------------------*/

app.get("/", (req, res) => {
  res.send(
    "BACKEND, go to /series to view all, series/:id to view particular series"
  );
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!!" } = err;
  res.status(statusCode).send(message);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
