import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/User/Users.vue'

const routes = [
	{path:'/',redirect:'/login'},
	{path:'/login',component:login},
	{
		path:'/home',
		component:Home,
		redirect:'/welcome',
		children:[
			{path:'/welcome',component:Welcome},
			{path:'/users',component:Users},
				
		]
	}
]
const router = new VueRouter({
  routes
})
//路由导航守卫
router.beforeEach((to,from,next)=>{
	//beforeEach()接受三个参数
	//参数一:to 将要访问的路径
	//参数二:from 从哪里跳转的
	//参数三:next 放行(直接跳转)
	//如果用户想要访问登录login页面，没必要做任何验证，直接放行
	if(to.path == '/login') return next()
	//获取token 进行判断，
	const tokenData = window.sessionStorage.getItem('token')
	//console.log(tokenData)
	//如果不匹配就不能跳转 还是在login页面
	if(!tokenData) return next('/login')
	//否则就直接放行
	next()
})
export default router
