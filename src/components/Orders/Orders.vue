<template>
	<div id="Orders">
		<!--<h1>订单列表页面</h1>-->
		<el-card class="box-card"
			
			<!--面包屑导航-->
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>订单管理</a></el-breadcrumb-item>
			  <el-breadcrumb-item>订单列表</el-breadcrumb-item>
			</el-breadcrumb>
			<!--搜索框-->
			 <el-input placeholder="请输入内容" v-model="ordersList.query" clearable @clear='getordersList' style="width: 500px;" >
  
  				<el-button slot="append" icon="el-icon-search" @click="getordersList">搜索</el-button>
  			</el-input>
			
			<!--表格-->
			<el-table :data="ordersList" style="width: 100%">
		      <el-table-column  label="#" type="index"> </el-table-column>
		      <el-table-column prop="order_number" label="订单编号" width="350"> </el-table-column>
		      
		      <el-table-column prop="order_price" label="订单价格" > 
		      
		      </el-table-column>
		      
		      <el-table-column prop="order_pay" label="是否付款" > 
		      		<el-tag type="warning" v-if="ordersList.order_pay = 1">未付款</el-tag>
		      		<el-tag  v-else>已付款</el-tag>
		      </el-table-column>
		      <el-table-column prop="is_send" label="是否发货" > </el-table-column>
		      <el-table-column prop="create_time" label="下单时间" > </el-table-column>
		      <el-table-column label="操作" > 
		      	<el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
		      	 <el-button type="success" icon="el-icon-location" size="mini"></el-button>
		      </el-table-column>
			</el-table>
			
			<!--分页-->
			 <el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="fenyeData.pagenum"
			      :page-sizes="[1, 2, 3, 4]"
			      :page-size="fenyeData.pagesize"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="total">
			</el-pagination>
		</el-card>
	</div>
</template>

<script>
	export default {
		data(){
			return {
//				列表数据
				ordersList:[],
				//分页
				fenyeData: {
					query:'',
					//当前页码
					pagenum:1,
					//每页显示条数
					pagesize:5,
					
				},
				total:0
			}
		},
		methods:{
			async getordersList(){
				const {data:ret} = await this.$http.get('orders',{
					params:this.fenyeData
				})
				if(ret.meta.status !== 200) return this.$message.error(ret.meta.msg)
//				console.log(ret.data)
				this.ordersList = ret.data.goods
				this.total = ret.data.total
			},
			handleSizeChange(val) {
//		        console.log(`每页 ${val} 条`);
		        this.fenyeData.pagesize = val
		        this.getordersList()
		    },
		   	handleCurrentChange(val) {
//		        console.log(`当前页: ${val}`);
		        this.fenyeData.pagenum = val
		        this.getordersList()
		    }
		},
		created(){
			this.getordersList()
		}
	}
</script>

<style scoped>
	.el-pagination {
		margin:  10px 0;
	}
</style>