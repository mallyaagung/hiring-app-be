const Pool = require("../config/db");
const selectAll = ({ sort, sortby, querySearch }) => {
  return Pool.query(
    `SELECT a.fullname, a.address, a.job, c.name from users a inner join skill_users b on a.id=b.users_id inner join skill c on b.skill_id=c.id ${querySearch} ORDER BY ${sortby} ${sort}`
  );
};
const selectUser = (id) => {
  return Pool.query(`select * from users where id=${id}`);
};

const updateUser = (id, fullname, phone, dob, picture, job, address) => {
  return Pool.query(
    `UPDATE users SET fullname='${fullname}',phone='${phone}',dob='${dob}',picture='${picture}', job='${job}',address='${address}' WHERE id='${id}';`
  );
};

const findId = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(`SELECT id FROM users where id =${id}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

module.exports = {
  selectAll,
  selectUser,
  updateUser,
  findId,
};
