<template>
  <div>
    <div>{{time}}</div>
    <div>{{time_s}}</div>
    <h1>{{time_s|capitalize}}</h1>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {

      time_s: "",
      time: ""
    }
  },
  methods: {
    //获取日期
    getTime() {
      // this.clearTime = setInterval(() => {
      this.time_s = new Date().toLocaleString('chinese', { hour12: false }).replace(/\//g, "-")
      // debugger
       this.time_s = this.time_s.slice(-8)
       debugger
      // this.time = str.split(' ')[0]
      // this.time_s = str.split(' ')[1]
      // this.time = this.time.replace(/\//g, '.')

      // }, 1000)
    },
  },
  mounted() {
    this.getTime()
  },
  watch: {

  },
  computed: {

  },
  filters: {
    capitalize: function (value) {
      if (!value) {
        return ' '
      }
      value = value.toString()
      value = value.replace(/\//g, '.')

      return value
      // return value.slice(0, 4) + '.' + value.slice(5, 7) + '.' + value.slice(8, 10)
    }
  }
}
</script>

<style scoped lang='less'>
</style>