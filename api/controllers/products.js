
const mongoose = require("mongoose");

const product= require("../models/products");


   // to sell books
  exports.product_books = (req,res,next)=>{
  const book = new product({ 
    _id :new mongoose.Types.ObjectId(),
    Name :req.body.Name,
    bookType:req.body.bookType,
    Address:req.body.Address,
    donation:req.body.donation,
    price:req.body.price,
    productImage: req.file.path
    });
    book.save().then(result=>{
      console.log(result);
        res.status(201).json({
        message:"creates product sccessfully",
        bookType:result.bookType,
        Address:result.Address,
        Name:result.Name,
        donation:result.donation,
        price:result.price 
      })
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
// to sell children things
exports.product_child = (req,res,next)=>{

    const children = new product({
      _id: new mongoose.Types.ObjectId(),
      Name :req.body.Name,
      productType:req.body.productType,
      size :req.body.size,
      Address:req.body.Address,
      donation:req.body.donation,
      price:req.body.price,
      productImage: req.file.path
      });
      children.save().then(result=>{
        console.log(result);
        res.status(201).json({
          message:"creates product sccessfully",
          productType:result.productType,
          size:result.size,
          Address:result.Address,
          Name:result.Name,
          donation:result.donation,
          price:result.price
  
        })
      }).catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
// to sell women things
exports.product_women = (req,res,next)=>{

    const women = new product({
      _id: new mongoose.Types.ObjectId(),
      productType:req.body.productType,
      size :req.body.size,
      height:req.body.height,
      chest:req.body.chest,
      waist:req.body.waist,
      Address:req.body.Address,
      donation:req.body.donation,
      price:req.body.price,
      productImage: req.file.path,
      Name:req.body.Name,
      });
      women.save().then(result=>{
        console.log(result);
        res.status(201).json({
          message:"creates product sccessfully",
          productType:result.productType,
          size:result.size,
          chest:result.chest,
          waist:result.waist,
          Address:result.Address,
          Name:result.Name,
          donation:result.donation,
          price:result.price,
          height:result.height
  
        })
      }).catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
  


//Books Page
exports.products_get_book = (req, res, next) => {
  product.find().select(" bookType Name  Address donation price _id productImage")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              _id:doc._id,
              bookType: doc.bookType,
              Name:doc.Name,
              Address:doc.Address,
              donation:doc.donation,
              price: doc.price,
              productImage: doc.productImage,
            };
          })
        };
           //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
//Children Page
exports.products_get_child = (req, res, next) => {
    product.find().select("Types Name Address donation price productImage")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              productType: doc.productType,
              Address:doc.Address,
              Name:doc.Name,
              donation:doc.donation,
              price: doc.price,
              productImage: doc.productImage,
           _id:doc._id
            };
          })
        };
           //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
//Women Page
exports.products_get_women = (req, res, next) => {
    product.find().select("Types Name Address donation price _id productImage")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              productType: doc.productType,
              Address:doc.Address,
              Name:doc.Name,
              donation:doc.donation,
              price: doc.price,
              productImage: doc.productImage,
              _id:doc._id

            };
          })
        };
           //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };




// to get specific product of childlren 
  exports.products_of_child =(req, res, next) => {
    const id = req.params.productId;
   product.findById(id)
      .select(" size productType Name Address donation price  productImage ")
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            product: doc,
                    });
        } else {
          res.status(404).json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };
   

  // to get specific product of women 
  exports.products_of_women =(req, res, next) => {
    const id = req.params.productId;
   product.findById(id)
      .select(" size   height   chest   waist  productType  Name Address donation price  productImage ")
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            product: doc,
                    });
        } else {
          res.status(404).json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };

    // to get specific product of books 
    exports.products_of_book =(req, res, next) => {
      const id = req.params.productId;
     product.findById(id)
        .select(" bookType Address  Name donation price  productImage ")
        .exec()
        .then(doc => {
          console.log("From database", doc);
          if (doc) {
            res.status(200).json({
              product: doc,
                      });
          } else {
            res.status(404).json({ message: "No valid entry found for provided ID" });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    };
   





    