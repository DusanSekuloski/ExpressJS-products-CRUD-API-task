const express = require('express');

const setTimestamp = (req, res, next) => {
    const now = new Date();

    if (req.method === 'POST') {
        req.body.created_at = now;
        req.body.updated_at = now;
    } else if (req.method === 'PUT') {
        req.body.updated_at = now;
    }

    next();
};

module.exports = setTimestamp;
