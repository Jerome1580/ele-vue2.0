const express = require('express');
const config = require('./config/index');

const port = process.env.PORT || config.bulid.port;

const app = express();

const router = express.Router();

router.get('/', (req, res, next) => {
  req.url = '/index.html';
  next();
})

// 此处省略项目使用的接口配置

app.use(router);
