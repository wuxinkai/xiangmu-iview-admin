class Projection {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }
  //碰撞检测
  overlaps(projection) {
    // console.log(`外最大：${this.max} > 内最小：${projection.min}, 内最大${projection.max} > 外最小${ this.min}`)
    // console.log(this.max, this.min, projection.max, projection.min);
    return this.max > projection.min && projection.max > this.min;
  }
}

export default Projection
