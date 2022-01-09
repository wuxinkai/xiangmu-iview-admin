let express = require('express'); //框架
const bodyParser = require('body-parser')
const fs = require('fs')
var Mock = require('mockjs');

let app = express(); //启动express

//设置跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, accept, origin, content-type')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
console.log(1111);
app.get('/', (req, res) => {
  res.send('成功');
});
app.get('/add', (req, res) =>{
  console.log(2222);
  res.json(Mock.mock({
    "status": 200,
    "data|1-9": [{
      "name|5-8": /[a-zA-Z]/,
      "id|+1": 1,
      "value|0-500": 20
    }]
  }));
});

app.listen(5000, function () {
  console.log('5000');
});



