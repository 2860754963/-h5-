<template>
	<view class="main">
		主页面
		<router-link to="/pages/indexlist/indexlist">mylist</router-link>
		<u-button type="primary" shape="circle" @click='test'>点击测试</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			test() {
				console.log('123-----');
				console.log(this.$router);
			}
		},
		mounted() {
			//pages.json中设置autoBackButton：false 无效的，可以在需要去除导航返回的页面中的mounted钩子里加上如下代码段
			// var backbutton = document.getElementsByClassName('uni-page-head-hd')[0]
			// if (backbutton) backbutton.style.display = 'none';
		},
	}
</script>

<style>

</style>