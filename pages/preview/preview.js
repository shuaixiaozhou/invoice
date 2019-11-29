
var common = require("../common/common.js")
Page({
  data:{
    id:0,
    url:"",
    money: 0,
    title: "",
    note: "",
    mobile: "",
    type:0,
  },
  onLoad: function(options) {
    
    //发送给后台
    var url = "/api/v1/invoice/detail?id=" + options.id;
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
  buy :function(){
    var token = wx.getStorageSync("token");
    if (!token){
      wx.showModal({
        title: '支付错误',
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
        title: '支付错误',
        content: '请先绑定手机号',
      })
      wx.switchTab({
        url: 'pages/badge/badge',
      })
      return
    }
    //发送给后台
    var url1 = "/api/v1/order/addUserOrder";
    var thatt =this ;
    //请求后台获取用户信息
    common.commonRequest({
      url: url1,
      method: "POST",
      header: {
        "token": token,
        "Content-Type": "application/json",
      },
      param: {
        id: thatt.data.id,
        orderNote: thatt.data.orderNote,
      },
      success: function (res) {
        console.log(res);
        if (res && res.data) {
          //统一下单接口
          //发送给后台
          var url = "/api/v1/mall/wxpay/payinfoByOrder/miniprogram?orderNo=" + res.data;

          var that = thatt ;
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
                wx.requestPayment(
                  {
                    'timeStamp': res.data.timeStamp,
                    'nonceStr': res.data.nonceStr,
                    'package': res.data.package,
                    'signType': res.data.signType,
                    'paySign': res.data.sign,
                    'success': function (res) { console.log(res) },
                    'fail': function (res) { console.log(res) },
                    'complete': function (res) { console.log(res) }
                  })
                
                return res
              } else {
                return res
              }
            }
          })
          return res
        } else {
          return res
        }
      }
    })
   

 
  }
});