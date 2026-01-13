const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const products = require('../controllers/productController');

router.use(auth);

router.post('/', products.createProduct);
router.get('/', products.getProducts);
router.get('/:id', products.getProduct);
router.put('/:id', products.updateProduct);
router.patch('/:id', products.patchProduct);
router.delete('/:id', products.deleteProduct);

module.exports = router;