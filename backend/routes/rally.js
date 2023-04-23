const express = require('express')
const router = express.Router()
const {queryList,queryInfo,requestJoin} = require('../routesHandle/rally')

router.get('/',queryList)
router.get('/queryInfo',queryInfo)
router.post('/requestJoin',requestJoin)
module.exports = router