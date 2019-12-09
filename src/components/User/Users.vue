<template>
	<div id="User">	
		<!--1.用户列表的渲染
		2.通过ID搜索用户
		3.添加用户
		4.用户状态的修改
		5.通过ID修改和删除用户
		6.分页展示功能
		
		技术点：
		2.作用域插槽
		-->
		
		
		
		
		
		<!--卡片-->	
		<el-card>			
		<!--面包屑导航-->	
		<el-breadcrumb separator="/">	
			  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>			
			  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
			  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>				
			<!--搜索栏-->
		  	<!--栅格系统-->
			<el-row :gutter="40">
				<el-col :span="12">		
					<!--使用clearable属性即可得到一个可清空的输入框-->
					<el-input placeholder="请输入内容" v-model='tableData.query' clearable @clear='getuserList'>
						<el-button slot="append" icon="el-icon-search" @click='getuserList'></el-button>
					</el-input>
				</el-col>
				
				<el-col :span="6">
					  <el-button type="primary" plain @click='dialogVisible=true'>添加用户</el-button>
				</el-col>				
			</el-row>		
		
		<!--表格栏-->
		<!--:data="tableData"-->
		<el-table  :data="myusers" style="width: 100%" border>
			<!--表头-->
			<el-table-column label="#" type="index"></el-table-column>							
			<el-table-column label="姓名" prop='username'></el-table-column>							
			<el-table-column label="邮箱" prop='email'></el-table-column>							
			<el-table-column label="电话" prop='mobile'></el-table-column>							
			<el-table-column label="角色" prop='role_name'></el-table-column>							
			<el-table-column label="状态" >					
			<!--作用域插槽-->
				<template slot-scope='scope'>
					<!--scope.row 拿到当前一行的数据-->  
					<el-switch v-model="scope.row.mg_state" @change ='rowChange(scope.row)'>
					</el-switch>
				</template>
			</el-table-column>		
			<!--按钮-->
			<el-table-column fixed="right" label="操作" >
				<template slot-scope="scope">
					<!--修改按钮-->
					
					  <el-button type="primary" icon="el-icon-edit" circle size="mini" @click='xiugaiUers(scope.row.id)'></el-button>
				
					<!--删除按钮-->
						
						<el-button type="danger" icon="el-icon-delete" circle size="mini" @click='deletes(scope.row.id)'></el-button>
					<!--设置按钮-->
					 <el-tooltip content="设置角色" placement="top" >
					      
					 	<el-button type="warning" icon="el-icon-setting" circle size="mini"></el-button>
					 </el-tooltip>
				</template>
			</el-table-column>			
		</el-table>
		</el-card>
		<!--分页-->
		<!--:current-page="tableData.pagenum"<!--当前页的改变-->
		<!--:total="total"  总条数 不能写死 因为后面要动态添加数据-->
		<el-pagination 
			@size-change="handleSizeChange" 
			@current-change="handleCurrentChange"			
		      :current-page="tableData.pagenum"
		      :page-sizes="[1, 2, 3, 4,5,6]"
		      :page-size="tableData.pagesize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="total">
		 </el-pagination>
		 
		<!--添加用户对话框-->
		<el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%" @close='addClose'>
		  <!--添加用户的表单区域-->
		  <!--:model="addForm" 数据的双向绑定-->
		  <!--:rules="addFormUrl"  验证规则-->
			<el-form :model="addForm" :rules="addFormUrl" ref="addFormRef" label-width="100px" class="demo-ruleForm">
				<!--、用户名-->
			  <el-form-item label="用户名" prop="username">
			    <el-input v-model="addForm.username"></el-input>
			  </el-form-item>
			  
			  <!--密码-->
			  <el-form-item label="密码" prop="password">
			    <el-input v-model="addForm.password" show-password></el-input>
			  </el-form-item>
			  
			  <!--邮箱-->
			  <el-form-item label="邮箱" prop="email">
			    <el-input v-model="addForm.email"></el-input>
			  </el-form-item>
			  
			  <!--电话-->
			 <el-form-item label="电话" prop="mobile">
			    <el-input v-model="addForm.mobile"></el-input>
			  </el-form-item>
			</el-form>
			
			
		  	<span slot="footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="addUsers">确 定</el-button>
			</span>
		</el-dialog>
		
		<!--编辑用户的对话框-->
		<el-dialog title="编辑用户" :visible.sync="xiugaidialogVisible" width="30%" @close='xiugaiClose'>
		  <!--添加用户的表单区域-->
		  <!--:model="xiugaiUersForm" 数据的双向绑定-->
		  <!--:rules="xiugaiFormUrl"  验证规则-->
			<el-form :model="xiugaiUersForm" :rules="xiugaiFormUrl" ref="xiugaiFormRef" label-width="100px">
				<!--、用户名-->
			  <el-form-item label="用户名" prop="username" >
			    <el-input v-model="xiugaiUersForm.username" disabled></el-input>
			  </el-form-item>
			  
			   <!--邮箱-->
			  <el-form-item label="邮箱" prop="email">
			    <el-input v-model="xiugaiUersForm.email"></el-input>
			  </el-form-item>
			  
			  <!--电话-->
			 <el-form-item label="电话" prop="mobile">
			    <el-input v-model="xiugaiUersForm.mobile"></el-input>
			  </el-form-item>
			</el-form>
			</el-form>
		  	<span slot="footer">
			    <el-button @click="xiugaidialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="xiugaidialogSubmit">确 定</el-button>
			</span>
		</el-dialog>
		
	</div>
</template>

<script>
	export default {
		data() {
			//自定义验证规则
			//rule验证规则
			//value 要验证的内容
			//callback就、回调函数
			var checkEmail = (rule, value, callback) => {
				//自定义一个邮箱的验证规则，使用正则
					const ruleEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
			        if (ruleEmail.test(value)) {
			        	callback()
			        }
			        callback(new Error('邮箱输入错误，请重新输入'));
		       
		      }
		      var checkMobil = (rule, value, callback) => {
		      	//自定义验证手机号
			        const ruleMobil = /^1(3|4|5|7|8|9)\d{9}$/;
			        if(ruleMobil.test(value)){
			        	callback()
			        }
			        callback(new Error('手机号输入错误，请重新输入'));
		      
		      }
		      
			return {				
				tableData: {
					//查询参数
					query:'',
					//当前页码
					pagenum:1,
					//每页显示条数
					pagesize:3,
					
				},
				myusers:[] ,
				total:0,
				dialogVisible:false,
				addForm:{
					username:'',
					password:'',
					email:'',
          			mobile:''
				},
				//添加用户的验证规则
				addFormUrl:{
					username: [
				        { required: true, message: '请输入用户名', trigger: 'blur' },
				        { min: 3, max: 12, message:'长度在 3 到 12个字符', trigger: 'blur' }
			        ],
			        password: [
			        	{ required: true, message: '请输入密码', trigger: 'blur' },
				        { min: 6, max: 18, message: '长度在 6到 18个字符', trigger: 'blur' }
			        ], 
			        email: [
			            { validator: checkEmail, trigger: 'blur' }
			        ],
			        mobile: [
			            { validator: checkMobil, trigger: 'blur' }
					]		
				},
//				点击修改 弹框的显示和隐藏
				xiugaidialogVisible:false,
				//根据用户查询到的用户信息
				 xiugaiUersForm:{},
				 xiugaiFormUrl:{
				 	 email: [
			            { validator: checkEmail, trigger: 'blur' }
			        ],
			        mobile: [
			            { validator: checkMobil, trigger: 'blur' }
					]		
				 }
				
			}
		},
		methods:{
		//获取数据库中的用户列表
			async getuserList(){
				const {data:ret} = await this.$http.get('users',{params:this.tableData})
				//console.log(ret)
		//判断当前状态，当状态不是200时，提示用户有异常
				if(ret.meta.status !== 200 ){
					return this.$message.error(ret.meta.msg)
				}
		//拿到的用户数据赋值给data中的空数组
				this.myusers = ret.data.users 
//				console.log(this.myusers)
		//拿到数据库中的总页数，赋值给total
				this.total = ret.data.total
			},
		//修改用户的状态
			async rowChange(datas){
//			console.log(datas)
			//发送ajax,拿到用户当前的数据状态
				const {data:ret} = await this.$http.put(`users/${datas.id}/state/${datas.mg_state}`)
//				console.log(ret)
			//如果当前的状态不是200时也就是获取失败时,提示用户失败，否则提示用户修改成功
				if(ret.meta.status !== 200 ){
					ret.data.mg_state != ret.data.mg_state
					return this.$message.error(ret.meta.msg)
				}
				if(ret.data.mg_state == 0){					
					this.$message.warning('状态关闭')
				}else if(ret.data.mg_state == 1){
					
					this.$message.success('状态开启')
				}
			},
			handleSizeChange(val){
				//每页显示的数量
//		        console.log(`每页 ${val} 条`);
				this.tableData.pagesize = val
				this.getuserList()
		    },
		    handleCurrentChange(val) {
		    	//当前页的改变
		       	console.log(`当前页: ${val}`);
				this.tableData.pagenum = val 
				this.getuserList()
		    },
//		    点击确定添加用户的方法
			addUsers(){
				
				this.$refs.addFormRef.validate(async (valid) => {
					console.log(valid)//true
//					添加信息失败的话提示用户
					if(!valid){
						return this.$message.error('添加失败')
					}
					//验证通过，发送ajax请求
					const {data:ret} = await this.$http.post('users',this.addForm)
					console.log(ret)  //拿到添加用户的数据
					if(ret.meta.status !== 201 ){
						return this.$message.error(ret.meta.mag)
					}
					this.dialogVisible = false;
					this.getuserList()
					
			     });
			},
		//删除单个用户
			async deletes(id){
				

				const {data:ret} = await this.$http.delete('users/' + id)
				console.log(ret)
				if(ret.meta.status !== 200 ){
					return this.$message.error(ret.meta.mag)
				}
				this.getuserList()
			},
			//关闭添加框清除表单内容的方法
			addClose(){
				this.$refs.addFormRef.resetFields();
			},
			//根据ID查询到要修改的用户的操作
			async xiugaiUers(id){
				const {data:ret} = await this.$http.get('users/' + id)
//				console.log(ret)
				if(ret.meta.status !== 200 ) return this.message.error(ret.meta.mag)
				this.xiugaiUersForm = ret.data
				console.log(this.xiugaiUersForm)
				this.xiugaidialogVisible = true
				
				
			},
			xiugaidialogSubmit(){
				//预校验
				this.$refs.xiugaiFormRef.validate(async vali => {
//					console.log(vali)
					//预校验失败
					if(!vali) return this.$message.error('编辑失败')
					//预校验成功 发送ajax
					const {data:ret} = await this.$http.put('users/'+this.xiugaiUersForm.id,{
						id:this.xiugaiUersForm.id,
						email:this.xiugaiUersForm.email,
						mobile:this.xiugaiUersForm.mobile
					})
					console.log(ret)
					//更新失败提示用户
					if(ret.meta.status !== 200) return this.$message.error(ret.meta.msg);
					//更新提示用户更新成功
					this.$message.success('更新成功');
					//关闭修改信息创建窗口
					this.xiugaidialogVisible = false
					//重新渲染页面
					this.getuserList()
					
				})
			},
			xiugaiClose(){
				this.$refs.xiugaiFormRef.resetFields();
			}
		    
		},
		created(){
			//当页面一加载时把数据渲染在页面中
			this.getuserList()
		}
	}
</script>

<style scoped>
	#User {
		height: 100%;
	}
	
	.el-pagination {
		margin: 30px 0;
		position: absolute;
		/*right: 80px;*/
		left: 50%;
		transform: translate(-50%);
	}
	.el-row {
		margin: 10px 0;
	}
</style>