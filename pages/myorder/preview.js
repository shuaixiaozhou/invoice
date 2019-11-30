
var common = require("../common/common.js")
Page({
  data:{
    orderId:"",
    orderAmt: 0,
    orderTitle: "",
    status: 0,
    email: "",
    sellerMobile:0,
    url:"",
  },
  onLoad: function(options) {
    
    //发送给后台
    var url = "/api/v1/order/detail?id=" + options.id;
    var token = wx.getStorageSync("token");
    var that = this;
    //请求后台获取用户信息
    common.commonRequest({
      url: url,
      method: "GET",
      header: {
        "token": token,
        "Content-Type": "application/json",
      },
      success: function (res) {
        console.log(res);
        if (res && res.data) {
          that.setData(res.data);
          return res
        } else {
          return res
        }
      }
    })

  },
  backMoney: function () {
    var token = wx.getStorageSync("token");
    if (!token) {
      wx.showModal({
        title: '错误',
        content: '请先授权登陆',
      })
      wx.switchTab({
        url: 'pages/badge/badge',
      })
      return
    }
    var userinfo = wx.getStorageSync("userinfo");
    if (!userinfo || !userinfo.mobile) {
      wx.showModal({
        title: '错误',
        content: '请先绑定手机号',
      })
      wx.switchTab({
        url: 'pages/badge/badge',
      })
      return
    }
    //发送给后台
    var url1 = "/api/v1/order/modifyOrder";
    var thatt = this;
    //请求后台获取用户信息
    common.commonRequest({
      url: url1,
      method: "POST",
      header: {
        "token": token,
        "Content-Type": "application/json",
      },
      param: {
        "orderStatus": 230,
        "id": thatt.data.orderId,
      },
      success: function (res) {
        console.log(res);
        if (res && res.data) {
          if (res.code != 1000) {
            wx.showModal({
              title: '错误',
              content: res.message,
            })
          }else{
            wx.showModal({
              title: '提示',
              content: '成功',
              success(res) {
                wx.navigateBack({
                  delta: 2
                })
              }
            })
          }
        }
      }
    })

  }, 
  confirm: function () {
    var token = wx.getStorageSync("token");
    if (!token) {
      wx.showModal({
        title: '错误',
        content: '请先授权登陆',
      })
      wx.switchTab({
        url: 'pages/badge/badge',
      })
      return
    }
    var userinfo = wx.getStorageSync("userinfo");
    if (!userinfo || !userinfo.mobile) {
      wx.showModal({
        title: '错误',
        content: '请先绑定手机号',
      })
      wx.switchTab({
        url: 'pages/badge/badge',
      })
      return
    }
    //发送给后台
    var url1 = "/api/v1/order/modifyOrder";
    var thatt = this;
    //请求后台获取用户信息
    common.commonRequest({
      url: url1,
      method: "POST",
      header: {
        "token": token,
        "Content-Type": "application/json",
      },
      param: {
        "orderStatus": 115,
        "id": thatt.data.orderId,
      },
      success: function (res) {
        console.log(res);
        if (res && res.data) {
          if (res.code != 1000) {
            wx.showModal({
              title: '错误',
              content: res.message,
            })
          }else{
               wx.showModal({
              title: '提示',
              content: '成功',
              success(res) {
                wx.navigateBack({
                  delta: 2
                })
              }
            })
          }
        }
      }
    })

  }, 
});