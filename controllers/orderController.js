const Orders = require("../models").Order
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
            delevery,
            productDescription,
            paymentType,
            deleveryDate, deleveryTime,
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
                    delevery,
                    orderNumber: randomOrderId,
                    productDescription,
                    deleveryDate,
                    deleveryTime,
                    currency: "1",
                    status: "new",
                    totalPrice
                })
            })
            return res.json({success: true})

        } else if (paymentType == 2) {
            await fetch("https://banking.idram.am/Payment/GetPayment", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    SUCCESS_URL: process.env.IDRAM_SUCCESS_URL,
                    FAIL_URL: process.env.IDRAM_FAIL_URL,
                    RESULT_URL: process.env.IDRAM_RESULT_URL,
                    SECRET_KEY: "UwuFvCCDudej77EUn6BdgNpjqKacLSumk4cwP5",
                    EMAIL: email,
                    EDP_LANGUAGE: "AM",
                    EDP_REC_ACCOUNT: "110001504",
                    EDP_DESCRIPTION: "test",
                    EDP_AMOUNT: Number(totalPrice),
                    EDP_BILL_NO: randomOrderId,
                    EDP_EMAIL: email,
                }),
            })
                .then((response) => {
                    response.text();
                })
                .then(async (data) => {
                    const newPayment = await Order.create({
                        user_id: id,
                        client_id: ClientID,
                        description: Description,
                        amount: Amount,
                        delevery: Delevery,
                        email,
                        lastName: lastname,
                        firstName: firstname,
                        phone: phonenumber,
                        second_phone: phonenumber2,
                        address: addres,
                        currency: Currency,
                        products: JSON.stringify(products),
                        deleveryDate,
                        deleveryTime,
                        PaymentID: randomOrderId,
                        status: "new",
                    });
                    return res.send({ payment_id: newPayment.id });
                })
                .catch(function (e) {
                    console.log(e, "something went wrong");
                });
        } else if (paymentType == 3) {
        } else {
            return res.json({error: "Payment type not choosen"})
        }

    } catch (e) {
        console.log('something went wrong', e)
    }
}

const resultPaymentIdram = async (req,res) => {
    try {
        const data = await Order.findOne({where: {PaymentID: req.body.EDP_BILL_NO}})
        if (!data) {
            res.send({message:'error'})
            return
        }
        await Order.update({status:'true'}, {where:{PaymentID: req.body.EDP_BILL_NO}})
        res.send('OK')
    } catch(err) {
        console.log('payment error', e)
        res.send({message:"error"})
    }

}

const successPaymentIdram = async (req, res) => {
    try {
        await Order.update({status:'true'}, {where:{PaymentID: req.query.EDP_BILL_NO}})
        res.redirect(`${process.env.IDRAM_SUCCESS_URL}`)
    } catch(err) {
        console.log('success payment error', err)
        res.send({message:"error"})
    }
}

const failPaymentIdram = async (req, res) => {
    try {
        res.redirect(process.env.IDRAM_FAIL_URL)
    } catch(err) {
        console.log('fail payment error', err)
        res.send({message:"error"})
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

const getAll =async (req,res) => {
  try {
      const offset = Number.parseInt(req.query.offset) || 0;
      const limit = Number.parseInt(req.query.limit) || 6;
      const all = await Orders.findAll()
      const orders = await Orders.findAll({
          order: [
              ['id', 'DESC'],
          ],
          offset: offset * limit,
          limit,
          include:[{
              model:Product,
              as:"Product"
          }]
      });
      return res.json({orders,count:all.length})
  }catch (e) {
      console.log("Something went wrong",e)
  }
}

const getSingle = async (req, res) => {
    const { id } = req.body;

    if (id) {
        const thisOrder = await Order.findOne({ where: { id } });
        return res.json(thisOrder);
    }
};

module.exports = {
    create,
    myOrders,
    deleteItem,
    getAll,
    resultPaymentIdram,
    successPaymentIdram,
    failPaymentIdram,
    getSingle
}