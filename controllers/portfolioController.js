const Images = require("../models").Images
const Videos = require("../models").PortfolioVideos


//images

const createImage = async (req,res) => {
    try {
        const {image} = req.body

        const newImage = await Images.create({
            image
        })
        return res.json(newImage)
    }catch (e) {
        console.log("Something went wrong",e)
    }
}

const deleteImage = async (req,res)=> {
    try {
        const {id} = req.body

        await Images.destroy({
            where:{id}
        })
        return res.json({success:true})
    }catch (e) {
        console.log("Something went wrong",e)
    }
}


const getAllIMages = async (req,res) => {
    try {
        const offset = Number.parseInt(req.query.offset) || 0;
        const limit = Number.parseInt(req.query.limit) || 8;
        const allPosts = await Images.findAll({
            offset: offset * limit,
            limit,
            order: [
                ['createdAt', 'DESC']
            ]
        })
        const all = await Images.findAll()

        return res.json({videos: allPosts, count: all.length})
    }catch (e) {
        console.log("Something went wrong",e)
    }
}


//videos


const createVideos = async (req,res) => {
    try {
        const {image} = req.body

        const newItem = await Videos.create({
            image
        })
        return res.json(newItem)
    }catch (e) {
        console.log("something went wrong",e)
    }
}


const deleteVideo = async (req,res) => {
    try {
        const {id} = req.body

        await Videos.destroy({
            where:{id}
        })
        return res.json({success:true})
    }catch (e) {
        console.log("Something went wrong",e)
    }
}


const getAllVideos = async (req,res) => {
    try {
        const offset = Number.parseInt(req.query.offset) || 0;
        const limit = Number.parseInt(req.query.limit) || 8;
        const allPosts = await Videos.findAll({
            offset: offset * limit,
            limit,
            order: [
                ['createdAt', 'DESC']
            ]
        })
        const all = await Videos.findAll()

        return res.json({videos: allPosts, count: all.length})
    }catch (e) {
        console.log("Something went wrong",e)
    }
}

module.exports = {
    createImage,
    deleteImage,
    getAllIMages,

    createVideos,
    deleteVideo,
    getAllVideos
}