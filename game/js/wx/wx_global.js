/**
 * Created by nielinlin on 2018/1/21.
 */
var host = http+':7777/web-api/v1/face/'
//Vue.config.productionTip = false
document.title='遇见狼人杀'
var shareData = {
    title: "遇见狼人杀",
    desc: "遇见知己,看见自己",
    img: http+"/fe-game/game/wxImage/logo.jpg", //分享图
    link: window.location.href.split("?")[0]
};
global = $.extend({},global,{
    wxReady:false,
    getConfig:function(jsApiList,callback,error){
        var _self = this
        // jsApiList = [
        //     'checkJsApi',
        //     'onMenuShareTimeline',
        //     'onMenuShareAppMessage',
        //     'scanQRCode',
        //     'getNetworkType',
        //     'openLocation',
        //     'getLocation'
        // ]
        jsApiList.push("checkJsApi")
        callback = callback || function(){}
        error = error || function(){}
        var d = {
            url: http+':7777/web-api/v1/face/wechat/jsApiConfig',
            data: {
                "string": location.href,
            },
            success: function (d) {
                console.log(d)
                if(d.appId){
                    //config接口注入权限验证配置
                    wx.config({
                        debug: false,
                        appId: d.appId,
                        timestamp: d.timestamp,
                        nonceStr: d.nonce,
                        signature: d.signature,
                        jsApiList: jsApiList
                    });

                    wx.ready(function(){
                        _self.wxReady = true;
                        //_self.wxShare()
                        callback()
                    });
                    wx.error(function (res) {
                        console.log(res)
                        error()
                    });
                }
            }
        }
        global.ajax(d)
    },
    wxShare:function(){
        // 分享到朋友圈

        wx.onMenuShareTimeline({
            title: shareData.title, // 分享标题
            link: shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareData.img, // 分享图标
            success: function () {
                // 用户点击了分享后执行的回调函数
                console.log("share success")
            }
        });
            // 分享给朋友
        wx.onMenuShareAppMessage({
            title: shareData.title, // 分享标题
            desc: shareData.desc, // 分享描述
            link: shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareData.img, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户点击了分享后执行的回调函数
                console.log("share success")
            }
        });
        //global.getConfig(['onMenuShareTimeline','onMenuShareAppMessage'],global.wxShare)
    },
    wxGetNet:function(){
        wx.getNetworkType({
            success: function (res) {
                console.log("网络状态"+res.networkType)
                return res.networkType // 返回网络类型2g，3g，4g，wifi
            }
        });
        //global.getConfig(['getNetworkType'],global.wxGetNet)
    },
    saoyisao: function () {
        console.log('调扫一扫功能')
        wx.scanQRCode({
            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
            }
        });

        //global.getConfig(['scanQRCode'],global.saoyisao)

    },
    chooseWXPay:function(d,callback){
        console.log('调支付功能')
        callback = callback || function(){}
        wx.chooseWXPay({
            timestamp: d.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: d.nonce, // 支付签名随机串，不长于 32 位
            package: d.pack, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: d.signature, // 支付签名
            success: function (res) {
                console.log(res)
                callback()
            }
        });

            // global.getConfig(['chooseWXPay'],function(){
            //     global.chooseWXPay(d,callback)
            // })

    },
    wxGetLocation:function(){
            wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    return {"lat": latitude, "lon": latitude}
                }
            });

           // global.getConfig(['getLocation'],global.wxGetLocation)

    },
    wxOpenLocation:function(latitude,longitude){
            wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    return {"lat": latitude, "lon": latitude}
                }
            });

            //global.getConfig(['openLocation'],global.wxGetLocation)

    },
    footer:function(currType){
        var d = wFooter
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
        callback = callback || function(){}
        el.addClass("lock") //作用 控制按钮重复点击
        el.css({
            display:'block',
            opacity:1
        })
        el.velocity('stop', true)
        el.velocity({
            translateX:[0,"100%"]
        }, {
            duration: 400,
            easing: 'ease-in-out',
            complete:function(){
                el.addClass('active')
                el.removeClass("lock")
                //el.attr("lock",1)
                callback()
            }
        })
    },
    layerOuter:function(el,callback){
        var _self = this
        callback = callback || function(){}
        el.removeClass("lock")
        el.velocity({
            translateX:["100%",0]
        }, {
            duration: 400,
            easing: 'ease-in-out',
            complete:function(){
                el.hide();
                el.removeClass('active')
                callback()
            }
        })
    },
    isPoneAvailable:function(phonenumber){
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(phonenumber)) {
            return false;
        } else {
            return true;
        }
    },
    timestampToTime:function(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-'
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        D = date.getDate() + ' '
        return Y+M+D;
    },
    returnVoucherList:function(d){
        var h = ''
        var name,quantity,limit
        for(i=0;i<d.length;i++){
            name=interfaceValue.voucher.carType[d[i].type]
            if(d[i].type==0){ // 次卡
                quantity='<p class="money"><span>'+d[i].quantity+'</span>次</p>'
            }else if(d[i].type==1){ //天卡
                quantity='<p class="money"><span>'+d[i].quantity+'</span>天</p>'
            }else if(d[i].type==2){ //月卡
                quantity='<p class="money"><span>'+d[i].quantity+'</span>月</p>'
            }else if(d[i].type==3){ //vip体验卡
                quantity='<p class="money">VIP体验</p>'
            }else if(d[i].type==50){ //满额减
                quantity='<p class="money">￥<span>'+d[i].quantity+'</span></p><p class="limit">满'+d[i].reductionM+'元可用</p>'
            }else if(d[i].type==51){ //直减
                quantity='<p class="money">￥<span>'+d[i].quantity+'</span></p>'
            }

            limit = '<p class="info">'+interfaceValue.voucher.goodsType[d[i].goodsType]+'</p>'

            h+='<li class="card" canUse="'+d[i].canUse+'" type="'+d[i].type+'" cardId="'+d[i].id+'"><div class="left"><div class="inner">'+quantity+'</div></div><div class="right"><h3>'+name+'</h3>'+limit+'<p class="endTime">'+d[i].beginTime.split(" ")[0]+'-'+d[i].endTime.split(" ")[0]+'</p><span class="use">立即使用</span> </div> <b class="status"></b> </li>'
        }
        return h
    },
    hideLayer:function(el){
        var el = $(event.currentTarget).closest(".layerWrap")
        animate.layerOuter(el)
    },
    layerAfterOpen:function(){ // 解决滚动穿透问题
        window.scrollTop = document.scrollingElement.scrollTop;
        document.body.classList.add("bodyLayer");
        document.body.style.top = -window.scrollTop + 'px';
    },
    layerBeforeClose: function() {// 解决滚动穿透问题
        if($("body").hasClass("bodyLayer")){
            $("body").removeClass("bodyLayer")
            document.body.style.top = '0px';
            document.scrollingElement.scrollTop = window.scrollTop;
        }
        // scrollTop lost after set position:fixed, restore it back.

    }
    // cIscroll:function(dom,option){
    //     dom = dom || ".iscrollWrap"
    //     option = option || {click:true}
    //     setTimeout(function(){
    //         new IScroll(dom,option );
    //     },10)
    // }

})
var pageInit
$(function(){
     pageInit = {
        init:function(){
            this.barActive()
            this.back()
            this.phoneCheck()
            $(".radios").each(function(){
                var el = $(this)
                el.find(".radio").off().on("click",function(){
                    el.find(".radio").removeClass("on")
                    $(this).addClass("on")
                })
            })
        },
        back:function(){
            $(".header .back").off().on("click",function(){
                var backUrl = global.urlHash().backUrl
                var href = $(this).attr("href")
                if(backUrl){
                    global.router(backUrl)
                }else if(href){
                    global.router(href)
                }else{
                    history.go(-1)
                }

            })
            $(".layerWrap").each(function(){
                var w = $(this)
                w.find(".layerNavTop .back").off().on("click",function(){
                    global.layerBeforeClose()
                    global.layerOuter(w)
                })
            })
        },
        barActive:function(){
            $(".barWrap").each(function(){
                var w = $(this)
                w.find(".flexBar > li").each(function(idx){
                    $(this).off().on("click",function(){
                        w.find(".flexBar > li").removeClass("on").eq(idx).addClass("on")
                        w.find(".barCon").removeClass("on").eq(idx).addClass("on")
                    })
                })
            })
        },
        validateCountDown:function(el){
            el.addClass("countDown")
            var time = 90;
            function recur(){
                console.log(time)
                if(time>0){
                    el.find(".count span").html(time)
                    var vT = setTimeout(function(){
                        time--;
                        recur()
                    },1000)
                }else{
                    el.removeClass("countDown")
                }

            }
            recur()

        },
        phoneCheck:function(){
            var _self = this
            // 清除手机号
            $(".phone").each(function(){
                var el = $(this)
                var val = el.siblings(".validate")
                el.find(".clear").off().on("mousedown",function(){
                    $(".phone input").val("")
                })
            })
            //发送验证码
            $(".validate").each(function(){
                var el = $(this)
                el.find(".send").off().on("click",function(){
                    if($(this).hasClass("on")){
                        var d = {
                            url: 'user/getAuthCode',
                            data: {
                                "string": $(".phone input").val(),
                            },
                            success: function (d) {
                                console.log(d)
                                _self.validateCountDown(el)
                            }
                        }
                        global.ajax(d)
                    }

                })
            })
        }
    }
    pageInit.init()
})
