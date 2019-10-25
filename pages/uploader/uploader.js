Page({
    data: {
        files: [],
        message:"请选择要上传的二维码或定额发票图片",
         showTopTips: false,
        radioItems: [
          { name: 'cell standard', value: '0' },
          { name: 'cell standard', value: '1', checked: true }
        ],
        checkboxItems: [
          { name: 'standard is dealt for u.', value: '0', checked: true },
          { name: 'standard is dealicient for u.', value: '1' }
        ],

        date: "2016-09-01",
        time: "12:01",

        countryCodes: ["+86", "+80", "+84", "+87"],
        countryCodeIndex: 0,

        accounts: ["扫码开票", "定额发票"],
        accountIndex: 0,

        isAgree: false
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
  },

  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  }
});