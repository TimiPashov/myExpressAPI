const express = require('express');
const cors = require('cors');

module.exports = (app) => {
    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        origin: '*',
        credentials: true
    }));
}