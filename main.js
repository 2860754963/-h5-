import App from './App'
import Vue from 'vue'
import store from '@/store/index.js'
import uView from 'uview-ui'
import tip from '@/common/utils/tip.js'
import {
	trimObj
} from '@/common/utils/trimObj.js'
import {
	router,
	Router
} from '@/router/index.js'
import {
	RouterMount
} from '@/js_sdk/uni-simple-router/index.js'
Vue.prototype.$tip = tip;
Vue.prototype.$store = store;
Vue.prototype.$trimObj = trimObj;
Vue.use(Router)
Vue.use(uView)
//uView 配置
uni.$u.setConfig({
	// 修改$u.config对象的属性
	config: {
		// 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
		unit: 'rpx'
	},
	// 修改$u.props对象的属性
	props: {
		// 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
		subsection: {
			fontSize: 24
		},
		search: {
			height: 72,
			searchIconSize: 44
		},
		loadmore: {
			iconSize: 34,
			fontSize: 28
		},
		tabs: {
			lineHeight: '4rpx',
			lineWidth: '40rpx',
			inactiveStyle: {
				fontSize: '26rpx',
				color: '#606266'
			},
			lineColor: '#CB0E0B',
			activeStyle: {
				fontSize: '26rpx',
				color: '#CB0E0B'
			},
			itemStyle: {
				height: '70rpx'
			}
		},
		subsection: {
			activeColor: '#CB0E0B'
		},
		upload: {
			width: 160,
			height: 160,
			iconSize: 36
		},
		avatar: {
			fontSize: 36,
			size: 80
		},
		input: {
			fontSize: 26,
		},
		'u--textarea': {
			cursorSpacing: 280
		},
		'u--input': {
			cursorSpacing: 280
		},
		empty: {
			textSize: 26,
			iconSize: 180,
			width: 320,
			marginTop: '25vh'
		},
		icon: {
			fontSize: 48,
			iconSize: 36
		},
		radio: {
			size: 36,
			labelSize: 24,
			activeColor: '#CB0E0B'
		},
		skeleton: {
			avatarSize: 128,
			rowsHeight: 36,
			titleHeight: 36
		},
		noticeBar: {
			fontSize: 38,
			iconSize: 36
		},
		switch: {
			size: 50
		}
	}
})


Vue.config.productionTip = false
App.mpType = 'app'

try {
	function isPromise(obj) {
		return (
			!!obj &&
			(typeof obj === "object" || typeof obj === "function") &&
			typeof obj.then === "function"
		);
	}

	// 统一 vue2 API Promise 化返回格式与 vue3 保持一致
	uni.addInterceptor({
		returnValue(res) {
			if (!isPromise(res)) {
				return res;
			}
			return new Promise((resolve, reject) => {
				res.then((res) => {
					if (res[0]) {
						reject(res[0]);
					} else {
						resolve(res[1]);
					}
				});
			});
		},
	});
} catch (error) {}

const app = new Vue({
	store,
	...App
})
// #ifdef H5
RouterMount(app, '#app');
// #endif
// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif