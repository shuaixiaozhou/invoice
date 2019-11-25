var common = require("../common/common.js")

Page({
    data: {
        files: [],
        urls:[],
        message:"请选择要上传的二维码或定额发票图片",
         showTopTips: false,
       
        date: "2016-09-01",
        time: "12:01",
        accounts: ["扫码开票", "定额发票"],
        accountIndex: 0,

        isAgree: false,
        money:0,
        title: "",
        note: "",
    },
    chooseImage: function (e) {
      if (this.data.files.length > 0) {
        this.setData({
          message:"最多只能上传一个二维码！"
        })
        return
      }
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                });
                //请求后台上传图片
                //发送给后台
                var url = "/api/common/upload";
          
                console.log(res)
                var thattt = that;
                common.commonUpload({
                  url: url,
                  filePath: res.tempFilePaths[0],
                  success: function (res) {
                    console.log(res);
                    if (res && res.data) {
                      thattt.setData({
                        urls: thattt.data.urls.concat(res.data)
                      });
                      return res
                    } else {
                      return res
                    }
                  }
                })
            }
        })
   
    },
    previewImage: function(e){
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
        })

    },
  showTopTips: function () {
    //保存按钮触发
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
    //发送给后台
    var url = "/invoice/add";
    var token = wx.getStorageSync("token");

    //请求后台获取用户信息
    common.commonRequest({
      url: url,
      method: "POST",
      header:{
        "token":token,
        "Content-Type": "application/json",
      },
      param: {
        "title": this.data.title,
        "note": this.data.note,
        "url": this.data.urls[0],
        "money": this.data.money,
        "type": this.data.accountIndex,
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

  bindAccountChange: function (e) {
    this.setData({
      accountIndex: e.detail.value
    })
  },
  moneyInput: function (e) {
    this.setData({
      money: e.detail.value
    })
  }, 
  titleInput: function (e) {
    this.setData({
      title: e.detail.value
    })
  }, 
  noteInput: function (e) {
    this.setData({
      note: e.detail.value
    })
  },
});