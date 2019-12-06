const express = require("express");
const router = express.Router();
const productController = require('../controllers/products');

const multer = require('multer');

//cb=call back
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null,'./uploads/');
                                         },
       filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
// execute multer into upload
  const upload = multer({ storage: storage,
                           limits: {fileSize: 1024 * 1024 * 5},
                      fileFilter: fileFilter });
                      
router.post("/women",upload.single('productImage'),productController.product_women);

router.post("/children",upload.single('productImage'),productController.product_child);

router.post("/books",upload.single('productImage'),productController.product_books);


router.get("/books",productController.products_get_book);

router.get("/children",productController.products_get_child);

router.get("/women",productController.products_get_women);


router.get("/children/:productId", productController.products_of_child);

router.get("/women/:productId",productController.products_of_women);

router.get("/books/:productId",productController.products_of_book);



module.exports = router;
