const express = require('express');

const testController = require('../controllers/testController');
const authController = require('../controllers/authController');

module.exports = (app) => {
    app.use('/', testController);
    app.use('/auth', authController)
}