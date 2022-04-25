const Contacts = require("../models").Contacts


const create = async (req, res) => {
    try {
        const {location, email, phone, facebook, instagram} = req.body

        const contact = await Contacts.create({
            location, email, phone, facebook, instagram
        })
    } catch (e) {
        console.log("something went wrong", e)
    }


}

const edit = async (req, res) => {
    const {id, location, email, phone, facebook, instagram} = req.body


    const thisContacts = await Contacts.findOne({where: {id}})

    thisContacts.location = location || thisContacts.location
    thisContacts.email = email || thisContacts.email
    thisContacts.phone = phone || thisContacts.phone
    thisContacts.facebook = facebook || thisContacts.facebook
    thisContacts.instagram = instagram || thisContacts.instagram
    thisContacts.save()

    return res.json(thisContacts)
}

const get = async (req, res) => {
    try {
        const contacts = await Contacts.findAll({
            limit: 1,
        })

        return res.json(contacts)
    } catch (e) {
        console.log("something went wrong", e)
    }
}


module.exports = {
    create,
    edit,
    get
}