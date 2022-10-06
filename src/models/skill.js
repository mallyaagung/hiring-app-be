const Pool = require("../config/db");
const selectAll = () => {
  return Pool.query(`SELECT * FROM skill`);
};
const select = (id) => {
  return Pool.query(`select * from skill where id=${id}`);
};
const insert = (id, name) => {
  return Pool.query(`INSERT INTO skill(id,name) VALUES('${id}','${name}')`);
};
const update = (id, name) => {
  return Pool.query(`UPDATE skill SET name='${name}' WHERE id=${id}`);
};
const deleteSkill = (id) => {
  return Pool.query(`DELETE FROM skill WHERE id=${id};`);
};

module.exports = {
  selectAll,
  select,
  insert,
  update,
  deleteSkill,
};
