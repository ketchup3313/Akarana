// const express = require('express');
// const router = express.Router();
// const connection = require('./db');

// router.post('/login', (req, res) => {
//   const { userName, password } = req.body;

//   connection.query(
//     'SELECT * FROM members WHERE userName = ? AND password = ?',
//     [userName, password],
//     (err, results) => {
//       if (err) {
//         console.error('Error:', err);
//         res.status(500).send('Server error');
//       } else {
//         if (results.length > 0) {
//           // 登录成功，返回用户信息并生成token
//           const user = results[0];
//           // 使用jsonwebtoken库生成token（需要安装并引入jsonwebtoken库）
//           const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
//           res.status(200).json({ token, user });
//         } else {
//           res.status(401).send('Invalid username or password');
//         }
//       }
//     }
//   );
// });

// module.exports = router;