//constants
const HomeBanner = require("../models").HomeBanner
const cloudinary = require("../utils/cloudinary/cloudinary")

const create = async (req, res) => {
    const {titleHy, titleEn, titleRu, subTitleHy, subTitleRu, subTitleEn, image} = req.body

    //upload to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    const banner = await HomeBanner.create({
        titleHy, titleEn, titleRu, subTitleHy, subTitleRu, subTitleEn, image:result.secure_url
    })
}

const get = async (req, res) => {
    try {
        const banner = await HomeBanner.findAll()
        return res.json(banner)
    } catch (e) {
        console.log("something went wrong", e)
    }
}


const edit = async (req, res) => {

}

module.exports = {
    create,
    get,
    edit
}