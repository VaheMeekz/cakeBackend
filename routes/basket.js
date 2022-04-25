const express = require('express');
const router = express.Router();
const adminMiddleware = require("../middlewares/addminAuthMiddleware")
const basketController = require('../controllers/basketController')


router.post('/',basketController.create)
router.get('/',adminMiddleware,basketController.get)

module.exports = router;