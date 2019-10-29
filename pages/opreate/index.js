// pages/opreate/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    taxNumber: "",
    bankName: "",
    bankAccount: "",
    accounts: ["单位", "个人"],
    accountIndex: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  /**
   * 购买发票调用微信支付
   */
  buy: function() {
    //服务器端调用统一下单接口返回prepay_id 和调用sdk返回的paySign等字段
      
    wx.requestPayment(
      {
        'timeStamp': '1490840662',
        'nonceStr': '5K8264ILTKCH16CQ2502SI8ZNMTM67VS',
        'package': 'prepay_id=wx2017033010242291fcfe0db70013231072',
        'signType': 'MD5',
        'paySign': 'paySign',
        'success': function (res) { console.log(res)},
        'fail': function (res) { console.log(res) },
        'complete': function (res) { console.log(res) }
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