const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart');


router.get('/', CartController.get);
router.post('/add', CartController.add);
router.post('/delete', CartController.remove);


module.exports = router;
