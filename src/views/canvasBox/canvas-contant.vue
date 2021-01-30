<template>
  <div class="box">
    <canvas id="canvas" width="800" height="600"></canvas>
  </div>
</template>
<script>
import Vector from "../../components/canvasBox/Vector";
import Projection from "../../components/canvasBox/Projection";
import Point from "../../components/canvasBox/Point";
import Shape from "../../components/canvasBox/Shape";
import Polygon from "../../components/canvasBox/Polygon";

export default {
  name: 'bigMinGrid',
  props: [],
  data() {
    return {
      shapes: [],//用于记录canvas中所有可做碰撞检测的图形
      polygonPoints: [], //存放图形
      pointsItem: [],// 单个图形
      polygonStrokeStyles: [], //设置图形颜色
      polygonFillStyles: [],//碰撞后文字提示颜色
      mousedown: { x: 0, y: 0 }, //用于记录鼠标按下的位置
      lastdrag: { x: 0, y: 0 }, //用于记录拖拽时上一次鼠标所在的位置
      shapeBeingDragged: undefined,//用于记录当前正在拖拽的多边形
    }
  },
  mounted() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var shapes = []; //用于记录canvas中所有可做碰撞检测的图形

    var polygonPoints = [
      //用于存入3个多边形的顶点集合
      [new Point(250, 150), new Point(250, 250), new Point(350, 250)],
      [
        new Point(100, 100),
        new Point(100, 150),
        new Point(150, 150),
        new Point(150, 100),
      ],
      [
        new Point(400, 100),
        new Point(380, 150),
        new Point(500, 150),
        new Point(520, 100),
      ],
    ];


    var polygonStrokeStyles = ["blue", "yellow", "red"]; //3个多边形的描边颜色
    var polygonFillStyles = [
      "rgba(255,255,0,0.7)",
      "rgba(100,140,230,0.6)",
      "rgba(255,255,255,0.8)",
    ]; //3个之边形的填充颜色

    var mousedown = { x: 0, y: 0 }; //用于记录鼠标按下的位置
    var lastdrag = { x: 0, y: 0 }; //用于记录拖拽时上一次鼠标所在的位置
    var shapeBeingDragged = undefined; //用于记录当前正在拖拽的多边形



    //初始化
    for (var i = 0; i < polygonPoints.length; i++) {
      var polygon = new Polygon();
      var points = polygonPoints[i];

      polygon.strokeStyle = polygonStrokeStyles[i];
      polygon.fillStyle = polygonFillStyles[i];

      points.forEach(function (point) {
        polygon.addPoint(point.x, point.y);
      });

      shapes.push(polygon);
    }

    context.shadowColor = "rgba(100,140,255,0.5)";
    context.shadowBlur = 4;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.font = "38px arial";

    //绘制所有的多边形
    drawShapes();

    context.save();
    context.fillStyle = "cornflowerblue";
    context.font = "24px arial";
    context.fillText("拖拽图形相碰撞", 10, 25);
    context.restore();


    //函数
    //转换坐标到canvas
    function windowToCanvas(x, y) {
      var bbox = canvas.getBoundingClientRect();
      return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height),
      };
    }
    //绘制全部形状
    function drawShapes() {
      shapes.forEach(function (shape) {

        shape.stroke(context);
        shape.fill(context);
      });
    }
    //  ----------------------------------- 拖拽 ---------------------------------------------

    canvas.onmousedown = function (e) {
      var location = windowToCanvas(e.clientX, e.clientY);

      //遍历所有的多边形，找到鼠标按下点所在的坐标形进行拖拽
      shapes.forEach(function (shape) {
        if (shape.isPointInPath(context, location.x, location.y)) {
          console.log(shape)
          shapeBeingDragged = shape;
          mousedown.x = location.x;
          mousedown.y = location.y;
          lastdrag.x = location.x;
          lastdrag.y = location.y;
        }

      });
    };


    //鼠标抬起
    canvas.onmouseup = function (e) {
      shapeBeingDragged = undefined;
    };

    canvas.onmousemove = function (e) {
      var location;
      var dragVector; //用于记录拖拽对方

      //鼠标按下点在一个多边形上，在canvas空白处不做任何处理

      if (shapeBeingDragged != undefined) {
        location = windowToCanvas(e.clientX, e.clientY);
        dragVector = { x: location.x - lastdrag.x, y: location.y - lastdrag.y };
        shapeBeingDragged.move(dragVector.x, dragVector.y);
        lastdrag.x = location.x;
        lastdrag.y = location.y;

        context.clearRect(0, 0, canvas.width, canvas.height);

        drawShapes();
        detectCollosions();
      }
    };
    function detectCollosions() {
      var textY = 30;
      var numShapes = shapes.length;
      console.log(shapes)
      var shape;
      var i;

      if (shapeBeingDragged) { //当前项目

        for (var i = 0; i < numShapes; ++i) {
          shape = shapes[i];
          
          if (shape != shapeBeingDragged) { //当前图形 不是自身
            if (shapeBeingDragged.collidesWith(shape)) {
              //返回true: 碰撞了，false: 没有碰撞
              context.fillStyle = shape.fillStyle;
              context.fillText("碰撞了", 20, textY);
              textY += 40;
            }
          }
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
body {
  background: #fff;
}
#canvas {
  background: #eee;
}
.ivu-btn.active {
  background-color: #e13d13;
  border-color: #e13d13;
  color: #fff;
}
.box {
  position: relative;
  width: 800px;
  height: 600px;
  .box-in {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    background: rgba(200, 11, 11, 0.2);
  }
}
ul {
  list-style: none;
  display: flex;
  li {
    margin-left: 30px;
  }
}
</style>