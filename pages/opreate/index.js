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
  buy: function() {
      console.log("123")
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