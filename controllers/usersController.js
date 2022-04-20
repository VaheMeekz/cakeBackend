//imports
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//constants
const User = require("../models").User

const create = async (req, res) => {
    try {
        const {name, email, password} = req.body
        if (!(email && password)) {
            return res.json("Name, password and email are required fields")
        }

        const oldUser = await User.findOne({
            where: {email},
        });

        if (oldUser) {
            return res.json({error: ["User already exist"]})

        }
        let encryptedPassword = await bcrypt.hash(password, 10);

        let user;
        try {
            user = await User.create({
                name,
                email: email.toLowerCase(),
                password: encryptedPassword,
            });
            user.save();
        } catch (e) {
            return res.json("something went wrong", e)
        }

        const token = jwt.sign({user_id: user.id}, process.env.TOKEN_KEY, {
        });
        user.token = token;
        user.save();
        return res.status(200).json(user);
    } catch (e) {
        console.log("something went wrong", e)
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!(email && password)) {
            return res.json({
                error: ["Password and email are required fields"],
            });
        }

        const user = await User.findOne({
            where: {email: email.toLowerCase()},
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {user_id: user.id, email},
                process.env.TOKEN_KEY
            );
            user.token = token;
            user.save();
            return res.status(200).json(user);
        }

        return res.json({error: ["Invalid credentials"]});
    } catch (err) {
        return res.json({error: ["Error"]});
    }
}

const deleteUser = async (req, res) => {
    try {
        const {id} = req.body

        if (!id) {
            return res.json({error: ["Invalid credentials"]});
        }

        const user = await User.destroy({where: {id}})
        const allUsers = await User.findAll()
        return res.json(allUsers)
    } catch (e) {
        console.log("Something went wrong", e)
    }
}

const getAll = async (req, res) => {
    try {
        const offset = Number.parseInt(req.query.offset) || 0;
        const limit = Number.parseInt(req.query.limit) || 2;
        const allUsers = await User.findAll()

        const paginateUsers = await User.findAll({
            offset: offset * limit,
            limit,
            order: [["DESC"]],
        });
        return res.json({users: paginateUsers, count: allUsers.length});
    } catch (e) {
        console.log("Something went wrong", e)
    }
}

module.exports = {
    create,
    login,
    deleteUser,
    getAll
}