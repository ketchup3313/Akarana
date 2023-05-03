const { query } = require('../db');

const queryPromise = (sql, params) => {
  return new Promise((resolve, reject) => {
    query(sql, params, (result, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const getAvatar = async (req, res) => {
  const { username } = req.params;

  // 查询用户头像
  const sql = 'SELECT avatar FROM member WHERE username=?';

  try {
    const result = await queryPromise(sql, username);

    if (result.length !== 1) {
      return res.status(400).json({
        status: 1,
        msg: '该用户不存在',
      });
    }

    const avatar = result[0].avatar;

    res.status(200).json({
      status: 0,
      msg: '获取头像成功',
      avatar,
    });
  } catch (error) {
    return res.status(500).json({
      status: 1,
      msg: '获取头像失败',
      error: error.message,
    });
  }
};

module.exports = getAvatar;
