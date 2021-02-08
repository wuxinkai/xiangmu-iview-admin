<template>
  <div>
    <h1>数组嵌套数组 转成数组对象</h1>
    <p> arr.flat()//指定要提取嵌套数组的结构深度，默认值为 1；是一个可选的参数；flat的返回值是一个包含将数组与子数组中所有元素的新数组。</p>
    <p> arr.flat(Infinity)//使用 Infinity 作为深度，展开任意深度的嵌套数组</p>
    <p> arr3.flat(2);</p>

    <pre style="background:#123;color: #fff;font-size:18px">
      let arr= [ [{ id:1, name:'小红'}], [ {  id:1,name:'蓝色'  }] , [ {  id:1,name:'小黄'  }]  ]
      let  newAry = arr.flat()
       console.log(newAry ) [{id:1, name:'小红'}}, {id:1,name:'蓝色'}, { id:1,name:'小黄' }]
    </pre>

    <h1>转成字段</h1>
    <pre style="background:#123;color: #fff;font-size:18px">
    let pre = [
    [{
    key: "dbilldate",
    value: "2020-12-31"
    },
    {
    key: "partitoin_time",
    value: "1609862994625"
    },{
    key: "pk_subctaskapply"
    value: "0001G9100000002ERG1Z"
    },{
    key: "cinwarehouseid"
    value: "1001G9100000001OC1VY"
    },{
    key: "pk_subctask"
    value: "0001G9100000002K3UQ8"
    }
    ],
    [
    {
    key: "vbatchno",
    value: "DY-21年-FKSL-0003"
    },
    {
    key: "pk_inoutbill",
    value: "0001G9100000002V3C45"
    },
    {
    key: "csubvendormagid",
    value: "0001A110000000001U7R"
    },
    {
    key: "nouttotalauximeasnum",
    value: "26923"
    },
    {
    key: "cvendorid",
    value: "0001A110000000000DGK"
    },
    ]
    ]

    //结果
    [
        {
          csubvendormagid: "0001A110000000001U7R",
          cvendorid: "0001A110000000000DGK",
          nouttotalauximeasnum: "26923",
          pk_inoutbill: "0001G9100000002V3C45",
          vbatchno: "DY-21年-FKSL-0003"
        },
        {
          cinwarehouseid: "1001G9100000001OC1VY",
          dbilldate: "2020-12-31",
          partitoin_time: "1609862994625",
          pk_subctask: "0001G9100000002K3UQ8",
          pk_subctaskapply: "0001G9100000002ERG1Z"
        }
    ]
    </pre>

    <h1>替换属性名</h1>
    <pre style="background:#123;color: #fff;font-size:18px">
      [
      {
        专业类别: "A5",
        机型: "A6",
        标准名称: "A3",
        点检类型: "A4",
        版本号: "A1",
        状态: "A2",
      },
      {
      专业类别: "B5",
      机型: "B6",
      标准名称: "B3",
      点检类型: "B4",
      版本号: "B1",
      状态: "B2",
      },
      {
      专业类别: "C5",
      机型: "C6",
      标准名称: "C3",
      点检类型: "C4",
      版本号: "C1",
      状态: "C2",
      },
      {
      专业类别: "D5",
      机型: "D6",
      标准名称: "D3",
      点检类型: "D4",
      版本号: "D1",
      状态: "D2",
      }
      ]

      //结果
    [
      {
        errAry: []
        name1: "A1"
        name2: "A2"
        name3: "A3"
        name4: "A4"
        name5: "A5"
        name6: "A6"
      }
    ]
    </pre>

    <h1>递归下钻增加属性</h1>
    <pre style="background:#123;color: #fff;font-size:18px">
      [
    {
        "bomnodecd":"14",
        "bomnodename":"ZJ112卷烟机",
        "bomnodepk":2,
        "bompk":1,
        "bomversionpk":1,
        "child_nodes":[
            {
                "bomnodecd":"1401",
                "bomnodename":"YJ112供料成条机",
                "bomnodepk":3,
                "bompk":1,
                "bomversionpk":1,
                "child_nodes":[
                    {
                        "bomnodecd":"140101",
                        "bomnodename":"机架和机壳",
                        "bomnodepk":4,
                        "bompk":1,
                        "bomversionpk":1,
                        "child_nodes":[
                            {
                                "bomnodecd":"14010101",
                                "bomnodename":"机架",
                                "bomnodepk":6,
                                "bompk":1,
                                "bomversionpk":1,
                            }
                        ],
                       
  
                    }
                ],
        
            }
        ],
     
    }
]
    </pre>
  </div>
</template>
<script>
import { transfer_tree } from '@/assets/json/transferTree'
export default {

  data() {
    return {
      globalData: [
        { keyName: 'A1', key: '1' },
        { keyName: 'A2', key: '3' },
        { keyName: 'A3', key: '32' },
        { keyName: 'A4', key: '5' },
        { keyName: 'A5', key: '6' },
        { keyName: 'A6', key: '21' }
      ],
      pre: [
        [{
          key: "vbatchno",
          value: "A1"
        }, {
          key: "dbilldate",
          value: "2020-12-31"
        },
        {
          key: "partitoin_time",
          value: "1609862994625"
        }, {
          key: "pk_subctaskapply",
          value: "0001G9100000002ERG1Z"
        }, {
          key: "cinwarehouseid",
          value: "1001G9100000001OC1VY"
        }, {
          key: "pk_subctask",
          value: "0001G9100000002K3UQ8"
        }
        ],
        [
          {
            key: "vbatchno",
            value: "A2"
          },
          {
            key: "pk_inoutbill",
            value: "0001G9100000002V3C45"
          },
          {
            key: "csubvendormagid",
            value: "0001A110000000001U7R"
          },
          {
            key: "nouttotalauximeasnum",
            value: "26923"
          },
          {
            key: "cvendorid",
            value: "0001A110000000000DGK"
          },
        ],
        [
          {
            key: "pk_inoutbill",
            value: "0001G9100000002V3C45"
          },
          {
            key: "csubvendormagid",
            value: "0001A110000000001U7R"
          },
          {
            key: "nouttotalauximeasnum",
            value: "26923"
          },
          {
            key: "cvendorid",
            value: "0001A110000000000DGK"
          },
        ]
      ],

      attrName: [
        {
          专业类别: "A5",
          机型: "A6",
          标准名称: "A3",
          点检类型: "A4",
          版本号: "A1",
          状态: "A2",
        },
        {
          专业类别: "B5",
          机型: "B6",
          标准名称: "B3",
          点检类型: "B4",
          版本号: "B1",
          状态: "B2",
        },
        {
          专业类别: "C5",
          机型: "C6",
          标准名称: "C3",
          点检类型: "C4",
          版本号: "C1",
          状态: "C2",
        },
        {
          专业类别: "D5",
          机型: "D6",
          标准名称: "D3",
          点检类型: "D4",
          版本号: "D1",
          状态: "D2",
        }
      ],
      columns: [
        {
          title: "版本号",
          align: 'center',
          key: 'name1'
        },
        {
          title: "状态",
          align: 'center',
          key: 'name2'
        },
        {
          title: "标准名称",
          align: 'center',
          key: 'name3'
        },
        {
          title: "点检类型",
          align: 'center',
          key: 'name4'
        },
        {
          title: "专业类别",
          align: 'center',
          key: 'name5'
        },
        {
          title: "机型",
          align: 'center',
          key: 'name6'
        },
      ],
      runIn: [
        {
          "bomnodecd": "14",
          "bomnodename": "ZJ112卷烟机",
          "bomnodepk": 2,
          "bompk": 1,
          "bomversionpk": 1,
          "child_nodes": [
            {
              "bomnodecd": "1401",
              "bomnodename": "YJ112供料成条机",
              "bomnodepk": 3,
              "bompk": 1,
              "bomversionpk": 1,
              "child_nodes": [
                {
                  "bomnodecd": "140101",
                  "bomnodename": "机架和机壳",
                  "bomnodepk": 4,
                  "bompk": 1,
                  "bomversionpk": 1,
                  "child_nodes": [
                    {
                      "bomnodecd": "14010101",
                      "bomnodename": "机架",
                      "bomnodepk": 6,
                      "bompk": 1,
                      "bomversionpk": 1,
                    }
                  ],
                }
              ],
            }
          ],
        }
      ]
    }
  },
  methods: {
    //递归查询数据
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
    },
    //格式转化
    formatConversion(jsonStr) {
      let nodeAll = []
      jsonStr.forEach((item) => {
        let obj = {}
        item.map((v, index) => {
          obj[v.key] = v.value
          return Object.assign({}, obj);
        });
        nodeAll.push(obj)
      });
      return nodeAll
    },

    //增加一个key属性，找到跳出循环
    addattr(nodeData, global) {
      for (var i = 0; i < nodeData.length; i++) {
        for (var j = 0; j < global.length; j++) {
          if (nodeData[i].vbatchno == global[j].keyName) {
            nodeData[i].key = global[j].key
            break;
          } else {
            nodeData[i].key = null
          }
        }
      }
      return nodeData
    },

    //
    modifyField(excelBody) {
      let curAry = []
      excelBody.map((excelItem, idx) => {
        let curRow = {}
        this.columns.map((tableItem, index) => {
          //循环属性
          Object.keys(excelItem).map((attrName, i) => {
            if (tableItem.title == attrName) {
              Object.assign(curRow, {
                [tableItem.key]: excelItem[attrName],
              });
            }
          })
        })
        if (Object.keys(curRow).length > 0) {
          curRow['errAry'] = new Array()
          curAry.push(curRow)
        }
      })
      console.log(666, curAry)

      return curAry
    },
    //判断数据类型
    isType(value) {
      var reg = new RegExp("^\\[object " + 'Date' + "\\]$", "i");
      return reg.test(Object.prototype.toString.call(value));
    },

    //递归下钻增加属性
    handrunIn(runVal) {
      runVal.child_nodes.forEach(item => {
        item.a_wxk_bomnodecd = item.bomnodecd;
        item.a_wxk_bomnodename = item.bomnodename;
        item.a_wxk_bomnodepk = item.bomnodepk;
        item.a_wxk_bompk = item.bompk;
        item.a_wxk_bomversionpk = item.bomversionpk;
        item.a_wxk_child_nodes = item.child_nodes ? item.child_nodes : []; //解决下面如果最后一层没有child_nodes 就不会有length报错问题
        if (item.a_wxk_child_nodes.length == 0) { 
          return
        }
        this.handrunIn(item)
      })
      return runVal
    },

  },
  async mounted() {
    var data = await this.filterNode(transfer_tree, '第四层 1-1-1')
    console.log(data)

    //铺平数据
    let arr = [[{ id: 1, name: '小红' }], [{ id: 1, name: '蓝色' }], [{ id: 1, name: '小黄' }]]
    let newAry = arr.flat()


    //格式转化
    let pre = this.formatConversion(this.pre)
    console.log(pre)

    //添加属性
    let box = this.addattr(pre, this.globalData)
    console.log(box)

    //替换属性名
    let field = this.modifyField(this.attrName)
    console.log(field)

    let runData = this.handrunIn({ child_nodes: this.runIn })
    console.log(runData)
  }
}
</script>
 
<style lang="less" scoped>
</style>