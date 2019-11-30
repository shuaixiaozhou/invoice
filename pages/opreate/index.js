// pages/opreate/index.js

var common = require("../common/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    title:"",
    taxNumber: "",
    bankName: "",
    bankAccount: "",
    accounts: ["单位", "个人"],
    accountIndex: 1,
    email: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindKeyInput: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  /**
   * 购买发票调用微信支付
   */
  buy: function() {
 
    if(!this.data.email){
      wx.showModal({
        title: '提示',
        content: '请填写邮箱地址',
      })
    }
    var token = wx.getStorageSync("token");
    if (!token) {
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
    if (!userinfo || !userinfo.mobile) {
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
        id: thatt.data.id,
        title: thatt.data.title,
        orderNote: thatt.data.orderNote,
        taxNumber: thatt.data.taxNumber,
        bankName: thatt.data.bankName,
        bankAccount: thatt.data.bankAccount,
        accountType: thatt.data.accountIndex,
        email: thatt.data.email,
      },
      success: function (res) {
        console.log(res);
        if(res &&res.code!=1000){
          wx.showModal({
            title: '错误',
            content: res.message,
          })
          return
        }
        if (res && res.data) {
          //统一下单接口
          //发送给后台
          var url = "/api/v1/mall/wxpay/payinfoByOrder/miniprogram?orderNo=" + res.data;

          var that = thatt;
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
                wx.showModal({
                  title: '支付错误',
                  content: res.message,
                })
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
  },
  goback: function(){
    wx.navigateBack()
  },
  invoiceTitle: function(){
    let that=this
    wx.chooseInvoiceTitle({
      success(res) {
        console.log(res)
        that.setData({
          title:res.title,
          taxNumber: res.taxNumber,
          bankName: res.bankName,
          bankAccount: res.bankAccount,
          accountIndex: res.type,
        });
        
       }
    })
  }
})