const Product = require("../models").Product
const Order = require("../models").Order
const productImage = require("../models").ProductImage
const create = async (req, res) => {
    try {
        const {
            name,
            phone,
            text,
            productId
        } = req.body

        const newOrder = await Order.create({
            name,
            phone,
            text,
            productId
        })
        return res.json(newOrder)
    } catch (e) {
        console.log('something went wrong')
    }
}


const getAll = async (req, res) => {
    try {
        const offset = Number.parseInt(req.query.offset) || 0;
        const limit = Number.parseInt(req.query.limit) || 2;
        const allPosts = await Order.findAll({
            offset: offset * limit,
            limit,
            include: [{
                model: Product,
                include: [productImage]
            }],
            order: [
                ['createdAt', 'DESC']
            ]
        })
        const all = await Order.findAll()

        return res.json({posts: allPosts, count: all.length})
    } catch (e) {
        console.log('something went wrong',e)
    }
}

const deleteOrder = async (req, res) => {
    try {
        const {id} = req.body

        await Order.destroy({where: {id}})
        return res.json({success:true})
    } catch (e) {
        console.log('something went wrong')
    }
}

module.exports = {
    create,
    getAll,
    deleteOrder
}
