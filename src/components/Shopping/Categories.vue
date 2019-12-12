<template>
	<div id="Categories">
		<!--<h1>商品分类页面</h1>-->
		<!--<h1>角色列表页面</h1>-->
		<el-card>		
			<!--面包屑导航-->
			<el-breadcrumb separator="/">	
				  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>			
				  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
				  <el-breadcrumb-item>商品分类</el-breadcrumb-item>
			</el-breadcrumb>
			<!--添加商品按钮-->
			<el-button  type="primary" plain @click="addCate">添加分类</el-button>
			
			<tree :data="cateList" index-text="#" show-index :columns="columns" :expand-type='false' :selection-type='false'>
			<!--是否有效-->
				
			   	<template slot="deleted" slot-scope="scope">
			        <!--{{ scope.row.cat_deleted }}-->
			      
			        <i class="el-icon-success" style="color: green; font-size:22px;" v-if='scope.row.cat_deleted==false'></i>
					<i class="el-icon-error" style="color: red; font-size:22px;" v-else></i>
			        
		    	</template>
									
				<!--排序-->
				<template slot="level" slot-scope="scope">
			        <!--{{ scope.row.cat_level }}-->
			      
			        <el-tag v-if='scope.row.cat_level === 0'>一级</el-tag>
					<el-tag type="success" v-else-if='scope.row.cat_level === 1'>二级</el-tag>
					<el-tag type="warning" v-else>三级</el-tag>
			        
		    	</template>
				<!--操作-->
				<template slot="setting" slot-scope="scope">
			        <!--{{ scope.row.cat_level }}-->
			      
			       	<el-button icon="el-icon-edit" type="primary" size='mini'>编辑</el-button>
  
  					<el-button icon="el-icon-delete" type="danger" size='mini' @click='delCate(scope.row.cat_id)'>删除</el-button>
			        
		    	</template>
				
				
			</tree>
		
			<!--分页-->
		<!--:current-page="tableData.pagenum"<!--当前页的改变-->
		<!--:total="total"  总条数 不能写死 因为后面要动态添加数据-->
			<el-pagination 
				@size-change="handleSizeChange" 
				@current-change="handleCurrentChange"			
			      :current-page="gateData.pagenum"
			      :page-sizes="[1, 2, 3, 4,5,6]"
			      :page-size="gateData.pagesize"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="total">
			</el-pagination>
		 	
		 		
		<!--添加分类的对话框-->
		<el-dialog @close="addCateClose" title="添加分类" :visible.sync="addCatedialogVisible" width="25%">
		  <!--添加分类的表单-->
		  <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
			  <el-form-item label="分类名称:" prop="cat_name">
			    <el-input v-model="addCateForm.cat_name" class="elInput"></el-input>
			  </el-form-item>
			  <!--options要展示的数据
			  	props配置选项
			  -->
			  <el-form-item label="父级分类:">
			     <el-cascader clearable v-model="cascaderKeys" :options="parentCate" :props="cascaderProps"
   				 @change="cascaderChange"></el-cascader>
			  </el-form-item>
			</el-form>
			
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="addCatedialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="saveCate">确 定</el-button>
		  </span>
		</el-dialog>
		</el-card>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				gateData: {
					//三级列表
					type:3,
					//当前页码
					pagenum:1,
					//每页显示条数
					pagesize:5,
					
				},
				//保存总的数据条数
				total:0,
				//分类列表的数据储存
				cateList:[],
				//每一列展示的数据
				columns: [
		          {
		            label: '分类名称',
		            prop: 'cat_name'
		          },
		          
		          {
		            label: '是否有效',
		            prop: 'cat_deleted',
		            type: 'template',
		            template: 'deleted',
		          },
		          {
		            label: '排序',
		            prop: 'cat_level',
		            type: 'template',
		            template: 'level',
		          },
		          {
		            label: '排序',
		            type: 'template',
		            template: 'setting',
		          },
				],
				//添加商品分类框的显示和隐藏
				addCatedialogVisible:false,
				addCateForm:{
					//分类名称
					cat_name:'',
					//父级id
					cat_pid:0,
					//分类层级(0,1,2)
					cat_level:0
				},
				//校验规则
				addCateFormRules:{
					cat_name:[
						{ required: true, message: '请输入分类名称', trigger: 'blur' },
					]
				},
				//父级分类
				parentCate:[],
				//级联选择框的配置
				cascaderProps:{
					checkStrictly:"true",
					expandTrigger:"hover",
					value:"cat_id",
					label:"cat_name",
					children:"children"
				},
				cascaderKeys:[],
			}
		},
		methods:{
			//获取商品分类的数据
			async getCataList(){
				
				const {data:ret} = await this.$http.get('categories',{
					params:this.gateData
				})
				if(ret.meta.status !== 200) return this.$message.error(ret.meta.msg)
				this.cateList = ret.data.result
				console.log(this.cateList)
				this.total = ret.data.total
			
			},
			
			handleSizeChange(val){
				//每页显示的数量
//		        console.log(`每页 ${val} 条`);
				this.gateData.pagesize = val
				this.getCataList()
		    },
		    handleCurrentChange(val) {
		    	//当前页的改变
//		       	console.log(`当前页: ${val}`);
				this.gateData.pagenum = val 
				this.getCataList()
		    },
		    //点击删除商品分类
		    async delCate(id){
		    	//提示用户，防止误操作
		    	const red =  await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		      	}).catch( err => err) 
		          console.log(red) //点击确定是confirm
		          					//点击取消时是cancel
		        if(red != confirm) return this.$message.error('取消成功')
		    	
		    	const {data:ret} = await this.$http.delete('categories/'+id)
		    	if(ret.meta.status !== 200) return this.$message.error(ret.meta.msg)
				this.$message.success(ret.meta.msg)
				this.getCataList()
			},
			//添加商品的方法
			async addCate(){
				//获取父级分类数据
				const {data:res} = await this.$http.get('categories',{ params:{type:2}} )
				if(res.meta.status !== 200 ){
					return this.$message.error('获取失败')
				}
				this.parentCate = res.data;
				//console.log(this.parentCate)
				
				//显示添加分类对话框
				this.addCatedialogVisible = true;
			},
			//级联选择器内容改变事件
			cascaderChange(){
				console.log(this.cascaderKeys)
			/*	是一个数组
				如果选择了父级分类,这个数组中肯定有元素*/
				if( this.cascaderKeys.length > 0 ) {
					//证明有选择父级分类
					this.addCateForm.cat_pid = this.cascaderKeys[ this.cascaderKeys.length-1 ]
					this.addCateForm.cat_level = this.cascaderKeys.length;
					
				}else{
					//没有选择父级分类
					this.addCateForm.cat_pid = 0
					this.addCateForm.cat_level = 0;
					
				}
				this.cascaderKeys.length > 0
				
			},
			//监听添加分类对话框的关闭事件
			addCateClose(){
				//重置表单
				this.$refs.addCateFormRef.resetFields();
				this.cascaderKeys=[];
			},
			//点击确定按钮实现添加分类
			saveCate(){
				console.log(this.addCateForm)
				//预校验
				this.$refs.addCateFormRef.validate(async vali => {
					if(!vali) return;
					const {data:res} = await this.$http.post('categories',this.addCateForm)
					if(res.meta.status !== 201 ){
						return this.$message.error('创建失败')
					}
					//提示成功
					this.$message.success('操作成功')
					//重新渲染数据
					this.getCateList()
					//关闭对话框
					this.addCatedialogVisible = false;
				});
			}
		},
		created(){
			this.getCataList()
		}
	}
</script>

<style scoped="scoped">
	.el-button {
		margin-bottom: 10px;
	}
	.elInput {
		width: 83%;
	}
</style>