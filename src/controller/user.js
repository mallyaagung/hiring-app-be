const userModel = require("../models/user");
const commonHelper = require("../helper/common");
const client = require("../config/redis");
const createError = require("http-errors");

const userController = {
  getAllUser: async (req, res) => {
    try {
      const sortby = req.query.sortby;
      const sort = req.query.sort;
      const search = req.query.search;
      let querySearch = "";
      if (search === undefined) {
        querySearch = ``;
      } else {
        querySearch = ` where fullname like '%${search}%' `;
      }
      const result = await userModel.selectAll({
        sort,
        sortby,
        querySearch,
      });
      commonHelper.response(res, result.rows, 200, "get data success");
    } catch (error) {
      console.log(error);
    }
  },
  getUser: (req, res) => {
    const id = Number(req.params.id);
    userModel
      .selectUser(id)
      .then((result) => {
        client.setEx(`product/${id}`, 60 * 60, JSON.stringify(result.rows));
        commonHelper.response(
          res,
          result.rows,
          200,
          "get data success from database"
        );
      })
      .catch((err) => res.send(err));
  },
  update: (req, res) => {
    try {
      const PORT = process.env.PORT || 5000;
      const DB_HOST = process.env.DB_HOST || "localhost";
      const id = req.params.id;
      let picture = req.file.filename;
      const { fullname, phone, dob, job, address } = req.body;
      userModel
        .updateUser(
          id,
          fullname,
          phone,
          dob,
          (picture = `http://${DB_HOST}:${PORT}/img/${picture}`),
          job,
          address
        )
        .then(res.json("Product Updated"));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = userController;
