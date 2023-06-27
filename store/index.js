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
	user_info,
	set_token_get_time
} from '@/common/utils/constants.js'
import tips from '@/common/utils/tip.js'
import moment from 'moment'
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
			commit('set_token', loginInfo.token)
			commit('set_userid', loginInfo.userid)
			commit('set_userpsd', loginInfo.userpsd)
			commit('set_userInfo', loginInfo)
			setItem(user_token, loginInfo.token)
			setItem(user_id, loginInfo.userid)
			setItem(user_psd, loginInfo.userpsd)
			setItem(user_info, loginInfo)
			setItem(set_token_get_time, Date.now())

		},
		logoutAction({
			commit,
			state
		}, logoutInfo) {
			// commit('set_token', res.token)
			// commit('set_userid', res.userid)
			// commit('set_userpsd', res.userpsd)
			// commit('set_userInfo', res)
			removeItem(user_token)
			removeItem(user_id)
			removeItem(user_psd)
			removeItem(user_info)

		}
	},
	getters: {},
	modules: {}
})