const express = require('express')
const router = express.Router()
const { queryList, queryCouples, queryUsername } = require('../routesHandle/members')
router.get('/username', queryUsername)
router.get('/',queryList)
router.get('/couples', queryCouples)
module.exports = router