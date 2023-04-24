const express = require('express');
const router = express.Router();
const { getUserParticipatedRallies } = require('../routesHandle/participatedRallies');

router.get('/userRallies', getUserParticipatedRallies);

module.exports = router;