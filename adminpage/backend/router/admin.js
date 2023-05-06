const express = require('express');
const app = express()
const adminController = require('../controllers/adminController');
const router = express.Router();
const expressJoi = require('@escook/express-joi');
//引入member验证和admin验证
const { memberCheck } = require('../utils/memberCheck');
const { adminCheck } = require('../utils/adminChecker');

//引入multer，将文件保存到指定的目录中，准备读取该文件
const multer = require('multer');
const upload = multer({
    //store image folder
    dest:'image/'
})

//admin page: member information register api
router.post('/register',expressJoi(memberCheck),adminController.registerControllers);
//admin page: admin login api
router.post('/login',expressJoi(adminCheck),adminController.loginControllers);
//admin page: admin search api
router.get('/adminInfo',adminController.adminInfoControllers);
//admin page: admin upload single image
router.post('/upload', upload.single('image'), adminController.uploadImagesControllers);
//admin page: admin display
router.get('/display', adminController.displayImageControllers);
//admin page: photo delete
router.get('/delete', adminController.deleteImageByIDControllers);
//create rally v2
router.post('/create', upload.single('image'), adminController.createRallyControllers)

module.exports  = router;