/**
 * Created by nielinlin on 2018/1/21.
 */
new Vue({
    el: '#wx_orders',
    data: {
        orderList:{},
        orderDatail:{
            userLocationResponse:{}
        }
    },
    created: function () {
        var _self = this
        _self.init()
    },
    methods: {
        init:function(){
            var _self = this
            _self.getOrderList()//查询订单信息
        },
        getOrderList:function(){
            var _self = this
            var d = {
                url: 'order/orderList',
                data: {
                    "pageIndex": 1,
                    "pageSize": 10
                },
                success: function (d) {
                    if(d.status.code == "OK" && d.data){
                        _self.orderList = d.data
                        setTimeout(function(){
                            new IScroll(".container .orders", {click:true});
                        },10)
                    }
                }
            }
            wglobal.ajax(d)
        },
        showOrderDetail:function(event){
            var _self = this
            var d = {
                url: 'order/orderDetail',
                data: {
                    "orderId": $(event.currentTarget).attr("orderId")
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                        var address = wglobal.returnAddress(d.data.userLocationResponse)

                        d.data.payTypeName = dataValue['payType'][d.data.payType]
                        d.data.userLocationResponse.address = address
                        _self.orderDatail = d.data
                        wglobal.layerEnter($(".orderDetailLayer"))
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