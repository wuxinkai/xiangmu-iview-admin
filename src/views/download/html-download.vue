<template>
  <div>
    <Button type="success" @click="copy('../../assets/images/triangle.png', './zt2.png')">点击赋值图片</Button>
  </div>
</template>
<script>
var fs = require('fs');
export default {
  name: 'html-download',
  data() {
    return {

    }
  },
  methods: {
    copy(src, target) {
      //读文件     如果是图片就不能用utf8' ,用binary  不知道就不用写
      // console.log(fs);
      // debugger

      // fs.readFile(src, 'binary', function (err, data) {
      //   debugger
      //   fs.writeFile(target, data, 'binary', function (err) {
      //     console.log("把" + src + "复制到" + target)
      //   })
      // })
    }
  },
  mounted() {


  }
}
</script>