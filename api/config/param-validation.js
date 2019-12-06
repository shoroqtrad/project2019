const Joi = require('joi');
module.exports = {
  createOrder: {
    body: {
      shippingAddress: {
        
        Name: Joi.string().required(),
        email: Joi.string()
          .email()
          .required(),
        postCode: Joi.string()
          .regex(/[\d]{4,5}/)
          .required(),
        city: Joi.string().required()
      },
      shippingMethod: Joi.string().required(),
      paymentMethod: Joi.string().required(),
      items: [
        {
          productId: Joi.string().required(),
          Name: Joi.string().required(),
          price: Joi.number().required()
        }
      ]
    }
  },
  // POST /api/products - Create new product
  createProduct: {
    body: {
      Name: Joi.string().required(),
      Address: Joi.string().required(),
      donation: Joi.boolean().required(),
      price: Joi.number().required(),
      productImage :Joi.String().required(),
      bookType:Joi.String(),
      productType:Joi.String(),
      size:Joi.String(),
      height:Joi.Number(),
      chest:Joi.Number(),
      waist:Joi.Number(),
    }
  },
  // PUT /api/products/:productId - Update product
  updateProduct: {
    body: {
      Name: Joi.string(),
      Address: Joi.string(),
      donation: Joi.boolean(),
      price: Joi.number(),
      productImage :Joi.String(),
      bookType:Joi.String(),
      productType:Joi.String(),
      size:Joi.String(),
      height:Joi.Number(),
      chest:Joi.Number(),
      waist:Joi.Number(),
    },
    params: {
      productId: Joi.string()
        .hex()
        .required()
    }
  },
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      
    }
  },
  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      email: Joi.string()
        .regex(/[\w]+?@[\w]+?\.[a-z]{2,4}/)
        .required(),
    },
    params: {
      userId: Joi.string()
        .hex()
        .required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
