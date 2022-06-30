const express = require('express');
const router = express.Router();
const orderController = require("../controllers/orderController")
const authMiddleWare = require('../middlewares/userAuthMiddleware')

//user routes
router.post('/', orderController.create)
router.get('/my', orderController.myOrders)

//payment Idram
router.post('/succsesIdram',orderController.successPaymentIdram)
router.post('/failIdram',orderController.failPaymentIdram)
router.post('/resultIdram',orderController.resultPaymentIdram)
router.post('/getSingle',orderController.getSingle)

//admin routes

router.post('/deleteItem', orderController.deleteItem)
router.get('/',orderController.getAll)
module.exports = router