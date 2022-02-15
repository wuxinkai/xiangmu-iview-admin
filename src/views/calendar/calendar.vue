<template>
  <div class="outer">
    <div class="pro-calendar">
      <div class="pro-header-toolbar">
        <div class="pro-header-right">
          <button>《</button>
          <button>》</button>
          <button>今天</button>
        </div>
        <div class="pro-header-center">
          <h2>一月2022</h2>
        </div>
        <div class="pro-header-right">
          <button>月</button>
          <button>周</button>
          <button>日</button>
          <button>日程</button>
        </div>
      </div>
      <div class="pro-canlendar">
        <div class="table-box">
          <table class="bgtable">
            <thead>
              <tr>
                <th v-for="(item,theadIndex) in daynnamearr" :key="theadIndex">{{item}}</th>

              </tr>
            </thead>
            <tbody>

              <tr v-for="(week,index) in theweek()" :key="index">
                <!-- <td v-for="(item,idx) in week" :key="idx" v-bind:class="{next:item.nextmonth||item.nextmonth}">{{item}}</td> -->
                <td v-for="(item,idx) in week" :key="idx" :class="{'next':item.nextmonth,'prev':item.prevmonth,'current':item.currentmonth}">{{item.day}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'calendar',
  props: [],
  data () {
    return {
      //中文星期名字
      daynnamearr: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      //本周的日期构成，先用二维数组
      dayarr: [],
      //日
      week: [],

      //获取年
      year: 2021,
      //获取月
      month: 2
    }
  },
  created () {
    let dayarr = [];

    //这个月的第一天星期几
    let themonth1stday = (new Date(this.year, this.month - 1, 1)).getDay()



    //获取本月有多少天 此时经典算法判断这个月是不是，1,3,5,7,8,10,12的31天。 4,6,9,11，的30天 ，
    // 2月单独看是不是闰年， 解决办法，



    //判断下一个所在的年，就是判断是不是12月,不是12月就不用加一年
    let y = this.month == 12 ? this.year + 1 : this.year
    //判断下一个月所在的月
    let m = this.month == 12 ? 1 : this.month
    //日期对象减去常数表示得到的时间戳， 通过时间戳 1970到现在的数字  这个月的最后一天就是下个月第一天减去1秒
    let themonthdaysamount = new Date((new Date(y, m, 1) - 1)).getDate()


    // 获取上个月的最后一天
    let prevmonthlastdate = new Date(new Date(this.year, this.month - 1, 1) - 1).getDate()


    //解决从星期日开始排列的问题
    themonth1stday = themonth1stday - 1
    //（1）日历的开始部分（上月个）， 这个月的第一天是星期几，就要放入 几个尾巴
    while (themonth1stday--) { //这是星期几就要循环继承，
      dayarr.unshift({ day: prevmonthlastdate--, prevmonth: true })//上个月从后数几个数，存到这个月的输入中
    }

    //（2）日历的中间部分（当前月） ，把剩余的日期添加到数组
    let cur_count = 0
    while (themonthdaysamount--) {
      dayarr.push({ day: ++cur_count, currentmonth: true })
    }


    //（3）日历的结尾部分（下个月），
    let next_count = 1
    while (dayarr.length != 42) {
      dayarr.push({ day: next_count++, nextmonth: true })
    }
    this.dayarr = dayarr
  },
  methods: {
    //返回从第 number周的日期序列  序号从0开始
    theweek () {
      let _arr = []
      for (let i = 0; i < 6; i++) {
        let _week = []
        for (let j = 0; j < 7; j++) {
          _week.push(this.dayarr[i * 7 + j])
        }
        _arr.push(_week)
      }
      return _arr
    }
    
  },

}
</script>
<style lang="less" scoped>
.outer {
  width: 100%;
  height: 100%;
}

.pro-calendar {
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: #fff;

  .pro-header-toolbar {
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .pro-header-left {
    }
    .pro-header-center {
    }
    .pro-header-right {
    }
  }
  .pro-canlendar {
    .table-box {
      .bgtable {
        width: 100%;
        border-collapse: collapse;
        font-size: 16px;
        thead {
          tr {
            th {
              height: 40px;
              line-height: 40px;
              border: 1px solid #ccc;
              box-sizing: border-box;
              padding: 8px;
            }
          }
        }
        tbody {
          tr {
            td {
              box-sizing: border-box;
              padding: 8px;
              height: 85px;
              box-sizing: border-box;
              border: 1px solid #ccc;
              text-align: right;
              vertical-align: top;
              &.prev {
                color: #c0c4cc;
              }
              &.next {
                color: #c0c4cc;
              }
              &:hover {
                background: #f2f8fe;
              }
            }
          }
        }
      }
    }
  }
}
</style>
