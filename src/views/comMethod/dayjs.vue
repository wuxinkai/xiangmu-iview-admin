<template>
  <div>
    <h1>下载</h1>
    <pre style="background:#123;color: #fff;font-size:18px">
           npm install dayjs --save
        </pre>

    <h4>项目使用</h4>
    <pre style="background:#123;color: #fff;font-size:18px">
        var dayjs = require('dayjs')
        import dayjs from 'dayjs' // ES 2015
        dayjs().format()
  </pre>

    <h4>严格解析格式</h4>
    <h4>时间戳(毫秒)</h4>
    <h4>时间戳(毫秒)</h4>
  </div>
</template>

<script>
var dayjs = require('dayjs')
//季度插件
import * as quarterOfYear from 'dayjs/plugin/quarterOfYear'
dayjs.extend(quarterOfYear)







export default {
  name: '',
  props: {
  },
  components: {

  },
  data () {
    return {
      list: []
    }
  },
  methods: {

  },
  mounted () {
    var now = dayjs()






    console.log(2222, dayjs('1970-00-00 ', 'YYYY-MM-DD').isValid())



    console.log('-------------------------时间戳-----------------------------')
    console.log('毫秒时间戳', dayjs(1318781876406))
    console.log('时间戳(秒)', dayjs.unix(1318781876))



    console.log('-------------------------时间-----------------------------')
    console.log('年', dayjs().year())
    console.log('月（0-11）', dayjs().month() + 1)
    console.log('日', dayjs().date())
    console.log('小时', dayjs().hour())
    console.log('分钟', dayjs().minute())
    console.log('修改当前的分钟', dayjs().minute(59).format('YYYY-MM-DD HH:mm:ss'))
    console.log('秒', dayjs().second())
    console.log('毫秒', dayjs().millisecond())
    console.log('季度', dayjs('2010-04-01').quarter())
    console.log('星期', dayjs().day())



    console.log('-------------------------get方法-----------------------------')

    console.log('获取（月）', dayjs().get('month') + 1)
    console.log('获取（日）', dayjs().get('date'))
    console.log('获取（小时）', dayjs().get('hour'))
    console.log('获取（分钟）', dayjs().get('minute'))
    console.log('获取（秒）', dayjs().get('second'))
    console.log('获取（毫秒）', dayjs().get('millisecond'))

    console.log('-------------------------set方法 日期的计算-----------------------------')
    //日期计算
    var objectSupport = require("dayjs/plugin/objectSupport");
    dayjs.extend(objectSupport);


    //添加星期，修改年份             添加指定的时间    减去指定的时间

    let newData = dayjs({
      year: 2021,
      month: 1,
      date: 3,
    }).add({ month: 3 }).add(3, 'day')
    console.log('计算日期 增加天数，增加月份', newData.format('YYYY-MM-DD HH:mm:ss'))



    let newDataTow = dayjs({
      year: 2021,
      month: 1,
      date: 3,
    }).year(2022)
    console.log('计算日期 修改年', newDataTow.format('YYYY-MM-DD HH:mm:ss'))


    let newDataThree = dayjs({
      year: 2021,
      month: 10,
      date: 3,
    }).subtract(1, 'year').subtract(1, 'month').subtract(1, 'date')
    console.log('计算日期  减去时间', newDataThree.format('YYYY-MM-DD HH:mm:ss'))


    console.log('---------------------------当前时间--------------------------------')
    console.log('当前时间', dayjs().format('YYYY-MM-DD HH:mm:ss'))
    console.log('指定时间', dayjs('2019-01-25').format('YYYY-MM-DD HH:mm:ss'))


    console.log('---------------------------距离现在的相对时间  from  和to  --------------------------------')
    //距离当前相对时间
    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)
    console.log(dayjs().from(dayjs('2020-01-01'))) //两年前
    console.log(dayjs().from(dayjs('2020-01-01'), true)) //两年时间

    console.log(dayjs().to(dayjs('2025-01-01'))) //三年后
    console.log(dayjs().to(dayjs('2025-01-01'), true)) //三年



    console.log('---------------------------日期转为数组 ToArray --------------------------------')
    var toArray = require('dayjs/plugin/toArray')
    dayjs.extend(toArray)
    console.log('日期转为数组', dayjs('2019-01-25').toArray())

    console.log('---------------------------日期转为对象 --------------------------------')
    var toObject = require('dayjs/plugin/toObject')
    dayjs.extend(toObject)
    console.log('日期转为对象', dayjs('2019-01-25').toObject())


    console.log('---------------------------日期是年中第几周 --------------------------------')
    //依赖在最上面
    var weekOfYear = require('dayjs/plugin/weekOfYear')
    dayjs.extend(weekOfYear)
    console.log('日期是2022年中第几周', dayjs('2022-02-22').week())
    console.log('2022年的第八周距离2022年的2月22日', dayjs('2022-02-22').week(8).format('YYYY-MM-DD HH:mm:ss'))


    //通过周获取今年是哪一年
    var weekYear = require('dayjs/plugin/weekYear')
    dayjs.extend(weekYear)
    console.log('通过周获取今年是哪一年', dayjs().weekYear())

    console.log('---------------------------获取上周的今天 --------------------------------')
    var weekday = require('dayjs/plugin/weekday')
    dayjs.extend(weekday)
    console.log('上个星期的今天', dayjs().weekday(-7).format('YYYY-MM-DD HH:mm:ss')) // 上个星期天
    console.log('下个星期的今天', dayjs().weekday(7).format('YYYY-MM-DD HH:mm:ss')) // 下个星期

    console.log('获取昨天时间', dayjs().weekday(0).format('YYYY-MM-DD HH:mm:ss'))
    console.log('获取三天前时间', dayjs().weekday(-2).format('YYYY-MM-DD HH:mm:ss'))

    console.log('---------------------------时长 --------------------------------')
    var duration = require('dayjs/plugin/duration')
    dayjs.extend(duration)
    console.log(dayjs.duration(3600).seconds())
    console.log(dayjs.duration(3600).minutes())
    console.log(dayjs.duration().hours())
    console.log(dayjs.duration().asHours())
    console.log(dayjs.duration().days())
    console.log(dayjs.duration().asWeeks())
    console.log(dayjs.duration().years())

    console.log('列表')
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
</style>