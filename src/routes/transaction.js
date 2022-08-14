const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transaction');

router.get('/', transactionController.getAll);
router.get('/:id', transactionController.getTransaction);
router.post('/', transactionController.insert);
router.put('/:id', transactionController.update);
router.delete('/:id', transactionController.delete);

module.exports = router