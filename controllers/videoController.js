const Video = require("../models").Video


const create = async (req, res) => {
    try {
        const {video} = req.body
        const newVideo = await Video.create({
            video
        })
        return res.json(newVideo)
    } catch (e) {
        console.log("something went wrong", e)
    }
}

const deleteVideo = async (req, res) => {
    try {
        const {id} = req.body
        await Video.destroy({
            where: {id}
        })
        return res.json({success: true})
    } catch (e) {
        console.log("something went wrong", e)
    }
}

const edit = async (req, res) => {
    try {
        const {id, video} = req.body
        const item = await Video.findOne({
            where: {id}
        })
        item.video = video
        await item.save()
        return res.json(item)
    } catch (e) {
        console.log("something went wrong", e)
    }
}

const getAll = async (req, res) => {
    try {
        const offset = Number.parseInt(req.query.offset) || 0;
        const limit = Number.parseInt(req.query.limit) || 2;
        const allPosts = await Video.findAll({
            offset: offset * limit,
            limit,
        })
        const all = await Video.findAll()

        return res.json({videos: allPosts, count: all.length})
    } catch (e) {
        console.log("something went wrong", e)
    }
}

const getSingle = async (req, res) => {
    try {
        const {id} = req.query
        const item = await Video.findOne({
            where: {id}
        })
        return res.json(item)

    } catch (e) {
        console.log("something went wrong", e)
    }
}

module.exports = {
    create,
    deleteVideo,
    edit,
    getAll,
    getSingle
}