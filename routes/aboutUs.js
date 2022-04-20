const express = require('express');
const router = express.Router();
const aboutUsController = require('../controllers/aboutUsController')
const adminMiddleware = require("../middlewares/addminAuthMiddleware")

//user routers
router.get('/', aboutUsController.get)

// admin routes
router.post('/', adminMiddleware, aboutUsController.create)
router.post('/edit', adminMiddleware, aboutUsController.edit)


module.exports = router