<template>
	<view class="main">
		主页面
		<router-link to="/pages/indexlist/indexlist">mylist</router-link>
		<view class="">
			{{baseurl}}
		</view>
		<view class="">
			<u-button type="primary" shape="circle" @click='getlunbo'>获取轮播图数据</u-button>
			<u-button type="primary" shape="circle" @click='getnewlist'>获取新闻信息列表</u-button>
			<u-button type="primary" shape="circle" @click='getnewdetalis'>获取新闻信息详细信息</u-button>
		</view>
	</view>
</template>

<script>
	import {
		indexdata
	} from '@/api/index.js'
	export default {
		data() {
			return {
				title: 'Hello',
				baseurl: process.env.ENV_PATH
			}
		},
		onLoad() {},
		methods: {
			async getlunbo() {
				let res = await indexdata.getlunbo()
				console.log(res, "res");
			},
			async getnewlist() {
				let res = await indexdata.getnewlist()
				console.log(res, "res");
			},
			async getnewdetalis() {
				let res = await indexdata.getnewdetalis(39)
				console.log(res);
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