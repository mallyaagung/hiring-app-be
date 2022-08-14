const transactionModel = require('../models/transaction')

const transactionController = {
    getAll: (req, res) => {
        transactionModel.selectAll()
            .then(
                result => res.json(result.rows)
            )
            .catch(err => res.send(err)
            )
    },
    getTransaction: (req, res) => {
        const id = Number(req.params.id)
        transactionModel.selectTransaction(id)
            .then(
                result => res.json(result.rows)
            )
            .catch(err => res.send(err)
            )
    },
    insert: (req, res) => {
        const { id, quantity, totalprice, payment_method, order_status, transaction_date, id_customer, id_product } = req.body;
        transactionModel.insertTransaction(id, quantity, totalprice, payment_method, order_status, transaction_date, id_customer, id_product)
            .then(
                res.json('Transaction created')
            )
            .catch(err => res.send(err)
            )
    },
    update: (req, res) => {
        const id = Number(req.params.id)
        const { quantity, totalprice, payment_method, order_status, transaction_date, id_customer, id_product } = req.body;
        transactionModel.updateTransaction(id, quantity, totalprice, payment_method, order_status, transaction_date, id_customer, id_product)
            .then(
                res.json('Transaction updated')
            )
            .catch(err => res.send(err)
            )
    },
    delete: (req, res) => {
        const id = Number(req.params.id)
        transactionModel.deleteTransaction(id)
            .then(
                res.json('Transaction deleted')
            )
            .catch(err => res.send(err)
            )
    }


}

module.exports = transactionController
