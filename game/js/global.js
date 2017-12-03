
// 配置API接口地址
var host = 'http://liyn.me:8888/web-api/v1/'
//var host = 'http://192.168.3.28:8888/web-api/v1/'
var staticUrl = '..'
var global = {
  tipsTime: '',
  countDowmTime: '',
  urlHash: function () {
    var name, value
    var str = location.href // 取得整个地址栏
    var num = str.indexOf('?')
    var urlHash = {}
    str = str.substr(num + 1)  // 取得所有参数stringvar.substr(start [, length ]

    var arr = str.split('&') // 各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
      num = arr[i].indexOf('=')
      if (num > 0) {
        name = arr[i].substring(0, num)
        value = arr[i].substr(num + 1)
        urlHash[name] = value
      }
    }
    return urlHash
  },
  ajax: function (data) {
    var d = $.extend({}, {
      url: '',
      data: {},
      contentType: 'application/json',
      timeout: 30000,
      type: 'POST',
      dataType: 'json',
      success: function () {}
    }, data)
    d.url = host + d.url
      if(this.urlHash().gameNumber<10){
          d.data.userToken = '10'+ this.urlHash().gameNumber
      }else{
          d.data.userToken = '1' + this.urlHash().gameNumber
      }
        global.setCookie('a__b',d.data.userToken)
    d.data = JSON.stringify(d.data)
    $.ajax(d)
  },
  pop_tips: function (msg, callback,time) {
    console.log('pop')
    clearTimeout(this.tipsTime)
    if ($('.simple_tips').length > 0) {
      $('.simple_tips .tips_inner').html(msg)
    } else {
      $('body').append('<div class="simple_tips"><div class="tips_inner">' + msg + '</div></div>')
    }
    $(".simple_tips").off().on("click",function(){
      $(this).remove()
    })
    callback = callback || function () {}

    if(!time){
        this.tipsTime = setTimeout(function () {
            $('.simple_tips').remove()
            callback()
        }, 3000)
    }

  },
    router: function (path) {
      window.location.href = path
    },
  setCookie: function (name, value) {
    var Days = 30
    var exp = new Date()
    document.cookie = name + '=' + escape(value)  + ';expires=' + exp.toGMTString()+';path=/'
  },
    saoyisao: function () {
      console.log('调去扫一扫功能')
    },
    countDown: function (time,el,fun1,fun2) {
        var _self = this;
        fun1 = fun1 || function () { }
        fun2 = fun2 || function () { }
        el.show().find('span').html(time)
        clearInterval(_self.countDownTime)
        _self.countDownTime = setInterval(function () {
            if (time > 0) {
                time--
                el.find('span').html(time)
                fun1(time)
            } else {
                _self.countDownStop()
                fun2()
            }
        }, 1000)
    },
    countDownStop: function (el) {
        var _self = this
        el = el || $('.countDown')
        clearInterval(_self.countDownTime)
        el.hide()
    },
    returnDurTime:function(time){
      return (time-2)*1000
    },
    isExit:function(str){
      return typeof(str) != "undefined"
    }
}
