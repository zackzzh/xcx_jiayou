import request from './request.js'
import requestSwan from './requestSwan.js'

class service {
  constructor() {
    // this._baseUrl = 'http://192.168.1.126:8099/csa/api' //内网
    // this._baseUrl = 'https://www.onemorecar.cn/csa/api' //外网
    // this._baseUrl = 'http://112.74.172.5:8088/jyweb/api'
    this._baseUrl = "https://www.jiayouad.com/jyweb/api"

    this._defaultHeader = {
      'Content-Type': 'application/json'
    }
    // console.log("mpvuePlatform", mpvuePlatform)
    // 判断是否为微信端，加载不同的模块
    if (mpvuePlatform === "wx") {
      this._request = new request
    } else {
      this._request = new requestSwan
    }
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
  }

  // 公共Api
  commonApi(val) {
    if (val.method === "get") {
      return this._request.getRequest(this._baseUrl + val.url, val.data).then(res => res.data)
    } else {
      return this._request.postRequest(this._baseUrl + val.url, val.data).then(res => res.data)
    }
  }
}
export default service
