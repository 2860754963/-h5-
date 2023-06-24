export const trimObj = (obj) => {
	// JSON.pase()的第二个参数为函数，函数的参数是当前对象的键和值
	return JSON.parse(JSON.stringify(obj), (key, value) => {
		if (value === '') {
			return undefined
		} else {
			return value
		}
	})
}