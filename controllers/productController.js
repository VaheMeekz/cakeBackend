const Product = require("../models").Product
const Images = require("../models").ProductImage
const Category = require("../models").Category
const {Op} = require('sequelize');

const create = async (req, res) => {
    try {
        const {
            nameHy,
            nameRu,
            nameEn,
            descriptionHy,
            descriptionRu,
            descriptionEn,
            video,
            categoryId,
            images
        } = req.body
        const newProduct = await Product.create({
            nameHy,
            nameRu,
            nameEn,
            descriptionHy,
            descriptionRu,
            descriptionEn,
            video,
            categoryId: Number(categoryId)
        })
        await images.split(',').forEach(async img => {
            await Images.create({
                productId: newProduct.id,
                image: img
            })
        })
        return res.json(newProduct)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getAll = async (req, res) => {
    try {
        const {search,categoryId} = req.query
        const offset = Number.parseInt(req.query.offset) || 0;
        const limit = Number.parseInt(req.query.limit) || 8;
        let queryObj = {}
        if (search) {
            queryObj["nameHy"] = {
                [Op.substring]: String(search)
            }
        }
        if(categoryId){
            queryObj["categoryId"] = {
                [Op.eq]: String(categoryId)
            }
        }
        console.log(queryObj,"2745845785475521")
        const allPosts = await Product.findAll({
            where: queryObj,
            offset: offset * limit,
            limit,
            include: [Images,Category],
            order: [
                ['createdAt', 'DESC']
            ]
        })
        const all = await Product.findAll()
        return res.json({products: allPosts, count: all.length})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getSingle = async (req, res) => {
    try {
        const {id} = req.query
        const post = await Product.findOne({
            where: {id},
            include: [Images]
        })
        return res.json(post)
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
            video,
        } = req.body

        const product = await Product.findOne({where: {id}})
        product.nameHy = nameHy,
            product.nameRu = nameRu,
            product.nameEn = nameEn,
            product.descriptionHy = descriptionHy,
            product.descriptionRu = descriptionRu,
            product.descriptionEn = descriptionEn,
            product.video = video,
            await product.save()
        return res.json(product)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {id} = req.body
        await Product.destroy({
            where: {id}
        })
        const postImages = await Images.findAll({
            where: {
                productId: id
            }
        })
        postImages.forEach(async item => {
            await Images.destroy({
                where: {
                    productId: item.id
                }
            })
        })
        return res.json({success: true})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const editImage = async (req, res) => {
    try {
        const {id, img} = req.body
        const image = await Images.findOne({
            where: {id}
        })

        image.image = img
        await image.save()
        return res.json(image)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const deleteImage = async (req, res) => {
    try {
        const {id} = req.body
        await Images.destroy({
            where: {id}
        })
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const addImage = async (req, res) => {
    try {
        const {productId, image} = req.body
        await Images.create({
            productId,
            image
        })
        return res.json({success: true})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

module.exports = {
    create,
    getAll,
    getSingle,
    edit,
    deleteProduct,
    editImage,
    deleteImage,
    addImage
}

