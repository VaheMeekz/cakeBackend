const Product = require('../models').Product
const Category = require('../models').Categories
const {Op} = require('@sequelize/core');
const create = async (req, res) => {
    try {
        const {
            nameHy,
            nameRu,
            nameEn,
            descriptionHy,
            descriptionRu,
            descriptionEn,
            price,
            image,
            category_id,
            cake_count,
            cake_price,
            cake_addition_name_hy,
            cake_addition_name_ru,
            cake_addition_name_en,
            cake_addition_price,
            long_description_hy,
            long_description_ey,
            long_description_en,
            adition_info_hy,
            adition_info_ru,
            adition_info_en,
        } = req.body


        const modelNumber = Math.floor(Math.pow(10, 9) + Math.random() * 9 * Math.pow(10, 9));
        const newProduct = await Product.create({
            nameHy,
            nameRu,
            nameEn, model: modelNumber, image, price, descriptionHy,
            descriptionRu,
            descriptionEn, category_id, cake_count, cake_price, cake_addition_name_hy,
            cake_addition_name_ru,
            cake_addition_name_en,
            cake_addition_price,
            long_description_hy,
            long_description_ey,
            long_description_en,
            adition_info_hy,
            adition_info_ru,
            adition_info_en,
        })
        return res.json(newProduct)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const all = async (req, res) => {
    try {
        const {category, min_price, max_price, search, lang} = req.query

        const offset = Number.parseInt(req.query.offset) || 0;
        const limit = Number.parseInt(req.query.limit) || 2;
        const allUsers = await Product.findAll()


        const filteredByCategory = []

        if (category) {
            const cat = category.split(",")
            const arr = await Category.findAll({where: {id: cat}})
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
            queryObj["price"] = {
                [Op.gte]: Number(min_price)
            }
        }

        if (!min_price && max_price) {
            queryObj["price"] = {
                [Op.lte]: Number(max_price)
            }
        }

        if (search) {
            if (lang == "am") {
                queryObj["nameHy"] = {
                    [Op.substring]: String(search)
                }
            } else if (lang == "ru") {
                queryObj["nameHy"] = {
                    [Op.substring]: String(search)
                }
            } else if (lang == "en") {
                queryObj["nameHy"] = {
                    [Op.substring]: String(search)
                }
            } else {
                queryObj["nameHy"] = {
                    [Op.substring]: String(search)
                }
            }
        }

        const products = await Product.findAll({
            where: queryObj,
            order: [
                ['id', 'DESC'],
            ],
            includes: [Category],
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
            include: ["Category"],
            include: [
                {
                    model: Category, as: "Category"
                }
            ],
            // attributes: ['Category'],
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
        const {
            id,
            nameHy,
            nameRu,
            nameEn,
            descriptionHy,
            descriptionRu,
            descriptionEn,
            price,
            image,
            category_id
        } = req.body
        const thisProduct = await Product.destroy({where: {id}})
        const newProduct = await Product.create({
            id, nameHy, nameRu, nameEn, descriptionHy, descriptionRu, descriptionEn, price, image, category_id
        })
        return res.json(newProduct)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const editImage = async (req, res) => {
    try {
        const {id, image, imageId} = req.body
        console.log(id, image, imageId);
        const item = await Product.findOne({where: {id}})
        console.log(item);
        const images = item.image.split(",")
        images[imageId] = image
        item.image = images.toString()
        await item.save()
        console.log(item, "<<<<<<<<<");
        return res.json(item)
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
    deleteItem,
    editImage
}