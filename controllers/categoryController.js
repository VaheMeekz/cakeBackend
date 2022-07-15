const Category = require("../models").Category

const create = async (req,res) => {
    try {
        const {nameHy,nameRu,nameEn,image} = req.body
        await Category.create({
            nameHy,nameRu,nameEn,image
        })
        const allCategories = await Category.findAll()
        return res.json(allCategories)
    }catch (e) {
        console.log('something went wrong')
    }
}

const getAll = async (req,res) => {
    try {
        const allCategories = await Category.findAll()
        return res.json(allCategories)
    }catch (e) {
        console.log('something went wrong')
    }
}

const edit = async (req,res) => {
    try {
        const {id,nameHy,nameRu,nameEn,image} = req.body

        const category = await Category.findOne({where:{id}})

        category.nameHy = nameHy
        category.nameRu = nameRu
        category.nameEn = nameEn
        category.image = image
        await category.save()
        const allCategories = await Category.findAll()
        return res.json(allCategories)
    }catch (e) {
        console.log('something went wrong')
    }
}

const deleteCategory = async (req,res) => {
    try {
        const {id} = req.body
        await Category.destroy({where:{id}})
        const allCategories = await Category.findAll()
        return res.json(allCategories)
    }catch (e) {
        console.log('something went wrong')
    }
}

module.exports = {
    create,
    getAll,
    edit,
    deleteCategory
}