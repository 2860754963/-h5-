// 在此进行请求拦截器的配置 与响应拦截器的解构之类的
// 这里使用  luch-request 插件进行配置请求 基于Promise开发的跨平台、项目级别的请求库，它有更小的体积，易用的api，方便简单的自定义能力
import Request from '@/js_sdk/luch-request/luch-request/index.js'
import configService from './config.service.js'
let baseurl = configService.baseurl;
const http = new Request()
http.setConfig((config) => {
	/* 设置全局配置 */
	config.baseUrl = baseurl /* 根域名不同 */
	config.header = {
		...config.header
	}
	return config
})
// 请求拦截器 添加 token
http.interceptor.request((config, cancel) => {
	if (config.Loading) {
		uni.showLoading({
			title: '请求中，请稍后',
			mask: true
		})
	}
	config.header = {
		...config.header,
		'X-Access-Token': getTokenStorage(),
		'tenant-id': uni.getStorageSync('tid') || ''
	}
	// if (hitRequestKey(config.url)) return;
	// addRequesKey(config.url);
	/*
	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
	  cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	}
	*/
	return config
})