<template>
  <div>
  <h1>注释的canvas需要引入一个MP4视频
  </h1>
    <div style=" display: flex;">
      <div class="box">
        <video id="videos" preload autoplay loop muted controls width="800" height="450">
          <source src="./js/minions.mp4" type="video/mp4" />
        </video>
        <canvas id="canvas" width="800" height="450"></canvas>
      </div>
      <img style="float: left;" width="800" height="450" :src="imgSrc" alt="">
    </div>
    <Row>
      <ul>
        <li v-for="item in addBtnList"><Button :class="{'active':item.type==btnStyle}" @click="addRect(item)" size="large">{{item.name}}</Button></li>
      </ul>
    </Row>
    <br>
    <Row>
      <ul>
        <li v-for="item in deleteBtnList" :class="{'active2':item.type==delBtnStyle}"><Button @click="handleDeleteRect(item)" size="large">{{item.name}}</Button></li>
      </ul>
    </Row>
    <br>
    <Row>
      <Button @click="move()" size="large">移动</Button>
      <Button @click="addUser()" size="large">新增图标一个</Button>
      <Button @click="handleScreenshot()" size="large">截图</Button>
      <Button @click="stopPlay(1)" size="large">播放</Button>
      <Button @click="stopPlay(2)" size="large">暂停</Button>
    </Row>

  </div>
</template>
<script>
import Shape from "./js/Shape";
import Polygon from "./js/Projection";
export default {
  name: 'canvas-rect',
  props: [],
  data() {
    return {
      imgSrc: require('../../assets/images/logo.jpg'),
      delItemTpye: {},//删除的类型
      delBtnStyle: '',//删除按钮设置
      btnStyle: '',//新增按钮颜色
      context: null, //画布方法属性
      canvas: null,// 画布
      isDraw: false, //判断是否点击事件
      isEdit: false,//区分删除和新增
      pointsItem: [], //临时存储图形坐标
      rectStyleAll: {},// 矩形信息
      rectLineWidth: 1.5,
      addBtnList: [
        { type: 'A1', style: 0, name: '添加警戒区', color: 'rgba(255,0,0,.4)', lineColor: 'rgba(255,0,0,1)', delIcon: '' },
        { type: 'A2', style: 0, name: '添加受控区', color: 'rgba(255,192,203,.4)', lineColor: 'rgba(255,192,203,1)', delIcon: '' },
        { type: 'A3', style: 0, name: '添加关注区', color: 'rgba(0,0,255,.4)', lineColor: 'rgba(0,0,255,1)', delIcon: '' },
        { type: 'A4', style: 0, name: '添加非布控区', color: 'rgba(0,128,0,.4)', lineColor: 'rgba(0,128,0,1)', delIcon: '' }
      ],
      deleteBtnList: [
        { type: 'A1', style: 0, name: '删除警戒区' },
        { type: 'A2', style: 0, name: '删除受控区' },
        { type: 'A3', style: 0, name: '删除关注区' },
        { type: 'A4', style: 0, name: '删除非布控区' }
      ],
      imgData: null,
      polygons: [], //构造函数获取所有信息
      currPolygon: null,
    }
  },
  mounted() {
    let _this = this

    //阻止双击默认事件 
    document.ondragstart = document.onselectstart = function () { return false; };

    //对象新增属性 用了做删除用
    _this.canvasInit()

    //鼠标 点击 事件
    _this.canvas.addEventListener("mousedown", function (e) {
      if (Object.keys(_this.rectStyleAll).length == 0) return _this.$Message.error('请选择区域')
      if (e.buttons == 1) {
        var pos = _this.windowToCanvas(_this.canvas, e.clientX, e.clientY);
        if (!_this.isEdit) {
          _this.isDraw = true; //按下的是左键
          canvas.style.cursor = "crosshair";//改变划线鼠标样式
          _this.pointsItem.push(pos);
        } else {
          //是否有删除权限
          canvas.style.cursor = 'auto';
          _this.polygons.forEach(function (item, i) {
            item.createPath(_this.context);//创建路径时才能检测点是否在当前路径中
            if (_this.context.isPointInPath(pos.x, pos.y)) {
              if (_this.delItemTpye.type == item.rectType) {
                _this.$Modal.confirm({
                  title: '提示',
                  content: '<p>是否删除</p>',
                  onOk: () => {
                    _this.handleDelRectItem(item)
                  }
                });
              } else {
                console.log('类型不同无法删除')
              }
            }
          });
        }
      }
    }, false);
    //鼠标 移动 事件
    _this.canvas.addEventListener("mousemove", function (e) {
      if (_this.isDraw) {
        var pos = _this.windowToCanvas(_this.canvas, e.clientX, e.clientY); //获取图形移动坐标点
        _this.clear();
        _this.context.beginPath(); //开辟一个新路径
        _this.pointsItem.forEach((p, i) => {
          //过滤掉undefined
          _this.context[i != 0 ? "lineTo" : "moveTo"](p.x, p.y); //moveTo  移动起始点     lineTo 绘制线(矩形、圆形、图片...)
        });
        _this.context.lineWidth = _this.rectLineWidth; //边线粗细
        _this.context.strokeStyle = _this.rectStyleAll.lineColor; //边线颜色
        _this.context.lineTo(pos.x, pos.y);
        _this.context.stroke(); //绘制边线
      }
    }, false);
    //双击失去焦点
    canvas.addEventListener("dblclick", function () {
      //绘制图形
      if (_this.pointsItem.length == 0) return
      //生成随机id
      _this.rectStyleAll.id = _this.makeId() //删除用
      //移动参数
      let move = {
        x: (Math.random() - 0.5) * 3,
        y: (Math.random() - 0.5) * 3,
      }
      _this.polygons.push(new Shape(_this.pointsItem, _this.rectLineWidth, _this.rectStyleAll, true, move));
      _this.currPolygon = _this.polygons[_this.polygons.length - 1];
      _this.currPolygon.createPath(_this.context).draw(_this.context)
      _this.drawingComplete();
    }, false);
  },
  methods: {

    //初始化代码
    canvasInit() {
      let _this = this
      _this.canvas = document.getElementById("canvas");
      _this.context = _this.canvas.getContext("2d");
      _this.canvas.style.border = "1px solid #f9f9f9";
      _this.drawGrid("lightgray", 20, 20); //画布

      _this.context.save();
      _this.context.fillStyle = "cornflowerblue";
      _this.context.font = "14px arial";
      // _this.context.font = "14px arial";
      _this.context.fillText("目前所有区域为空", _this.context.canvas.width / 2 - 100, _this.context.canvas.height / 2 - 30);
      _this.context.fillText("请进行区域管理操作", _this.context.canvas.width / 2 - 107, _this.context.canvas.height / 2);
      _this.context.restore();
    },
    //生成随机数
    makeId() {
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      return text;
    },
    //画网格线
    drawGrid(color, stepx, stepy) {
      let _this = this
      _this.context.save();
      _this.context.lineWidth = 0.5;
      _this.context.strokeStyle = color;
      for (var i = stepx + 0.5; i < _this.context.canvas.width; i += stepx) {
        _this.context.beginPath();
        _this.context.moveTo(i, 0);
        _this.context.lineTo(i, _this.context.canvas.height);
        _this.context.stroke();
      }
      for (var i = stepy + 0.5; i < _this.context.canvas.height; i += stepy) {
        _this.context.beginPath();
        _this.context.moveTo(0, i);
        _this.context.lineTo(_this.context.canvas.width, i);
        _this.context.stroke();
      }
      _this.context.restore();
    },
    //获取坐标
    windowToCanvas(canvas, x, y) {
      let _this = this
      if (!canvas) {
        console.log("canvas not exist");
        return { x: 0, y: 0 };
      }
      var box = _this.canvas.getBoundingClientRect();
      return {
        x: x - box.left * (canvas.width / box.width),
        y: y - box.top * (canvas.height / box.height),
      };
    },
    //新增 多边形
    addRect(item) {
      let _this = this
      _this.delBtnStyle = ''
      if (item.style) {
        this.addBtnList.map(v => v.style = 0)
        this.btnStyle = ''
        this.isEdit = true
        this.rectStyleAll = {}
      } else {
        this.isEdit = false
        this.rectStyleAll = item
        this.clear()
        this.addBtnList.map(v => v.style = 0)
        item.style = 1
        this.btnStyle = item.type
      }

    },
    //删除 或复制画布内容
    clear() {
      let _this = this
      if (_this.imgData) {
        _this.context.putImageData(_this.imgData, 0, 0);  //getImageData() 复制画布上指定矩形的像素数据，然后通过 putImageData() 
      } else {
        _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
        _this.drawGrid("lightgray", 20, 20);
      }
    },
    //绘制 形状 完成
    drawingComplete() {
      let _this = this
      _this.context.closePath();
      _this.canvas.style.cursor = "auto";
      _this.isDraw = false;
      _this.pointsItem = [];
      _this.currPolygon = null;
      _this.imgData = _this.context.getImageData(0, 0, _this.canvas.width, _this.canvas.height);
      _this.context.putImageData(_this.imgData, 0, 0);
      _this.context.closePath();
    },
    //分类删除
    handleDeleteRect(item) {
      let _this = this
      _this.addBtnList.map(v => v.style = 0)
      _this.btnStyle = ''
      _this.isEdit = true
      //添加图标
      _this.delItemTpye = item
      _this.delBtnStyle = item.type
      _this.handleResetRect()
    },
    //重新绘制页面
    handleResetRect() {
      let _this = this
      _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
      _this.drawGrid("lightgray", 20, 20);
      _this.polygons.forEach(function (item, i) {  //利用圆形上的方法划入到页面
        item.createPath(_this.context).draw(_this.context).addIncon(_this.context, _this.delItemTpye);
      });
      _this.imgData = _this.context.getImageData(0, 0, _this.canvas.width, _this.canvas.height);
    },
    //确认删除
    handleDelRectItem(item) {
      let _this = this
      _this.polygons = _this.polygons.filter(v => v.id != item.id)
      //清除画布从新写入到画布上
      _this.handleResetRect()
    },
    //边界判断，离开边界删除内容
    move() {
      let _this = this
      window.requestAnimationFrame(_this.move);
      _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
      _this.drawGrid("lightgray", 20, 20);
      if (_this.imgData) {
        _this.context.putImageData(_this.imgData, 0, 0);
      }
      let userItem = _this.polygons.filter(v => v.rectType == "U1")
      let i = userItem.length;
      while (i--) {
        this.rectMove(userItem[i], i);
      }
    },
    // 设置移动位置
    rectMove(item, index) {
      let _this = this
      for (var i = 0; i < item.points.length; i++) {
        let cur = item.points[i]
        // cur.x -= item.rectX
        cur.y += item.rectY

        //判断是否走到了边界,走到边界删除 当前人员
        if (cur.x - 10 >= _this.canvas.width || cur.x + 10 <= 0 || cur.y - 10 >= _this.canvas.height || cur.y + 10 <= 0) {
          _this.polygons.some((v, s) => { //可以获取索引
            if (v.id == item.id) {
              _this.polygons.splice(s, 1)
              return true
            }
          })
        }
      }
      let curRectitem = null
      _this.polygons.forEach(v => {
        if (v.id == item.id) {
          curRectitem = v
        }
      })
      _this.polygons.forEach(function (t) {
        if (curRectitem) {
          if (t.id != curRectitem.id) {
            if (curRectitem.collidesWith(t)) {
              console.log('碰上了', t)
              _this.handleScreenshot()
            }
          }
        }

      });

      item.createPath(_this.context).draw(_this.context)
    },
    //添加图标人员图标
    addUser() {
      let _this = this
      // let pointsItem = [
      //   { x: 510, y: 510 },
      //   { x: 520, y: 510 },
      //   { x: 520, y: 520 },
      //   { x: 510, y: 520 },
      // ]
      let pointsItem = [
        { x: 10, y: 10 },
        { x: 20, y: 10 },
        { x: 20, y: 20 },
        { x: 10, y: 20 },
      ]
      // let move = {
      //   x: (Math.random() - 0.5) * 3,
      //   y: (Math.random() - 0.5) * 3,
      // }
      let move = {
        x: 2,
        y: 2,
      }
      let user = {
        color: "red",
        id: _this.makeId(),
        lineColor: "red",
        name: "添加小图标",
        style: 1,
        type: "U1",
      }
      _this.polygons.push(new Shape(pointsItem, 1.5, user, true, move));
      _this.currPolygon = _this.polygons[_this.polygons.length - 1];
      _this.currPolygon.createPath(_this.context).draw(_this.context)
    },
    //截图
    handleScreenshot() {
      let _this = this
      var type = 'png';
      let myVideo = document.getElementById("videos")
      //暂停
      myVideo.pause();
      //坐原图像的x,y轴坐标，大小，目标图像的x，y轴标，大小。
      _this.context.drawImage(myVideo, 0, 0, myVideo.clientWidth, myVideo.clientHeight, 0, 0, _this.canvas.width, _this.canvas.height);
      //把图标base64编码后变成一段url字符串
      var dataUrl = _this.canvas.toDataURL("image/png");
      this.imgSrc = dataUrl  //获取截图地址

      dataUrl = dataUrl.replace(_this.fixType(type), 'image/octet-stream');
      var filename = `imgName` + '.' + type;
      //下载a
      _this.saveFile(dataUrl, filename);
      //播放
      myVideo.play();
      _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
      _this.drawGrid("lightgray", 20, 20);
      _this.polygons.forEach(function (item, i) {  //利用圆形上的方法划入到页面
        item.createPath(_this.context).draw(_this.context).addIncon(_this.context, _this.delItemTpye);
      });
    },
    //处理生成图片 格式
    fixType(type) {
      type = type.toLowerCase().replace(/jpg/i, 'jpeg');
      var r = type.match(/png|jpeg|bmp|gif/)[0];
      return 'image/' + r;
    },
    saveFile(data, filename) { //保存图片
      var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
      save_link.href = data;
      save_link.download = filename;
      var event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      save_link.dispatchEvent(event);
    },
    //暂停播放
    stopPlay(num) {
      let myVideo = document.getElementById("videos")
      if (num == 1) {
        myVideo.play();
      } else {
        myVideo.pause();
      }
    }
  }

}
</script>
<style lang="less" scoped>
body {
  background: #fff;
}
.box {
  width: 800px;
  height: 450px;
  margin-bottom: 50px;
  position: relative;
  #videos {
    position: absolute;
    top: 0;
    left: 0;
  }
}
#canvas {
  // margin-top: 30px;
  // background: #eee;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}
ul {
  list-style: none;
  display: flex;
  li {
    margin-right: 30px;
  }
}
.ivu-btn.active {
  background-color: #e13d13;
  border-color: #e13d13;
  color: #fff;
}
.active2 {
  .ivu-btn {
    background-color: #3913e1;
    border-color: #3913e1;
    color: #fff;
  }
}
</style>