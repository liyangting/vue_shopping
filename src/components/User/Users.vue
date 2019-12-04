<template>
	<div id="User">
		
		
	
		<el-card><!--卡片-->	
		<el-breadcrumb separator="/">	<!--面包屑导航-->
			  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
			
			  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
			  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		
		
			
			<el-row :gutter="40">
				<el-col :span="12">								
					<el-input placeholder="请输入内容" v-model="input1" >
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</el-col>
				<el-col :span="6">
					  <el-button type="primary" plain>搜索</el-button>
				</el-col>
				
			</el-row>
		
		
		<!--表格栏-->
		<el-table :data="tableData" style="width: 100%" border>
			<!--表头-->
			<el-table-column prop="name" label="姓名" width="180"></el-table-column>							
			<el-table-column prop="date" label="日期" width="180"></el-table-column>			
			<el-table-column prop="address" label="地址" width="300"></el-table-column>
			
			
				
				
				
			<!--按钮-->
			<el-table-column fixed="right" label="操作" >
				<template slot-scope="scope">
					<el-button type="primary" plain>编辑</el-button>
					<el-button type="danger" plain>删除</el-button>
				</template>
			</el-table-column>			
		</el-table>
		</el-card>
		
		<el-pagination background layout="prev, pager, next" :total="60" ></el-pagination>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				input1:'111',
				tableData: [
					{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					}, 
					{
						date: '2016-05-04',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1517 弄'
					}, 
					{
						date: '2016-05-01',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1519 弄'
					}, 
					{
						date: '2016-05-03',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1516 弄'
					},
					{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					},
					{
						date: '2016-05-01',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1519 弄'
					}, 
					
				],
				
				
			}
	}
}
</script>

<style scoped>
	#User {
		height: 100%;
	}
	.el-card{
		margin: 0px 0;
	}
	.el-pagination {
		margin: 20px 0;
		position: absolute;
		left: 50%;
		transform: translate(-50%);
	}
	.el-breadcrumb {
		margin-bottom: 15px;
	}
	.el-row {
		margin: 10px 0;
	}
</style>