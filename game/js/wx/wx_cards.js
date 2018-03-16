/**
 * Created by nielinlin on 2018/1/21.
 */

new Vue({
    el: '#wx_cards',
    data: {
        user:{},
        card:[],
        gameHistoryList:{},
        gameHistoryDetail:{},
        gameHistoryDetailInfo:{},
        userCash:{},
        userExperience:{},
        orderList:{},
        orderDatail:{
            userLocationResponse:{}
        }
    },
    created: function () {
        var _self = this
        // setTimeout(function(){
        //     _self.init()
        // },10)
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
                    "pageSize": 10
                },
                success: function (d) {
                    if(d.status.code == "OK" && d.data){
                        console.log('userCash')
                        $('.cards .cash').html(wglobal.returnVoucherList(d.data.dataList))
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
                    "pageSize": 10
                },
                success: function (d) {

                    if(d.status.code == "OK" && d.data){
                        console.log('UserExperience')
                        $('.cards .experience').html(wglobal.returnVoucherList(d.data.dataList))
                    }

                }
            }
            wglobal.ajax(d)
        },
        active:function(){
            $('.container .bar li').each(function(idx){
                $(this).off().on('click',function(){
                    $('.bar li').removeClass('on').eq(idx).addClass('on')
                    $('.container .mycon').removeClass('on').eq(idx).addClass('on')
                })
            })

            $('.layerWrap .layerNavTop .back').off().on('click',function(){
                $('.layerWrap').hide()
            })
        }
    }
})