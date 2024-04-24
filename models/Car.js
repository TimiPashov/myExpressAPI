const { request } = require("express");
const { Schema, model, Types } = require("mongoose");

const URL_PATTERN = /^https?:\/\/.+$/i;

const carSchema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: String, required: true },
  used: { type: String, required: true },
  coupe: { type: String, required: true },
  fuelType: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  owner: { type: Types.ObjectId, ref: "User", required: true },
  images: {
    type: String,
    required: true,
    validate: {
      validator: (value) => URL_PATTERN.test(value),
      message: "Invalid IMG URL",
    },
  },
});

const Car = model("Car", carSchema);

module.exports = Car;
