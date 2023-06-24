import modules from './modules'
import Router from '@/js_sdk/uni-simple-router/index.js'
import {
	getItem
} from '@/common/utils/storage.js'
import {
	user_token
} from '@/common/utils/constants.js'


//初始化
const router = new Router({
	encodeURI: true,
	routes: [...modules] //路由表
});

const whiteList = ['/pages/login/login']
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	console.log('进入前置路由首位');
	let token = getItem(user_token)
	if (token) {
		console.log(to, "toTOKEN");
		console.log(from, "fromTOKEN");
		if (to.path === '/pages/login/login') {
			next({
				path: '/pages/index/index'
			})
		} else {
			next()
		}
	} else {
		console.log(to, "to");
		console.log(from, "from");
		if (whiteList.includes(to.path)) {
			next()
		} else {
			next({
				path: '/pages/login/login'
			})
		}
	}
})
// 全局路由后置守卫
router.afterEach((to, from) => {
	console.log("afterEach")
})
export {
	router,
	Router
};