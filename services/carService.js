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

async function getOneCar(id) {
  const car = await Car.findById(id).exec();
  return car;
}

async function deleteCar(id) {
  const car = await Car.findByIdAndDelete(id);
  return car;
}

module.exports = {
  getAllCars,
  createCar,
  deleteCar,
  getOneCar,
};
