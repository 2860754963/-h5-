/**
 * @abstract 提示与加载工具类 对uni-app的交互反馈  进行封装  toast confirm alert loading loaded
 */
export default class Tips {
	constructor() {
		this.isLoading = false;
	}
	/**
	 * 提示弹窗 （传入 title，icon:[success,error,fail,exception,none]，complete）
	 */
	static toast(title, icon = "none", complete) {
		uni.showToast({
			title: title,
			icon: icon,
			mask: true,
			duration: 1500,
			complete: () => {
				!!complete && complete()
			}
		});
	}
	/**
	 * 弹出确认窗口 （需传入全部参数，函数可不传）
	 */
	static confirm(title = '提示', content = '内容', cancelText, func1, complete) {
		uni.showModal({
			title: title,
			content: content,
			cancelText: cancelText,
			success: (res) => {
				if (res.confirm) {
					!!func1 && func1()
					console.log('用户点击确定');
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			},
			fail: (res) => {
				console.log('接口调用失败');
			},
			complete: () => {
				!!complete && complete()
				console.log('接口调用结束的回调函数（调用成功、失败都会执行）');
			}
		})
	}
	/**
	 * 警告框
	 */
	static alert(title = '警告框', content) {
		uni.showModal({
			title: title,
			content: content,
			showCancel: false,
		});
	}
	/**
	 * 弹出加载提示
	 */
	static loading(title = "加载中") {
		if (Tips.isLoading) {
			return;
		}
		Tips.isLoading = true;
		uni.showLoading({
			title: title,
			mask: true
		});
	}

	/**
	 * 加载完毕
	 */
	static loaded(title = '加载完毕', icon = 'success') {
		if (Tips.isLoading) {
			Tips.isLoading = false;
			uni.hideLoading();
		}
		uni.showToast({
			title: title,
			icon: icon,
			duration: 1500
		});
	}
}

Tips.isLoading = false;