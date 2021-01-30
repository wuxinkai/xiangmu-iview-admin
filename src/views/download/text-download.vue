<template>
  <div>
    <Button size="small" class="tables-row-btn" @click="handleData()">下载转成文本</Button>
    <Button size="small" class="tables-row-btn" @click="handleHtmlData()">下载转成html</Button>
  </div>
</template>
<script>

import download from 'downloadjs'
export default {
  name: '',
  data() {
    return {
      planlist: [
        {
          plan_periods: "别克",
          final_cut_off: "英朗",
          plan_result: "1.5L",
          forecast_code: "34469"
        },
        {
          plan_periods: "五菱",
          final_cut_off: "宏光MINI EV",
          plan_result: "0.0L",
          forecast_code: "31368"
        },
        {
          plan_periods: "日产",
          final_cut_off: "轩逸",
          plan_result: "1.6L",
          forecast_code: "29317"
        },
        {
          plan_periods: "丰田",
          final_cut_off: "卡罗拉",
          plan_result: "1.2T",
          forecast_code: "28102"
        },
        {
          plan_periods: "哈弗",
          final_cut_off: "哈弗H6",
          plan_result: "1.5T",
          forecast_code: "26618"
        }
      ]

    }
  },
  methods: {
    //点击下载按钮
    handleData() {
      var planarr = ''
      var dlText = '下载文本名字'
      this.planlist.forEach(item => {
        planarr += item.plan_periods + ' ' + item.final_cut_off + ' ' + item.plan_result + ' ' + item.forecast_code + '\r\n'
      })
      download(planarr.toString(), dlText, "text/plain");
    },
    //下载成html
    handleHtmlData() {
      download(document.documentElement.outerHTML, "dlHTML.html", "text/html");
    },
  },
  mounted() { }
}
</script>