<template>
  <div class="contarent" ref="contarentDom">
    <ul ref="listDom" class="list">
      <li v-for="(item,index) in wholeList" :key="index"><img :src="item.img" alt=""></li>
    </ul>
    <div class="home-box">
      <div style="background: #fdfbde">
        <div class="marquee">
          <div class="marquee_box">
            <ul class="marquee_list" :class="{marquee_top:animate}">
              <li v-for="(item, index) in announcementArr" :key="index">
                <span>{{item}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  </div>
</template>
<script>
export default {
  name: '',
  props: {
  },
  components: {

  },
  data() {
    return {
      announcementArr: [],
      animate: false,
      timer: null,
      timer2: null,
      wholeList: [
        { id: 3, img: '' },
        // { id: 2, img: '' },
        // { id: 1, img: '' },
      ]
    }
  },
  methods: {
    addKeyFrames(y = '-600px') {
      var style = document.createElement("style");
      style.type = "text/css";
      style.id = "add-style-id";
      var keyFrames =
        "\
    @keyframes rowup {\
        0% {\
          transform: translate3d(A_DYNAMIC_VALUE,0 , 0);\
        }\
        100% {\
          transform: translate3d(0, 0, 0);\
        }\
    }";

      style.innerHTML = keyFrames.replace(/A_DYNAMIC_VALUE/g, y);
      document.getElementsByTagName("head")[0].appendChild(style);
      //删除
      this.timer2 = setTimeout(function () {
        document.getElementsByTagName('head').item(0).removeChild(document.getElementById('add-style-id'))
      }, 4000)
    },
    addAnnouncement() {
      this.announcementArr = ['测试滚动001', '测试滚动002', '测试滚动003', '测试滚动004']
    },
    showMarquee() {
      this.animate = true;
      setTimeout(() => {
        this.announcementArr.push(this.announcementArr[0]);
        this.announcementArr.shift();
        this.animate = false
      }, 1000)
    }
  },
  mounted() {
    let _this = this
    this.addAnnouncement();

    setInterval(this.showMarquee, 2000);
    //插入动画
    let number = 0
    // this.timer = setInterval(function () {
    //   // 任务
    //   _this.addKeyFrames("-" + _this.wholeList.length * 600 + "px");
    //   _this.wholeList.unshift({ id: _this.wholeList.length + 1, img: require(`../../assets/images/yansi/banner${2}.jpg`) })
    //   number += 3
    //   document.querySelector(".contarent ul").style.animation = `rowup ${number}s  linear infinite  50ms normal`;
    // }, 3000)

  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.timer2) {
      clearInterval(this.timer2);
    }

  }
}
</script>

<style scoped lang='less'>
.contarent {
  width: 100%;
  height: 100%;
  width: 600px;
  height: 420px;
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid #ccc;
  position: relative;
  .list {
    list-style: none;
    display: flex;
    justify-content: flex-start;
    // position: absolute;
    // right: 0;
    li {
      img{
        width: 100%;
        height: 100%  ;
      }
      flex-shrink: 0;
      width: 600px;
      height: 400px;
      background: pink;
      display: flex;
      justify-content: center;
      align-items: center;
      // display: inline-block;
      span {
        font-size: 70px;
      }
    }
  }
}

.home {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.home-box {
  width: 200px;
  height: 200px;
}
.marquee {
  width: 100%;
  height: 30px;
  align-items: center;
  color: #3a3a3a;
  background-color: #fdfbde;
  display: flex;
  box-sizing: border-box;
}

.marquee_box {
  display: block;
  position: relative;
  width: 60%;
  height: 30px;
  overflow: hidden;
}

.marquee_list {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}

.marquee_top {
  transition: all 0.5s;
  margin-top: -30px;
}

.marquee_list li {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  padding-left: 20px;
}

.marquee_list li span {
  padding: 0 2px;
  color: #f1543a;
}
</style>