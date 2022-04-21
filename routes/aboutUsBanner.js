const express = require('express');
const router = express.Router();
const aboutUsBannerController = require('../controllers/aboutUsBannerController')
const adminMiddleware = require('../middlewares/addminAuthMiddleware')
const upload = require("../utils/multer/multer");


//user routes
router.get('/', aboutUsBannerController.get)
//admin routes
router.post('/create', adminMiddleware, upload.single("image"), aboutUsBannerController.create)
router.put('/edit/:id', adminMiddleware, upload.single("image"),aboutUsBannerController.edit)


module.exports = router;