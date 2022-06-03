const Orders = require("../models").Order
const User = require("../models").User
const Product = require('../models').Product
const fetch = require("cross-fetch");
const create = async (req, res) => {
    try {
        const {
            user_id, product_id,
            firstName,
            lastName,
            email, phone,
            addres, apartament,
            state, delevery,
            notes, productDescription,
            paymentType,
            deleveryDate, deleveryTime,
            additions
        } = req.body
        // orderNumber
        const randomOrderId = Math.floor(
            Math.pow(10, 5) + Math.random() * 5 * Math.pow(10, 5)
        );
        const productsId = product_id.split(",")

        let totalPrice = Number(delevery);
        for (let i = 0; i < productsId.length; i++) {
            let newItem = await Product.findOne({
                where: {
                    id: productsId[i]
                }
            })
            totalPrice = totalPrice + Number(newItem.price)
        }
        if (additions) {
            totalPrice = totalPrice + Number(additions)
        }
        if (paymentType == 1) {
            productsId.forEach(async i => {
                await Orders.create({
                    user_id,
                    product_id: i,
                    firstName,
                    lastName,
                    email,
                    phone,
                    addres,
                    apartament,
                    state,
                    delevery,
                    notes,
                    orderNumber: randomOrderId,
                    productDescription,
                    deleveryDate,
                    deleveryTime,
                    currency: "051",
                    additions,
                    status: "new",
                    totalPrice
                })
            })
            return res.json(true)

        } else if (paymentType == 2) {

        } else {
            return res.json({error: "Payment type not choosen"})
        }

    } catch (e) {
        console.log('something went wrong', e)
    }
}

const payment = async (req, res) => {
    try {
        const {paymentID} = req.query;
        if (paymentID) {
            await fetch(
                "https://services.ameriabank.am/VPOS/api/VPOS/GetPaymentDetails",
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        PaymentID: paymentID,
                        Username: "",
                        Password: "",
                    }),
                }
            )
                .then((response) => response.json())
                .then(async (data) => {
                    const condidat = await Orders.findOne({where: {orderNumber: data.OrderID}});
                    condidat.status = "true";
                    condidat.save();
                    if (data.ResponseCode == "00") {
                        return res.redirect(process.env.SUCCESS_URL);
                    } else {
                        const condidat = await Orders.findOne({where: {orderNumber: data.OrderID}});
                        condidat.status = "false";
                        condidat.save();
                        return res.redirect(process.env.FAIL_URL);
                    }
                })
                .catch(function (response) {
                    return res.redirect(process.env.FAIL_URL);
                });
        }
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const myOrders = async (req, res) => {
    try {
        const {userId} = req.query
        const offset = Number.parseInt(req.query.offset) || 0;
        const limit = Number.parseInt(req.query.limit) || 2;
        const all = await Orders.findAll({where: {user_id: userId}})
        const paginateOrders = await Orders.findAll({
            where: {user_id: userId},
            offset: offset * limit,
            limit,
            include: [{
                model: Product,
                as: "Product"
            }],
        });
        return res.json({orders: paginateOrders, count: all.length})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const deleteItem = async (req, res) => {
    try {
        const {id} = req.body
        await Orders.destroy({where: {id}})
        return res.json({message: "Deleted!"})
    } catch (e) {
        console.log('something went wrong', e)
    }
}
module.exports = {
    create,
    myOrders,
    deleteItem,
    payment
}