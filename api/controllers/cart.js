const Cart = require('../models/cart');

 // add product to cart 
exports.add = function (req, res, next) {
  const { email, product_id } = req.body;
  Cart.findOne({ email: email })
    .exec()
    .then(cart => {
           if (cart) {
        const indexFound = cart.items.findIndex(item => {
          return item.product_id === product_id;
                        });
          cart.items.push({
            product_id: product_id,
          });
        return cart.save();
      } 
      
      else {
        const cartData = {
          email: email,
          items: [
            {
              product_id: product_id,
            }
          ]
        };
        cart = new Cart(cartData);
        return cart.save();
      }
    })
    .then(savedCart => res.json(savedCart))
    .catch(err => {
      return next(error);
    });
};


 
 // Get cart by email.
exports.get = function (req, res, next) {
  const { email } = req.body; //query
  // console.log(email);
 
  Cart.get({ email })
    .then(Cart => res.json(Cart))
    .catch(err => {
      return next(error);
    });
};

 //delete cart by email.
exports.remove = function (req, res, next) {
  const { email } = req.body;//query
  Cart.get({ email })
    .then(Cart => Cart.remove())
    .then(deletedCart => res.json(deletedCart))
    .catch(err => {
      return next(error);
    });
};
