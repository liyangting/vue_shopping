<template>
	<div class="home">

		<el-container>
			<!--头部-->
			<el-header>
				<img src="../assets/120.jpg" class="homeImg" />
				<span class="homtText">电商后台管理系统</span>

			</el-header>

			<el-container>
				<!--左边栏-->
			
				<el-aside :width="flag?'64px':'200px'">
					<div class="homgtogger">
						<i class="el-icon-remove-outline i-togger" @click="togger"></i>
					</div>
				
				<el-menu unique-opened :collapse="flag" :collapse-transition="false" router>
						<!--第一个-->
				<el-submenu index="1">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>用户管理</span>
							</template>

							<el-menu-item index="user">
								<template slot="title">
									<i class="el-icon-d-caret"></i>
									<span>用户列表</span>
								</template>
							</el-menu-item>
							
						</el-submenu>
						<!--第二个-->
					<el-submenu index="2">

							<template slot="title">
								<i class="el-icon-menu"></i>
								<span>权限管理</span>
							</template>

							<el-menu-item index="usergl">
								<template slot="title">
									<i class="el-icon-user"></i>
									<span>角色管理</span>
								</template>
							</el-menu-item>
							<el-menu-item index="userqx">
								<template slot="title">
									<i class="el-icon-more"></i>
									<span>权限管理</span>
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
		<el-container>
			
			<!--左边-->
		  <el-aside width="200px">
		  	
		  	
		  </el-aside>
		  
		  <!--右边-->
		  <el-main>Main</el-main>
		</el-container>

		
		
		
		
		

	</div>
</template>

<script>
	export default {
		data() {
			return {
				flag: false
			}
		},
		methods: {
			togger() {
				this.flag = !this.flag
			}
		}
	}
</script>

<style scoped>
	.home {
		/*width: 100%;*/
		height: 100%;
		/*background-color: #F2F6FC;*/
	}
	
	.el-menu {
		border-right: 0!important;
	}
	
	.el-container {
		height: 100%;
	}
	
	.el-header {
		background-color: #0e2021c7;
	}
	
	.el-aside {
		background-color: #fff;
	}
	
	.el-main {
		background-color: #F5F2F0
	}
	
	.homeImg {
		width: 58px;
		height: 58px;
		border-radius: 50%;
		margin-left: 20px;
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
	
</style>