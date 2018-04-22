/**
 * Created by nielinlin on 2018/4/17.
 */
new Vue({
    el: '#wx_login',
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
            if(wglobal.isPoneAvailable($(this).val())){
                var d = {
                    url: 'user/checkMobile',
                    data: {
                        "mobile": $(".phone input").val()
                    },
                    success: function (d) {
                        console.log(d)
                        if(d.status.code!="OK"){
                            $error.html(d.status.msg)
                            $(".validate .send.on").removeClass("on")
                        }else{
                            $error.html('')
                            $(".validate .send").addClass("on")
                        }
                    }
                }
                wglobal.ajax(d)
            }else{
                $error.html('请输入正确手机号')
                $(".validate .send.on").removeClass("on")
            }
        },
        login:function(){
            var _self = this
            var authCode = $(".validate input").val()
            var mobile = $(".phone input").val()
            if($(".input.error").length<=0){
                if(authCode!='' && mobile!=""){
                    var d = {
                        url: 'user/login',
                        data: {
                            "authCode": $(".validate input").val(),
                            "mobile": $(".phone input").val()
                        },
                        success: function (d) {
                            console.log(d)
                            if(d.status.code=="OK"){
                                wglobal.router('wx_index.html')
                            }else{
                                wglobal.pop_tips(d.status.msg)
                            }
                        }
                    }
                    wglobal.ajax(d)
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
                        if(wglobal.isPoneAvailable($(this).val())){
                            $(".validate .send").addClass("on")
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

