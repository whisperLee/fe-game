/**
 * Created by lynnenie on 2018/3/22.
 */

// 配置API接口地址
var host = http+':9999/web-api/v1/lair/'
//var host = 'http://192.168.3.28:8888/web-api/v1/'
document.write("<script language=javascript src='../../js/init.js'></script>");
global = $.extend({},global,{
    init:function(){
        var _this = this
        _this.navInit()
        _this.active()
    },
    getCurrentEmployee:function(){
        var _this = this
        var d = {
            url: 'employee/getCurrentEmployee ',
            success: function (d) {
                console.log(d)
                if(d.status.code == "OK" && d.data){
                    erp['user'] = d.data
                    _this.setStorage('yjerp',erp)
                    _this.showNavUser(d.data)
                }
            }
        }
        _this.ajax(d)
    },
    showNavUser:function (d) {
        $(".main .nav .user").html('<div class="head"><img src="../image/head.png"><p class="js-logout">退出</p></div><p class="name">'+d.employeeName+'</p></div>')
    },
    navInit:function(){
        var _this = this
        $(".main").prepend('<div class="nav"><div class="user"></div><ul></ul></div>')
        window.erp = _this.getStorage('yjerp')

        if(erp['user']){
            _this.showNavUser(erp['user'])
        }else{
            _this.getCurrentEmployee()
        }
        var menuType = _this.getMenuType()
        if(menuType == 'MOBILE'){
            $(".main").addClass('mobile')
        }
        if(!erp["menu"]){
            erp["menu"] = {}
        }
        if(erp["menu"] && erp["menu"][menuType]){
            _this.showNav(erp["menu"][menuType])
        }else{

            var d = {
                url: 'menu/getMenu',
                data: {
                    "menuType":menuType
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code == "OK" && d.data){
                        erp['menu'][menuType] =  d.data
                        _this.setStorage('yjerp',erp)
                        _this.showNav(d.data)
                    }
                }
            }
            _this.ajax(d)
        }
    },
    showNav:function(d){
        var _self = this
        var navList = {
            "首页":{
                name:"首页",
                link:"index.html",
                className:"index"
            },
            "包房管理":{
                name:"包房管理",
                link:"boxRoom.html",
                className:"box"
            },
            "订单管理":{
                name:"订单管理",
                link:"orderList.html",
                className:"order"
            },
            "运营数据":{
                name:"运营数据",
                link:"dataList.html",
                className:"data"
            },
            "预约管理":{
                name:"预约管理",
                link:"appoint.html",
                className:"appoint"
            },
            "游戏管理":{
                name:"游戏管理",
                link:"game.html",
                className:"game"
            },
            "菜品管理":{
                name:"菜品管理",
                link:"good.html",
                className:"good"
            }

        }
        var h = '';
        h+='<li link="'+navList["首页"].link+'"  class="'+navList["首页"].className+'"><a href="'+navList["首页"].link+'">'+navList["首页"].name+'</a></li>'
        for(var i=0;i<d.length;i++){
            h+='<li link="'+navList[d[i].name].link+'"  class="'+navList[d[i].name].className+'"><a href="'+navList[d[i].name].link+'">'+navList[d[i].name].name+'</a></li>'
        }
        $(".main .nav ul").html(h)

        $(".js-logout").off().on("click",function(){
            _self.logout()
        })

        var pathname = window.location.pathname.split("/")
        var link = pathname[pathname.length-1]
        if($('.main .nav li[link="'+link+'"]').length>0){
            $('.main .nav li[link="'+link+'"]').addClass("on")
        }
    },
    logout:function(){
        var d = {
            url: 'employee/logout',
            success: function (d) {
                console.log(d)
                if(d.status.code == "OK"){
                    window.location.href="login.html"
                }
            }
        }
        global.ajax(d)
    },
    active:function(){
        var _self = this
        /*复选框全选*/
        $(".js-checkAll").each(function(){
            var el = $(this).closest(".tableList")
            $(this).off().on("click",function(){
                if($(this).hasClass("on")){
                    el.find(".js-check").removeClass("on")
                    $(this).removeClass("on")
                }else{
                    el.find(".js-check").addClass("on")
                    $(this).addClass("on")
                }

            })
        })
        /*复选框*/
        $(".js-check").off().on("click",function(){
            if($(this).hasClass("on")){
                $(this).removeClass("on")
            }else{
                $(this).addClass("on")
            }
        })
        $(".radioSelect").each(function(){
            var f = $(this)
            f.find(".js-radio").off().on("click",function(){
                f.find(".js-radio").removeClass("on")
                $(this).addClass("on")
            })
        })

        /*tab 标签*/
        $(".tabWrap").each(function(){
            var el = $(this)
            el.find(".tabBar li").each(function(idx){
                $(this).off().on("click",function(){
                    el.find(".tabBar li").removeClass("on").eq(idx).addClass("on")
                    el.find(".tabCon").removeClass("on").eq(idx).addClass("on")
                })
            })
        })
        /**layer 关闭*/
        $(".layerWrap .close").off().on("click",function(){
            $(this).closest(".layerWrap").hide()
        })

        $(".selectedWrap").each(function(){
            var el = $(this)
            var sDrop = el.find(".selectedDrop")
            el.find(".selected").off().on("click",function(){
                sDrop.show()
            })
            el.find(".selectedDrop li").off().on("click",function(){
                el.find(".selectedDrop li").removeClass("on")
                $(this).addClass("on")
                sDrop.hide()
                el.find(".selected").html($(this).html())
            })
        })
        // 退出
        $(".js-logout").off().on("click",function(){
            _self.logout()
        })

    },

})


$(function(){
    global.init()
})
