const express = require('express');
const router = express.Router();

const setTimestamp = (req, res, next) => {
    const now = new Date();

    if (req.method === 'POST') {
        req.body.created = now;
        req.body.updated = now;
    } else if (req.method === 'PUT') {
        req.body.updated = now;
    }

    next();
};

module.exports = setTimestamp;
