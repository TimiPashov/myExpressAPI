const testController = require('express').Router();
const { register, getUsers } = require('../services/userService');


testController.get('/', (req, res) => {
    const users = getUsers().then((users) => res.send(users));
   
})


testController.post('/', (req, res) => {

    register('Gosho', '123456').then(() => {
        console.log('user registered')
        res.send('user registered');
    })
});


module.exports = testController;