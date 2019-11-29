
var common = require("../common/common.js")
Page({
  /**
    * 页面的初始数据
    */
  data: {
    currentData: 0,
    selectPerson: true,
    listwait: [],
    listhad: [],
    listcom: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    //发送给后台
    var url = "/api/v1/order/list";
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
          var list = res.data;
          var listwait = new Array();
          var listhad = new Array();
          var listcom = new Array();
          for(let i=0;i<list.length;i++){
            if (list[i].orderStatus==105){
              listwait.push(list[i]);
            } else if(list[i].orderStatus == 110){
              listwalisthadit.push(list[i]);
            } else if (list[i].orderStatus == 115) {
              listcom.push(list[i]);
            }
          }
          that.setData({
            listwait: listwait,
            listhad: listhad,
            listcom: listcom,
          });
          return res
        } else {
          return res
        }
      }
    })

  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  }
});