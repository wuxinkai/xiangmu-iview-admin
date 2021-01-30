<template>
  <div>
    <List header="Header" footer="Footer" border>
      <ListItem v-for="item in price" :key="item">{{item}}</ListItem>
    </List>
    <div>
      <Button @click="up" type="info">升序</Button>
      <Button @click="down" type="success">降序</Button>
      <Button @click="reset" type="warning">还原</Button>
      <Button @click="ck" type="warning">66666</Button>
    </div>
  </div>
</template>
<script>
export default {

  data() {
    return {
      price: [],
      proxy: ''
    }
  },
  methods: {
    up() {
      console.log(this.proxy.up)
      this.price = this.proxy.up
    },
    down() { this.price = this.proxy.down },
    reset() { this.price = this.proxy.default },
    ck() { this.price = this.proxy.xxxxxxx }
  },
  mounted() {
    //原来数据没有变化
    const { price } = {
      "code": "0",
      "price": [13.05, 2.79, 5.6, 1.48, 45.3, 892.3]
    }

    Object.freeze(price)
    this.proxy = new Proxy({}, {
      get(target, key) {
        if (key === 'up') {
          return [].concat(price).sort((a, b) => a - b)
        } else if (key === 'down') {
          return [].concat(price).sort((a, b) => b - a)
        } else if (key === 'xxxxxxx') {
          return ['66661', '66662', '66663', '66664', '66665']
        } else {
          return price
        }
      },
      set() {
        return false
      }
    })
    //给默认值
    this.price = this.proxy.default
  }
}
</script>
 
<style lang="less" scoped>
</style>