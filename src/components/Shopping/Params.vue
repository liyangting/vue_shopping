<template>
	<div id="params">
		<!--<h1>分类参数页面</h1>-->
		<!--卡片-->
		<el-card>		
			<!--面包屑导航-->
			<el-breadcrumb separator="/">	
				  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>			
				  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
				  <el-breadcrumb-item>分类参数</el-breadcrumb-item>
			</el-breadcrumb>
			<!--警告提示-->
			<el-alert show-icon
			    title="注意：只允许为第三极分类设置相关参数"
			    type="warning">
			</el-alert>
			
			<el-row>
				<el-col>	
					<span>选择商品的分类：</span>
				
					<!--级联选择器-->
			
					<el-cascader
					    v-model="cascaderKey"
					    :options="cateList"
					    :props="cascaderProps"
					    @change="handleCascaderChange">
					</el-cascader>					
				</el-col>
			</el-row>
			
				<!--tabs标签页-->
				<el-tabs v-model="activeName" @tab-click="handleTabsClick">
					<!--动态参数-->
			    <el-tab-pane label="动态参数" name="many">
			    	<el-button type='primary' size='mini' :disabled="isBntdisabled" @click='addParamsdialogVisible=true'>添加参数</el-button>
			    	<el-table :data='manyParamsList' border>
			    		<!--展开行-->
			    		<el-table-column type='expand'>
			    			<template slot-scope='scope'>
			    				<el-tag @close='handleClose(i,scope.row)' v-for="(item,i) in scope.row.attr_vals" :key="i"  closable>{{item}}</el-tag>
			    				<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue"
  										ref="saveTagInput" size="small"
  										@keyup.enter.native="handleInputConfirm(scope.row)"
  										@blur="handleInputConfirm(scope.row)">
								</el-input>
								<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
			    			</template>
			    		</el-table-column>
			    		<el-table-column type='index' label='#'></el-table-column>
			    		<el-table-column label='参数名称' prop='attr_name'></el-table-column>
			    		<el-table-column label='操作'>
			    			<template slot-scope='scope'>
			    				<!--编辑-->
			    				<el-button type='primary' icon='el-icon-edit' size='mini'>编辑</el-button>
			    				<!--删除-->
			    				<el-button type='warning' icon='el-icon-delete' size='mini'>删除</el-button>
			    				
			    			</template>
			    		</el-table-column>
			    	</el-table>
			    </el-tab-pane>
			    <!--静态属性-->
			    <el-tab-pane label="静态属性" name="only">
			    	<el-button type='warning' size='mini' :disabled="isBntdisabled" @click='addParamsdialogVisible=true'>添加属性</el-button>
			    	<el-table :data='onlyParamsList' border>
			    		<el-table-column type='expand'></el-table-column>
			    		<el-table-column type='index' label='#'></el-table-column>
			    		<el-table-column label='属性名称' prop='attr_name'></el-table-column>
			    		<el-table-column label='操作'>
			    			<template slot-scope='scope'>
			    				<!--编辑-->
			    				<el-button type='primary' icon='el-icon-edit' size='mini'>编辑</el-button>
			    				<!--删除-->
			    				<el-button type='warning' icon='el-icon-delete' size='mini'>删除</el-button>
			    				
			    			</template>
			    		</el-table-column>
			    	</el-table>
			    </el-tab-pane>
			  </el-tabs>
			  <!--添加参数的对话框-->
			<el-dialog :title=" '添加' + paramsPath " :visible.sync="addParamsdialogVisible" @close='paramsClose'width="30%">
			  <!--表单-->
			  <el-form :model="addParamsForm" :rules="addParamsFormrules" ref="addParamsFormRef" label-width="100px">
				  <el-form-item :label="'添加' + paramsPath" prop="attr_name">
				    <el-input v-model="addParamsForm.attr_name"></el-input>
				  </el-form-item>
				</el-form>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="addParamsdialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="addParamsClick">确 定</el-button>
			  </span>
			</el-dialog>
  
		</el-card>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				//存储分类数据
				cateList:[],
				activeName:'many',
//				存放级联选择框选中的分类的id
				cascaderKey:[],
				//级联选择框的配置项
				cascaderProps:{
					expandTrigger:'hover',
					checkStrictly:'true',
					value:'cat_id',
					label:'cat_name',
					children:'children'
				},
				//动态参数数据
				manyParamsList:[],
				//静态属性数据
				onlyParamsList:[],
				//控制添加参数的对话框显示和隐藏
				addParamsdialogVisible:false,
				//添加参数
				addParamsForm:{
					attr_name:''
				},
				//校验规则
				addParamsFormrules:{
					attr_name:[
						 { required: true, message: '请输入名称', trigger: 'blur' }
					]
				},
				
				inputVisible: false,
       			 inputValue: ''
			}
		},
		methods:{
			//获取分类的数据
			async getcateList(){
				const {data:res} = await this.$http.get('categories');
				if(res.meta.status !== 200){
					return this.$message.error('获取失败')
				}
				this.cateList = res.data;
//				console.log(this.cateList)
			},
			//tabs标签页发生改变的事件
			handleTabsClick(){
				//console.log(this.activeName)
				this.getParamsList();
			},
			//级联选择框发生改变触发的事件
			 handleCascaderChange(){
				this.getParamsList();
			},
			//获取参数的方法
			async getParamsList(){
				//console.log(this.cascaderKey)
				//根据数组的长度确定是否选择了三级分类
				if(this.cascaderKey.length !== 3 ){
						this.cascaderKey = [];
						return;
				}
				//console.log(this.getCateId)
				//console.log(this.activeName)
				//获取参数
				const {data:res} = await this.$http.get(`categories/${this.getCateId}/attributes`,{
					params:{sel:this.activeName}
				})
				if(res.meta.status !== 200){
					return this.$message.error('获取失败')
				}
				//把字符串按照特定的分隔符转(空格)成数据
				res.data.forEach( item => {
					item.attr_vals = item.attr_vals.split(' ')
				})
//				console.log(res.data)
				
				if(this.activeName === 'many'){
					this.manyParamsList = res.data;
				}else {
					this.onlyParamsList = res.data;
				}
			},
			//监测弹框的状态
			paramsClose(){
				this.cascaderKey = [];
			},
			//点击确定添加参数
			async addParamsClick(){
				
				
//				const {data:res} = await this.$http.post(`categories/${this.getCateId}/attributes,{
//					rids:{attr_name:this.addParamsForm,
//					attr_sel:this.activeName}
//				})
			
				if(res.meta.status !== 201){
					return this.$message.error('获取失败')
				}
				console.log(res.data)
				this.addParamsdialogVisible = false
			},
			//  添加参数那个框失去焦点的时候
			async handleInputConfirm(row){
//				console.log('222')
			
	       		 if (this.inputValue.trim().lenght === 0) {
	       		 	this.inputVisible = false;
	       		 	this.inputValue = '';
			        return 
			      }
	       		row.attr_vals.push(this.inputValue.trim())
	       		 
	       		 this.inputVisible = false;
	       		 this.inputValue = '';
	       		 const {data:ret} = await this.$http.put(`categories/${this.getCateId}/attributes/${row.attr_id}`,{
	       		 	attr_name:row.attr_name,
	       		 	attr_sel:row.attr_sel,
	       		 	attr_vals:row.attr_vals.join(' ')
	       		 })
	       		 console.log(ret.data)
	       		  if(ret.meta.status != 200 ){
				 	return this.$message.error('更新失败')
				 }
				 this.$message.success('更新成功')
			},
			showInput(){
//				console.log('458')
				 this.inputVisible = true;
				 this.$nextTick(_ => {
		          this.$refs.saveTagInput.$refs.input.focus();
		        });
			},
			//删除参数
			async handleClose(i,row){
				row.attr_vals.splice(i,1);
				//发送ajax
				const {data:ret} = await this.$http.put(`categories/${this.getCateId}/attributes/${row.attr_id}`,{
	       		 	attr_name:row.attr_name,
	       		 	attr_sel:row.attr_sel,
	       		 	attr_vals:row.attr_vals.join(' ')
	       		 })
	       		 console.log(ret.data)
	       		  if(ret.meta.status != 200 ){
				 	return this.$message.error('删除失败')
				 }
				 this.$message.success('删除成功')
				
			},

		
		},
		created(){
			this.getcateList();
		},
		//计算属性
		computed:{
			//获取分类的id
			getCateId(){
				if( this.cascaderKey.length === 3 ){
					return this.cascaderKey[2]
				}
			},
			//添加参数按钮是否禁用
			isBntdisabled(){
				if( this.cascaderKey.length === 3 ){
					return false
				}
				return true
			},
			paramsPath(){
				if(this.activeName === 'many'){
					return '参数'
				}
				return '属性'
			}
		}
	}
</script>

<style scoped="scoped">
	.el-alert {
		width: 50%;
		
	}
	.el-tag {
		margin: 10px;
	}
	.el-input {
		width: 30%;
	}
</style>