const User = require("../models/User");

const {
  getAllCars,
  createCar,
  getOneCar,
  deleteCar,
} = require("../services/carService");
const { auth } = require("../utils/auth");
const carController = require("express").Router();

carController.get("/", async (req, res) => {
  try {
    const cars = await getAllCars();
    res.json(cars);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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
      res.status(200).json(car);
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

carController.get("/:carId", auth(), async (req, res) => {
  const car = await getOneCar(req.params.carId);

  if (car) {
    res.status(200).json(car);
  }
});

carController.delete("/:carId", auth(), async (req, res) => {
  try {
    const carId = req.params.carId;
    const user = await User.findById(req.user._id);
    const isOwner = user.cars.includes(carId);
    if (!isOwner) {
      throw new Error("Must be owner!");
    }
    const car = await deleteCar(carId);
    res.status(200).json({ message: "Car Deleted!" });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = carController;
