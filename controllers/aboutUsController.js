const AboutUs = require('../models').AboutUs


const create = async (req, res) => {
    try {
        const {titleHy, titleEn, titleRu, textHy, textEn, textRu} = req.body
        const aboutUs = await AboutUs.create({
            titleHy, titleEn, titleRu, textHy, textEn, textRu
        })
        return res.json(aboutUs)

    } catch (e) {
        console.log("something went wrong", e)
    }
}


const edit = async (req, res) => {
    try {
        const {id, titleHy, titleEn, titleRu, textHy, textEn, textRu} = req.body
        const thisAboutUs = await AboutUs.findOne({where: {id}})

        thisAboutUs.titleHy = titleHy
        thisAboutUs.titleEn = titleEn
        thisAboutUs.titleRu = titleRu
        thisAboutUs.textHy = textHy
        thisAboutUs.textEn = textEn
        thisAboutUs.textRu = textRu
        thisAboutUs.save()
        return res.json(thisAboutUs)
    }catch (e) {
        console.log("something went wrong",e)
    }

}

const get = async (req, res) => {
    try {
        const aboutUs = await AboutUs.findAll({
            limit:1,
            order: [["DESC"]],

        })
        return res.json(aboutUs)
    } catch (e) {
        console.log("something went wrong", e)
    }
}
module.exports = {
    create,
    edit,
    get
}

