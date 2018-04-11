/**
 * Created by nielinlin on 2018/1/21.
 */
var host = 'http://liyn.me:7777/web-api/v1/face/'
Vue.config.productionTip = false

var dataValue = {
    'payType':{
        '0':'微信',
        '1':'支付宝',
        '2':'线下'
    }

}
var wglobal = {
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
        d.data.userToken =  "101"
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
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
        document.cookie = name + '=' + value + ';path=/'
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
    footer:function(currType){
        var d = [
            {
                type:"index",
                link:"wx_index.html",
                name:"首页"
            },
            {
                type:"appoint",
                link:"wx_appoint.html",
                name:"预约"
            },
            {
                type:"game",
                link:"game.html",
                name:"游戏"
            },
            {
                type:"shop",
                link:"wx_shop.html",
                name:"商城"
            },
            {
                type:"mine",
                link:"wx_mine.html",
                name:"我的"
            },

        ]
        var h = ''
        var curr = ''
        for(var i=0;i< d.length;i++){
            curr = d[i].type==currType?'on' :''
            h+='<li class="'+d[i].type+' '+curr+ '"><a href="'+d[i].link+'">'+d[i].name+'</a></li>'
        }
        $(".footer ul").html(h)
    },
    returnAddress:function(user){
        var address = ''
        if(user.boxId== '0'){
            address+= '大厅休息区 '
        }else{
            address+= user.boxId+'包房('+user.boxName+') '
            if(user.gameNumber == '0' ){
                address+= '观战区 '
            }else{
                address+= user.gameNumber + '号桌 '
            }
        }
        return address
    },
    layerEnter:function(el,callback){
        var _self = this
        $('.layer').hide()  //隐藏其它弹层
        el.css({
            display:'block',
            opacity:1
        })
        el.velocity({
            translateX:[0,"100%"]
        }, {
            duration: 500,
            easing: 'ease-in-out',
            complete:function(){
                el.addClass('active')
                callback()
            }
        })
    },
    layerOuter:function(el,callback){
        var _self = this
        el.velocity({
            translateX:["100%",0]
        }, {
            duration: 500,
            easing: 'ease-in-out',
            complete:function(){
                el.hide();
                el.removeClass('active')
                callback()
            }
        })
    },
    returnVoucherList:function(d){
        var h = ''
        var name,quantity,limit
        for(i=0;i<d.length;i++){
            if(d[i].type==0){ // 次卡
                name='次卡'
                quantity='<p class="money"><span>'+d[i].quantity+'</span>次</p>'
            }else if(d[i].type==1){ //天卡
                name='天卡'
                quantity='<p class="money"><span>'+d[i].quantity+'</span>天</p>'
            }else if(d[i].type==2){ //月卡
                name='月卡'
                quantity='<p class="money"><span>'+d[i].quantity+'</span>月</p>'
            }else if(d[i].type==3){ //vip体验卡
                name='Vip体验卡'
                quantity='<p class="money">VIP体验</p>'
            }else if(d[i].type==50){ //满额减
                name='满减券'
                quantity='<p class="money">￥<span>'+d[i].quantity+'</span></p><p class="limit">满'+d[i].reductionM+'元可用</p>'
            }else if(d[i].type==51){ //直减
                name='直减券'
                quantity='<p class="money">￥<span>'+d[i].quantity+'</span></p>'
            }

            if(d[i].goodsType==0){
                limit = '<p class="info">仅限虚拟商品使用</p>'
            }else if(d[i].goodsType==1){
                limit = '<p class="info">仅限餐饮小吃使用</p>'
            }else if(d[i].goodsType==-1){
                limit = '<p class="info">全品类可用</p>'
            }
            h+='<li class="card" canUse="'+d[i].canUse+'" type="'+d[i].type+'" cardId="'+d[i].id+'"><div class="left"><div class="inner">'+quantity+'</div></div><div class="right"><h3>'+name+'</h3>'+limit+'<p class="endTime">'+d[i].beginTime.split(" ")[0]+'-'+d[i].endTime.split(" ")[0]+'</p><span class="use">立即使用</span> </div> <b class="status"></b> </li>'
        }
        return h
    },
    hideLayer:function(el){
        var el = $(event.currentTarget).closest(".layerWrap")
        animate.layerOuter(el)
    }
}

$(function(){
    var pageInit = {
        init:function(){
            this.barActive()
            this.back()
        },
        back:function(){
            $(".header .back").off().on("click",function(){
                var backUrl = wglobal.urlHash().backUrl
                if(backUrl){
                    wglobal.router(backUrl)
                }else{
                    history.go(-1)
                }

            })
            $(".layerWrap").each(function(){
                var w = $(this)
                w.find(".layerNavTop .back").off().on("click",function(){
                    wglobal.layerOuter(w)
                })
            })
        },
        barActive:function(){
            $(".barWrap").each(function(){
                var w = $(this)
                w.find(".flexBar li").each(function(idx){
                    $(this).off().on("click",function(){
                        w.find(".flexBar li").removeClass("on").eq(idx).addClass("on")
                        w.find(".barCon").removeClass("on").eq(idx).addClass("on")
                    })
                })
            })
        }
    }
    pageInit.init()
})
