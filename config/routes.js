

const testController = require('../controllers/testController');
const authController = require('../controllers/authController');
const carController = require('../controllers/carController');

module.exports = (app) => {
    app.use('/', testController);
    app.use('/auth', authController);
    app.use('/cars', carController);
}