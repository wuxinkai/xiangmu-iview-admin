<template>
  <div>
    <Button size="small" class="tables-row-btn" @click="onPreservationFun()">图片下载</Button>
    <div id="chartBody">
      <p>这是我的下载内容</p>
    </div>
    <br>
    <br>
    <div v-if="dialogTableVisible">
      <img :src="imgUrl" alt="">
    </div>
  </div>
</template>
<script>
import html2canvas from 'html2canvas'
export default {
  name: '',
  data() {
    return {
      dialogTableVisible: false,
      imgUrl: '',
      titleText: "下载图片"
    }
  },
  methods: {
    onPreservationFun() {
      let _this = this
      let content_html = document.getElementById('chartBody');
      let width = content_html.offsetWidth;
      let height = content_html.offsetHeight;
      // let offsetTop = content_html.offsetTop;  //盒子到顶部的距离
      let scaleBy = Math.ceil(window.devicePixelRatio); //window.devicePixelRatio 显示设备的物理像素分辨率与 CSS 像素分辨率的比率

      let canvas = document.createElement("canvas");
      let context = canvas.getContext('2d');

      canvas.width = width * scaleBy;
      canvas.height = height * scaleBy;
      context.scale(scaleBy, scaleBy); //放大缩小  （1,1）的比例
      var opts = {
        allowTaint: true,//允许加载跨域的图片
        tainttest: true, //检测每张图片都已经加载完成
        scale: scaleBy, // 添加的scale 参数
        canvas: canvas, //自定义 canvas
        logging: false, //日志开关，发布的时候记得改成false
        width: width, //dom 原始宽度
        height: height //dom 原始高度
      };

      html2canvas(content_html, opts).then(function (canvas) {
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        var image = new Image();
        var type = 'png';
        var imgData = canvas.toDataURL(type);

        //下载内容
        _this.imgUrl = imgData
        if (_this.imgUrl !== "") {
          _this.dialogTableVisible = true;
        }
        //
        imgData = imgData.replace(_this.fixType(type), 'image/octet-stream');
        // 下载后的图片名
        var filename = `下载内容` + '.' + type;
        // download下载
        _this.saveFile(imgData, filename);
      });
    },
    //处理生成图片 格式
    fixType(type) {
      type = type.toLowerCase().replace(/jpg/i, 'jpeg');
      var r = type.match(/png|jpeg|bmp|gif/)[0];
      return 'image/' + r;
    },
    //下载图片事件
    saveFile(data, filename) { //保存图片
      var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
      save_link.href = data;
      save_link.download = filename;
      var event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      save_link.dispatchEvent(event);
    },
  },
  mounted() { }
}
</script>
<style lang="less" scoped>
#chartBody {
  width: 300px;
  height: 300px;
  line-height: 300px;
  background: chartreuse;
  margin: 0 auto;
  p {
    font-size: 30px;
    text-align: center;
  }
}
</style>