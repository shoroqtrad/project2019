
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ItemSchema = new Schema({
  product_id: {
    type: String,
    required: true
  },
});

const CartSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: [
      /[\w]+?@[\w]+?\.[a-z]{2,4}/,
      'The value of path {PATH} ({VALUE}) is not a valid email address.'
    ]
  },
  items: [ItemSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});
/**
 * Statics
 */
CartSchema.statics = {
  /**
   * get cart
   * @param {string} email - cart email.
   * @returns {Promise<Cart[]>}
   */
  get ({ email } = {}) {
    let condition = { email: email };
    return this.findOne(condition).exec();
  }
};
module.exports = mongoose.model('cart', CartSchema);
