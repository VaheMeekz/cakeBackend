const express = require('express');
const router = express.Router();
const orderController = require("../controllers/orderController")
const authMiddleWare = require('../middlewares/userAuthMiddleware')

//user routes
// router.post('/',authMiddleWare,orderController.create)
router.post('/', orderController.create)
// router.get('/my',authMiddleWare,orderController.myOrders)
router.get('/my', orderController.myOrders)
router.get('/payment', orderController.payment)
//admin routes
// router.post('/deleteItem', adminMiddleware, orderController.deleteItem)
router.post('/deleteItem', orderController.deleteItem)

module.exports = router