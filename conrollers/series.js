const Series = require("../models/series");

module.exports.index = async (req, res) => {
  const series = await Series.find({});
  // console.log(series);
  res.send(series);
};
module.exports.createSeries = async (req, res, next) => {
  try {
    const series = new Series(req.body);
    await series.save();
    // console.log(series);
    res.send("added");
  } catch (err) {
    console.log(err);
    res.status(500).send("Unable to add!!");
  }
};

module.exports.showSeries = async (req, res) => {
  try {
    const series = await Series.findById(req.params.id);
    if (!series) return res.status(404).send("No series found");
    // console.log(series);
    res.send(series);
    // res.redirect("/series");
  } catch (err) {
    console.log(err);
    res.status(500).send("OH NO ERROER!!!");
  }
};

module.exports.deleteSeries = async (req, res) => {
  try {
    const { id } = req.params;
    await Series.findByIdAndDelete(id);
    res.redirect("/series");
  } catch (err) {
    // console.log(err);
    res.status(500).send("Unable to delete!!");
  }
};
