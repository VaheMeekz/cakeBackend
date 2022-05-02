const Orders = require("../models").Order
const User = require("../models").User
const Product = require('../models').Product
const create = async (req,res) => {
    try{
        const {user_id,firstName,lastName,email,phone,addres,apartament,state,delevery,notes,productDescription} = req.body
            // basket_id orderNumber
    }catch (e) {
        console.log('something went wrong',e)
    }
}

const getAll = async (req,res) => {
    try{
        const offset = Number.parseInt(req.query.offset) || 0;
        const limit = Number.parseInt(req.query.limit) || 2;
        const all = await Orders.findAll()

        const paginateOrders= await Orders({
            offset: offset * limit,
            limit,
            include: [User,Product],
        })
    }catch (e) {
        console.log('something went wrong',e)
    }
}

const myOrders = async (req,res) => {
    try{
        const {userId} = req.query
        const offset = Number.parseInt(req.query.offset) || 0;
        const limit = Number.parseInt(req.query.limit) || 2;
        const all = await Orders.findAll({where: {userId}})
        const paginateOrders = await Orders.findAll({
            where:{userId},
            offset: offset * limit,
            limit,
            include: [Product],
        });
        return res.json({orders:paginateOrders,count:all.length})
    }catch (e) {
        console.log('something went wrong',e)
    }
}

const deleteItem = async (req,res) => {
    try{
        const {id} = req.body

        const item = await Orders.destroy({where:{id}})
        return res.json({message:"Deleted!"})
    }catch (e) {
        console.log('something went wrong',e)
    }
}
module.exports = {
    create,
    getAll,
    myOrders,
    deleteItem
}