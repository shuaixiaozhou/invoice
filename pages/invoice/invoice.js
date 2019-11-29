// pages/home/index.js
var base64 = require("../../image/base64");
var common = require("../common/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //发送给后台
    var url = "/api/v1/invoice/list?my=true";
    var token = wx.getStorageSync("token");
    var that=this;
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
          that.setData({
            list:res.data
          });
          return res
        } else {
          return res
        }
      }
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

  }
})