<template>
  <div class="canlendar">
    <div class="bg_box">
      <table>
        <thead>
          <tr>
            <th v-for="(item,theadIndex) in daynnamearr" :key="theadIndex">{{item}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in 6">
            <td v-for="item  in 7"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="schedule_box">
      <div class="row" v-for="index in 6">
        <table>
          <thead>
            <tr>
              <!-- 显示日期数字 -->
              <th v-for="_index  in 7">{{monthdata[index-1][_index-1]['day']}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tr in domData[index-1]">
              <td  v-for="td in tr" :class="{'schedule':td.title!=''}" :colspan="td.colspan">
                <div v-if="td.title" :class="['bar', td.className ]">{{td.title}} {{td.colspan}}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- <div class="row">☆</div>
      <div class="row">☆</div>
      <div class="row">☆</div>
      <div class="row">☆</div>
      <div class="row">☆</div> -->
    </div>
  </div>
</template>

<script>
import {monthfunc } from "./calendarAll2";

import monthdata from "./monthdata";
//  import 'fullcalendar' //专门做日历的
export default {
  name: "calendar",
  props: [],
  data() {
    return {
      // 中文星期名字
      daynnamearr: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      //数据
      monthdata: monthdata,
      //加工后的数据
      domData: [],
    };
  },
   mounted() {
   this.domData= monthfunc(monthdata)
   console.log( this.domData)
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.canlendar {
  width: 100%;
  height: 630px;
  margin: 0 auto;
  position: relative;
  .bg_box {
    width: 100%;
    height: 630px;
    // top: 30px;
    left: 0;
    position: absolute;
    table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #ccc;
      thead {
        tr {
          height: 30px;
        }
      }
      tbody {
        tr {
          height: 100px;
          td {
            border: 1px solid #ccc;
          }
        }
      }
    }
  }
  .schedule_box {
    position: absolute;
    width: 100%;
    top: 30px;
    .row {
      height: 100px;
      table {
        width: 100%;
        border: 1px solid transparent;
        border-collapse: collapse;
        thead {
          height: 20px;
          tr {
            height: 20px;
          }
          th {
            width: (100% /7);
            // width: 14.8%;
            text-align: right;
            box-sizing: border-box;
            padding: 6px 6px 0 0;
            font-size: 16px;
          }
        }
        tbody {
          width: 100%;
          border: 1px solid transparent;
          border-collapse: collapse;
          tr {
            td {
              padding: 0 2px;
              width: (100% /7);
              border: 1px solid transparent;
              &.schedule {
                .bar {
                  border-radius: 15px;
                  font-size: 12px;
                  border-radius: 50px;
                  padding: 2px 10px;

                  background: rgb(190, 189, 189);
                }
                .waring {
                  color: #fff;
                  background: #ff9900;
                }
                .error {
                  color: #fff;
                  background: #ed4014;
                }
                .success {
                  color: #fff;
                  background: #19be6b;
                }
                .info {
                  color: #fff;
                  background: #2db7f5;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>