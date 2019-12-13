const Order = require('../models/order');
const Product = require('../models/products');
const Cart = require('../models/cart');
/**
 * Load product and append to req.
 */
exports.load = function (req, res, next, id) {
  Order.get(id)
    .then(order => {
      req.order = order; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(err => {
      return next(error);
    });
};

exports.get = function (req, res, next) {
  return res.json(req.order);
};

/**
 * Create new order
 * @returns {Order}
 */
exports.placeOrder = function (req, res, next) {
  console.log(req.body);
  res.json(req.body);
  if (!(Array.isArray(req.body.items) && req.body.items.length)) {
    return next(err);
  }
  const orderData = {
    email: req.body.email,
    billingAddress: req.body.billingAddress,
    shippingMethod: req.body.shippingMethod,
    paymentMethod: req.body.paymentMethod
  };
  //  orderData.items = req.body.items.map(item => {

  orderData.items = req.body.items.map(item => {
    return {
      productId: item.productId,
      name: item.name,
      price: item.price,
      // qty: item.qty
    };
  });
  orderData.grandTotal = req.body.items.reduce((total, item) => {
    return total + item.price * item.qty;
  }, 0);
  // console.log(orderData);
  const order = new Order(orderData);

  order
    .save()
    .then(savedOrder => {
      const allProductPromises = savedOrder.items.map(item => {
        return Product.get(item.productId).then(product => {
          product.quantity = product.quantity - item.qty;
          return product.save();
        });
      });
      Promise.all(allProductPromises)
        .then(data => {
          return Cart.get(savedOrder.user);
        })
        .then(cart => {
          cart.items = [];
          return cart.save();
        })
        .then(data => {
          res.json(savedOrder);
        })
        .catch(err => {
          // console.log(err);
          return next(error);
        });
    })
    .catch(err => {
      // console.log(err);
      return next(error);
    });
};

/**
 * Get order list.
 * @property {number} req.query.skip - Number of orders to be skipped.
 * @property {number} req.query.limit - Limit number of orders to be returned.
 * @returns {Order[]}
 */

exports.list = function (req, res, next) {
  const { email, sort = 'createdAt', limit = 50, skip = 0 } = req.body;//query
  // console.log(email);

  Order.list({ email, sort, limit, skip })
    .then(orders => res.json(orders))
    .catch(e => next(e));
};
