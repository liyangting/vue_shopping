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
			
			<el-table  :data="rolesList" style="width: 100%" border>
			<!--表头-->
				<el-table-column type="expand">
					<template slot-scope='scope'>
						<!--一行-->
						<el-row :class="['bottomBorder',i1===0?'topBorder':'','center']" v-for='(item1,i1) in scope.row.children' :key="item1.id">
							<!--一级权限-->
							<el-col :span='5'>
								<el-tag>{{item1.authName}}</el-tag>
								<i class="el-icon-caret-right"></i>
							</el-col>
							<!--二级和三级-->
							
							<el-col :span='19'>
								
								<el-row :class="[i2===0?'':'topBorder']" v-for='(item2,i2) in item1.children' :key="item2.id">
									<!--二级-->
									<el-col :span='6'>
										<el-tag>{{item2.authName}}</el-tag>
										<i class="el-icon-caret-right"></i>
									</el-col>
										
										
									<!--三级-->
									<el-col :span='18' >
										<el-tag closable @close='removeTag(scope.row)' v-for='(item3,i3) in item2.children' :key="item3.id">{{item3.authName}}</el-tag>
										
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
					<el-button type="primary" icon="el-icon-edit"  size="mini">编辑</el-button>				
				<!--删除按钮-->						
					<el-button type="danger" icon="el-icon-delete"  size="mini">删除</el-button>
				<!--分配权限-->
					<el-button type="warning" icon="el-icon-user" size="mini">分配权限</el-button>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				rolesList:[],
				childrens:[]
			}
		},
		methods:{
			//获取角色列表的方法
			async getRolesList(){
				const {data:ret} = await this.$http.get('roles')
				console.log(ret.data)
				this.rolesList = ret.data
			},
			removeTag(data){
//				alert(data.id)
				var rightId = data.children
				this.childrens = data.children
//				var rightId1 = rightId.children
				console.log(this.childrens)
//				this.$http.delete('roles/'+data.id+'/rights/:rightId')
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
		border-top:1px solid #000
	}
	.bottomBorder {
		border-bottom:1px solid #000
	}
	.center {
		display: flex;
		align-items: center;
	}
</style>