<template>
	<div id="Roles">
		
		
		
		<!--<h1>角色列表页面</h1>-->
		<el-card>		
			<!--面包屑导航-->
			<el-breadcrumb separator="/">	
				  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>			
				  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
				  <el-breadcrumb-item>角色列表</el-breadcrumb-item>
			</el-breadcrumb>
			<!--点击添加角色弹出对话框-->
			<el-button type="primary" plain @click="dialogVisible = true">添加角色</el-button>
			
			<el-table  :data="rolesList" style="width: 100%" border>
			<!--表头-->
				<el-table-column type="expand">
					<template slot-scope='scope'>
						<!--一行-->
						<el-row :class="['bottomBorder',i1===0?'topBorder':'','center']" v-for='(item1,i1) in scope.row.children' :key="item1.id">
							<!--一级权限-->
							<el-col :span='5'>
								<el-tag closable @close='removeTag(scope.row,item1.id)'>{{item1.authName}}</el-tag>
								<i class="el-icon-caret-right"></i>
							</el-col>
							<!--二级和三级-->
							
							<el-col :span='19'>
								
								<el-row :class="[i2===0?'':'topBorder']" v-for='(item2,i2) in item1.children' :key="item2.id">
									<!--二级-->
									<el-col :span='6'>
										<el-tag closable @close='removeTag(scope.row,item2.id)'>{{item2.authName}}</el-tag>
										<i class="el-icon-caret-right"></i>
									</el-col>
										
										
									<!--三级-->
									<el-col :span='18' >
										<el-tag closable @close='removeTag(scope.row,item3.id)' v-for='(item3,i3) in item2.children' :key="item3.id">{{item3.authName}}</el-tag>
										
									</el-col>
								</el-row>
							</el-col>
							
						</el-row>
						
					</template>
				</el-table-column>
				<el-table-column label="#" type="index"></el-table-column>							
				<el-table-column label="角色名称" prop='roleName'></el-table-column>							
				<el-table-column label="角色描述" prop='roleDesc'></el-table-column>							
				<el-table-column label="操作" >
					<!--修改编辑按钮-->
					<template slot-scope='scope'>
						<el-button type="primary" icon="el-icon-edit"  size="mini">编辑</el-button>				
					<!--删除按钮-->		
					
						<el-button type="danger" icon="el-icon-delete"  size="mini" @click='removeRoles(scope.row.id)'>删除</el-button>
					<!--分配权限-->
						<el-button type="warning" icon="el-icon-user" size="mini" @click='fenpeiRights(scope.row)'>分配权限</el-button>
					</template>	
				</el-table-column>
			</el-table>
			
		
		<!--点击添加角色的对话框-->
		<el-dialog title="添加角色" :visible.sync="dialogVisible" width="30%" @close='addClose'>
			<el-form ref="rolesRef" :model="rolesData" label-width="80px">
				<!--角色名称-->
	            <el-form-item label="角色名称">
					<el-input v-model="rolesData.roleName"></el-input>
				</el-form-item>
				<!--角色描述-->
				<el-form-item label="角色描述">
					<el-input v-model="rolesData.roleDesc"></el-input>
				</el-form-item>
			</el-form>
		  <span slot="footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addRols">确 定</el-button>
		  </span>
		</el-dialog>
		
		<!--点击分配权限的对话框-->
		<el-dialog title="分配权限" :visible.sync="treedialogVisible " width="30%" @close='treeClose'>
			
		  <!--<el-tree node-key="id" default-expand-all :data="treeList" :props="treeProps"></el-tree>-->
		  <el-tree ref='treeRef' :data="treeList" :default-checked-keys="treeArrKey"  node-key="id" default-expand-all  show-checkbox  :props="treeProps"></el-tree>
		  <span slot="footer">
		    <el-button @click="treedialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="treedata">确 定</el-button>
		  </span>
		</el-dialog>
		
		</el-card>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				rolesList:[],
				dialogVisible: false,
				treedialogVisible: false,
				rolesData:{
					roleName:'',
					roleDesc:''
				},
				treeProps:{
					children: 'children',
         			label: 'authName'
				},
				treeList:[],
				treeArrKey:[],
				roleId:''
			}
		},
		methods:{
			//获取角色列表的方法
			async getRolesList(){
				const {data:ret} = await this.$http.get('roles')
//				console.log(ret.data)
				this.rolesList = ret.data
//				console.log(this.rolesList )
			},
			//点击删除权限的方法
			async removeTag(data,rightId){
				const {data:ret} = await this.$http.delete(`roles/${data.id}/rights/${rightId}`)
				if(ret.meta.status !== 200) return this.$message.error(ret.meta.msg)
				this.$message.success(ret.meta.msg)
				data.children = ret.data
				
			},
			//点击确定添加角色的方法
			addRols(){
				this.$refs.rolesRef.validate(async (valid) => {
					console.log(valid)
//					添加失败提示用户
					if(!valid){
						this.$message.error('添加失败')
					}
//					添加成功后发送ajax
					const {data:ret} = await this.$http.post('roles',this.rolesData)
					console.log(ret)
					if(ret.meta.status !== 201) return this.$message.error(ret.meta.msg)		
					this.$message.success(ret.meta.msg)
					this.getRolesList()
				})

				
				this.dialogVisible = false 
			},
			addClose(){
//				this.$refs.rolesRef.resetFields();
			},
			//点击删除角色的方法
			async removeRoles(id){
				
				
				const red =  await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).catch( err => err) 
		          console.log(red) //点击确定取消是confirm
		          					//点击取消时是cancel
		        if(red != confirm) this.$message.error('取消成功')
		       	const {data:ret} = await this.$http.delete('roles/' + id)
		        console.log(ret)					
				if(ret.meta.status !== 200) return this.$message.error(ret.meta.msg)		
				this.$message.success(ret.meta.msg)
				this.getRolesList()
			},
			//点击分配权限时的方法
			async fenpeiRights(row){
				this.roleId = row.id //存储Id
				const {data:ret} = await this.$http.get('rights/tree')

				if(ret.meta.status !== 200) return this.$message.error(ret.meta.msg)
				this.treeList = ret.data			
				console.log(this.treeList)
				this.getRightdId(row,this.treeArrKey)
				console.log(this.treeArrKey)
				this.treedialogVisible = true
			},
			treehandleNodeClick(){
			},
			getRightdId(node,arr){
				//node 是节点
				if(!node.children){//只有第三层没有children
					return arr.push(node.id)  //把第三层的id存储起来
				} 
				node.children.forEach( item => {//item代表每一项
					this.getRightdId(item,arr) //递归，自调用
				})
			},
			//点击确定按钮，实现权限分配按钮
			async treedata(){
				//获取到全选和半选的ID,组成一个数组
				const arr = [
					 ...this.$refs.treeRef.getCheckedKeys(),
				 	 ...this.$refs.treeRef.getHalfCheckedKeys()
				]
				//把数组转换成以逗号分隔的字符串形式				
				const strArr = arr.join(',');
//				console.log(strArr)
//				发送ajax请求
				const {data:ret} = await this.$http.post(`roles/${this.roleId}/rights`,{
					rids:strArr
				})
//				console.log(ret)
				if(ret.meta.status !== 200){
				 	return this.$message.error('更新失败')
				}
				this.$message.success('更新成功');
				this.getRolesList();
				this.treedialogVisible = false
			},
			//监听权限分配的对话框的关闭
			treeClose(){
				this.treeArrKey = []
			}
		},
		created(){
			this.getRolesList()
		}
	}
</script>

<style scoped="scoped">
	.el-tag {
		margin: 5px;
	}
	.topBorder {
		border-top:1px solid #C2CCD1
	}
	.bottomBorder {
		border-bottom:1px solid #C2CCD1
	}
	.center {
		display: flex;
		align-items: center;
	}
	.el-button {
		margin-bottom: 10px;
	}
</style>