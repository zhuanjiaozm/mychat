var express = require('express')
var app = express();
var expressWs = require('express-ws');

var ws = require('./chat/index')
//引入post请求解析插件

//node跨域设置
const cors = require('cors')
app.use(cors());
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

// 配置静态目录
var path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

// 配置body-parser
var bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

var cookieParser = require('cookie-parser')
app.use(cookieParser())


// 开放 public 目录，限制访问前缀
app.use('/public', express.static('public'))

const router = require('./router/index')
app.use('/auth', router);
app.use('/ws', ws);

expressWs(app);

//当token失效返回提示信息
app.use(function (err, req, res, next) {
  if (err.status == 401) {
    return res.status(401).send('token失效');
  }
});


// 解析token获取用户信息
app.use(function (err, req, res, next) {
  var token = req.headers['token'];
  if (token == undefined) {
    return next();
  } else {
    vertoken.verToken(token).then((data) => {
      req.data = data;
      return next();
    }).catch((error) => {
      return next();
    })
  }
})


app.get('/', (req,res) => {
  console.log(req.user);  //解析token，获取token携带的数据
  res.send({
      code: 0,
      msg: '查询成功',
      data:{
          username: '这是首页'
      }
  })
})

var server = app.listen(8802, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})