const testController = require('express').Router();
const { register } = require('../services/userService');

testController.get('/', (req, res) => {

    register('Timi', '123456').then(() => {
        console.log('user registered')
        res.send('user registered');
    })
})

module.exports = testController;