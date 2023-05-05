const express = require('express');
const router = express.Router();
const getAvatarHandle = require('../routesHandle/getavatar');
const { upload, uploadAvatar } = require('../routesHandle/uploadAvatar');

router.post('/:username', upload.single('avatar'), uploadAvatar);
router.get('/:username', getAvatarHandle);

module.exports = router;
