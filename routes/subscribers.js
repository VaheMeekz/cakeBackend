const express = require('express');
const router = express.Router();
const subscribersController = require("../controllers/subscribersController")
const adminMiddleware = require("../middlewares/addminAuthMiddleware")

//user routers
router.post('/',subscribersController.create)

//admin rouers
router.get('/',adminMiddleware,subscribersController.getAll)
router.post('/',adminMiddleware,subscribersController.sendMessage)


module.exports = router