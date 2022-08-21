const productModel = require('../models/product')
const commonHelper = require('../helper/common')
const client = require('../config/redis')
const createError = require('http-errors')

const productController = {
    getAllProduct: async (req, res) => {
        try {
            const page = Number(req.query.page);
            const limit = Number(req.query.limit);
            const offset = (page - 1) * limit
            const sortby = req.query.sortby;
            const sort = req.query.sort;
            const search = req.query.search;
            let querySearch = '';
            if (search === undefined) {
                querySearch = ``;
            } else {
                querySearch = ` where productname like '%${search}%' `;
            }
            const result = await productModel.selectAll({ limit, offset, sort, sortby, querySearch })
            const { rows: [count] } = await productModel.countProduct()
            const totalData = parseInt(count.count)
            const totalPage = Math.ceil(totalData / limit)
            const pagination = {
                currentPage: page,
                limit: limit,
                totalData: totalData,
                totalPage: totalPage
            }
            commonHelper.response(res, result.rows, 200, "get data success", pagination)
        } catch (error) {
            console.log(error);
        }
    },
    getProduct: (req, res) => {
        const id = Number(req.params.id)
        productModel.selectProduct(id)
            .then(
                result => {
                    client.setEx(`product/${id}`, 60 * 60, JSON.stringify(result.rows))
                    commonHelper.response(res, result.rows, 200, "get data success from database")
                }
            )
            .catch(err => res.send(err)
            )
    },
    insert: (req, res) => {
        const PORT = process.env.PORT
        const DB_HOST = process.env.DB_HOST
        let photo = req.file.filename;
        const {
            id,
            productname,
            storename,
            sizeproduct,
            colorproduct,
            priceproduct,
            stockproduct,
            ratingproduct,
            id_category,
            id_seller } = req.body

        productModel.insertProduct(
            id,
            productname,
            storename,
            sizeproduct,
            colorproduct,
            priceproduct,
            stockproduct,
            ratingproduct,
            id_category,
            id_seller,
            photo = `http://${DB_HOST}:${PORT}/img/${photo}`)
            .then(
                result => commonHelper.response(res, result.rows, 201, "Product created")
            )
            .catch(err => res.send(err)
            )
    },
    update: (req, res) => {
        try {
            const PORT = process.env.PORT || 5000
            const DB_HOST = process.env.DB_HOST || 'localhost'
            const id = Number(req.params.id)
            let photo = req.file.filename;
            const {
                productname,
                storename,
                sizeproduct,
                colorproduct,
                priceproduct,
                stockproduct,
                ratingproduct,
                id_category,
                id_seller } = req.body
            productModel.updateProduct(
                id,
                productname,
                storename,
                sizeproduct,
                colorproduct,
                priceproduct,
                stockproduct,
                ratingproduct,
                id_category,
                id_seller,
                photo = `http://${DB_HOST}:${PORT}/img/${photo}`)
                .then(
                    res.json("Product Updated")
                )
                .catch(err => res.send(err)
                )
        } catch (error) {
            console.log(error);
        }
    },
    delete: async (req, res) => {
        try {
            const id = Number(req.params.id)
            const { rowCount } = await productModel.findId(id)
            if (!rowCount) {
                return (new createError(403, "ID is Not Found"))
            }
            productModel.deleteProduct(id)
                .then(
                    result => commonHelper.response(res, result.rows, 200, "Product deleted")
                )
                .catch(err => res.send(err)
                )
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = productController