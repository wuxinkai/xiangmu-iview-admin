<template>

</template>
<script>
import { transfer_tree } from '@/assets/json/transferTree'
export default {

  data() {
    return {

    }
  },
  methods: {
    filterNode(tree, title) {
      if (!title) { return }
      let resultArr = []
      for (let i = 0; i < tree.length; i++) {
        let item = tree[i]
        if (item.title == title) {
          // resultArr.push(item)
          return item
        } else if (item.children && item.children.length) {
          let obj = this.filterNode(item.children, title)
          if (Object.keys(obj).length > 0) {
            resultArr.push(obj)
          }
        }
      }
      //将数组套数组的方式解析成 数组套对象

      return resultArr.flat()
    }
  },
  async mounted() {
    var data = await this.filterNode(transfer_tree, '第四层 1-1-1')
    console.log(data)
  }
}
</script>
 
<style lang="less" scoped>
</style>