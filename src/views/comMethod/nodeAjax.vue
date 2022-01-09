<template>
  <div>
    <Row>
      <Col span="8">
      <Button type="primary" @click="getInfoData">点击请求node数据</Button>
      </Col>
      <Col span="8">
      <List class="list" border>
        <ListItem class="listitem" v-for="(item,index) in list" :key="index">
          <span>{{item.id}}</span>
          <span>{{item.name}}</span>
          <span>{{item.value}}岁</span>
        </ListItem>
      </List>
      </Col>
    </Row>
    <br>

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
      list: []
    }
  },
  methods: {
    getInfoData() {
      let _this = this
      this.$http({
        method: 'get',
        url: 'http://localhost:5000/add',
        params: {}
      }).then(function (res) {
        let { config, data, headers, status, statusText } = res
        _this.list = data.data
        console.log(_this.list);
      })
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
.list {
}
.listitem {
  display: flex;
  justify-content: space-between;
}
</style>