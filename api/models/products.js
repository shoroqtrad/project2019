
const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
     Address:{type:String,required:true},
     Name:{type:String,required:true},
     donation:{type:Boolean,required:true},
     price:{type:Number,required:true} ,
     productImage: { type: String, required: true },
     bookType:{type:String,
      "enum":["novel","science books","children books"]
      },
      productType:{type:String,
      "enum":["clothing","shoes","bags","accessories"]
      },
        size:{type:String,
         "enum":["M","L","XL","XXL"]
          },
        height:{type:Number},
        chest:{type:Number},
        waist:{type:Number},
});

module.exports = mongoose.model('product', productSchema);
