const Joi = require("joi");

module.exports.SeriesSchema = Joi.object({
  Series: Joi.object({
    title: Joi.string().required(),
    year: Joi.number().required(),
    rating: Joi.number().required(),
    genre: Joi.string().required(),
  }).required(),
});
