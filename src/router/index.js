import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/User/User.vue'
import Usergl from '../components/juese/usergl.vue'
import userqx from '../components/juese/userqx.vue'
const routes = [
	{path:'/',redirect:'/login'},
	{path:'/login',component:login},
	{
		path:'/home',
		component:Home,
		redirect:'/welcome',
		children:[
			{path:'/welcome',component:Welcome},
			{path:'/user',component:User},
			{path:'/usergl',component:Usergl},		
			{path:'/userqx',component:userqx}		
		]
	}
]

const router = new VueRouter({
  routes
})

export default router
