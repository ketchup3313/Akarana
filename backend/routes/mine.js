const express = require('express')
const router = express.Router()
const {updateUserInfo,queryUserInfo,checkUsername} = require('../routesHandle/mine')

router.post('/',updateUserInfo)
router.get('/queryInfo',queryUserInfo)



module.exports = router