/**
 * Created by nielinlin on 2018/5/30.
 */
new Vue({
    el: '#e_good',
    data: {

    },
    created: function () {
        var _self = this
        _self.init()

    },
    methods: {
        init:function(){
            var _self = this
            _self.erp = global.getStorage('yjerp')

            if(global.getMenuType()!="MOBILE"){
                $(".tableList .trs").css({"height":($(window).height()-$(".tabBar").height()*4.5)+"px","overflow":"auto"})
            }
            $(function(){
                _self.active()
            })
        },
        uploadImg:function(){
            console.log(111)
        },
        active:function(){
            $(".radios .radio").each(function(idx){
                var f = $(this).closest(".radios")
                $(this).off().on("click",function(){
                    f.find(".radio").removeClass("on").eq(idx).addClass("on")
                    f.find(".radioCon").removeClass("on").eq(idx).addClass("on")
                })
            })
            $(".tabs .tab").off().on("click",function(){
                if($(this).hasClass("on")){
                    $(this).removeClass("on")
                }else{
                    $(this).addClass("on")
                }
            })
        }

    }
})
