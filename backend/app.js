const express = require('express')
const app = express()
const Joi = require('@hapi/joi')
const  { expressjwt: jwt } = require("express-jwt");
const config = require('./config')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(
  jwt({ secret: config.jwtKey, algorithms: ['HS256'] }).unless({
    path: ['/api/login', '/api/reg'],
  })
)

app.use('/api/login', require('./routes/login'))
app.use('/api/mine', require('./routes/mine'))

app.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof Joi.ValidationError) {
    return res.send({
      status: 1,
      msg: [err.details[0].context.label, err.details[0].message],
    })
  }
  // token解析错误的情况下抛出异常
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 1,
      msg: 'TOKEN 解析错误',
    })
  }
  res.send({
    status: 1,
    msg: err.message || err,
  })
})

app.listen(8888, () => {
  console.log('server :8888')
})