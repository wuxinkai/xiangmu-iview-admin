import _ from 'underscore'

var themonthdaythingsnumber = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
]

//返回给vue用数组
var montharr = [[],[],[],[],[],[]]

//获取日期， 分发给星期函数
export  function monthfunc(monthdath) {
 
  for (let i = 0; i < 6; i++) {
    changearr(monthdath, themonthdaythingsnumber[i], montharr[i], i)
  }

  // 这里就是DOM VUE 认识这个函数的返回值，
  return montharr
}

//转化为工作数组
// weekarr       数据库中持久的数据中的这个星期
// daythingsnumber  这个星期的事件数组
// montharrtheweek  这个星期的事件数数组
function changearr(mounthdata, daythingsnumber, montharrtheweek, arrindex) {
  //修改内容地址
  let weekarr = mounthdata[arrindex]
  //每天的任务数量
  // let daythingsnumber = [0, 0, 0, 0, 0, 0, 0];
  weekarr.forEach((item, index) => {
    if (!item.hasOwnProperty('occupation')) item.occupation = []

    //第一步 给每一项补一个数组，表示被其他项占用了

    daythingsnumber[index] += item.schedule.length

    //遍历每一个item，看有没有项目有during 属性
    item.schedule.forEach((JSON, index2) => {
      //判断是否有工作，需要工作几天 ， 当天的工作不用加during
      if (JSON.during && JSON.during > 1) {
        //后面的两项加1
        for (let i = index + 1; i < index + JSON.during; i++) {
          // weekarr[i].schedule.unshift("spearater")
          daythingsnumber[i]++
        }
      }
    });

  });


  // console.log(daythingsnumber)   //0 2 0 1 4 1 1 ,

  let max = _.max(daythingsnumber)
  // let max = Math.max(...daythingsnumber)
  let times = max > 3 ? 3 : max;
  //第二部 创建空数组
  for (let i = 0; i < times; i++) {
    montharrtheweek.push([])
  }

  //表里
  weekarr.forEach((item, index) => {

    for (let j = 0; j < times; j++) {

      //检测这一项是不是被占用
      // if (!item.occupation.includes(j)) {
      if (_.indexOf(item.occupation, j) == -1) {
        let first = item.schedule.shift() //弹栈
        if (first === undefined) {
          montharrtheweek[j].push({ "colspan": 1, "title": "" })
        } else {
          montharrtheweek[j].push({ "colspan": first.during || 1, "title": first.title, "className": first.type || '' })
          //一件事,在后台多少天加入自己的行号
          console.log(222,first.during)
          if (first.during && first.during != 1) {
            
            //遍历终点
            let end = index + first.during > 7 ? 7 : index + first.during
            //还剩多少
            let rest = first.during - (7 - index)
            //当前周
          
            for (let _i = index + 1; _i < end; _i++) {
              weekarr[_i].occupation.push(j)
            }
            //下一周
            let nextweekarr = mounthdata[arrindex + 1]

            for (let s = 0; s < rest; s++) {
              if (!nextweekarr[s].hasOwnProperty('occupation')) {
                nextweekarr[s].occupation = []
              }
              // 改变下一周前几天的occupation
              nextweekarr[s].occupation.push(j)
              //把数量数组改变
              themonthdaythingsnumber[arrindex + 1][s]++;

              //改变一下一周的结果moutharr（总结过）
              console.log(1111,rest)
              montharr[arrindex + 1][j] = [[{ "colspan": rest, "title": first.title, "className": first.type || '' }]]
            }
          }
        }
      }

    }
  })
  // return trs   
}



