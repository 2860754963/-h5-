// 在此引入 http

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

export default apiserve