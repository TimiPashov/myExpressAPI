const Car = require('../models/Car');
const { getAllCars } = require('../services/carService');

const carController = require('express').Router();

carController.get('/', async (req, res) => {
    const cars = await getAllCars();
    res.json(cars);
});

carController.post('/', async (req, res) => { 
    
})

module.exports = carController;