const multer = require('multer');
const path = require('path');
const { queryPromise } = require('../db');
const fs = require('fs');
const OSS = require('ali-oss');


const client = new OSS({
  region: 'oss-ap-southeast-1',
  accessKeyId: 'LTAI5tR2CSMZbgyNBhrgcKn5',
  accessKeySecret: 'iTa4d64JFXJBt5A4eGJ6OldmTeQQrl',
  bucket: 'akarana',
});

// 过滤非图片文件
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('请上传图片格式文件'), false);
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

    // 将文件路径转换为URL
    const fileURL = result.url;

    // 更新用户头像信息
    const sql = 'UPDATE member SET avatar=? WHERE username=?';
    await queryPromise(sql, [fileURL, username]);

    res.status(200).json({
      status: 0,
      msg: '上传头像成功',
      avatar: fileURL,
    });
  } catch (error) {
    res.status(500).json({
      status: 1,
      msg: '上传头像失败',
      error: error.message,
    });
  }
};

module.exports = { upload, uploadAvatar };