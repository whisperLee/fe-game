/**
 * Created by nielinlin on 2018/4/17.
 */
new Vue({
    el: '#wx_register',
    isOk:true,
    data: {

    },
    created: function () {
        var _self = this
        _self.init()
    },
    methods: {
        init:function(){
            var _self = this
            $(function(){
                _self.active()
            })
        },
        checkMobile:function(mobile){
            var _self = this
            var $error = $(".phone .error")
            if(global.isPoneAvailable($(this).val())){
                var d = {
                    url: 'user/checkMobile',
                    data: {
                        "mobile": $(".phone input").val()
                    },
                    success: function (d) {
                        console.log(d)
                        if(d.status.code!="OK"){
                            $(".validate .send.on").removeClass("on")
                            if(d.status.code=="1009"){
                                $error.html("请在微信中打开本页面")
                                global.pop_tips("请在微信中打开本页面")
                            }else if(d.status.code=="1011"){
                                $error.html("您还没有注册，即将为您跳转到注册页面")
                                global.pop_tips("您还没有注册，即将为您跳转到注册页面",function(){
                                    global.router("wx_register.html")
                                })
                            }else if(d.status.code=='1001'){
                                $error.html("网络异常，请重试")
                                _self.pop_tips("网络异常，请重试")
                            }else{
                                $error.html(d.status.msg)
                            }

                        }else{
                            $error.html('')
                            $(".validate .send").addClass("on")
                        }
                    }
                }
                global.ajax(d)
            }else{
                $error.html('请输入正确的手机号')
                $(".validate .send.on").removeClass("on")
            }
        },
        register:function(){
            var _self = this
            var authCode = $(".validate input").val()
            var mobile = $(".phone input").val()
            var name = $(".nick input").val()
            if($(".input.error").length<=0){
                if(authCode!='' && mobile!="" && name!=""){
                    global.loading()
                    var d = {
                        url: 'user/register',
                        data: {
                            "authCode": authCode,
                            "mobile": mobile,
                            "name": name,
                            "openId":"",
                            "sex": $(".radios li.on").attr("type")
                        },
                        success: function (d) {
                            console.log(d)
                            global.loaded()
                            if(d.status.code=="OK"){
                                global.router('wx_index.html')
                            }else{
                                global.codeError(d)
                            }
                        }
                    }
                    global.ajax(d)
                }else{
                    $(".input input").each(function(){
                        console.log(1)
                        if($(this).val()==''){
                            $(this).focus()
                            $(this).blur()
                            $(this).focus()
                            return false
                        }
                    })
                }
            }else{
                $(".input.error").eq(0).find("input").focus()
            }

        },
        showError:function(dom,msg){
            dom.addClass('error')
            dom.find('.msg').html(msg)
        },
        active:function(){
            var _self = this
            var $nick = $(".nick")
            $(".nick input").off().on("input",function(){
                $nick.removeClass("error")
            }).on("blur",function(){
                if($(".nick input").val()!=''){
                    var d = {
                        url: 'user/checkName',
                        data: {
                            "name": $(".nick input").val()
                        },
                        success: function (d) {
                            if(d.status.code!="OK"){
                                _self.showError($nick,d.status.msg)
                            }
                        }
                    }
                    global.ajax(d)
                }else{

                }

            })

            var $phone = $(".phone")
            var $phoneInput = $(".phone input")
            var $clear = $(".phone .clear")
            var $validate = $(".validate")
            $phoneInput.off().on("focus",function(){
                if($phoneInput.val().length>0){
                    $clear.show()
                }else{
                    $clear.hide()
                }
            }).on("blur",function(){
                $clear.hide()
                if($phoneInput.val().length<11){
                    _self.showError($phone,'请输入正确手机号')
                    $(".validate .send.on").removeClass("on")
                }
            }).on("input",function(){
                var mobile = $phoneInput.val()
                $phone.removeClass("error")
                $validate.removeClass("error")
                $validate.find("input").val("")
                if($phoneInput.val().length>0){
                    $clear.show()
                    if(mobile.length==11){
                        if(global.isPoneAvailable($(this).val())){
                            var d = {
                                url: 'user/checkMobile',
                                data: {
                                    "mobile": $phoneInput.val()
                                },
                                success: function (d) {
                                    console.log(d)
                                    if(d.status.code!="OK"){
                                        _self.showError($phone,d.status.msg)
                                        $(".validate .send.on").removeClass("on")
                                    }else{
                                        $(".validate .send").addClass("on")
                                    }
                                }
                            }
                            global.ajax(d)
                        }else{
                            _self.showError($phone,'请输入正确手机号')
                            $(".validate .send.on").removeClass("on")
                        }
                    }
                }else{
                    $clear.hide()
                }

            })

            $(".validate input").off().on("input",function(){
                $validate.removeClass("error")
            }).on("blur",function(){
                var validate = $(this).val()
                if(validate.length==4){
                    $validate.removeClass("error")
                }else{
                    _self.showError($validate,'请输入正确验证码')
                }
            })
        }
    }
})