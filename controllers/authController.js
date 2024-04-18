const authController = require('express').Router();
const { register } = require('../services/userService');


authController.get('/register', (req, res) => {
    res.writeHead(200, 'OK');
    res.write('<WElcome to register>');
    res.end();
})

authController.post('/register', async (req, res) => {
    console.log('receive req')
    try {
        if (req.body?.username == '' || req.body?.password == '') {
            throw new Error('All fields required!')
        }
        const token = await register(req.body.username, req.body.password);
        res.cookie('token', token, { httpOnly: true });
    } catch (error) {
        console.log({ error });
    }
})


module.exports = authController;