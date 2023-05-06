const express = require('express')
const router = express.Router()
const {queryList} = require('../routesHandle/photo')

router.get('/',queryList)
module.exports = router
