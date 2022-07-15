const Footer = require("../models").DetailFooter


const create = async (req, res) => {
    try {
        const {image, titleHy, titleRu, titleEn, textHy, textRu, textEn} = req.body
        const newFooter = await Footer.create({
            image, titleHy, titleRu, titleEn, textHy, textRu, textEn
        })
        return res.json(newFooter)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getAll = async (req, res) => {
    try {
        const footer = await Footer.findAll()
        return res.json(footer)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const edit = async (req, res) => {
    try {
        const {image, titleHy, titleRu, titleEn, textHy, textRu, textEn} = req.body
        const footer = await Footer.findOne({
            where: {id: 1}
        })
        footer.image = image
        footer.titleHy = titleHy
        footer.titleRu = titleRu
        footer.titleEn = titleEn
        footer.textHy = textHy
        footer.textRu = textRu
        footer.textEn = textEn
        await footer.save()
        return res.json(footer)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

module.exports = {
    create, getAll, edit
}