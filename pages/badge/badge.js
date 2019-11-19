//index.js
//获取应用实例
const app = getApp()

var common=require("../common/common.js")

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      console.log("2222" )
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log("1111111"+res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      console.log("333")
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log(res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          // var iv = res.iv

          // var pc = new WXBizDataCrypt(appId, sessionKey)

          // var data = pc.decryptData(encryptedData, iv)

          // console.log('解密后 data: ', data)
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    //请求后台获取用户信息
    //发送给后台
    var url = "/wx/user/{appid}/login";
    var sessionKey = wx.getStorageSync("sessionKey");
    var openid = wx.getStorageSync("openid");
    var res = e.detail;
    
    //请求后台获取用户信息
    common.commonRequest({
      url: url,
      method: "POST",
      param: {
        sessionKey: encodeURIComponent(sessionKey),
        signature: encodeURIComponent(res.signature),
        rawData: encodeURIComponent(res.rawData),
        encryptedData: encodeURIComponent(res.encryptedData),
        iv: encodeURIComponent(res.iv),
        openid: openid,
      },
      success: function (res) {
        console.log(res);
        if (res && res.data) {
          //用sessionkey和opeinid换取
          wx.setStorageSync("userinfo", res.data)
          wx.setStorageSync("token", res.data.token)
          return res
        } else {
          return res
        }
      }
    })
  },
  getPhoneNumber(e) {
    console.log(e.detail)
    //发送给后台
    var url = "/wx/user/{appid}/phone";
    var sessionKey = wx.getStorageSync("sessionKey");
    var openid = wx.getStorageSync("openid");
    var res = e.detail;

    //请求后台获取用户信息
    common.commonRequest({
      url: url,
      method: "POST",
      param: {
        sessionKey: encodeURIComponent(sessionKey),
        signature: encodeURIComponent(res.signature),
        rawData: encodeURIComponent(res.rawData),
        encryptedData: encodeURIComponent(res.encryptedData),
        iv: encodeURIComponent(res.iv),
        openid: openid,
      },
      success: function (res) {
        console.log(res);
        if (res && res.sessionKey) {
          //用sessionkey和opeinid换取
          wx.setStorageSync("phoneNumber", res.phoneNumber)
          wx.setStorageSync("purePhoneNumber", res.purePhoneNumber)
          return res
        } else {
          return res
        }
      }
    })
  }
})
