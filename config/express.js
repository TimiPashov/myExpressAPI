const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
module.exports = (app) => {
    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors({
        origin: '*',
        credentials: true
    }));

}