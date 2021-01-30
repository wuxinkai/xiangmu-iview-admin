<template>
  <div>
    <ul>
      <li v-for="item in authors" :key="item.toString()">{{item}}</li>
    </ul>
  </div>
</template>
<script>
export default {

  data() {
    return {
      authors: {}
    }
  },
  mounted() {
    const { allAuthors } = {
      "code": "0",
      // 小说类型 fiction  science  fantasy
      // 小说作者  ["Agatha Chars", "b", "C", "DFS"]
      "allAuthors": {
        "fiction": ["Agatha Chars", "b", "C", "DFS"],
        "science": ["Neal", "Arthur", "DSSS", "ESSS"],
        "fantasy": ["J.R.S Tolkes", "J.M.Rowle"]
      }
    }

    //查询数组中有没有
    const author = new Proxy(allAuthors, {
      has(target, key) {
        const keys = Reflect.ownKeys(target).slice(0, -2) //删除后两位
        for (const item of keys) {
          if (target[item].includes(key)) { //字符串
            return true
          }
        }
        return false
      }
    })

    //将不能循环的数据弄成可循环的数据
    author[Symbol.iterator] = function* () {
      const all = this
      const keys = Reflect.ownKeys(this).slice(0, -2) //属性名
      console.log(`属性名`,keys)
      let values = [] //存储
      while (1) {
        if (!values.length) { //判断是否为空
          if (keys.length) { //判断作者是否为空
            values = [].concat(all[keys[0]])
            console.log(`每次循环的数据`,values)
            keys.shift() //删除 循环完了的行

            yield values.shift()
          } else {
            return false
          }
        } else {
          yield values.shift()
        }
      }
    }
  
    console.log('DFS' in author)
    console.log(author)
    this.authors = author  //执行顺序
  }
}
</script>
 
<style lang="less" scoped>
</style>