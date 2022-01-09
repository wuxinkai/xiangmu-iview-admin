# 制造假数据 通过接口请求 访问数据

创建一个项目

```
npm init -y
```

安装 express

```
npm install express --save
```

基本数据

```
let express = require('express'); //框架

let app =express(); //启动express

app.listen(500,function () {
    console.log('5000');
});
```

启动 node

```
node server.js
```

# 添加中间件

```

```

# package 同时启动两个服务

下载控件

```
cnpm i concurrently -D
```

解决跨域

```
module.exports = {
    devServer: {
		proxy: { // 跨域    协议 域名 端口
			'/api': {
					target: "http://localhost:8099/",
					ws: true,
					changOrigin: true,
					pathRewrite: {
					'^/api': ''
						}
				}
			}
		}
	}

```

添加 npm run dev

```

  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "server": "nodemon ./express/server.js", //引入文件路径
    "dev": "concurrently \"npm run serve\" \"npm run server\" "
  },
```
