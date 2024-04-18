const mongoose = require('mongoose');
require('dotenv').config();

const CONNECTION_STRING = process.env.MONGODB_STRING;

module.exports = async (app) => {
    try {
        mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          
        });
        console.log('Database Connected')
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}