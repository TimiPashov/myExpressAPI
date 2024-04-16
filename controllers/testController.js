const testController = require('express').Router();
const { register, getUsers } = require('../services/userService');
const { createToken } = require('../utils/jwt')

testController.get('/', (req, res) => {
    getUsers().then((users) => {
        res.writeHead(200, {
            "set-cookie": `token=${createToken(123)}`
        });
        res.write(JSON.stringify(users));
        res.end()
    });
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