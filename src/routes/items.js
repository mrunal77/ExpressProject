const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const items = require('../controllers/itemController');

router.use(auth);

router.post('/', items.createItem);
router.get('/', items.getItems);
router.get('/:id', items.getItem);
router.put('/:id', items.updateItem);
router.delete('/:id', items.deleteItem);

module.exports = router;
