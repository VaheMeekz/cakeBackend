//constants
const HomeBanner = require("../models").HomeBanner
const cloudinary = require("../utils/cloudinary/cloudinary")

const create = async (req, res) => {
    const {titleHy, titleEn, titleRu, subTitleHy, subTitleRu, subTitleEn} = req.body

    //upload to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    const banner = await HomeBanner.create({
        titleHy,
        titleEn,
        titleRu,
        subTitleHy,
        subTitleRu,
        subTitleEn,
        image: result.secure_url,
        cloudinary_id: result.public_id,
    })
}

const get = async (req, res) => {
    try {
        const banner = await HomeBanner.findAll({
            limit: 1
        })
        return res.json(banner)
    } catch (e) {
        console.log("something went wrong", e)
    }
}


// const edit = async (req, res) => {
//     try {
//         let banner = await HomeBanner.findById(req.params.id);
//         // Delete image from cloudinary
//         await cloudinary.uploader.destroy(banner.cloudinary_id);
//         // Upload image to cloudinary
//         let result;
//         if (req.file) {
//             result = await cloudinary.uploader.upload(req.file.path);
//         }
//         const data = {
//             titleHy: req.body.titleHy || banner.titleHy,
//             titleRu: req.body.titleRu || banner.titleRu,
//             titleEn: req.body.titleEn || banner.titleEn,
//             subTitleHy: req.body.subTitleHy || banner.subTitleHy,
//             subTitleRu: req.body.subTitleRu || banner.subTitleRu,
//             subTitleEn: req.body.subTitleEn || banner.subTitleEn,
//             image: result?.secure_url || banner.image,
//             cloudinary_id: result?.public_id || banner.cloudinary_id,
//         };
//         banner = await User.findByIdAndUpdate(req.params.id, data, {new: true});
//         res.json(banner);
//     } catch (err) {
//         console.log(err);
//     }
// }

const edit = async (req, res) => {
    try {
        const {titleHy, titleEn, titleRu, subTitleHy, subTitleRu, subTitleEn, image} = req.body

        const oldBanner = await HomeBanner.destroy({where: {id: 1}})
        const newBaner = await HomeBanner.create({
            id: 1, titleHy, titleEn, titleRu, subTitleHy, subTitleRu, subTitleEn, image
        })
        return res.json(newBaner)

    } catch (e) {
        console.log("something went wrong", e)
    }
}

const editImage = async (req, res) => {
    try {
        const {image} = req.body

        const banner = await HomeBanner.findOne({where: {id: 1}})
        // const newBaner = await HomeBanner.create({
        //     id:1, titleHy, titleEn, titleRu, subTitleHy, subTitleRu, subTitleEn, image
        // })
        banner.image = [image].toString()
        banner.save()
        return res.json(banner)

    } catch (e) {
        console.log("something went wrong", e)
    }
}


module.exports = {
    create,
    get,
    edit,
    editImage
}