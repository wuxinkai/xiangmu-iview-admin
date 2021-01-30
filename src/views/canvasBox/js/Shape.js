import Vector from './Vector'
import Projection from './Projection'
class Shape {
  constructor(points, sides, item, isFill, move = { x: 0, y: 0 }) {
    this.id = item.id; // id
    this.rectType = item.type; // 矩形类型
    this.rectName = item.name; // 矩形名字
    this.delIcon = item.hasOwnProperty('delIcon') ? require(`../../../assets/images/${item.type}.png`) : ''; // 图标颜色
    this.rectX = move.x; //物体移动速度x
    this.rectY = move.y; //物体y移动速度y
    this.strokeStyle = item.lineColor; // 边线颜色
    this.fillStyle = item.color; //背景色
    this.sides = sides; // 边线粗细
    this.isFill = isFill; //新增还是删除
    this.points = points; //数据
  }
  //绘制路径，
  createPath(context) {
    context.beginPath();
    context.moveTo(this.points[0].x, this.points[0].y);
    for (var i = 0, len = this.points.length; i < len; i++) {
      context.lineTo(this.points[(i + 1) % len].x, this.points[(i + 1) % len].y);
    }
    context.closePath();
    return this;
  }
  //填充到页面
  draw(context) {
    context.save();
    context.strokeStyle = this.strokeStyle;
    context.lineWidth = this.sides;
    context.fillStyle = this.fillStyle;
    context.stroke();
    if (this.isFill) {
      context.fill();
    }
    context.restore();
    return this;
  }


  //添加图标
  addIncon(context, delItemTpye) {
    let _ths = this
    var iconImg = new Image();
    iconImg.src = this.delIcon;
    iconImg.onload = function () {
      if (delItemTpye.type == _ths.rectType) {
        let xAll = _ths.points.map(v => v.x)
        let xMax = Math.max.apply(null, xAll)
        let xMin = Math.min.apply(null, xAll)
        let yAll = _ths.points.map(v => v.y)
        let yMax = Math.max.apply(null, yAll)
        let yMin = Math.min.apply(null, yAll)
        let X = (xMax + xMin - 10) / 2
        let Y = (yMax + yMin - 10) / 2
        context.drawImage(iconImg, X, Y) //插入图形
      }
    };
    return this
  }
  //碰撞检测

  collidesWith(shape) {
    var axes = shape.getAxes();

    if (axes === undefined) {
      //多边形与圆形碰撞
    } else {
      //多边形与多边形碰撞
      return !this.separationOnAxes(axes.concat(this.getAxes()), shape);
    }
  };
  distinct(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i].x === arr[j].x && arr[i].y === arr[j].y) {
          arr.splice(j, 1);
          j = j - 1;
        }
      }
    }
    console.log(2, arr)
    return arr;
  };
  getAxes() {
    var v1 = new Vector(); //代表多边形的相邻两点
    var v2 = new Vector();
    var axes = [];


    this.points = this.distinct(this.points)

    for (var i = 0; i < this.points.length - 1; i++) {
      //遍历多边形所有相邻的点得去所有的投影轴
      v1.x = this.points[i].x;
      v1.y = this.points[i].y;

      v2.x = this.points[i + 1].x;
      v2.y = this.points[i + 1].y;
      axes.push(v1.edge(v2).perpendicularNormal());
    }

    //将收尾两点的投影轴也加入
    v1.x = this.points[this.points.length - 1].x;
    v1.y = this.points[this.points.length - 1].y;

    v2.x = this.points[0].x;
    v2.y = this.points[0].y;
    axes.push(v1.edge(v2).perpendicularNormal());

    return axes;
  };
  separationOnAxes(axes, shape) {
    // console.log(axes, shape)
    var axis;
    var projection1;
    var projection2;
    for (var i = 0; i < axes.length; ++i) {
      axis = axes[i];
      projection1 = shape.project(axis); //得到形状在当前投影轴上的投影
      projection2 = this.project(axis); //得到当前拖拽形状在当前投影轴上的投影

      if (!projection1.overlaps(projection2)) {
        //检测两个投影在当前投影轴上是否重叠,分离返回false
        return true; //在当前投影轴上分离返回true,表示两个形状肯定没有碰撞，不需在检测后面的投影轴了，
      }
    }
    return false; //检测完全部的投影轴上的投影没和一个分离的，返回false;
  }
  project(axis) {
    var scalars = []; //用于存放所有点向量在投影轴向量上的点积集合，注意点积集合是数量不是向量
    var v = new Vector();
    this.points.forEach(function (point) {
      v.x = point.x;
      v.y = point.y;
      scalars.push(v.dotProduct(axis));
    });
    return new Projection(
      Math.min.apply(Math, scalars),
      Math.max.apply(Math, scalars)
    );
  };
}

export default Shape
