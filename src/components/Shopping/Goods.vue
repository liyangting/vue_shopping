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
			
			<!--添加商品-->
		
			<el-row :gutter="40">
				<el-col :span="12">		
					<!--使用clearable属性即可得到一个可清空的输入框-->
					<el-input placeholder="请输入内容" v-model='gateData.query' clearable @clear='setGoodsList'>
						<el-button slot="append" icon="el-icon-search" @click='setGoodsList'></el-button>
					</el-input>
				</el-col>
				
				<el-col :span="6">
					  <el-button type="primary" plain  @click='addGoods'>添加商品  </el-button>
					 
					
				</el-col>				
			</el-row
			
			<!--表格-->
			<el-table  :data="goodsList" style="width: 100%" border>
			<!--表头-->
				<el-table-column label="#" type="index"></el-table-column>							
				<el-table-column label="商品名称" prop='goods_name'></el-table-column>							
				<el-table-column label="商品重量" prop='goods_weight'></el-table-column>							
				<el-table-column label="商品价格(元)" prop='goods_price'></el-table-column>							
				<el-table-column label="创建时间" prop='add_time'></el-table-column>							
				<el-table-column label="操作" >
					
					<el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
					  <el-button type="danger" icon="el-icon-delete"  size="mini"></el-button>
				</el-table-column>		
				
			</el-table>
		</el-card>	
		<!--添加商品弹框-->			

		<!--<el-dialog title="添加商品" :visible.sync="addgoods" width="30%">
			<el-form ref="cateRef" :model="goodsList" label-width="80px">
				角色名称
	            <el-form-item label="商品名称">
					<el-input v-model="goodsList.goods_name"></el-input>
				</el-form-item>-->-->
				<!---->
		<!--	</el-form>
		  <span slot="footer">
		    <el-button @click="addgoods = false">取 消</el-button>
		    <el-button type="primary" @click="addCate">确 定</el-button>
		  </span>
		</el-dialog>-->
		

		<!--分页-->
		<el-pagination 
				@size-change="handleSizeChange" 
				@current-change="handleCurrentChange"			
			      :current-page="gateData.pagenum"
			      :page-sizes="[1, 2, 3, 4,5,6]"
			      :page-size="gateData.pagesize"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="total">
		</el-pagination>
		 	
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
					pagesize:4,
					
				},
				addgoods:false,
				total:0
							
			}
		},
		methods:{
			//获取商品列表的方法
			async setGoodsList(){
				const {data:ret} = await this.$http.get('goods',{
					params:this.gateData
				})
		    	if(ret.meta.status !== 200) return this.$message.error(ret.meta.msg)
//				console.log(ret)
				this.goodsList = ret.data.goods
				console.log(this.goodsList)
				this.total = ret.data.total
			},
			//点击确定按钮的方法
			addCate(){
				/*const {data:ret} = await this.$http.post('goods',{
					/*goods_name:this.goodsList.goods_name,
					goods_cat:this.goodsList.goods_cat.jion(','),
					goods_price:this.goodsList.goods_price,
					goods_number:this.goodsList.goods_number,
					goods_weight:this.goodsList.goods_weight
*/
//				})
//				console.log(ret)
				this.addgoods=false
			},
				handleSizeChange(val){
				//每页显示的数量
//		        console.log(`每页 ${val} 条`);
				this.gateData.pagesize = val
				this.setGoodsList()
		    },
		    handleCurrentChange(val) {
		    	//当前页的改变
//		       	console.log(`当前页: ${val}`);
				this.gateData.pagenum = val 
				this.setGoodsList()
		    },
			addGoods(){
//				alert(1)
				this.$router.push('/goods/add')
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
	.el-pagination {
		margin: 30px 0;
		position: absolute;
		/*right: 80px;*/
		left: 50%;
		transform: translate(-50%);
	}
</style>