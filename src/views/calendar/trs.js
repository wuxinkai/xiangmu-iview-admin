import _ from 'underscore'
let weekarr = [
  {
    day: 7,
    schedule: [],
  },
  {
    day: 1,
    schedule: [
      {
        title: "吃饭",
        type: "info",
      },
      {
        title: "打豆豆",
        type: "info",

      },
      {
        title: "睡觉",
        during: 4,
      },
    ],
  },
  {
    day: 2,
    schedule: [],
  },
  {
    day: 3,
    schedule: [
      {
        title: "产检",
        type: "waring",
        during: 3,
      },
    ],
  },
  {
    day: 4,
    schedule: [
      {
        title: "早饭",
        type: "error",
      },
      {
        title: "中饭",
        type: "error",
      },
      {
        title: "晚饭",
        type: "error",
      },
    ],
  },
  {
    day: 5,
    schedule: [],
  },
  {
    day: 6,
    schedule: [
      {
        type: "waring",
        title: "早饭",
      },
    ],
  },
]
var daythingsnumber = [0, 0, 0, 0, 0, 0, 0]

weekarr.forEach((item, index) => {
  item.occupation = []
  daythingsnumber[index] += item.schedule.length

  item.schedule.forEach((JSON, index2) => {
    //判断是否有工作，需要工作几天 ， 当天的工作不用加during
    if (JSON.during && JSON.during > 1) {
      //后面的两项加1
      for (let i = index + 1; i < index + JSON.during; i++) {

        daythingsnumber[i]++
      }
    }
  });

});
debugger
let max = _.max(daythingsnumber)

var trs = (function () {
  var _trs = []
  for (let i = 0; i < max; i++) {
    _trs.push([])

  }
  return _trs
})()

weekarr.forEach((item, index) => {
  for (let i = 0; i < max; i++) {
    if (_.indexOf(item.occupation, i) == -1) {
      let first = item.schedule.shift() //弹栈
      if (first === undefined) {
        trs[i].push({ "colspan": 1, "title": "" })
      }else{
        trs[i].push({ "colspan": first.during || 1, "title": first.title})
        if (first.during && first.during != 1) {
          for (let _i = index+1 ; _i < index+first.during; _i++) {
           weekarr[_i].occupation.push(i)
            
          }
        }
      }
    }
  }
})


export default trs