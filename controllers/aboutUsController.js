const AboutUp = require("../models").AboutUsUp
const AboutDown = require("../models").AboutUsDown

//up
const createUp = async (req, res) => {
    try {
        const {textHy, textRu, textEn, imgOne, imgTwo} = req.body

        const newUp = await AboutUp.create({
            textHy, textRu, textEn, imgOne, imgTwo
        })
        return res.json(newUp)
    } catch (e) {
        console.log("something went wrong", e)
    }
}

const getAllUp = async (req, res) => {
    try {
        const banner = await AboutUp.findAll({where: {id: 1}})
        return res.json(banner)
    } catch (e) {
        console.log("something went wrong", e)
    }
}

const editUp = async (req, res) => {
    try {
        const {textHy, textRu, textEn, imgOne, imgTwo} = req.body
        const banner = await AboutUp.findOne({where: {id: 1}})
        banner.textHy = textHy
        banner.textRu = textRu
        banner.textEn = textEn
        banner.imgOne = imgOne
        banner.imgTwo = imgTwo
        await banner.save()
        return res.json(banner)
    } catch (e) {
        console.log("something went wrong", e)
    }
}


//down

const createDown = async (req, res) => {
    try {
        const {textHy, textRu, textEn, imgOne, imgTwo, imgThree} = req.body
        const newDown = await AboutDown.create({
            textHy, textRu, textEn, imgOne, imgTwo, imgThree
        })
        return res.json(newDown)
    } catch (e) {
        console.log("something went wrong", e)
    }
}

const getAllDown = async (req, res) => {
    try {
        const abouts = await AboutDown.findAll({where: {id: 1}})
        return res.json(abouts)
    } catch (e) {
        console.log("something went wrong", e)
    }
}

const editDown = async (req, res) => {
    try {
        const {textHy, textRu, textEn, imgOne, imgTwo, imgThree} = req.body
        const banner = await AboutDown.findOne({where: {id: 1}});
        banner.textHy = textHy
        banner.textRu = textRu
        banner.textEn = textEn
        banner.imgOne = imgOne
        banner.imgTwo = imgTwo
        banner.imgThree = imgThree
        await banner.save()
        return res.json(banner)
    } catch (e) {
        console.log("something went wrong", e)
    }
}

module.exports = {
    createUp,
    getAllUp,
    editUp,

    createDown,
    getAllDown,
    editDown
}
