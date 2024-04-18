const testController = require('express').Router();
const { register, getUsers } = require('../services/userService');
const { createSession } = require('../utils/jwt')

testController.get('/', (req, res) => {
    res.writeHead(200, 'OK');
    res.write('<WELCOME TO HOME>');
    res.end();
    // const token = createToken(123);
    // res.writeHead(200, {
    //     "set-cookie": `token=${token}`;
    // });
    // res.write('Hello');
    // res.end()

})


testController.post('/', (req, res) => {

    register('Gosho', '123456').then(() => {
        console.log('user registered')
        res.send('user registered');
    })
});


module.exports = testController;