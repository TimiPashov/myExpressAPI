const testController = require('express').Router();
const { register, getUsers } = require('../services/userService');
const { createSession } = require('../utils/jwt')

testController.get('/', async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users)
        // getUsers().then((users) => {

        //     res.writeHead(200, {
        //         "set-cookie": `token=${createSession(123)}; httpOnly`
        //     });
        //     res.write(JSON.stringify(users));
        //     res.end()
        // });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
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