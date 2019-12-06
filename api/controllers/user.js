const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");



exports.user_signup = (req, res,next) => {
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
           bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              username:req.body.username,
              password: hash
            });
            user
              .save() // to save user in data base 
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                console.log("hello")
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};


exports.user_logout = (req, res)=>{
  res.json({
    message:"logout"
  })
};

exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email})
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};






























// exports.register=(req,res)=>{
//     var newUser = new User(req.body);
//     newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
//     newUser.save(function(err, user) {
//       if (err) {
//         return res.status(400).send({
//           message: err
//         });
//       } else {
//         user.hash_password = undefined;
//         return res.json(user);
//       }
//     });
// };


// exports.sign_in = (req, res)=> {
//   User.findOne({
//     email: req.body.email
//   }, function(err, user) {
//     if (err) throw err;
//     if (!user) {
//       res.status(401).json({ message: 'Authentication failed. User not found.' });
//     } else if (user) {
//       if (!user.comparePassword(req.body.password)) {
//         res.status(401).json({ message: 'Authentication failed. Wrong password.' });
//       } else {
//         return res.json({token: jwt.sign({ email: user.email, username: user.username, _id: user._id}, 'RESTFULAPIs')});
//       }
//     }
//   });
// };
// exports.loginRequired = function(req, res, next) {
//   if (req.user) {
//     next();
//   } else {
//     return res.status(401).json({ message: 'Unauthorized user!' });
//   }
// };




































