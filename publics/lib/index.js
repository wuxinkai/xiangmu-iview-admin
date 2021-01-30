const plugins = {
  install(Vue, options) {
    Vue.directive('rotate', {
      // bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
      // inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
      // update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
      // componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
      // unbind：只调用一次，指令与元素解绑时调用。
      bind: function () {
        //获取当前参数
        let [el, ...others] = arguments
        //进入
        el.onmouseover = function () {
          el.style.display = 'inline-block'
          el.style.transition = 'all 1s'
          el.style.transform = 'rotateZ(360deg)'
        }

        //离开
        el.onmouseout = function () {
          el.style.transform = 'rotateZ(0deg)'
        }
        console.log(111, el)
      }
    })
  }
}
export default plugins