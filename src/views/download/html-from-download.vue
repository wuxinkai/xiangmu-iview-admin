<template>
  <div>
    <div id="printMe">
      <p>葫芦娃，葫芦娃</p>
      <p>一根藤上七朵花 </p>
      <p>小小树藤是我家 啦啦啦啦 </p>
      <p>叮当当咚咚当当　浇不大</p>
      <p> 叮当当咚咚当当 是我家</p>
      <p> 啦啦啦啦</p>
      <p>...</p>
    </div>

    <button v-print="printObj">Print local range</button>
    <div id="loading" v-show="printLoading"></div>
  </div>
</template>
<script>

export default {
  name: 'html-download',

  data () {
    return {
      printLoading: true,
      printObj: { // 配置打印参数
        id: "printMe", // 要打印的容器的id
        popTitle: '标签打印', // 页眉标题
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>', //节点中添加DOM节点，并使用（仅打印本地范围）分隔多个节点
        beforeOpenCallback (vue) {
          vue.printLoading = true
          console.log('打开之前')
        },
        openCallback (vue) {
          vue.printLoading = false
          console.log('执行了打印')
        },
        closeCallback (vue) {
          console.log('关闭了打印工具')
        }
      }
    }
  },
  methods: {
    print () {
      this.$print(this.$refs.print, { 'no-print': '.className' });
    }
  },
  mounted () { }
}
</script>
<style lang="less" scoped>
#printMe {
  width: 400px;
  border: 1px solid #ccc;
  p {
    height: 40px;
    padding: 0 20px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
  }
}
</style>