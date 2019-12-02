import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import login from '../components/Login.vue'
const routes = [
	{path:'/',redirect:'./login'},
	{path:'/login',component:login}
]

const router = new VueRouter({
  routes
})

export default router
