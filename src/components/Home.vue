<template>
	<div class="home">

		<el-container>
			<!--头部-->
			<el-header>
			
					<img src="../assets/120.jpg" class="homeImg" />
					<span class="homtText">电商后台管理系统</span>
			
				<el-button round @click='btnlogin'>退出登录</el-button>
			</el-header>

			<el-container>
				<!--左边栏-->
			
				<el-aside :width="flag?'64px':'200px'">
				  
				<el-menu :unique-opened="true" unique-opened :collapse="flag" :collapse-transition="false" router  :default-active="path">
									<!--//-->
					<div class="homgtogger">
						<i class="el-icon-remove-outline i-togger" @click="togger"></i>
					</div>
						<!--第一个-->
						
						
				<!--:index="item.id+''"  item.id是数值，加一个空字符串变成字符串-->
				<el-submenu :index="item.id+''" v-for='item in menusArr' :key='item.id'>
					<template slot="title">
						<!--一级菜单的图标-->
						<i :class="icons[item.id]"></i>
						<!--一级菜单的内容-->
						<span>{{item.authName}}</span> 
					</template>
						<!--二级菜单-->
					<el-menu-item :index="childrenItem.path" v-for='childrenItem in item.children' @click='setPath(childrenItem.path)'>
						<template slot="title">
							
							<span>{{childrenItem.authName}}</span>
						</template>
					</el-menu-item>
							
				</el-submenu>
					
					</el-menu>
				</el-aside>
				<!--右侧边栏-->
				<el-main>

					<router-view></router-view>
				</el-main>
			</el-container>

		</el-container>
		
			
	

	</div>
</template>

<script>
	export default {
		data() {
			return {
				flag: false,
				menusArr:[],
				path:'',
				icons:{
					125:'iconfont icon-guanlingyonghuguanli',
					103:'iconfont icon-jueseguanli',
					101:'iconfont icon-shangpinliebiao1',
					102:'iconfont icon-icon_username_real',
					145:'iconfont icon-shujutongji',
				
					
				}
			}
		},
		methods: {
			togger() {
				this.flag = !this.flag
			},
			btnlogin(){//退出按钮事件
				
				//先清除本地的token
				window.sessionStorage.removeItem('token')
				//让页面回到login
				this.$router.push('/logon')
			},
			//获取左边权限的数据方法
			async getmenus(){
				const {data:ret} = await this.$http.get('menus')
				//console.log( ret.data ) //拿到的是一个数组
				this.menusArr =  ret.data 
			},
			//点击当前的二级菜单高亮显示
			//保存链接的激活状态
			setPath(path){ 
				console.log(path) //拿到二级菜单的path
				window .sessionStorage.setItem('path',path)//拿到的path进行本地存储
				//再赋值给this.path
				this.path = path
			}
		},
		created(){
			this.getmenus() //当页面一加载时左边的列表直接渲染出来
			this.path = window .sessionStorage.getItem('path')
		}
		
		
		/*1. 动态渲染左边的菜单栏
		2.退出按钮事件
			先清除本地存储的token 
			window.sessionStorage.removeItem('token')
			让页面回到login登录页面 
			this.$router.push('/logon')
			
		3.解决二级菜单的当前高亮显示
			触发二级菜单的点击事件
		原理:每次点击的二级菜单的地址存储在本地中,当页面一加载时将存储的地址赋值给this.path*/
		
	}
</script>

<style scoped>
	.home {
		/*width: 100%;*/
		height: 100%;
		background-color: #F2F6FC;
	}
	
	.el-menu {
		border-right: 0!important;
		height: 100%;
		/*background-color: #0e2021c7;*/
		
	}
	.el-menu-item {
		margin-left: 20px;
	}
	.el-container {
		height: 100%;
	}
	
	.el-header {
		height: 70px!important;
		background-color: #0e2021c7;
		/*display: flex;*/
	
		
	}
	.el-button {
		float: right;
		margin-top: 15px;
	}
	.el-aside {
		/*background-color: #334c4e;*/
		/*background-image: linear-gradient(#334c4e,#fff);*/
	}
	
	.el-main {
		background-color: #F5F2F0
	}
	
	.homeImg {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		margin-left: 20px;
		margin-top: 5px;
	}
	
	.homtText {
		color: #fff;
		font-weight: bold;
		font-size: 26px;
		vertical-align: top;
		line-height: 60px;
		margin-left: 20px;
		letter-spacing: 6px;
		text-shadow: 5px 5px 5px rgba(28, 28, 28, .6)
	}
	
	.homgtogger {
		width: 100%;
		height: 25px;
		display: flex;
		justify-content: flex-end;
	}
	.iconfont {
		margin-right: 8px;
	}
</style>