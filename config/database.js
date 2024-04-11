const mongoose = require('mongoose');

const CONNECTION_STRING = 'mongodb+srv://pashov91:Tim911003@mynewcluster.0hywvsh.mongodb.net/myOwnDB'

module.exports = async (app) => {
    try {
        mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database Connected')
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}