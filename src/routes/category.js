const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category');
const { protect } = require('../middleware/auth');
const { verify } = require('../middleware/verifyroles')


router.get('/', protect, verify(["seller", "customer", "admin"]), categoryController.getAllCategory);
router.get('/:id', protect, verify(["seller", "customer", "admin"]), categoryController.getCategory);
router.post('/', protect, verify(["admin"]), categoryController.insert);
router.put('/:id', protect, verify(["admin"]), categoryController.update);
router.delete('/:id', protect, verify(["admin"]), categoryController.delete);

module.exports = router