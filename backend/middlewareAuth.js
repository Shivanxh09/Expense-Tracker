const express = require('express');
const jwt = require ("jsonwebtoken")

require('dotenv').config();

function auth(req, res, next) {
  const token = req.headers.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_USER_PASSWORD);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({
      message: "you have to signup first",
    });
  }
}
module.exports={
  auth
}