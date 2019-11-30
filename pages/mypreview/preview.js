
var common = require("../common/common.js")
Page({
  data:{
    id:"",
    url:"",
    money: 0,
    title: "",
    note: "",
    mobile: "",
    type:0,
    email:"",
    userInvoiceTitle:"",
    userInvoiceTaxNumber: "",
  },
  onLoad: function(options) {
    
    //发送给后台
    var url = "/api/v1/invoice/detail?id=" + options.id+"&my=true";
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
  callMobile :function(){
    wx.makePhoneCall({
      phoneNumber: this.data.mobile//仅为示例，并非真实的电话号码
    })
  },
  deleteMethod :function(){
    var token = wx.getStorageSync("token");
    if (!token){
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
    if (!userinfo || !userinfo.mobile){
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
    var url1 = "/api/v1/invoice/delete?id"+this.data.id;
    var thatt =this ;
    //请求后台获取用户信息
    common.commonRequest({
      url: url1,
      method: "GET",
      header: {
        "token": token,
        "Content-Type": "application/json",
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
  downMethod: function () {
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
    var url1 = "/api/v1/invoice/modify";
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
        "status": 2,
        "id": thatt.data.id,
      },
      success: function (res) {
        console.log(res);
        if (res && res.data) {
          if (res.code != 1000) {
            wx.showModal({
              title: '错误',
              content: res.message,
            })
          } else {
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
        } else {
          wx.showModal({
            title: '错误',
            content: '服务器异常',
          })
        }
      }
    })

  }, 
  send: function () {
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
    var url1 = "/api/v1/invoice/modify";
    var thatt = this;
    //请求后台获取用户信息
    common.commonRequest({
      url: url1,
      method: "POST",
      header: {
        "token": token,
        "Content-Type": "application/json",
      },
      param:{
        "status": 4,
        "id":thatt.data.id,
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
        }else{
          wx.showModal({
            title: '错误',
            content: '服务器异常',
          })
        }
      }
    })



  }
});