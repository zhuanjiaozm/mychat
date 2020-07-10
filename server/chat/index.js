// module1.js
var express = require('express');
var expressWs = require('express-ws');
const router = express.Router();


expressWs(router);

router.ws('/chat', function (ws, req) {
  ws.on('message', function (msg) {
    // 业务代码
    console.log('msg:', msg);
    ws.send(msg);
  })
})

module.exports = router;