import Vuex from 'vuex'
import Vue from 'vue'
import {
	apiserve
} from '@/api/index.js'
import {
	setItem,
	getItem,
	removeItem
} from '@/common/utils/storage.js'
import {
	user_token,
	user_id,
	user_psd,
	user_info
} from '@/common/utils/constants.js'
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		token: '' || getItem(user_token),
		userid: '' || getItem(user_id),
		userpsd: '' || getItem(user_psd),
		userInfo: getItem(user_info)
	},
	mutations: {
		set_token(state, token) {
			state.token = token
		},
		set_userid(state, userid) {
			state.userid = userid
		},
		set_userpsd(state, userpsd) {
			state.userpsd = userpsd
		},
		set_userInfo(state, userInfo) {
			state.userInfo = userInfo
		}

	},
	actions: {
		loginAction({
			commit
		}, loginInfo) {
			// 在此可以调用 api中的调用的
			apiserve.login(loginInfo).then(res => {
				commit('set_token', res.token)
				commit('set_userid', res.userid)
				commit('set_userpsd', res.userpsd)
				commit('set_userInfo', res)
				// 存储到本地存储
				setItem(user_token, res.token)
				setItem(user_id, res.userid)
				setItem(user_psd, res.userpsd)
				setItem(user_info, res)
			})
		},
		logoutAction({
			commit,
			state
		}) {
			// 在此传入token
			let token = state.token
			apiserve.logout(token).then(res => {
				commit('set_token', res.token)
				commit('set_userid', res.userid)
				commit('set_userpsd', res.userpsd)
				commit('set_userInfo', res)
				removeItem(user_token)
				removeItem(user_id)
				removeItem(user_psd)
				removeItem(user_info)
			})
		}
	},
	getters: {},
	modules: {}
})