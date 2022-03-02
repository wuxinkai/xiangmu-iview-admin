<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
// import echarts from 'echarts'
import * as echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/utils/tools'
echarts.registerTheme('tdTheme', tdTheme)
import { mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'ChartBar',
  props: {
    value: Object,
    text: String,
    subtext: String
  },
  data() {
    return {
      dom: null
    }
  },
  methods: {
    resize() {
      this.dom.resize()
    }
  },
  computed: {
    ...mapGetters(['getSpanData']),
  },
  watch: {
    getSpanData(newdata, olddata) {
      let _this = this
      this.$nextTick(() => {
        _this.dom.resize()
      })
    }
  },
  mounted() {
    // 通知页面更新 数据生成就立即执行。
    this.$nextTick(() => {
      let xAxisData = Object.keys(this.value)
      let seriesData = Object.values(this.value)
      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: seriesData,
          type: 'line',
          smooth: true
        }]
      }
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy() {
    off(window, 'resize', this.resize)
  }
}
</script>
