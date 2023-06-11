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

  // test1
  const sql = 'SELECT avatar FROM member WHERE username=?';

  try {
    const result = await queryPromise(sql, username);

    if (result.length !== 1) {
      return res.status(400).json({
        status: 1,
        msg: 'this username is not exist',
      });
    }

    const avatar = result[0].avatar;

    res.status(200).json({
      status: 0,
      msg: 'get avatar success',
      avatar,
    });
  } catch (error) {
    return res.status(500).json({
      status: 1,
      msg: 'get avatar fail',
      error: error.message,
    });
  }
};

module.exports = getAvatar;
