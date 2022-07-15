const {Order, Product} = require("../models");
const Subscribers = require("../models").Subscribers

const create = async (req,res) => {
    try {
        const {email} = req.body
        const newSubscriber = await Subscribers.create({
            email
        })
        return res.json(newSubscriber)
    }catch (e) {
        console.log('something went wrong',e)
    }
}

const getAll = async (req,res) => {
    try {
        const offset = Number.parseInt(req.query.offset) || 0;
        const limit = Number.parseInt(req.query.limit) || 2;
        const allPosts = await Subscribers.findAll({
            offset: offset * limit,
            limit,
        })
        const all = await Subscribers.findAll()

        return res.json({subscribers: allPosts, count: all.length})
    }catch (e) {
        console.log('something went wrong',e)
    }
}

const deleteSubscriber = async (req,res) => {
    try {
        const {id} = req.body

        await Subscribers.destroy({where:{id}})
        return res.json({success:true})
    }catch (e) {
        console.log('something went wrong',e)
    }
}


const sendAnswer = async (req,res) => {
    try{

    }catch (e) {
        console.log('something went wrong',e)
    }
}
module.exports = {
    create,
    getAll,
    deleteSubscriber,
    sendAnswer
}
