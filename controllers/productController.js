const Product = require('../models').Product
const Category = require('../models').Categories
const {Op} = require('@sequelize/core');
const create = async (req, res) => {
    try {
        const {nameHy,
            nameRu,
            nameEn,
            descriptionHy,
            descriptionRu,
            descriptionEn,
            price,
            image,category_idcategory_id} = req.body
        const modelNumber = Math.floor(Math.pow(10, 9) + Math.random() * 9 * Math.pow(10, 9));
        const newProduct = await Product.create({
            name, model: modelNumber, image, price, description, category_id
        })
        return res.json(newProduct)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const all = async (req, res) => {
    try {
        const {category, min_price, max_price} = req.query

        const offset = Number.parseInt(req.query.offset) || 0;
        const limit = Number.parseInt(req.query.limit) || 2;
        const allUsers = await Product.findAll()

        const filteredByCategory = []

        if (category) {
            const arr = await Category.findAll({where: {id: category}})
            arr ? arr.forEach(i => filteredByCategory.push(Number(i.id))) : null
        }

        let queryObj = {}

        if (category) {
            queryObj.id = filteredByCategory
        }
        if (min_price && max_price) {
            queryObj["price"] = {
                [Op.and]: {
                    [Op.gte]: Number(min_price),
                    [Op.lte]: Number(max_price)
                }
            }
        }

        if (min_price && !max_price) {
            queryObj[price] = {
                [Op.gte]: Number(min_price)
            }
        }

        if (!min_price && max_price) {
            queryObj[price] = {
                [Op.lte]: Number(max_price)
            }
        }


        const products = await Product.findAll({
            where: queryObj,
            order: [
                ['id', 'DESC'],
            ],
            include:[Category],
            offset: offset * limit,
            limit,
        });
        return res.json({products: products, count: allUsers.length})

    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getAll = async (req, res) => {
    try {
        const offset = Number.parseInt(req.query.offset) || 0;
        const limit = Number.parseInt(req.query.limit) || 2;
        const allProducts = await Product.findAll()

        const paginateProducts = await Product.findAll({
            offset: offset * limit,
            limit,
        });
        return res.json({products: paginateProducts, count: allProducts.length});
    } catch (e) {
        console.log("something went wrong", e)
    }
}

const getSingle = async (req, res) => {
    try {
        const {id} = req.query;
        const product = await Product.findByPk(id)
        return res.json(product)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const edit = async (req, res) => {
    try {
        const {id,nameHy,nameRu,nameEn,descriptionHy,descriptionRu,descriptionEn,price,image,category_id} = req.body
        const thisProduct = await Product.destroy({where:{id}})
        const newProduct = await Product.create({
            id,nameHy,nameRu,nameEn,descriptionHy,descriptionRu,descriptionEn,price,image,category_id
        })
        return res.json(newProduct)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const deleteItem = async (req, res) => {
    try {
        const {id} = req.body
        const isDeleted = await Product.destroy({
            where: {id}
        });

        return res.json({isDeleted})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

module.exports = {
    create,
    getAll,
    all,
    getSingle,
    edit,
    deleteItem
}