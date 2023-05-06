const express = require('express')
const router = express.Router()
const { queryList, queryCouples } = require('../routesHandle/members')

router.get('/',queryList)
router.get('/couples', queryCouples)
module.exports = router