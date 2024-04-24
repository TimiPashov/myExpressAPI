const Car = require("../models/Car");
const User = require("../models/User");

const { getAllCars, createCar } = require("../services/carService");
const { auth } = require("../utils/auth");
const carController = require("express").Router();

carController.get("/", async (req, res) => {
  const cars = await getAllCars();
  res.json(cars);
});

carController.post("/", auth(), async (req, res) => {
  try {
    const car = await createCar(
      req.body.make,
      req.body.model,
      req.body.year,
      req.body.used,
      req.body.coupe,
      req.body.fuelType,
      req.body.description,
      req.body.price,
      req.user._id,
      req.body.images
    );

    if (car) {
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { cars: car._id },
      });
      res.status(200).json({ car });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = carController;
