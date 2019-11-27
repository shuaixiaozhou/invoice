const serverUrl = "http://localhost:8082/"
const appid = "wx4d2133359630715a"

function login(code) {
  //换取sessionKey和openid
 var res = this.commonRequest({
   url:"/wx/user/{appid}/code2session?code=" + code,
   success: function (res) {
     console.log(res);
     if (res && res.data.sessionKey ) {
       //用sessionkey和opeinid换取
       wx.setStorageSync("sessionKey", res.data.sessionKey)
       wx.setStorageSync("openid", res.data.openid)
    
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
  var header= {
    "Content-Type": "application/json"
  };
  if (model.header){
    header = model.header;
  }
  wx.request({
    url: serverUrl + model.url,
    data: model.param,
    header: header,
    method: model.method,
    success: function (res) {
      model.success(res.data)
    },
    fail: function (res) {
      wx.showModal({
        "title": JSON.stringify(res),
        "showCancel": false
      })
    }
  })
}
//网络请求方法
function commonUpload(model) {
  model.url = model.url.replace("{appid}", appid);
  wx.uploadFile({
    url: serverUrl + model.url,
    filePath: model.filePath,
    name: 'file',
    formData: model.param,
    success: function (res) {
      model.success(JSON.parse(res.data))
    },
    fail: function (res) {
      wx.showModal({
        "title": JSON.stringify(res),
        "showCancel": false
      })
    }
  })
}
// 导出模块
module.exports = {
  commonRequest: commonRequest,
  commonUpload: commonUpload,
  login: login
}