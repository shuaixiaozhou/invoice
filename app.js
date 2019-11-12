//app.js
var common = require("./pages/common/common.js")
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    wx.checkSession({
      success(res) {
        //session_key 未过期，并且在本生命周期一直有效
        console.log(res)
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        wx.login({
          success(res) {
            if (res&&res.code) {
              console.log(res)
              //发起网络请求
             let rest = common.login(res.code)
              if (rest && rest.statusCode==200){
                console.log("登录成功" + rest)
              }
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })
    var self = this
    // 获取用户信息
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
         
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              self.globalData.userInfo = res.userInfo
              console.log(res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (self.userInfoReadyCallback) {
                console.log(self.userInfoReadyCallback)
                self.userInfoReadyCallback(res)
              }
             
            }
          })
        }else{
          console.log("用户没有打开自动授权 需要在右上角设置")
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})