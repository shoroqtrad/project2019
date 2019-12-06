const express = require("express");
const router = express.Router();
const forgotController = require('../controllers/forgot');

router.post('/',forgotController.forgot_password);
router.post('/reset_password',forgotController.reset_password);


module.exports = router;
