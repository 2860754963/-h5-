let BASE_URL = process.env.ENV_PATH //基础环境路径
let staticDomainURL = BASE_URL + '/sys/common/static'; //静态资源路径
const configService = {
	baseurl: BASE_URL,
	staticDomainURL: staticDomainURL,
	appId: 'wx37b4e341f8763f47'
};

export default configService