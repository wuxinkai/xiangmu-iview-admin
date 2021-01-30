const plugins = {
  install(Vue, binding) {
    Vue.directive('throttle', {
      bind: function (binding, vnode) {
        //获取当前参数
        let [el, ...others] = arguments
        //进入
        el.addEventListener('click', (data) => {
          console.log(el, binding, vnode)
          el.style.pointerEvents = 'none';
          if (!el.disabled) {
            setTimeout(() => {
              el.style.pointerEvents = 'auto';
            }, 10000);
          }
        });
      }
    })
  }
}
export default plugins