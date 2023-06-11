const multer = require('multer');
const path = require('path');
const { queryPromise } = require('../db');
const fs = require('fs');
const OSS = require('ali-oss');
const { ossClientConfig } = require('../config');




const client = new OSS(ossClientConfig);

// filter the file type
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Please upload the image format file'), false);
  }
};

const storage = multer.memoryStorage();
const upload = multer({ storage, fileFilter: imageFilter });

const uploadAvatar = async (req, res) => {
  const { username } = req.params;

  try {
    const file = req.file;
    const ext = path.extname(file.originalname);
    const fileName = `${username}-${Date.now()}${ext}`;
    const result = await client.put(`uploads/avatars/${fileName}`, Buffer.from(file.buffer));

    //change the url to https
    const fileURL = result.url;

    // update the avatar url in database
    const sql = 'UPDATE member SET avatar=? WHERE username=?';
    await queryPromise(sql, [fileURL, username]);

    res.status(200).json({
      status: 0,
      msg: 'update avatar success',
      avatar: fileURL,
    });
  } catch (error) {
    res.status(500).json({
      status: 1,
      msg: 'update avatar fail',
      error: error.message,
    });
  }
};

module.exports = { upload, uploadAvatar };