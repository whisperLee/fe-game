/**
 * Created by lynnenie on 2018/3/15.
 */
new Vue({
    el: '#wx_appoint',
    data: {
        times:[],
        currTypeTimes:{

        }
    },
    created: function () {
        var _self = this
        _self.init()
        //信用评分太低无法进行预约，请直接到店游戏以恢复信用评分
    },
    methods: {
        init:function(){
            var _self = this
            global.footer('appoint')
            _self.getAppointment()
            $(function(){
                _self.active()
            })
        },
        chooseTime:function(){
            var _self = this
            var type = $(".radio.on").attr("typeName")
            $(".chooseWrap").show()
            $(".chooseTime").removeClass("on")
            $(".chooseTime[type='"+type+"']").addClass("on")
        },
        dataActive:function(){
            // $(".times .left li").off().on("click",function(){
            //     var el = $(this)
            //     $(".times .left li").removeClass("on")
            //     el.addClass("on")
            //     var type = el.attr("type")
            // })
            $(".times").each(function(){ //
                var el = $(this)
                el.find(".left li").each(function(idx){ //左侧日期选择
                    $(this).off().on("click",function(){
                        el.find(".left li").removeClass("on").eq(idx).addClass("on")
                        el.find(".right").removeClass("on").eq(idx).addClass("on")
                    })
                })
                el.find(".right li").each(function(){ //右侧日期选择
                    var li = $(this)
                    li.off().on("click",function(){
                        li.closest(".right").find("li").removeClass("on")
                        li.addClass("on")
                        $(".choosedTime").html(li.attr("dayStr")+' '+li.attr("timeStr"))
                        $(".chooseWrap").hide()
                    })
                })
                el.find(".left li").eq(0).addClass("on")
                el.find(".right").eq(0).addClass("on")
                //el.find(".right").eq(0).find("li").eq(0).addClass("on")
            })


        },
        chooseTimeInit:function(){
            var _self = this
            $(".choosedTime").html("请选择到店时间")
            $(".times").each(function(){ //
                var el = $(this)
                el.find(".left li").eq(0).addClass("on")
                el.find(".right").eq(0).addClass("on")
            })

        },
        getAppointment:function(){
            var _self = this
            var shopId = 1
            var d = {
                url: 'appointmentRecord/getAppointmentConfig',
                data: {
                    "id": shopId,
                },
                success: function (d) {
                    console.log(d)
                    if (d.status.code == "OK") {
                        if(d.data.canAppointment){
                            $(".canAppoint").show()
                            _self.times = {
                                "散客":$.extend({}, {
                                    "推荐":d.data.recommendSoloAppointmentDayTimes
                                }, d.data.soloAppointmentDayTimes),
                                "包桌":d.data.soloAppointmentDayTimes,
                            }
                            setTimeout(function(){
                                _self.dataActive()
                            },10)
                        }else{
                            $(".cannotAppoint").show()
                        }
                    }else{
                        global.codeError(d.status.code)
                    }
                }
            }
            global.ajax(d)
        },
        submit:function(){
            var _self = this
            var contacts = $("input[name='name']").val()
            var contactsMobile = $("input[name='tel']").val()
            var estimatedTimeStr = $(".choosedTime").html()
            var shopId = 1
            var type = $(".radio.on").attr("type")
            if(contacts==''){
                global.pop_tips('请填写联系人')
                return
            }
            if(!global.isPoneAvailable(contactsMobile)){
                global.pop_tips('请填写正确联系人电话')
                return
            }

            var d = {
                url: 'appointmentRecord/submit',
                data: {
                    "contacts": contacts,
                    "contactsMobile": contactsMobile,
                    "estimatedTimeStr": estimatedTimeStr,
                    "gamerCount": 1,
                    "shopId": shopId,
                    "type": type,
                },
                success: function (d) {
                    console.log(d)
                    if (d.status.code == "OK") {
                    }else{
                        global.codeError(d.status.code)
                    }
                }
            }
            global.ajax(d)
        },
        active:function(){
            var _self = this

            var $phone = $(".phone")
            var $phoneInput = $(".phone input")
            var $clear = $(".phone .clear")

            $phoneInput.off().on("focus input",function(){
                if($phoneInput.val().length>0){
                    $clear.show()
                }else{
                    $clear.hide()
                }
            }).on("blur",function(){
                $clear.hide()
            })
            $(".mark").off().on("click",function(){
                $(".chooseWrap").hide()
            })

            $(".radios").each(function(){
                var el = $(this)
                el.find(".radio").off().on("click",function(){
                    el.find(".radio").removeClass("on")
                    $(this).addClass("on")
                    _self.chooseTimeInit()
                })
            })

        }
    }
})