const Pool = require('../config/db')
const selectAll = ({ limit, offset, sort, sortby }) => {
    return Pool.query(`SELECT * FROM product ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const selectProduct = (id) => {
    return Pool.query(`select * from product where id=${id}`);
}
const insertProduct = (id, productname, storename, sizeproduct, colorproduct, priceproduct, stockproduct, ratingproduct, id_category, id_seller) => {
    return Pool.query(`INSERT INTO product(id, productname, storename, sizeproduct, colorproduct, priceproduct, stockproduct, ratingproduct, id_category, id_seller) VALUES(${id},'${productname}','${storename}','${sizeproduct}','${colorproduct}',${priceproduct},${stockproduct},${ratingproduct},${id_category},${id_seller})`);
}
const updateProduct = (id, productname, storename, sizeproduct, colorproduct, priceproduct, stockproduct, ratingproduct, id_category, id_seller) => {
    return Pool.query(`UPDATE product SET productname='${productname}',storename='${storename}',sizeproduct='${sizeproduct}',colorproduct='${colorproduct}',priceproduct=${priceproduct},stockproduct=${stockproduct}, ratingproduct=${ratingproduct},id_category=${id_category},id_seller=${id_seller} WHERE id=${id}`)
}
const deleteProduct = (id) => {
    return Pool.query(`DELETE FROM product WHERE id=${id};`)
}

const countProduct = () => {
    return Pool.query('SELECT COUNT(*) FROM product')
}

module.exports = {
    selectAll,
    selectProduct,
    insertProduct,
    updateProduct,
    deleteProduct,
    countProduct
}