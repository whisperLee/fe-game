/**
 * Created by nielinlin on 2018/5/4.
 */
document.write("<script language=javascript src='../../js/init.js'></script>");
var global = {
    host:'',
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
        var _self = this
        $.ajaxSettings.beforeSend = function(xhr) {
            // see https://github.com/madrobby/zepto/issues/274
            xhr.withCredentials = true;
        };
        var d = $.extend({}, {
            url: '',
            data: {},
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true
            },
            timeout: 10000,
            type: 'POST',
            dataType: 'json',
            success: function () {}
        }, data)
        d.url = host + d.url
        // if(codeType=="test" && this.urlHash().gameNumber){ // 测试环境执行
        //       if(this.urlHash().gameNumber<10){
        //           d.data.userToken = '20'+ this.urlHash().gameNumber
        //       }else{
        //           d.data.userToken = '1' + this.urlHash().gameNumber
        //       }
        //       global.setCookie('a__b',d.data.userToken)
        // }
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
            }, 2000)
        }

    },
    router: function (path) {
        window.location.href = path
    },
    setCookie: function (name, value) {
        var Days = 30
        var exp = new Date()
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
        document.cookie = name + '=' + value + ';path=/;expires='+exp
    },
    isExit:function(str){
        return typeof(str) != "undefined"
    },
    getStorage:function(Key){
        var storage = window.localStorage.getItem(Key) || "{}";
        return JSON.parse(storage);
    },
    //设置本地存储数据
    setStorage:function(key,value){
        window.localStorage.setItem( key,JSON.stringify(value));
    },
    //清空本地存储
    clearStorage:function(Key){
        window.localStorage.removeItem(Key);
    },
    getMenuType:function(){
        var ua = navigator.userAgent;
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
            isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
            isAndroid = ua.match(/(Android)\s+([\d.]+)/)
        if(isIphone || isAndroid){
            return "MOBILE"
        }else{
            return "pc"
        }
    },
    codeError:function(code){
        var _self = global
        if(code=='1002'){
            _self.router("wx_login.html")
        }else if(code=='1009'){
            global.pop_tips("请在微信中打开本页面")
        }else if(code=='1011'){
            global.pop_tips("您还没有注册，即将为您跳转到注册页面",function(){
                global.router("wx_register.html")
            })
        }else{
            _self.pop_tips("网络异常，请重试")
        }
    }

}
