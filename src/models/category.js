const Pool = require('../config/db')
const selectAll = () => {
    return Pool.query(`SELECT * FROM category`);
}
const select = (id) => {
    return Pool.query(`select * from category where id=${id}`);
}
const insert = (id, categoryname) => {
    return Pool.query(`INSERT INTO category(id,categoryname) VALUES('${id}','${categoryname}')`);
}
const update = (id, categoryname) => {
    return Pool.query(`UPDATE category SET categoryname='${categoryname}' WHERE id=${id}`);
}
const deleteCategory = (id) => {
    return Pool.query(`DELETE FROM category WHERE id=${id};`);
}

module.exports = {
    selectAll,
    select,
    insert,
    update,
    deleteCategory
}