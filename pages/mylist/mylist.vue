<template>
	<view>
		<u-navbar title="个人中心" @rightClick="rightClick" @leftClick='leftClick' rightText='右侧内容'>
		</u-navbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			rightClick() {
				console.log('right');
			},
			leftClick() {
				console.log('left');
				uni.navigateBack({
					delta: 1,
					animationType: 'pop-out',
					animationDuration: 900
				})
			}
		}
	}
</script>

<style>

</style>