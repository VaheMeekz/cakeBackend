const express = require('express');
const router = express.Router();
const contactUsController = require('../controllers/contactUsController')
const adminMiddleware = require("../middlewares/addminAuthMiddleware")

//user routes
router.post('/', contactUsController.create)

// admin routes
router.get('/',  adminMiddleware, contactUsController.getAll)
router.post('/delete',  adminMiddleware, contactUsController.deleteContact)
router.post('/sendAnswer', adminMiddleware, contactUsController.sendAnswer)

module.exports = router