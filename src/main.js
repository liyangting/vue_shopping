import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../public/login.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//阿里的图标库
import '../public/font/iconfont.css'
import '../public/font/iconfont.js'

//vue-table-with-tree-grid 插件
import ZkTable from 'vue-table-with-tree-grid'
Vue.component('tree', ZkTable)
//Vue.use(ZkTable)
//引用axios,发送ajax
import axios from 'axios'
//路径配置 固定写法
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

//将axios挂载在原型对象上，之后就可以直接使用this.$http
Vue.prototype.$http = axios
//有权限的api添加token
axios.interceptors.request.use( config =>{
		//为请求头,添加token验证Authorization字段
//		console.log(config)
		config.headers.Authorization = window.sessionStorage.getItem('token');
		return config;
})


Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
