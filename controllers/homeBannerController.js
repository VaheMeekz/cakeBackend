const HomeBanner = require("../models").HomeBanner

const create = async (req, res) => {
    try {
        const {image, textHy, textRu, textEn} = req.body
        const newSlide = await HomeBanner.create({
            image, textHy, textRu, textEn
        })
        return res.json(newSlide)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getAll = async (req, res) => {
    try {
        const allSlides = await HomeBanner.findAll()
        return res.json(allSlides)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const deleteSlide = async (req, res) => {
    try {
        const {id} = req.body
        await HomeBanner.destroy({
            where: {id}
        })
        return res.json({success: true})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const editSlide = async (req, res) => {
    try {
        const {id, image, textHy, textRu, textEn} = req.body
        const slide = await HomeBanner.findOne({
            where: {id}
        })
        slide.image = image
        slide.textHy = textHy
        slide.textRu = textRu
        slide.textEn = textEn
        await slide.save()
        return res.json(slide)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

module.exports = {
    create,
    getAll,
    deleteSlide,
    editSlide
}