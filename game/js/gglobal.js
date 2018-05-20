
// 配置API接口地址
var host = 'http://liyn.me:8888/web-api/v1/'
//var host = 'http://192.168.3.28:8888/web-api/v1/'
var staticUrl = '..'
global = $.extend({},global,{
  tipsTime: '',
  countDowmTime: '',
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
    }
})
