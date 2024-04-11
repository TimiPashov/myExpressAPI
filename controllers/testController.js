const testController = require('express').Router();

testController.get('/', (req, res) => {
    res.send('HELLO THERE');
})

module.exports = testController;