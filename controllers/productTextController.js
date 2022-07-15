const Text = require('../models').ProductText

const edit = async (req, res) => {
    try {
        const {textHy, textRu, textEn} = req.body

        const item = await Text.findOne({where: {id: 1}})
        item.textHy = textHy
        item.textRu = textRu
        item.textEn = textEn
        await item.save()
        return res.json(item)
    } catch (e) {
        console.log("Something went wrong", e)
    }
}

const getAll = async (req, res) => {
    try {
        const item = await Text.findOne({where: {id: 1}})
        return res.json(item)
    } catch (e) {
        console.log("Something went wrong", e)
    }
}


module.exports = {
    edit,
    getAll
}