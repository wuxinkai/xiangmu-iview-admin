<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>

    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="用户访问来源"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="每周用户活跃量" />
        </Card>
      </i-col>

    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <Button @click="getData(1)" type="primary">新增1</Button>
      <Button @click="getData(2)" type="primary">新增2</Button>
      <Button @click="getData(3)" type="primary">新增3</Button>

    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <Button @click="setspan(true)" type="primary">大</Button>
      <Button @click="setspan(false)" type="primary">小</Button>

    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <!-- <transition name="fade">
        <i-col :lg="oSpan" style="margin-bottom: 20px;" v-for="(item, index) in addCardList" :key="index">
          <Card shadow>
            <div>{{item.label}}</div>
            <chart-bar v-if="item.value==1" ref="char1" style="height: 300px;" :value="barData" text="每周用户活跃量" />
            <chart-pie v-if="item.value==2" ref="char2" style="height: 300px;" :value="pieData" text="用户访问来源"></chart-pie>
            <chart-line v-if="item.value==3" ref="char3" style="height: 300px;" :value="barData" text="用户访问来源"></chart-line>
          </Card>
        </i-col>
      </transition> -->

      <i-col :lg="oSpan" style="margin-bottom: 20px;" v-for="(item, index) in addCardList" :key="index">
        <Card shadow>
          <div class="head"><span>{{item.label}}</span>
            <Icon @click="hanleDelete(item,index)" type="md-close" />
          </div>
          <chart-bar v-if="item.value==1" ref="char1" style="height: 300px;" :value="item.chartsData" text="每周用户活跃量" />
          <chart-pie v-if="item.value==2" ref="char2" style="height: 300px;" :value="item.chartsData" text="用户访问来源"></chart-pie>
          <chart-line v-if="item.value==3" ref="char3" style="height: 300px;" :value="item.chartsData" text="用户访问来源"></chart-line>
        </Card>
      </i-col>

    </Row>
  </div>
</template>

<script>
import InforCard from '@/components/info-card/info-card'
import { ChartPie, ChartBar, ChartLine } from '@/components/charts'
import { mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'home',
  components: {
    InforCard,
    ChartPie,
    ChartBar,
    ChartLine
  },
  data() {
    return {
      oSpan: 12,
      addCardList: [],
      cardList: [
        { value: 1, label: "时域图", chaType: "Line", chartsData: {} },
        { value: 2, label: "频域图", chaType: "Line", chartsData: {} },
        { value: 3, label: "轴心轨迹图", chaType: "Line", chartsData: {} },
        { value: 4, label: "时间三维图", chaType: "Line", chartsData: {} },
        { value: 5, label: "包络谱", chaType: "Line", chartsData: {} },
      ],
      inforCardData: [
        {
          title: '新增用户',
          icon: 'md-person-add',
          count: 803,
          color: '#2d8cf0'
        },
        { title: '累计点击', icon: 'md-locate', count: 232, color: '#19be6b' },
        {
          title: '新增问答',
          icon: 'md-help-circle',
          count: 142,
          color: '#ff9900'
        },
        { title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14' },
        {
          title: '新增互动',
          icon: 'md-chatbubbles',
          count: 12,
          color: '#E46CBB'
        },
        { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      pieData: [
        { value: this.uniqueId(), name: '直接访问' },
        { value: this.uniqueId(), name: '邮件营销' },
        { value: this.uniqueId(), name: '联盟广告' },
        { value: this.uniqueId(), name: '视频广告' },
        { value: this.uniqueId(), name: '搜索引擎' }
      ],
      barData: {
        Mon: this.uniqueId(),
        Tue: this.uniqueId(),
        Wed: this.uniqueId(),
        Thu: this.uniqueId(),
        Fri: this.uniqueId(),
        Sat: this.uniqueId(),
        Sun: this.uniqueId()
      }
    }
  },
  mounted() {
    //

    console.log(this)
  },
  methods: {
    ...mapMutations(['setSpanData']),
    //
    uniqueId() {
      var num = '';
      for (var i = 0; i < 3; i++) {
        num += Math.floor(Math.random() * 10);
      }
      return num
    },
    async setpar() {
      let p = await new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve('要返回的数据可以任何数据例如接口返回数据');
        }, 2000);
      });
      return p
    },
    //获取数据
    getData(data) {
      let _this = this
      _this.barData = {
        Mon: this.uniqueId(),
        Tue: this.uniqueId(),
        Wed: this.uniqueId(),
        Thu: this.uniqueId(),
        Fri: this.uniqueId(),
        Sat: this.uniqueId(),
        Sun: this.uniqueId()
      }
      if (data == 1 || data == 3) {


      } else if (data == 2) {
        this.barData = [
          { value: this.uniqueId(), name: '直接访问' },
          { value: this.uniqueId(), name: '邮件营销' },
          { value: this.uniqueId(), name: '联盟广告' },
          { value: this.uniqueId(), name: '视频广告' },
          { value: this.uniqueId(), name: '搜索引擎' }
        ]
      }
      let curitem = this.cardList.find(
        v => v.value == data
      )

      curitem.chartsData = this.barData
      this.addCardList.push(curitem)
    },
    //分栏
    setspan(flag) {
      this.oSpan = flag ? 24 : 12
      this.setSpanData(this.oSpan)
    },
    //删除
    hanleDelete(item, index) {
      this.addCardList.splice(index, 1);
    }
  }
}
</script>

<style lang="less">
.count-style {
  font-size: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
  opacity: 0;
}
.head {
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
}
</style>
