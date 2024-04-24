const Car = require("../models/Car");

async function getAllCars() {
  const cars = Car.find({});
  return cars;
}

async function createCar(
  make,
  model,
  year,
  used,
  coupe,
  fuelType,
  description,
  price,
  owner,
  images
) {
  const car = await Car.create({
    make,
    model,
    year,
    used,
    coupe,
    fuelType,
    description,
    price,
    owner,
    images,
  });
  return car;
}

module.exports = {
  getAllCars,
  createCar,
};
