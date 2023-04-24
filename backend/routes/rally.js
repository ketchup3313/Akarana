const express = require('express')
const router = express.Router()
const {queryList,queryInfo,requestJoin,queryParticipants} = require('../routesHandle/rally')

router.get('/',queryList)
router.get('/queryInfo',queryInfo)
router.post('/requestJoin',requestJoin)
router.get('/queryParticipants', queryParticipants);
module.exports = router