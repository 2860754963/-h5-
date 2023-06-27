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
			<u-button type="primary" shape="circle" @click='getnewdetalis'>获取新闻39的详细信息</u-button>
		</view>

		<u-modal :show="exitshow" :title="'退出'" :content='"确定退出吗？"' showCancelButton closeOnClickOverlay
			@close='exitshow=false' @cancel='exitshow=false' @confirm='exitconfirm'></u-modal>
	</view>
</template>

<script>
	import {
		indexdata
	} from '@/api/index.js'
	import {
		apiserve
	} from '@/api/index.js'
	import {
		mapActions,
		mapState
	} from 'vuex'
	import {
		getItem,
		removeItem
	} from '@/common/utils/storage.js'
	import {
		user_token
	} from '@/common/utils/constants.js'
	export default {
		data() {
			return {
				exitshow: false,
				title: 'Hello',
				baseurl: process.env.ENV_PATH,
			}
		},
		onLoad() {},
		onNavigationBarButtonTap() {
			console.log('确定要退出码？');
			this.exitshow = true
		},
		methods: {
			...mapActions(['logoutAction']),
			async exitconfirm() {
				this.$tip.loading('退出中')
				let token = getItem(user_token)
				let res = await apiserve.logout(token)
				if (res.result == '退出成功') {
					this.logoutAction(res)
					this.$tip.loaded('退出成功')
					setTimeout(() => {
						this.exitshow = false
						this.$router.push('/pages/login/login')
					}, 1500)
				}
				console.log(res, "res");
			},
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