const routes = [{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦 
		path: '/pages/index/index',
		name: 'index',
		meta: {
			title: '油品主页',
		},
	},
	{
		path: "/pages/login/login",
		name: 'login',
		meta: {
			title: '登录',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦 
		path: '/pages/indexlist/indexlist',
		name: 'indexlist',
		meta: {
			title: '主页列表',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦 
		path: "/pages/shoplist/shoplist",
		name: 'shoplist',
		meta: {
			title: '购物车列表',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦 
		path: "/pages/mylist/mylist",
		name: 'shoplist',
		meta: {
			title: '我的列表',
		},
	}
]
export default routes