/**
 * Created by nielinlin on 2018/1/21.
 */
var host = 'http://liyn.me:7777/web-api/v1/face/'
//Vue.config.productionTip = false
var wglobal = $.extend({},global,{

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
        callback = callback || function(){}
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
    }
})

$(function(){
    var pageInit = {
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
                var backUrl = wglobal.urlHash().backUrl
                var href = $(this).attr("href")
                if(backUrl){
                    wglobal.router(backUrl)
                }else if(href){
                    wglobal.router(href)
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
                        wglobal.ajax(d)
                    }

                })
            })
        }
    }
    pageInit.init()
})
