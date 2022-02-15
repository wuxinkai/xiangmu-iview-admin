<template>
  <div class="canlendar">
    <div class="row">
      <table>
        <thead>
          <tr>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
            <th>11</th>
            <th>12</th>
            <th>13</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tr,index) in trs">
            <td v-for="(td,index) in tr"  :colspan="td.colspan" :class="[{'schedule':td.title!=''}, td.className ]">
              <div v-if="td.title!=''">{{td.title}}</div>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
    <div class="row"> </div>
    <div class="row"> </div>
    <div class="row"> </div>
    <div class="row"> </div>
  </div>
</template>

<script>
import dataJson from "./data2.js";
export default {
  name: "timeline",
  data() {
    return {
      trs: [],
    };
  },
  mounted() {
 
    this.trs = dataJson;
    debugger;
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.canlendar {
  width: 1000px;
  margin: 100px auto 0;
  height: 600px;
  border: 1px solid #ccc;
  .row {
    height: 120px;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
  }
  table {
    width: 100%;

    thead {
      width: 100%;
    }
    tr {
      height: 33.33%;
    }
    th,
    td {
      width: 14.2857%;
    }
    .schedule {
      padding: 1px 4px;
      background: rgb(175, 173, 174);
      border-radius: 50px;
      color: #fff;
    }
    .waring{
        background: #ff9900;
    }
    .error{
      background: #ed4014;
    }
    .success{
      background: #19be6b;
    }
    .info{
      background: #2db7f5;
    }
  }
}
</style>