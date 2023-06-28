// 在此进行请求拦截器的配置 与响应拦截器的解构之类的
// 这里使用  luch-request 插件进行配置请求 基于Promise开发的跨平台、项目级别的请求库，它有更小的体积，易用的api，方便简单的自定义能力
import Request from '@/js_sdk/luch-request/index.js'
import configService from './config.service.js'
import {
	getItem
} from '../utils/storage.js'
import {
	user_token,
	user_tenant_id,
	set_token_get_time
} from '../utils/constants.js'
import tips from '@/common/utils/tip.js'
import {
	router
} from '@/router/index.js'
import store from '@/store/index.js'
// 在此同样进行token 过期处理 后端也要进行处理 看情况吧
const tokenTimeout = 3600 //单位是s

function checkTokenTime() {
	let currentTime = Date.now()
	let timeStamp = getItem(set_token_get_time)
	return (currentTime - timeStamp) / 1000 < tokenTimeout
}
let baseurl = configService.baseurl;
const http = new Request()
http.setConfig((config) => {
	console.log(config, "config");
	/* 设置全局配置 */
	config.baseUrl = baseurl /* 根域名不同 */
	config.header = {
		...config.header
	}
	return config
})
// 请求拦截器 添加 token 并本地检查token是否过期
http.interceptor.request(config => {
	if (getItem(user_token)) {
		if (checkTokenTime()) {
			uni.showLoading({
				title: '请求中，请稍后',
				mask: true
			})
			config.header = {
				...config.header,
				// 这里根据实际情况 是否添加自定义请求头
				'X-Access-Token': getItem(user_token),
				// 'tenant-id': getItem(user_tenant_id) || ''
				// }
				// // 	// if (hitRequestKey(config.url)) return;
				// // 	// addRequesKey(config.url);
				// // 	/*
				// // 	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
				// // 	  cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
				// // 	}
				// // 	*/
			}
		} else {
			setTimeout(() => {
				tips.toast('token过期，请重新登录')
			}, 500)
			store.dispatch('logoutAction')
			router.push('/pages/login/login')
			return Promise.reject(new Error('token过期，请重新登录'))
		}
	}
	return config
}, error => {
	return Promise.reject(error);
})
/**
 * 在响应拦截其中进行个性化拦截配置 （因为这里开启的是本地的服务）
 */
http.interceptor.response((response) => {
	// 进行请求配置
	uni.hideLoading()
	if (response.statusCode == 200) {
		let {
			data
		} = response
		return data
	} else {
		return response
	}
}, (error) => {
	uni.hideLoading()
	tips.toast('响应错误，请稍后再试')
	return error
})
export {
	http
}