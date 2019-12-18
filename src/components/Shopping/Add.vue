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
				    
				    <el-tab-pane label="商品图片" name='3'>
				    	<el-upload	
				    		:on-success='successFile'			    		
				    		:headers='headerObj'
							:action="actionPath"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							list-type="picture">
						  <el-button size="small" type="primary">点击上传</el-button>
						 
						</el-upload>
				    	
				    	
				    </el-tab-pane>
				    <el-tab-pane label="商品内容" name='4'>
				    	<quill-editor v-model="addForm.content" class="contentSS"> </quill-editor>
 						<el-button type='primary' @click='addShopping'>添加商品</el-button>
				    </el-tab-pane>
				  
				</el-tabs>
			</el-form>
			
			
			<!--图片放大的对话框-->
			<el-dialog
			  title="预览图片"
			  :visible.sync="dialogVisibleImg"
			  width="50%">
			  <img :src="imgUrl" class="imgs"/>
			
			</el-dialog>
		</el-card>		
	</div>
</template>

<script>
	//引入lodash
	import _ from 'lodash'
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
					goods_cat:[],
					pics:[],
					//商品内容
					content:'',
					attrs:[]
					
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
				onlyCateList:[],
//				图片配置
				fileList:[],
//				预览图片框的显示隐藏
				dialogVisibleImg:false,
//				上传的路径
				actionPath:'http://127.0.0.1:8888/api/private/v1/upload',
//				上传的请求头,配置token
				headerObj:{
					Authorization:window.sessionStorage.getItem('token')
				},
//				预览大图的url
				imgUrl:''
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
			},
			
			//移除上传的图片的方法
			
			handleRemove(file) {
//			    console.log(file);
			},
			
			
			
//			点击图片时触发的函数
			handlePreview(file) {
//			    console.log(file)
			    this.dialogVisibleImg = true
			    this.imgUrl = file.response.data.url
			    const temPath = file.response.data.tmp_path
				//i是下标 ,x是数组的每一项
				const i = this.addForm.pics.findIndex( x => {
					//条件
					 x.pic == temPath 
				})
				this.addForm.pics.splice(i,1);
				
//				console.log(this.addForm)
			},
			//点击上传图片列表
			successFile(response){
//				console.log(response)
				const picsObj = {
					pic:response.data.tmp_path
				}
				this.addForm.pics.push(picsObj)
				
				console.log( this.addForm )
			},
//			点击添加商品按钮
			addShopping(){
//				console.log('okk')
				//表单的预校验
				this.$refs.addFormRef.validate(async vali => {
					if(!vali){
						return this.$message.error('请输入表单内容')
					}
//					console.log('1111')
					//处理表单数据,
//					this.addForm.goods_cat 目前是数组,要转成字符串类型
					//不能直接操作addForm这个对象。因为data数据中绑定的addForm必须是个数组
					//可以把这个对象深拷贝一个,然后操作这个拷贝的对象，这样两个对象就互不干扰了
					//把addForm深拷贝为forms
					//需要安装插件lodash
					//因为只在这个页面中使用，所有不用再全局中挂载，直接在这个页面挂载就行
					const form = _.cloneDeep(this.addForm)
					form.goods_cat = form.goods_cat.join(',')
//					console.log(form)
					//处理attrs 商品的参数（数组），包含 `动态参数` 和 `静态属性`
					this.manyCateList.forEach( item => {
						const obj = {
							attr_id:item.attr_id,
							attr_value:item.attr_vals.join()
						}
						this.addForm.attrs.push(obj)
					})
					console.log(this.manyCateList)
					this.onlyCateList.forEach( item => {
						const obj = {
							attr_id:item.attr_id,
							attr_value:item.attr_vals.join()
						}
						this.addForm.attrs.push(obj)
					})
					
					form.attrs = this.addForm.attrs;
//					console.log(form)
					
//					发送ajax
					const {data:res} = await this.$http.post('goods',form)
					if(res.meta.status !== 201){
						return this.$message.error('创建失败')
					}
					this.$message.success('创建成功');
					//创建成功之后返回到goods页面，用到链式编程
					this.$router.push('/goods')
				})
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
	.imgs {
		width: 100%;
	}
	.contentSS{
		width: 80%;
		height: 300PX;
	}
	.el-button {
		margin-top: 80px;
	}
</style>