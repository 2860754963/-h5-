<template>
	<view class="main">
		<!-- 	<router-link to="/pages/indexlist/indexlist">mylist</router-link>
		<view class="">
			{{baseurl}}
		</view>
		<view class="">
			<u-button type="primary" shape="circle" @click='getlunbo'>获取轮播图数据</u-button>
			<u-button type="primary" shape="circle" @click='getnewlist'>获取新闻信息列表</u-button>
			<u-button type="primary" shape="circle" @click='getnewdetalis'>获取新闻39的详细信息</u-button>
		</view> -->

		<view class="lunbo">
			<u-swiper :list="lunboindex" previousMargin="50" nextMargin="50" circular :autoplay="false" radius="5"
				bgColor="#ffffff" height='420' indicator :loading='swiperLoading' @click='swiperClick'></u-swiper>
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
	import {
		forEach
	} from 'lodash'
	export default {
		data() {
			return {
				exitshow: false,
				title: 'Hello',
				baseurl: process.env.ENV_PATH,
				lunboindex: [],
				swiperLoading: true
			}
		},
		onLoad() {},
		onNavigationBarButtonTap() {
			console.log('确定要退出码？');
			this.exitshow = true
		},
		methods: {
			...mapActions(['logoutAction']),
			swiperClick(index) {
				console.log(`点击了第${index}张`);
				if (index === 0) {
					uni.navigateTo({
						url: '/pages/indexlist/indexlist'
					})
				} else if (index === 1) {
					uni.navigateTo({
						url: '/pages/shoplist/shoplist'
					})
				} else {
					uni.navigateTo({
						url: '/pages/mylist/mylist'
					})
				}
			},
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
			},
			async getlunboData() {
				this.swiperLoading = true
				let res = await indexdata.getlunbo()
				if (res.status == 0) {
					res.message.forEach(item => {
						this.lunboindex.push(item.img)
						this.swiperLoading = false
					})
				} else {
					this.$tip.toast('获取轮播数据错误')
					this.swiperLoading = true
				}
			}
		},
		mounted() {
			//pages.json中设置autoBackButton：false 无效的，可以在需要去除导航返回的页面中的mounted钩子里加上如下代码段
			// var backbutton = document.getElementsByClassName('uni-page-head-hd')[0]
			// if (backbutton) backbutton.style.display = 'none';
		},
		created() {
			this.getlunboData()
		}
	}
</script>

<style scoped lang="scss">
	.lunbo {
		margin-top: 10rpx;
	}
</style>