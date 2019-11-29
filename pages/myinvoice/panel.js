var base64 = require("../../image/base64");

Page({
  data:{

  },
    onLoad: function(){
        this.setData({
            icon20: base64.icon20,
            icon60: base64.icon60
        });
    }
});