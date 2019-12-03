<template>
	<div class="home">
		<div class="home-box">
			<svg class="icon" aria-hidden="true">
			  <use xlink:href="#icon-password1"></use>
			 
			</svg>
			<svg class="icon" aria-hidden="true">
			  <use xlink:href="#icon--heart"></use>
			 
			</svg>
			<svg class="icon" aria-hidden="true">
			  <use xlink:href="#icon--star"></use>
			</svg>
			<svg class="icon" aria-hidden="true">
			  <use xlink:href="#icon--dead"></use>
			</svg>
			<svg class="icon" aria-hidden="true">
			  <use xlink:href="#icon--happy"></use>
			</svg>  
			 
			<div class="block">
				<span class="demonstration">给个五星好评哦</span>
				<el-rate v-model="value2" :colors="colors"></el-rate>
				  
			</div>
		</div>
			
		
		
			
		
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
	        value2: null,
	        colors: { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
	      }
	    }
  }
</script>

<style>
	.home {
		width: 100%;
		height: 100%;
		background-color:#F2F6FC;
		
	}
	.icon {
		  width: 50px;
		  height:50px;
		  vertical-align: -0.15em;
		  fill: currentColor;
		  overflow: hidden;
		  margin-right: 10px;
	}
	.home-box{
		width: 300px;
		height: 300px;
		/*background-color: slategrey;*/
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	
</style>