const express = require('express');
const router = express.Router();
const upload = require("../utils/multer/multer")
const homeBannerController = require("../controllers/homeBannerController")
const adminMiddleware = require("../middlewares/addminAuthMiddleware")


//user routes
router.get('/', homeBannerController.get)
//admin routes
router.post('/create', adminMiddleware, upload.single("image"), homeBannerController.create)
router.get('/edit', adminMiddleware, homeBannerController.edit)

module.exports = router;
