const express = require('express');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');
require('dotenv').config();
const port = process.env.PORT;



start();

async function start() {
    const app = express();
    expressConfig(app);
    await databaseConfig(app);
    routesConfig(app);


    app.listen(port, () => console.log(`Server listening on port ${port}`))
}