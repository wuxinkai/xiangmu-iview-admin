<template>
  <div class="box">
    <div class="timesharingScreenCharts" v-for="item in datas" :key="item.key" draggable="true" @dragend="handleDragEnd($event, item)" @dragstart="handleDragStart($event, item)" @dragenter="handleDragEnter($event, item)" @dragover.prevent="handleDragOver($event, item)">
      <div class="timesharingContent">
        <chart-bar v-if="item.id==1" ref="char1" style="height: 300px;" :value="pieData" text="每周用户活跃量" />
          <chart-pie v-if="item.id==2" ref="char2" style="height: 300px;" :value="pieData" text="用户访问来源"></chart-pie>
          <chart-line v-if="item.id==3" ref="char3" style="height: 300px;" :value="barData" text="用户访问来源"></chart-line>
      </div>
    </div>

   

  </div>
</template>

<script>
import { ChartPie, ChartBar, ChartLine } from '@/components/charts'
export default {
  name: '',
  components: {

    ChartPie,
    ChartBar,
    ChartLine
  },

  data() {
    return {
      pieData: [
        { value: this.uniqueId(), name: '直接访问' },
        { value: this.uniqueId(), name: '邮件营销' },
        { value: this.uniqueId(), name: '联盟广告' },
        { value: this.uniqueId(), name: '视频广告' },
        { value: this.uniqueId(), name: '搜索引擎' }
      ],
      barData: {
        Mon: this.uniqueId(),
        Tue: this.uniqueId(),
        Wed: this.uniqueId(),
        Thu: this.uniqueId(),
        Fri: this.uniqueId(),
        Sat: this.uniqueId(),
        Sun: this.uniqueId()
      },
      datas: [
        { id: 1, name: "第1个" },
        { id: 2, name: "第2个" },
        { id: 3, name: "第3个" },
      ]
    }
  },
  methods: {
    uniqueId() {
      var num = '';
      for (var i = 0; i < 3; i++) {
        num += Math.floor(Math.random() * 10);
      }
      return num
    },
    handleDragStart(e, item) {
      this.dragging = item
    },
    handleDragEnd(e, item) {
      this.dragging = null
    },
    handleDragOver(e) {
      e.dataTransfer.dropEffect = 'move'
    },
    handleDragEnter(e, item) {
      e.dataTransfer.effectAllowed = 'move'
      if (item === this.dragging) {
        return
      }
      const newItems = [...this.datas]
      const src = newItems.indexOf(this.dragging)
      const dst = newItems.indexOf(item)
      newItems.splice(dst, 0, ...newItems.splice(src, 1))
      this.datas = newItems
    }
  },
  mounted() {
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
.box {
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .timesharingScreenCharts {
    width: 46%;
    // height: 300px;
    margin: 2%;
    color: #fff;
    font-size: 50px;
    text-align: center;
    background: rgba(194, 189, 189, 0.719);
  }
}
</style>