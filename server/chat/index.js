// module1.js
var express = require('express');
var expressWs = require('express-ws');

const router = express.Router();

var moment = require('moment');
// 使用中文时间
require('moment/locale/zh-cn')
moment.locale('zh-cn')

var MongoClient = require('mongodb').MongoClient;
const MongoClientURL = "mongodb://127.0.0.1:27017", dbName = "mychat";

expressWs(router);

const allClients = {}

let receiveCmd = (msg) => {
  console.log('收到了客户端的消息:', JSON.stringify(msg));
}

let addRecord = (msgInfo) => {
  MongoClient.connect(MongoClientURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (err, db) => {
    if (err) throw err;
    let dbo = db.db(dbName);
    dbo.collection('chatRecord').insertMany([msgInfo], (err, res) => {
      if (err) throw err;
      console.log("插入的文档数量为: " + res.insertedCount);
      db.close();
    });
  });
}




let sendMsg = (ws, msg) => {
  ws.send(JSON.stringify({
    msg: msg,
    // clients: allClients,
    time: moment().calendar(),
  }));
}
let closeClient = (item) => {
  for (var index = 0; index < clients.length; index++) {
    if (clients[index] == item) {
      clients.splice(index, 1)
    }
  }
}

router.ws('/chat/:userID/:receiveID', function (ws, req) {
  // console.log('req.params.userID:', req.params.userID)
  // console.log('req.params.receiveID:', req.params.receiveID)
  let userID = req.params.userID;
  let receiveID = req.params.receiveID;





  allClients[req.params.userID] = ws;

  ws.on('message', function (msg) {
    addRecord({
      userID,
      receiveID,
      msg,
      time: moment().calendar(),
    })


    for (const key in allClients) {
      if ((allClients.hasOwnProperty(key)) && (key === receiveID)) {
        sendMsg(allClients[key], msg)
      }
    }
  })

  ws.on("close", function (msg) {
    console.log("服务端连接已经关闭了");
    closeClient(this)
  });
})

module.exports = router;