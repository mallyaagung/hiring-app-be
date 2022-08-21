const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transaction');
const { protect } = require('../middleware/auth');
const { verify } = require('../middleware/verifyroles');

router.get('/', protect, verify(["seller", "customer", "admin"]), transactionController.getAll);
router.get('/:id', protect, verify(["seller", "customer", "admin"]), transactionController.getTransaction);
router.post('/', protect, verify(["admin"]), transactionController.insert);
router.put('/:id', protect, verify(["admin"]), transactionController.update);
router.delete('/:id', protect, verify(["admin"]), transactionController.delete);

module.exports = router