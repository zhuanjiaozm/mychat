var bodyParser = require('body-parser');//解析,用req.body获取post参数
const express = require('express');
var expressWs = require('express-ws');
const jwt = require('jsonwebtoken')
var vertoken = require('./../token/token_vertify');
const router = express.Router();
expressWs(router);

var _ = require('lodash');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mychat";
const MongoClientURL = "mongodb://127.0.0.1:27017", dbName = "mychat";

let currentUser;

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const { secretKey } = require('../token/constant')  //提取Token加密内容 ,见下
// 全局验证Token是否合法
// const tokens = require('../token/index')  //验证Token配置文件,见下



router.get('/getList', async (req, res) => {
  let userList = []
  try {
    const client = await MongoClient.connect(MongoClientURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = await client.db(dbName);
    // execute find query
    userList = await (await db.collection('user').find({}).toArray()).reverse().filter(item => (item.name !== '12345678911' && item.name !== '小'));
    client.close();
  } catch (e) {
    console.log(e.stack);
  } finally {
    res.send(_.sortBy(userList, (item) => item.isOnline));
  }
})




router.post('/getChatRecord', jsonParser, async (req, res) => {
  let userList = [];
  try {
    const client = await MongoClient.connect(MongoClientURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = await client.db(dbName);
    // execute find query
    list = await (await db.collection('chatRecord').find({
      $or: [ //多条件，数组
        { userID: req.body.userID },
        { userID: req.body.receiveID },
        { receiveID: req.body.receiveID },
        { receiveID: req.body.userID },
      ]
    }).toArray());
    client.close();
  } catch (e) {
    console.log(e.stack);
  } finally {
    res.send(list);
  }
})





router.post('/login', jsonParser, (req, res) => {
  MongoClient.connect(MongoClientURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (err, db) => {
    if (err) throw err;
    let dbo = db.db("mychat");
    dbo.collection('user').find(req.body).toArray((err, userList) => {
      if (userList[0]) {
        currentUser = userList[0];
        let updateStr = { $set: { "isOnline": true } };
        dbo.collection("user").updateOne(req.body, updateStr, (err, res) => {
          if (err) throw err;
          console.log("更新用户在线状态成功");
          db.close();
        });
        let token = vertoken.setToken(userList[0]['name'], userList[0]['_id'])
        res.cookie('token', token, { httpOnly: true });
        res.json({
          code: 200,
          msg: '登录成功',
          token: token,
          data: userList[0],
          success: userList.length ? true : false
        })
      } else {
        res.json({
          code: 500,
          msg: '登录後端失敗',
          token: 'token',
          data: userList,
          success: userList.length ? true : false
        })
      }
    });

  });
})



router.post('/logout', jsonParser, (req, response) => {
  MongoClient.connect(MongoClientURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (err, db) => {
    if (err) throw err;
    let dbo = db.db("mychat");
    let updateStr = { $set: { "isOnline": false } };
    dbo.collection("user").updateOne({
      name: req.body.name
    }, updateStr, (err, res) => {
      if (err) throw err;
      console.log(res.result.nModified + "个用户下线成功");
      db.close();
      response.json({
        code: 200,
        msg: '用户下线成功',
        token: '',
        data: {},
        success: true
      })
    });
  });
})


router.post('/addUser', jsonParser, async (req, res) => {
  if (req.body) {
    let user = req.body;

    const client = await MongoClient.connect(MongoClientURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = await client.db(dbName);
    // execute find query
    userList = await db.collection('user').find({
      tel: req.body.tel
    }).toArray();

    if (userList.length) {
      res.send({
        data: '当前用户已经存在，可以直接登录',
        success: false
      })
      return
    }



    user.registerTime = new Date();
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mychat");
      dbo.collection("user").insertOne(user, (err) => {
        if (err) throw err;
        console.log("注册用户成功：", user);
        res.send({
          data: {},
          success: true
        })
        db.close();
      });
    });
  }
})




module.exports = router;