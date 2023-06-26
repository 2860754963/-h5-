import {
	http
} from '@/common/service/service.js'
import {
	trimObj
} from '@/common/utils/trimObj.js'

/**
 * 登录登出api 需要在store中也调用
 */
const apiserve = {
	login(params) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(JSON.parse(JSON.stringify({
					...params,
					token: '123456789632155',
					userid: '17719215834',
				})))
			}, 1500)
		})
	},
	logout(params) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				JSON.parse(JSON.stringify({
					...params,
					result: '退出成功'
				}))
			}, 1500)
		})
	}
}

const indexdata = {
	getlunbo() {
		return http.get('/api/getlunbo')
	},
	getnewlist() {
		return http.get('/api/getnewslist')
	},
	getnewdetalis(params) {
		return http.get(`/api/getnew/${params}`)
	}
}

export {
	apiserve,
	indexdata
}