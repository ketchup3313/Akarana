// module.exports = {
//     jwtKey: 'YYS',
//     ossClientConfig: {
//       region: 'oss-ap-southeast-1',
//       accessKeyId: 'LTAI5tR2CSMZbgyNBhrgcKn5',
//       accessKeySecret: 'iTa4d64JFXJBt5A4eGJ6OldmTeQQrl',
//       bucket: 'akarana',
//     },
//   }
  module.exports = {
    jwtKey: process.env.JWT_KEY,
    ossClientConfig: {
      region: process.env.OSS_REGION,
      accessKeyId: process.env.OSS_ACCESS_KEY_ID,
      accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
      bucket: process.env.OSS_BUCKET,
    },
  };