const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const async = require('async');
const crypto = require('crypto'), _ = require('lodash');
const nodemailer = require('nodemailer');
var  hbs = require('nodemailer-express-handlebars'),
   email = 'shoroqtrad858@gmail.com',
   pass ='9972053231trad'

   var smtpTransport = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: email,
      pass: pass
    },
        port: 587,

  });

  // var handlebarsOptions = {
  //   viewEngine: 'handlebars',
  //   viewPath: path.resolve('./api/templates/'),
  //   extName: '.html'
  // };
  
  // smtpTransport.use('compile', hbs(handlebarsOptions));
  

  exports.forgot_password = function(req, res) {
    async.waterfall([
          function(done) {
        User.findOne({
          email: req.body.email
        }).exec(function(err, user) {
          if (user) {
            done(err, user);
          } else {
            done('User not found.');
          }
        });
      },
      function(user, done) {
        // create the random token
        crypto.randomBytes(20, function(err, buffer) {
          var token = buffer.toString('hex');
          done(err, user, token);
        });

      },
      function(user, token, done) {
        User.findByIdAndUpdate({ _id: user._id }, 
          { reset_password_token: token, reset_password_expires: Date.now() + 86400000 }, 
          { upsert: true, new: true })
          .exec(function(err, new_user) {
          done(err, token, new_user);
        });
      },
      function(token, user, done) {
        var data = {
          to: user.email,
          from: email,
          // template: 'forgot-password-email',
          subject: 'Password help has arrived!',
          context: {
            url: 'http://localhost:3000/forgot/reset_password?token=' + token,
            name: user.username.split(' ')[0]
          }
        };
        smtpTransport.sendMail(data, function(err) {
          if (!err) {
            return res.json({ message: 'Kindly check your email for further instructions '+'   ' +   token});
          } else {
            return done(err);
          }
        });
      }
    ], function(err) {
      return res.status(422).json({ message: err });
    });
  };
  
  /**
   * Reset password
   */
  exports.reset_password = function(req, res, next) {
    User.findOne({
      reset_password_token: req.body.token,
      reset_password_expires: {
        $gt: Date.now()
      }
    }).exec(function(err, user) {
      if (!err && user) {
        if (req.body.newPassword === req.body.verifyPassword) {
          user.hash_password = bcrypt.hashSync(req.body.newPassword, 10);
          user.reset_password_token = undefined;
          user.reset_password_expires = undefined;
          user.save(function(err) {
            if (err) {
              return res.status(422).send({
                message: err
              });
            } else {
              var data = {
                to: user.email,
                from: email,
                // template: 'reset-password-email',
                subject: 'Password Reset Confirmation',
                context: {
                  name: user.username.split(' ')[0]
                }
              };
  
              smtpTransport.sendMail(data, function(err) {
                if (!err) {
                  return res.json({ message: 'Password reset' });
                } else {
                  return done(err);
                }
              });
            }
          });
        } else {
          return res.status(422).send({
            message: 'Passwords do not match'
          });
        }
      } else {
        return res.status(400).send({
          message: 'Password reset token is invalid or has expired.'
        });
      }
    });
  };
  






// var smtpTransport = nodemailer.createTransport({
//   service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
//   auth: {
//     user: email,
//     pass: pass
//   }
// });

// var handlebarsOptions = {
//   viewEngine: 'handlebars',
//   viewPath: path.resolve('./api/templates/'),
//   extName: '.html'
// };

// smtpTransport.use('compile', hbs(handlebarsOptions));


//   exports.forgotpassword=(req, res, next)=>{
 
//         User.findOne({ email: req.body.email }, function(err, user) {
//           if (!user) {
//             req.json ('error', 'No account with that email address exists.');
//            }

//           token=Math.random()*6;
//           user.resetPasswordToken = token;
//           user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//           user.save(function(err) {
          
//           done(err, token, user);
//           });
//         });
//       },

//       function(token, user, done) {
//         var smtpTransport = nodemailer.createTransport({
//           service: 'gmail',
//           secure:false,
//           auth: {
//             user: 'shoroqtrad858@gmail.email',
//             pass: '9972053231'
//           }
//         });
//           var mailOptions = {
//           to: user.email,
//           from: 'shoroqtrad858@gmail.com',
//           subject: 'Node.js Password Reset',
//           text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//             'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//             'http://' + req.headers.host + '/reset/' + token + '\n\n' +
//             'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//         };
//         smtpTransport.sendMail(mailOptions, function(err) {
//           req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
//           done(err, 'done');
//         });
//       }
    
  
  

//   // /reset/:token
//     exports.reset= (req, res)=>{
//       User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
//         if (!user) {
//           req.flash('error', 'Password reset token is invalid or has expired.');
//         }
//       });
    
//   }
  
//   // /reset/:token
//     exports.postrest=(req,res)=>{
     
//           User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
//             if (!user) {
//               req.json('error', 'Password reset token is invalid or has expired.');
//             }
    
//             user.password = req.body.password;
//             user.resetPasswordToken = undefined;
//             user.resetPasswordExpires = undefined;
    
//             user.save(function(err) {
//               req.logIn(user, function(err) {
//                 done(err, user);
//               });
//             });
//           });
//         },
//         function(user, done) {
//           var smtpTransport = nodemailer.createTransport( {
//             service: 'Gmail',
//             auth: {
//               username: '!shoroqtrad858@gmail',
//               passwod: '9972053231'
//             }
//           });
//           var mailOptions = {
//             to: user.email,
//             from: 'shoroqtrad858@gmail.com',
//             subject: 'Your password has been changed',
//             text: 'Hello,\n\n' +
//               'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
//           };
//           smtpTransport.sendMail(mailOptions, function(err) {
//             req.json('success', 'Success! Your password has been changed.');
//             done(err);
//           });
//         }
    
  
