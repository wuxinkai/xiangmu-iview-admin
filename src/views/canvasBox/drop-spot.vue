<template>
  <div>
    <div class="wrap" id="wrap">
      <div class="box" id="drag"></div>
    </div>
    dragstart：开始拖元素触发，作用于拖拽元素
    dragenter：元素拖进可drop元素（绑定drop事件的元素）时触发，作用于目标元素
    dragover：当元素拖动到drop元素上时触发，作用于目标元素
    drop：当元素放下到drop元素触发，作用于目标元素
    dragleave ：当元素离开drop元素时触发，作用于目标元素
    drag：每次元素被拖动时会触发，作用于目标元素
    dragend：放开拖动元素时触发，作用于目标元素

  </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
  },
  components: {

  },
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {
    var wrap = document.getElementById("wrap");
    var drag = document.getElementById('drag');
    drag.onmousedown = function (event) {
      var event = event || window.event;
      var diffX = event.clientX - drag.offsetLeft;
      document.onmousemove = function (event) {
        var event = event || window.event;
        var moveX = event.clientX - diffX;
        if (moveX < 0) {
          moveX = 0
        } else if (moveX > wrap.offsetWidth - drag.offsetWidth) {
          moveX = wrap.offsetWidth - drag.offsetWidth
        }
        drag.style.left = moveX + 'px';
        console.log(moveX);
      }
      document.onmouseup = function (event) {
        this.onmousemove = null;
        this.onmouseup = null;
      }
    }
  },
  watch: {

  },
  computed: {

  },
  filters: {

  }
}
</script>

<style scoped lang='less'>
.wrap {
  width: 500px;
  height: 500px;
  background: #f1f1f1;
  border: 1px solid #333;
  position: relative;
  .box {
    width: 100px;
    height: 100px;
    background: pink;
    border: 1px solid red;
    position: absolute;
  }
}
</style>