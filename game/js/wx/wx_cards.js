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
                        $('.cards .cash').html(wglobal.returnVoucherList(d.data.dataList))
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
                        $('.cards .experience').html(wglobal.returnVoucherList(d.data.dataList))

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