const express = require('express');

const testController = require('../controllers/testController');

module.exports = (app) => {
    app.use('/', testController);
}