// @ts-ignore
const express = require('express');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ error: 'Unauthorized - Missing JWT token' });
    }

    // @ts-ignore
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Access forbidden. Invalid or expired token.' });
        }
        req.user = {
            // @ts-ignore
            id: String(decoded.UserInfo.id),
            // @ts-ignore
            email: decoded.UserInfo.email,
          };        
          next();
    });
};

module.exports = authenticateToken;
