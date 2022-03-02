import Main from '@/components/main/main'
/**
 * custom-frame中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/views/login/login.vue')
  },

  {
    path: '/keepAlive',
    name: 'keepAlive',
    meta: {
      icon: 'ios-bug',
      title: 'activeted'
    },
    component: Main,
    children: [{
      path: '/activeter',
      name: 'activeter',
      meta: {
        title: 'activeter作用 和单点登录',
        icon: 'md-home'
      },
      component: () => import('@/views/activeter/activeter.vue')
    }]
  },
  {
    path: '/socketJS',
    name: 'socketJS',
    meta: {
      icon: 'ios-bug',
      title: 'socketJS'
    },
    component: Main,
    children: [{
      path: '/socket',
      name: 'socket',
      meta: {
        title: 'socketJS的用法',
        icon: 'md-home'
      },
      component: () => import('@/views/socketJS/socket.vue')
    }]
  },
  {
    path: '/storeLasting',
    name: 'storeLasting',
    meta: {
      icon: 'ios-bug',
      title: '状态持久化'
    },
    component: Main,
    children: [{
        path: '/cache',
        name: 'cache',
        meta: {
          title: '状态持久化缓存',
          icon: 'md-home'
        },
        component: () => import('@/views/storeLasting/cache.vue')
      },
      {
        path: 'vuex',
        name: 'vuex',
        meta: {
          icon: 'ios-bug',
          title: 'vuex的存储'
        },
        component: () => import('@/views/storeLasting/vuex')
      }
    ]
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      notCache: true,
      title: '首页',
      icon: 'md-home'
    },
    children: [{
        path: '/home',
        name: 'home',
        meta: {
          title: 'home页面',
          icon: 'md-home'
        },
        component: () => import('@/views/single-page/home')
      },
      {
        path: '/tuaozhuai',
        name: 'tuaozhuai',
        meta: {
          title: '拖拽',
          icon: 'md-home'
        },
        component: () => import('@/views/single-page/tuaozhuai')
      },
      {
        path: '/vueImgPosition',
        name: 'vueImgPosition',
        meta: {
          title: '图片定位',
          icon: 'md-home'
        },
        component: () => import('@/views/single-page/vueImgPosition')
      },
      {
        path: '/backgroundImg',
        name: 'backgroundImg',
        meta: {
          title: '背景图动起来',
          icon: 'ios-bug'
        },
        component: () => import('@/views/single-page/backgroundImg.vue')
      },
      {
        path: '/banner',
        name: 'banner',
        meta: {
          title: '插入图片轮播效果',
          icon: 'ios-bug'
        },
        component: () => import('@/views/single-page/banner.vue')
      },
      {
        path: '/compressImage',
        name: 'compressImage',
        meta: {
          title: '图片压缩',
          icon: 'ios-bug'
        },
        component: () => import('@/views/single-page/compressImage')
      }
    ]
  },
  {
    path: '/comMethod',
    name: 'comMethod',
    meta: {
      icon: 'ios-bug',
      title: '常用方法'
    },
    component: Main,
    children: [{
        path: '/comFn',
        name: 'comFn',
        meta: {
          title: '常用方法comFn',
          icon: 'md-home'
        },
        component: () => import('@/views/comMethod/comFn.vue')
      }, {
        path: '/sortReduction',
        name: 'sortReduction',
        meta: {
          title: '排序还原',
          icon: 'md-home'
        },
        component: () => import('@/views/comMethod/sortReduction.vue')
      }, {
        path: '/author',
        name: 'author',
        meta: {
          title: '自定义循环',
          icon: 'md-home'
        },
        component: () => import('@/views/comMethod/author.vue')
      }, {
        path: '/animation',
        name: 'animation',
        meta: {
          title: 'animation动画',
          icon: 'md-home'
        },
        component: () => import('@/views/comMethod/animation.vue')
      },
      {
        path: '/sousuo',
        name: 'sousuo',
        meta: {
          title: '远程搜索',
          icon: 'md-home'
        },
        component: () => import('@/views/comMethod/sousuo.vue')
      },
      {
        path: '/animation2',
        name: 'animation2',
        meta: {
          title: '定位动画',
          icon: 'md-home'
        },
        component: () => import('@/views/comMethod/animation2.vue')
      },
      {
        path: '/bigMinGrid',
        name: 'bigMinGrid',
        meta: {
          title: '分组 大小标签问题',
          icon: 'md-home'
        },
        component: () => import('@/views/comMethod/bigMinGrid.vue')
      },
      {
        path: '/customFn',
        name: 'customFn',
        meta: {
          title: '自定义指令转全局组件',
          icon: 'md-home'
        },
        component: () => import('@/views/comMethod/customFn.vue')
      },
      {
        path: '/vxeTable',
        name: 'vxeTable',
        meta: {
          title: '手动引入表格插件',
          icon: 'md-home'
        },
        component: () => import('@/views/comMethod/vxeTable.vue')
      },
      {
        path: '/vxeRecursion',
        name: 'vxeRecursion',
        meta: {
          title: '设置日期',
          icon: 'md-home'
        },
        component: () => import('@/views/comMethod/vxeRecursion.vue')
      },
      {
        path: '/dayjs',
        name: 'dayjs',
        meta: {
          title: '日期插件',
          icon: 'md-home'
        },
        component: () => import('@/views/comMethod/dayjs.vue')
      },
      {
        path: '/codeChange',
        name: 'codeChange',
        meta: {
          title: '递归/增加属性/匹配',
          icon: 'md-home'
        },
        component: () => import('@/views/comMethod/codeChange.vue')
      },
      {
        path: '/nodeAjax',
        name: 'nodeAjax',
        meta: {
          title: '请求node的和ajax通讯',
          icon: 'md-home'
        },
        component: () => import('@/views/comMethod/nodeAjax.vue')
      }
    ]
  },
  {
    path: '/manymenu',
    name: 'manymenu',
    component: Main,
    meta: {
      icon: 'ios-bug',
      title: '多级菜单'
    },
    children: [{
        path: 'barcodeScanner',
        name: 'barcodeScanner',
        meta: {
          icon: 'ios-bug',
          title: '全局组件',
        },
        component: () => import('@/views/many-menu/barcodeScanner')
      },
      {
        path: 'many_menu_one',
        name: 'many_menu_one',
        meta: {
          icon: 'ios-bug',
          title: '一级菜单'
        },
        component: () => import('@/views/many-menu/manyMenu')
      },
      {
        path: 'many_menu_tow',
        name: 'many_menu_tow',
        meta: {
          icon: 'ios-bug',
          title: '菜单'
        },
        component: () => import('@/views/many-menu/manyMenu2')
      },
      {
        path: 'ExpressionList',
        name: 'ExpressionList',
        meta: {
          icon: 'ios-bug',
          title: '三个菜单'
        },
        component: () => import('@/views/many-menu/ExpressionList')
      },
    ]
  },
  {
    path: '/cycle-page',
    name: 'cycle-page',
    meta: {
      icon: 'ios-bug',
      title: '生命周期'
    },
    component: Main,
    children: [{
      path: 'cycle',
      name: 'cycle',
      meta: {
        icon: 'ios-bug',
        title: '生命周期'
      },
      component: () => import('@/views/cycle-page/cycle')
    }]
  },
  {
    path: '/canvasBox',
    name: 'canvasBox',
    meta: {
      icon: 'ios-bug',
      title: 'canvas图形编辑器'
    },
    component: Main,
    children: [{
        path: 'canvas-contant',
        name: 'canvas-contant',
        meta: {
          icon: 'ios-bug',
          title: 'canvas图形编辑器'
        },
        component: () => import('@/views/canvasBox/canvas-contant')
      },
      {
        path: 'canvas-rect',
        name: 'canvas-rect',
        meta: {
          icon: 'ios-bug',
          title: 'canvas图形编辑器2'
        },
        component: () => import('@/views/canvasBox/canvas-rect')
      },
      {
        path: 'canvas-spot',
        name: 'canvas-spot',
        meta: {
          icon: 'ios-bug',
          title: 'canvas显示不同的点在页面上'
        },
        component: () => import('@/views/canvasBox/canvas-spot')
      }, {
        path: 'drop-spot',
        name: 'drop-spot',
        meta: {
          icon: 'ios-bug',
          title: 'vue拖拽'
        },
        component: () => import('@/views/canvasBox/drop-spot')
      }
    ]
  },
  {
    path: '/download',
    name: 'download',
    meta: {
      icon: 'ios-bug',
      title: '下载'
    },
    component: Main,
    children: [{
        path: 'text-download',
        name: 'text-download',
        meta: {
          icon: 'ios-bug',
          title: 'text下载'
        },
        component: () => import('@/views/download/text-download')
      },
      {
        path: 'html-from-download',
        name: 'html-from-download',
        meta: {
          icon: 'ios-bug',
          title: 'html打印文件'
        },
        component: () => import('@/views/download/html-from-download')
      },
      {
        path: 'img-download',
        name: 'img-download',
        meta: {
          icon: 'ios-bug',
          title: '图片下载'
        },
        component: () => import('@/views/download/img-download')
      },
      {
        path: 'html-download',
        name: 'html-download',
        meta: {
          icon: 'ios-bug',
          title: 'html区域截图下载'
        },
        component: () => import('@/views/download/html-download')
      },
    ]
  },
  {
    path: '/echarts',
    name: 'echarts',
    meta: {
      icon: 'ios-bug',
      title: '插件的用法'
    },
    component: Main,
    children: [{
        path: 'maplg',
        name: 'maplg',
        meta: {
          icon: 'ios-bug',
          title: '对数据进行深度监听'
        },
        component: () => import('@/views/echarts/mapLG.vue')
      },
      {
        path: 'treeChajian',
        name: 'treeChajian',
        meta: {
          icon: 'ios-bug',
          title: '树插件'
        },
        component: () => import('@/views/treeChajian/treeChajian.vue')
      }
    ]
  },
  {
    path: '/example',
    name: 'example',
    component: Main,
    meta: {
      icon: 'ios-stats',
      title: 'table管理'
    },
    children: [{
        path: 'container',
        name: 'container',
        meta: {
          icon: 'ios-bug',
          title: '无缝滚动'
        },
        component: () => import('@/views/container2/container')
      },
      {
        path: 'desk',
        name: 'desk',
        meta: {
          icon: 'ios-bug',
          title: '无缝书桌定制'
        },
        component: () => import('@/views/container2/desk')
      },
      {
        path: 'bigData',
        name: 'bigData',
        meta: {
          icon: 'ios-bug',
          title: '大数据了量加载内容'
        },
        component: () => import('@/views/container2/bigData')
      },
      {
        path: 'somedelete',
        name: 'somedelete',
        meta: {
          icon: 'ios-bug',
          title: 'some删除功能'
        },
        component: () => import('@/views/container2/somedelete')
      },
      {
        path: 'list',
        name: 'list',
        meta: {
          title: 'demo列表',
          notCache: true,
          icon: 'md-grid'
        },
        component: () => import('@/views/example/list')
      },
      {
        path: 'page_list',
        name: 'page_list',
        meta: {
          title: '分页封装',
          notCache: true,
          icon: 'md-git-branch'
        },
        component: () => import('@/views/example/listpage')
      },
      {
        path: 'page_tao',
        name: 'page_tao',
        meta: {
          title: '表格嵌套',
          notCache: true,
          icon: 'md-git-branch'
        },
        component: () => import('@/views/example/listtao')
      },
      {
        path: 'dynamic_edit',
        name: 'dynamic_edit',
        meta: {
          title: '动态行',
          icon: 'md-trending-up'
        },
        component: () => import('@/views/example/dynamicedit')
      },
      {
        path: 'create',
        name: 'create',
        meta: {
          title: '添加',
          hideInMenu: true
        },
        component: () => import('@/views/example/edit')
      },
      {
        path: 'edit',
        name: 'edit',
        meta: {
          title: '编辑',
          hideInMenu: true
        },
        component: () => import('@/views/example/edit')
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    component: Main,
    meta: {
      icon: 'logo-buffer',
      title: '组件'
    },
    children: [{
        path: 'table_list',
        name: 'table_list',
        meta: {
          title: 'tables和导出excel功能',
          icon: 'md-git-branch'
        },
        component: () => import('@/views/example/listpage')
      },
      {
        path: 'editor_example',
        name: 'editor_example',
        meta: {
          title: '编辑器',
          icon: 'ios-create'
        },
        component: () => import('@/views/components-example/editor')
      },
      {
        path: 'file_upload',
        name: 'file_upload',
        meta: {
          title: '文件上传',
          icon: 'ios-document'
        },
        component: () => import('@/views/components-example/file-upload')
      },
      // {
      //   path: 'file_download',
      //   name: 'file_download',
      //   meta: {
      //     title: '文件下载',
      //     icon: 'md-clipboard'
      //   },
      //   component: () => import('@/views/components-example/file-download')
      // },
      {
        path: 'transfer_example',
        name: 'transfer_example',
        meta: {
          title: '穿梭框',
          icon: 'md-list'
        },
        component: () => import('@/views/components-example/transfer')
      },
      {
        path: 'transferTree',
        name: 'transferTree',
        meta: {
          title: '手写树结构穿梭框',
          icon: 'md-list'
        },
        component: () => import('@/views/components-example/transferTree')
      },
      {
        path: 'icons_example',
        name: 'icons_example',
        meta: {
          title: '图标',
          icon: 'icon-bear'
        },
        component: () => import('@/views/components-example/icons')
      },
      { //日历插件
        path: "calendar",
        name: "calendar",
        meta: {
          title: '日历',
          icon: 'icon-bear'
        },
        component: () => import('@/views/calendar/calendar.vue'),
      },
      { 
        path: "calendarAll",
        name: "calendarAll",
        meta: {
          title: '日历全部',
          icon: 'icon-bear'
        },
        component: () => import('@/views/calendar/calendarAll.vue'),
      },
      { 
        path: "calendaritem",
        name: "calendaritem",
        meta: {
          title: '日历单件',
          icon: 'icon-bear'
        },
        component: () => import('@/views/calendar/calendaritem.vue'),
      },
      { //日历插件
        path: "timeline",
        name: "timeline",
        meta: {
          title: '日历时间轴',
          icon: 'icon-bear'
        },
        component: () => import('@/views/calendar/timeline.vue'),
      },
    ]
  },
  {
    path: '/error_page',
    name: 'error_page',
    meta: {
      hideInBread: true,
      icon: 'ios-bug',
      title: '错误日志'
    },
    component: Main,
    children: [{
        path: 'error_store_page',
        name: 'error_store_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/views/error-page/error-store')
      },
      {
        path: 'error_logger_page',
        name: 'error_logger_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集',
          hideInMenu: true
        },
        component: () => import('@/views/single-page/error-logger')
      },
      
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/error-page/404.vue')
  },
  { //单点登录
    path: "/agent",
    name: "agent",
    component: (resolve) => require(["@/views/agent.vue"], resolve),
    meta: {},
  },
 
]