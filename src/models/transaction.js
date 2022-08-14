const Pool = require('../config/db')


const selectAll = () => {
    return Pool.query(`SELECT transaction.id, product.productname, product.priceproduct,transaction.quantity, transaction.totalprice, customer.customername, customer.customeraddress, transaction.payment_method FROM transaction INNER JOIN product ON transaction.id_product=product.id INNER JOIN customer ON transaction.id_customer = customer.id;`);
}

const selectTransaction = (id) => {
    return Pool.query(`SELECT transaction.id, product.productname, product.priceproduct,transaction.quantity, transaction.totalprice, customer.customername, customer.customeraddress, transaction.payment_method FROM transaction INNER JOIN product ON transaction.id_product=product.id INNER JOIN customer ON transaction.id_customer = customer.id WHERE transaction.id = ${id};`);
}

const updateTransaction = (id, quantity, totalprice, payment_method, order_status, transaction_date, id_customer, id_product) => {
    return Pool.query(`UPDATE transaction SET id=${id}, quantity=${quantity},totalprice=${totalprice},payment_method='${payment_method}',order_status='${order_status}', transaction_date='${transaction_date}', id_customer=${id_customer}, id_product=${id_product} WHERE id=${id}`)
}

const insertTransaction = (id, quantity, totalprice, payment_method, order_status, transaction_date, id_customer, id_product) => {
    return Pool.query(`INSERT INTO transaction(id, quantity, totalprice, payment_method, order_status, transaction_date, id_customer, id_product) VALUES(${id},${quantity},${totalprice},'${payment_method}','${order_status}','${transaction_date}',${id_customer},${id_product})`);
}

const deleteTransaction = (id) => {
    return Pool.query(`DELETE FROM transaction WHERE id=${id};`)
}

module.exports = {
    selectAll,
    selectTransaction,
    updateTransaction,
    insertTransaction,
    deleteTransaction
}