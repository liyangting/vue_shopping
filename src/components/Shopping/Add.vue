<template>
	<div id="add">
		<!--我是商品添加页面-->
		
		<el-card>		
			<!--面包屑导航-->
			<el-breadcrumb separator="/">	
				  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>			
				  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
				  <el-breadcrumb-item>添加商品</el-breadcrumb-item>
			</el-breadcrumb>
			
			<!--消息提示-->
			 <el-alert
				    title="添加商品信息"
				    type="info"
				    center
				    show-icon>
			</el-alert>
			<!--步骤条-->
			<!--:active="active - 0" 要的是数值的结果，'0' - 0 = 0-->
			<el-steps :space="200" :active="active - 0"  finish-status="success"  align-center>
			  	<el-step title="基本信息"></el-step>
			  	<el-step title="商品参数"></el-step>
			  	<el-step title="商品属性"></el-step>
			  	<el-step title="商品图片"></el-step>
			  	<el-step title="商品内容"></el-step>
			  	<el-step title="完成"></el-step>
			</el-steps>
			<!--标签页--> 
			<el-form label-position='top' :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" >
				<el-tabs @tab-click="tabClick" :before-leave="beforeLeave" tab-position='left' v-model='active'>
				    <el-tab-pane label="基本信息" name='0'>
				    	<!--商品名称-->
				    	<el-form-item label="商品名称" prop="goods_name">
						   	<el-input v-model="addForm.goods_name"></el-input>
						</el-form-item>
						<!--商品价格-->
						<el-form-item label="商品价格" prop="goods_price">
						   	<el-input v-model="addForm.goods_price"></el-input>
						</el-form-item>
						<!--商品重量-->
						<el-form-item label="商品重量" prop="goods_weight">
						   	<el-input v-model="addForm.goods_weight"></el-input>
						</el-form-item>
						<!--商品数量-->
						<el-form-item label="商品数量" prop="goods_number">
						   	<el-input v-model="addForm.goods_number"></el-input>
						</el-form-item>
						<!--级联选择器-->
						<el-form-item label="选择分类">
							<el-cascader
							    v-model="addForm.goods_cat"
							    :options="cateList"
							    :props="addProps"
							    @change="handleChange">
							</el-cascader>
						</el-form-item>						
				    </el-tab-pane>
				    
				    <el-tab-pane label="商品参数" name="1">
				    	<el-form-item :label="item.attr_name" v-for="item in manyCateList" :key="item.attr_id">
				    		<el-checkbox-group v-model="item.attr_vals">
   
						  		<el-checkbox :label="list" v-for="(list,i) in item.attr_vals" :key="i" border></el-checkbox>
						  	</el-checkbox-group>
						</el-form-item>
				    </el-tab-pane>
				    
				    <el-tab-pane label="商品属性" name='2'>
				    	<el-form-item :label="item.attr_name" v-for="item in onlyCateList" :key="item.attr_id">
				    		<el-input v-model='item.attr_vals'></el-input>
						</el-form-item>
				    	
				    </el-tab-pane>
				    <el-tab-pane label="商品图片">商品图片</el-tab-pane>
				    <el-tab-pane label="商品内容">商品内容</el-tab-pane>
				  
				</el-tabs>
			</el-form>
		</el-card>		
	</div>
</template>

<script>
	export default {
		data(){
			return {
				//步骤条当前的进度
				active:'0',
				//添加商品对象
				addForm:{
					goods_name:'',//商品名称
					goods_price:'',//商品价格
					goods_number:'',//商品数量
					goods_weight:'',//商品重量
//					分类列表
					goods_cat:[]
					
				},
				//验证规则
				addFormRules:{
					goods_name:[
						{ required: true, message: '请输入商品名称', trigger: 'blur' },
	           			{ min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
           			],
           			goods_price:[
           				{ required: true, message: '请输入商品价格', trigger: 'blur' },
	           			{ min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
           			],
           			goods_number:[
           				{ required: true, message: '请输入商品数量', trigger: 'blur' },
	           			{ min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
           			],
           			goods_weight:[
           				{ required: true, message: '请输入商品重量', trigger: 'blur' },
	           			{ min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
           			]
           			
				},
				//所有商品分类
				cateList:[],
//				级联选择器的配置
				addProps:{
					expandTrigger:'hover',
					label:'cat_name',
					value:'cat_id',
					children:'children'
				},
				//参数的数据
				manyCateList:[],
//				属性数据
				onlyCateList:[]
			}
		},
		methods:{
			//级联选择器发生改变的事件
			handleChange(){
//				console.log(this.addForm.goods_cat)
				//只允许用户选择三级分类
				if(this.addForm.goods_cat.length !== 3 ){
					this.addForm.goods_cat =[]
					return
				}
			},
			//获取商品的所有分类数据
			async getCateList(){
				const {data:ret} = await this.$http.get('categories')
//				console.log(ret.data)
				if(ret.meta.status!== 200){
					return this.$message.error('获取失败')
				}
				this.cateList= ret.data
			},
			//监听标签页发生变化
			beforeLeave(activeName,oldActiveName){				
//				console.log(activeName)//点击当前的标签页
//				console.log(oldActiveName)//当前表现页的上一页
				//判断用户是否选择了三级分类
				if(oldActiveName === '0' && this.addForm.goods_cat.length === 0){
					this.$message.info('请选择三级分类')
					return false
				}
			},
//			当级联选择框备选中时触发
			async tabClick(){
//				console.log('1')
//				console.log(this.active)
				if(this.active === '1'){//商品参数
					const {data:ret} = await this.$http.get(`categories/${this.getCateId}/attributes`,{
						params:{sel:'many'}
					})
					console.log(ret.data ) //拿到的是字符串类型
					if(ret.meta.status!== 200){
						return this.$message.error('获取失败')
					}
					//字符串转数组
					ret.data.forEach(item => {
//						console.log(item)
						item.attr_vals = item.attr_vals.split(' ')
					})
//					console.log(ret.data)
					this.manyCateList = ret.data
				}else if(this.active === '2'){//商品属性
					const {data:ret} = await this.$http.get(`categories/${this.getCateId}/attributes`,{
						params:{sel:'only'}
					})
					console.log(ret.data ) //拿到的是字符串类型
					if(ret.meta.status!== 200){
						return this.$message.error('获取失败')
					}
					this.onlyCateList = ret.data
				}
			}
			
		},
		created(){
			this.getCateList()
		},
		computed:{
			//存储三级分类的Id
			getCateId(){
				if(this.addForm.goods_cat.length === 3){
					return this.addForm.goods_cat[2]
				}
			}
		}
		
	}
</script>

<style scoped="scoped">
	
	.el-tabs {
		margin-top: 20px;
	}
	.el-alert {
		margin: 10px 0;
	}
	.el-checkbox {
		margin: 0 10px 0 0!important;
	}
</style>