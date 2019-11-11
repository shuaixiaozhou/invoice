const serverUrl = "http://localhost:8080/"
const appid = "wx4d2133359630715a"

function login(code) {
  //换取sessionKey和openid
 var res = this.commonRequest({
   url:"/wx/user/{appid}/login?code=" + code,
   param: { "token": "123456" },
   success: function (res) {
     console.log(res);
     if (res && res.sessionKey ) {
       //用sessionkey和opeinid换取
       wx.setStorageSync("sessionKey", res.sessionKey)
       wx.setStorageSync("openid", res.openid)
       return res
     } else {
       return res
     }
   }
 })
 return res
}



//网络请求方法
function commonRequest(model) {
  model.url = model.url.replace("{appid}", appid);
  wx.request({
    url: serverUrl + model.url,
    data: model.param,
    header: {
      "Content-Type": "application/json"
    },
    method: model.method,
    success: function (res) {
      model.success(res.data)
    },
    fail: function (res) {
      wx.showModal({
        title: res,
        showCancel: false
      })
    }
  })
}
// 导出模块
module.exports = {
  commonRequest: commonRequest,
  login: login
}