const Car = require('../models/Car');

async function getAllCars() {
    const cars = Car.find({});
    return cars;
}

async function createCar(carData) {
    const car = await Car.create(carData);
    return car;
}



module.exports = {
    getAllCars,
    createCar
}