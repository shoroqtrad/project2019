const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const bcrypt = require('bcrypt-nodejs');
const flash = require('express-flash');
var session = require('express-session');

const userRoutes = require('./api/routes/user');
const productsRoutes = require('./api/routes/products');
const forgetRoutes = require('./api/routes/forgot');
const cartRoutes = require('./api/routes/cart');

mongoose.connect(
  "mongodb+srv://shoroqtrad:" +
    process.env.MONGO_ATLAS_PW +
   "@cluster0-ulusr.mongodb.net/test?retryWrites=true&w=majority" 
  
);
  mongoose.Promise = global.Promise;
  
  app.use(morgan("dev"));

  app.use('/uploads', express.static('uploads'));

    
  // bodyparser === url & json
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(session({ secret: 'session secret key',resave:true,saveUninitialized: true}));
  app.use(flash());


  app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

  
// Routes which should handle requests

app.use("/user", userRoutes);
app.use("/products",productsRoutes);
app.use("/cart",cartRoutes);
app.use("/forgot",forgetRoutes);


//indicates that the requested resource is not available now.
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

/* indicates that the request is valid,
but the server is totally confused and 
the server is asked to serve some unexpected condition.*/
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

  module.exports = app;

  

