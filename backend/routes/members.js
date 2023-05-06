const express = require('express')
const router = express.Router()
const {queryList} = require('../routesHandle/members')

router.get('/',queryList)
module.exports = router