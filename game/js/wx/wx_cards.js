/**
 * Created by nielinlin on 2018/1/21.
 */

new Vue({
    el: '#wx_cards',
    data: {
    },
    created: function () {
        var _self = this

        _self.init()
    },
    methods: {
        init:function(){
            var _self = this
            _self.getUserCash()// 查询所有抵价券
            _self.getUserExperience()// 查询所有体验券
            $(function(){
                _self.active()
            })
        },
        getUserCash:function(){
            var _self = this
            var d = {
                url: 'voucher/queryUserCash',
                data: {
                    "pageIndex": 1,
                    "pageSize": 0
                },
                success: function (d) {
                    if(d.status.code == "OK" && d.data){
                        console.log('userCash')
                        if(d.data.dataList.length>0){
                            $('.cards .cash').html(wglobal.returnVoucherList(d.data.dataList))
                        }else{
                            $('.cards .cash').html('<p class="noData">暂无可用抵价券</p>')
                        }

                        $(".cards .cash").off().on("click",function(){
                            wglobal.router("wx_shop.html")
                        })
                    }

                }
            }
            wglobal.ajax(d)
        },
        getUserExperience:function(){
            var _self = this
            var d = {
                url: 'voucher/queryUserExperience',
                data: {
                    "pageIndex": 1,
                    "pageSize": 0
                },
                success: function (d) {
                    if(d.status.code == "OK" && d.data){
                        console.log('UserExperience')
                        if(d.data.dataList.length>0){
                            $('.cards .experience').html(wglobal.returnVoucherList(d.data.dataList))
                        }else{
                            $('.cards .experience').html('<p class="noData">暂无可用体验券</p>')
                        }


                        $(".cards .experience").off().on("click",function(){
                            wglobal.router("game.html")
                        })
                    }

                }
            }
            wglobal.ajax(d)
        },
        active:function(){

        }
    }
})