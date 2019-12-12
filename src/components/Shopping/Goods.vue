<template>
	<div id="goods">
		<!--<h1>商品列表页面</h1>-->
		<el-card>		
			<!--面包屑导航-->
			<el-breadcrumb separator="/">	
				  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>			
				  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
				  <el-breadcrumb-item>商品列表</el-breadcrumb-item>
			</el-breadcrumb>
			
			<!--添加商品按钮-->
			<el-button  type="primary" plain @click="addgoods = true">添加商品</el-button>
			
			
			<!--表格-->
			<el-table  :data="goodsList" style="width: 100%" border>
			<!--表头-->
				<el-table-column label="#" type="index"></el-table-column>							
				<el-table-column label="商品名称" prop='goods_name'></el-table-column>							
				<el-table-column label="商品重量" prop='goods_weight'></el-table-column>							
				<el-table-column label="商品数量" prop='goods_number'></el-table-column>							
				<el-table-column label="商品状态" prop='goods_state'>
					<!--作用域插槽-->
					<template slot-scope="scope">
						<!--<pre>
							
							{{scope.row}}
						</pre>-->
						<el-tag type="success" v-if='scope.row.goods_state == 0'>未通过</el-tag>					
						<el-tag type="warning" v-else-if='scope.row.goods_state == 1'>审核中</el-tag>
						<el-tag type="danger" v-else>已审核</el-tag>
						
					</template>
				</el-table-column>		
				
			</el-table>
		</el-card>	
		
		<el-dialog title="添加商品" :visible.sync="addgoods" width="30%">
			<el-form ref="cateRef" :model="goodsList" label-width="80px">
				<!--角色名称-->
	            <el-form-item label="分类名称">
					<el-input v-model="goodsList.goods_name"></el-input>
				</el-form-item>
				<!--角色描述-->
				<!--<el-form-item label="角色描述">
					<el-input v-model="rolesData.roleDesc"></el-input>
				</el-form-item>-->
			</el-form>
		  <span slot="footer">
		    <el-button @click="addgoods = false">取 消</el-button>
		    <el-button type="primary" @click="addCate">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				//商品列表数据
				goodsList:[],
				gateData: {
					query:'',
					//当前页码
					pagenum:1,
					//每页显示条数
					pagesize:5,
					
				},
			}
		},
		methods:{
			//获取商品列表的方法
			async setGoodsList(){
				const {data:ret} = await this.$http.get('goods',{
					params:this.gateData
				})
		    	if(ret.meta.status !== 200) return this.$message.error(ret.meta.msg)
				console.log(ret)
				this.goodsList = ret.data.goods
			}
			
		},
		created(){
			this.setGoodsList()
		}
	}
</script>

<style scoped="scoped">
	.el-button {
		margin-bottom: 10px;
	}
</style>