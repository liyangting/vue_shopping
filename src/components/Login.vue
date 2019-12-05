<template>
	<div class="login">
		<div class="login-box">
			<div class="login-img"><img src="../assets/f6ee658.jpg"/></div>
			
			<el-form class="login-el" :model="loginForm" :rules="loginRules" ref="loginRules" onsubmit="return false">
			  <el-form-item prop="username">
			    <!--<el-input prefix-icon="el-icon-user"></el-input>--> 
			    <el-input prefix-icon="iconfont icon-user_name" v-model="loginForm.username">
			    	
			    </el-input>
			  </el-form-item>
			  
			  <el-form-item prop="password" >
			    <el-input prefix-icon="iconfont icon-password" v-model="loginForm.password" show-password ></el-input>
		
			  </el-form-item>
			  
			  <el-row class="login-elrow">
				  
				  <el-button type="primary" plain  @click="denglu">登录</el-button>
				
				  <el-button type="danger"  plain @click="chongzhi">重置</el-button>
				</el-row>
							
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				loginForm:{
					username:'',
					password:''
				},
				loginRules:{
					username: [
				        { required: true, message: '请输入用户名', trigger: 'blur' },
				        { min: 3, max: 12, message:'长度在 3 到 12个字符', trigger: 'blur' }
			        ],
			        password: [
			        	{ required: true, message: '请输入密码', trigger: 'blur' },
				        { min: 6, max: 18, message: '长度在 6到 18个字符', trigger: 'blur' }
			        ]
				}
			}
		},
		methods:{
			//登录事件
			denglu(){
//				进行预验证
				this.$refs.loginRules.validate( async (valid) => {					
					//console.log(valid)//输入正确之后结果是一个布尔值true
			          if (!valid) {
			     //如果预验证失败，给用户一个弹框提示
			          	return this.$message.error('登录失败，请重新登录')		            
			          } 
			    //当预验证成功的时候，载真正的发送ajax调用后台接口进行验证
			         /*this.loginForm等同于{
			         	username:this.loginForm.username,
			         	password:this.loginForm.password
			         }*/
			         
//			         const ret = this.$http.post('login',this.loginForm)
			         //拿到是一个Promise对象
			         
		         //第一种写法 比较原始 Promise对象调用.then()方法
			        /* this.$http.post('login',this.loginForm).then(function(ret){
			         	 console.log(ret.data)
			         })*/
			        
			    // 第二种写法 使用ES6的新特性async await进行异步处理      
			    //await 等一下的意思, 一般后面放一个 Promise对象的表达式等await后面的这个方法执行完之后再赋值给ret 
			    //await 关键字只能放到async 函数里面
			    //async 异步的意思，作为一个关键字放在函数前边使用，加async 函数的调用会返回一个Promise对象，
			      
			      /*const ret = await this.$http.post('login',this.loginForm)
			       console.log(ret.data)*/
			      
			    //第三种方式 ES6中的对象解构赋值
			    //解析等号两边的结构，然后把右边的对应赋值给左边。如果解构不成功，变量的值就等于undefined
			    //json结构和键名要一一对应才能进行正确解构赋值
			    //{data:ret} 将data重新命名为ret
			      	const {data:ret} = await this.$http.post('login',this.loginForm)
			        //console.log(ret)
			    //还需要验证用户输入的用户名和密码是否已经注册过。如果没有注册依旧不能登录
			    //r如果状态码不是200时，结束代码执行，给用户返回msg
			        if(ret.meta.status != 200) return this.$message.error(ret.meta.msg)
			    //还需要把唯一的token进行临时存储
			    //sessionStorage 本地临时存储 setItem()方法 接受参数为一个键值对
		    		window.sessionStorage.setItem('token',ret.data.token)
		    	//登录后进入下一个页面，跳转到后home页
			         this.$message.success('登录成功~~~~~~~')
			         
			         this.$router.push('/home')
			    });
			},
			//重置
			chongzhi(){
				this.$refs.loginRules.resetFields()
				 
			}
			
		}
	}
</script>

<style scoped>
	.login-box {
		width: 400px;
		height: 320px;
		background-color: #FFECEC;
		/*background-image: linear-gradient(to right,#E8CBC0,#636FA4);*/
	
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		border-radius: 10%;
	}
	.login-img {	
		position: absolute;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.login-img img {
		width: 100px;
		height: 100px;
		border: 1px solid #000;
		border-radius: 50%
	}
	.login-el {
		position: absolute;
		bottom: 10px;
		width: 80%;
		padding: 20px;
		margin-left: 40px;
		box-sizing: border-box;		
	}
	.el-button {
		margin-top: 20px;
	}
	.el-input__inner {
		width: 100px;
	}
	.login-elrow {
		display: flex;
		justify-content: center;
	}
	.icon {	
		  width: 1em;
		  height: 1em;
		  vertical-align: -0.15em;
		  fill: currentColor;
		  overflow: hidden;
		}
</style>