const express = require('express');
const router = express.Router();
const usersCotroller = require("../controllers/usersController")
const adminMiddleware = require("../middlewares/addminAuthMiddleware")

//user routes
router.post('/create',usersCotroller.create)
router.post('/login',usersCotroller.login)

//admin routes
router.post('/delete',adminMiddleware,usersCotroller.deleteUser)
router.get('/',adminMiddleware,usersCotroller.getAll)

module.exports = router;
