<template>
	<div id="Rights">
		<!--<h1>权限列表页面</h1>-->
		<!--卡片-->	
		<el-card>		
			<!--面包屑导航-->
			<el-breadcrumb separator="/">	
				  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>			
				  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
				  <el-breadcrumb-item>权限列表</el-breadcrumb-item>
			</el-breadcrumb>	
			<!--表格-->
			<el-table  :data="rightsList" style="width: 100%" border>
			<!--表头-->
				<el-table-column label="#" type="index"></el-table-column>							
				<el-table-column label="权限名称" prop='authName'></el-table-column>							
				<el-table-column label="路径" prop='path'></el-table-column>							
				<el-table-column label="权限等级" prop='level'>
					<!--作用域插槽-->
					<template slot-scope="scope">
						<el-tag type="success" v-if='scope.row.level == 0'>一级</el-tag>					
						<el-tag type="warning" v-else-if='scope.row.level == 1'>二级</el-tag>
						<el-tag type="danger" v-else>三级</el-tag>
						
					</template>
				</el-table-column>		
				
			</el-table>
		</el-card>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				rightsList:[]
			}
		},
		methods:{
			//获取所有权限列表的方法
			async getRightsList(){
				const {data:ret} = await this.$http.get('rights/list')
				console.log(ret)
				this.rightsList = ret.data
				console.log(this.rightsList)
			}
		},
		created(){
			//渲染页面
			this.getRightsList()
		}
	}
</script>

<style scoped>

</style>