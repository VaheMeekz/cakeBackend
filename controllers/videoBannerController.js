const VideoBanner = require("../models").VideoBanner

const create = async (req, res) => {
    try {
        const {image, textHy, textRu, textEn} = req.body
        const newBanner = await VideoBanner.create({
            image, textHy, textRu, textEn
        })
        return res.json(newBanner)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getAll = async (req, res) => {
    try {
        const banner = await VideoBanner.findAll()
        return res.json(banner)
    } catch (e) {
        console.log("something went wrong", e)
    }
}

const edit = async (req, res) => {
    try {
        const {image, textHy, textRu, textEn} = req.body
        const banner = await VideoBanner.findOne({where: {id: 1}})
        banner.image = image
        banner.textHy = textHy
        banner.textRu = textRu
        banner.textEn = textEn
        await banner.save()
        return res.json(banner)
    } catch (e) {
        console.log("something went wrong", e)
    }
}

module.exports = {
    create,
    getAll,
    edit
}