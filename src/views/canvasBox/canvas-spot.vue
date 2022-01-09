<template>
  <div>
    <div class="box">
      <img :style="imgAll.style" :src="imgAll.path">
      <canvas class="canvas" id='mycanvas' width="1140" height="660"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {

  },
  data() {
    return {
      imgAll: {
        path: '',
        style: {
          width: 0,
          height: 0,
        }
      },
      dome: {
        "id": "mxdiefs234dfsa3w",
        runtime: 1.246181,
        edges: [
          {
            "width": 1.056,
            "left_up_x": 488,
            "left_up_y": 702,
            "right_up_x": 520,
            "right_up_y": 702,
            "right_bottom_x": 520,
            "right_bottom_y": 742,
            "left_bottom_x": 488,
            "left_bottom_y": 742,
          },
          {
            "width": 1.228,
            "left_up_x": 1415,
            "left_up_y": 789,
            "right_up_x": 1445,
            "right_up_y": 789,
            "right_bottom_x": 1445,
            "right_bottom_y": 797,
            "left_bottom_x": 1415,
            "left_bottom_y": 797,
          },
          {
            "width": 1.228,
            "left_up_x": 1498,
            "left_up_y": 652,
            "right_up_x": 1504,
            "right_up_y": 653,
            "right_bottom_x": 1516,
            "right_bottom_y": 664,
            "left_bottom_x": 1514,
            "left_bottom_y": 671,
          }
        ]
      },

      dome2: {
        "edges": [
          {
            "height": "33",
            "width": "41",
            "x": "488",
            "y": "701",
            "ys_width": "[20.66]"
          },
          {
            "height": "40",
            "width": "64",
            "x": "822",
            "y": "233",
            "ys_width": "[27.85]"
          },
          {
            "height": "33",
            "width": "23",
            "x": "896",
            "y": "566",
            "ys_width": "[18.3]"
          },
          {
            "height": "40",
            "width": "36",
            "x": "874",
            "y": "905",
            "ys_width": "[12.27]"
          },
          {
            "height": "44",
            "width": "51",
            "x": "869",
            "y": "484",
            "ys_width": "[10.36]"
          }
        ],
        "id": "15cm-800.bmp",
        "runtime": 6.516745567321777
      }

    }
  },
  methods: {
    //获取img信息
    getImgInfo() {
      let _this = this
      this.$nextTick(() => {
        var mycanvas = document.querySelector('#mycanvas')
        var ctx = mycanvas.getContext('2d')
        var img_url = require('../../../src/assets/images/th.jpg');
        var img = new Image();
        img.src = img_url;
        img.onload = function () {
          let round_w = Math.round((1140 / img.width) * 1000) / 1000
          let round_h = Math.round((660 / img.height) * 1000) / 1000
          _this.imgAll.style.width = `${round_w * img.width}px`
          _this.imgAll.style.height = `${round_h * img.height}px`
          _this.imgAll.path = img.src
          //描边
          // ctx.lineWidth = 1; //设置线宽
          ctx.font = "20px 微软雅黑";
          // ctx.textAlign = 'center';
          // ctx.textBaseLine = 'bottom';
          //不能删除--------------------------------------------------------
          // for (let i = 0; i < _this.dome.edges.length; i++) {
          //   const item = _this.dome.edges[i];
          //   ctx.beginPath();
          //   ctx.strokeStyle = "rgba(0,255,0,1)"
          //   ctx.moveTo((item.left_up_x * round_w), (item.left_up_y * round_h));
          //   ctx.lineTo((item.right_up_x * round_w), (item.right_up_y * round_h));
          //   ctx.lineTo((item.right_bottom_x * round_w), (item.right_bottom_y * round_h));
          //   ctx.lineTo((item.left_bottom_x * round_w), (item.left_bottom_y * round_h));
          //   ctx.closePath();
          //   ctx.stroke();
          //   _this.getposition(ctx, (item.left_bottom_x * round_w) - 10, (item.left_bottom_y * round_h) + 14)
          // }

          for (let j = 0; j < _this.dome2.edges.length; j++) {
            let cur = _this.dome2.edges[j]
            ctx.strokeStyle = 'rgba(0,255,0,1)';
            ctx.textAlign = 'left';
            ctx.strokeRect(cur.x * round_w, cur.y * round_h, cur.width * round_w, cur.height * round_h) //
            _this.getposition(ctx, cur, cur.x * round_w, cur.y * round_h - 8)
          }
        }
      })
    },
    //设置文字文字
    getposition(ctx, cur, x, y) {
      // ctx.fillStyle = "rgba(255,0,0,1)"
      let name = cur.ys_width.replace(/\[|]/g, '')
      ctx.textBaseline = "alphabetic";

      ctx.fillStyle = "red";
      ctx.fillText(`${name}`, x, y)
    }
  },
  mounted() {
    this.getImgInfo()

  },

}
</script>

<style scoped lang='less'>
.box {
  height: 660px;
  width: 1140px;
  border: 1px solid #ccc;
  background: #fff;
  position: relative;
  img {
    position: absolute;
    z-index: 1;
  }
  .canvas {
    position: absolute;
    z-index: 2;
  }
}
</style>