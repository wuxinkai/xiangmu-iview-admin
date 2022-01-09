import HttpRequest from '@/utils/request'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
console.log(444,baseUrl)
const axios = new HttpRequest(baseUrl)
export default axios
