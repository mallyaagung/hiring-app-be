const productModel = require('../models/product')
const commonHelper = require('../helper/common')

const productController = {
    getAllProduct: async (req, res) => {
        try {
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 5
            const offset = (page - 1) * limit
            const sortby = req.query.sortby || ('productname');
            const sort = req.query.sort || "ASC";
            const result = await productModel.selectAll({ limit, offset, sort, sortby })
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
                result => res.json(result.rows)
            )
            .catch(err => res.send(err)
            )
    },
    insert: (req, res) => {
        const { id,
            productname,
            storename,
            sizeproduct,
            colorproduct,
            priceproduct,
            stockproduct,
            ratingproduct,
            id_category,
            id_seller } = req.body;
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
            id_seller)
            .then(
                res.json('Product created')
            )
            .catch(err => res.send(err)
            )
    },
    update: (req, res) => {
        const id = Number(req.params.id)
        const {
            productname,
            storename,
            sizeproduct,
            colorproduct,
            priceproduct,
            stockproduct,
            ratingproduct,
            id_category,
            id_seller
        } = req.body

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
            id_seller)
            .then(
                res.json('Product updated')
            )
            .catch(err => res.send(err)
            )
    },
    delete: (req, res) => {
        const id = Number(req.params.id)
        productModel.deleteProduct(id)
            .then(
                res.json('Product deleted')
            )
            .catch(err => res.send(err)
            )
    }
}

module.exports = productController