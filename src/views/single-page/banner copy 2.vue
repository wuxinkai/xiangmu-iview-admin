<template>
    <ul class="principal-swiper">
      <li v-for="item in HeadmasterStarList" :key="item.id">
            <img :src="'http://xusheng.manyunad.com'+item.image">
      </li>
  </ul>
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
      list: [
        { id: 1, img: '' },
        { id: 2, img: '' },
        { id: 3, img: '' },
      ]
    }
  },
  methods: {

  },
 mounted() {
    // this.$nextTick(_ => {
    //   this.settingEl = this.$refs.principal; //<div class="hot-wrap">..</div>
    //   this.docEl = document;
    // });
    let xTrans = [];
    anime.set(".principal-swiper", {
      translateX: function(el, i, l) {
        xTrans[i] = { x: i * 100 };
        return i * 100;
      }
    });

    anime({
      targets: xTrans,
      duration: 6000, //走一周持续时间
      easing: "linear",
      x: "+=200",
      loop: true,
      update: function(anim) {
        anime.set(".principal-swiper", {
          translateX: function(el, i, l) {
            return xTrans[i].x % 600;
          }
        });
      }
    });
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
.contarent {
  width: 100%;
  height: 100%;
  width: 600px;
  height: 420px;
  margin: 0 auto;
  overflow: auto;
  border: 1px solid #ccc;
  position: relative;
  .list {
    list-style: none;
    display: flex;
    justify-content: flex-start;
    position: absolute;
    li {
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
</style>