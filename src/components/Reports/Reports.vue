<template>
	<div id="reports">
		<!--<h1>数据报表</h1>-->
		<el-card class="box-card"
			
			<!--面包屑导航-->
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>数据统计</a></el-breadcrumb-item>
			  <el-breadcrumb-item>数据报表</el-breadcrumb-item>
			</el-breadcrumb>
			
			<div id="main" style="width: 1000px;height:600px;"></div>
			
		</el-card>
	</div>
</template>

<script>
	//引入深拷贝组件
	import _ from 'lodash'
	//引入echarts
	import echarts from 'echarts'
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			
		},
		created(){
			
		},
		async mounted(){
			var myChart = echarts.init(document.getElementById('main'));
			
			 /*var option = {
		            title: {
		                text: 'ECharts 入门示例'
		            },
		            tooltip: {},
		            legend: {
		                data:['销量']
		            },
		            xAxis: {
		                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
		            },
		            yAxis: {},
		            series: [{
		                name: '销量',
		                type: 'bar',
		                data: [5, 20, 36, 10, 10, 20]
		            }]
		        };*/
			 var options= {
		          title: {
		            text: '用户来源'
		          },
		          tooltip: {
		            trigger: 'axis',
		            axisPointer: {
		              type: 'cross',
		              label: {
		                backgroundColor: '#E9EEF3'
		              }
		            }
		          },
		          grid: {
		            left: '3%',
		            right: '4%',
		            bottom: '3%',
		            containLabel: true
		          },
		          xAxis: [
		            {
		              boundaryGap: false
		            }
		          ],
		          yAxis: [
		            {
		              type: 'value'
		            }
		          ]
		        }     
       		
			const {data:ret} = await this.$http.get('reports/type/1')
			console.log(ret.data)
			var option = ret.data
			option = _.merge(options,option);
			myChart.setOption(option);
//			用深拷贝合并数据
			
		}
	}
	
</script>

<style>
</style>