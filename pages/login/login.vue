<template>
	<view>
		<u-form labelPosition="left" :model="model" :rules="loginRules" ref="uForm">
			<u-form-item label="账号" prop="loginModel.username">
				<u-input placeholder="请输入账号" border="surround" v-model="model.loginModel.username" clearable
					:maxlength='20'> </u-input>
			</u-form-item>
			<u-form-item label="密码" prop="loginModel.userpsd">
				<u-input placeholder="请输入密码" password v-model="model.loginModel.userpsd" clearable></u-input>
			</u-form-item>
		</u-form>
		<u-button type="primary" :plain="true" text="登录" @click='login'></u-button>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	import api from '@/api/index.js'
	export default {
		data() {
			return {
				model: {
					loginModel: {
						username: '',
						userpsd: ''
					},
				},
				loginRules: {
					'loginModel.username': {
						type: 'string',
						required: true,
						message: '请填写用户名',
						trigger: ['blur', 'change']
					},
					'loginModel.userpsd': {
						type: 'string',
						required: true,
						message: '请填写密码',
						trigger: ['blur', 'change']
					},
				}
			}
		},
		methods: {
			...mapActions(['loginAction']),
			async login() {
				this.$refs.uForm.validate()
					.then(async res => {
						this.$tip.loading()
						let loginres = await api.login({
							username: this.model.loginModel.username,
							userpsd: this.model.loginModel.userpsd
						})
						this.loginAction(loginres)
						this.$tip.loaded()
						this.$tip.toast('登录成功')
						setTimeout(() => {
							this.loginSuccess()
						}, 1500)
					})
					.catch(errors => {
						console.log(errors, "errors");
						uni.$u.toast('请填写账号密码')
					})
					.finally(() => {
						console.log('最终运行');
					})
				// // 测试加载中与加载完毕
				// this.$tip.loading()
				// setTimeout(() => {
				// 	this.$tip.loaded()
				// }, 2000)
				// return
				// 测试$tip.confirm
				// function test() {
				// 	console.log('测试');
				// }

				// function compolate() {
				// 	console.log('完成');
				// }
				// this.$tip.confirm('标题', '内容', '取消', test, compolate)
				// // console.log(this.$tip.confirm);
				// return
				// // 测试alert
				// this.$tip.alert('标题', '内容')
				// return


				// // 测试 trimobj
				// let obj = {
				// 	a: '',
				// 	b: 1,
				// 	c: 5,
				// 	d: ''
				// }
				// console.log(this.$trimObj(obj), "this.$trimObj(obj)");
			},
			loginSuccess() {
				this.$router.push('/') //这里必须要跳转到根目录直接跳转到路径会出现白屏
			}
		},

	}
</script>

<style>

</style>