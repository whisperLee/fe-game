/**
 * Created by nielinlin on 2018/1/21.
 */
new Vue({
    el: '#wx_orders',
    data: {
        orderList:{},
        orderDatail:{
            userLocationResponse:{}
        },
        defaultMess:'加载中，请稍候...'
    },
    created: function () {
        var _self = this
        _self.init()
    },
    methods: {
        init:function(){
            var _self = this
            _self.getOrderList()//查询订单信息
            var orderId = global.urlHash().orderId
            if(orderId && orderId!='undefined'){
                _self.showOrderDetail(orderId)
            }
        },
        getOrderList:function(){
            var _self = this
            var d = {
                url: 'order/orderList',
                data: {
                    "pageIndex": 1,
                    "pageSize": 0
                },
                success: function (d) {
                    console.log(d.data)
                    if(d.status.code == "OK" && d.data){
                        if(d.data.dataList.length>0){
                            for(var i=0;i<d.data.dataList.length;i++){
                                d.data.dataList[i].statusName = interfaceValue.orderStatus[d.data.dataList[i].status]
                            }
                            _self.orderList = d.data
                            setTimeout(function(){
                                new IScroll(".container .orders", {click:true});
                            },10)
                        }else{
                            _self.defaultMess = '暂无数据'
                        }

                    }else{
                        global.codeError(d.status.code)
                    }
                }
            }
            global.ajax(d)
        },
        showOrderDetail:function(orderId){
            var _self = this
            var d = {
                url: 'order/orderDetail',
                data: {
                    "orderId": orderId
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                        var address = global.returnAddress(d.data.userLocationResponse)
                        d.data.statusName = interfaceValue.orderStatus[d.data.status]
                        d.data.payTypeName = interfaceValue['payType'][d.data.payType]
                        d.data.userLocationResponse.address = address
                        _self.orderDatail = d.data
                        global.layerEnter($(".orderDetailLayer"))
                    }else{
                        global.codeError(d.status.code)
                    }

                }
            }
            global.ajax(d)

        },
        orderCancel:function(orderId){
            var _self = this
            var d = {
                url: 'order/orderCancel',
                data: {
                    "id": orderId
                },
                success: function (d) {
                    if(d.status.code=="OK" && d.data){
                        global.pop_tips("订单取消成功")
                        _self.orderDatail.status = 70
                        _self.orderDatail.statusName = interfaceValue.orderStatus[_self.orderDatail.status]
                    }else{
                        global.codeError(d.status.code)
                    }
                }
            }
            global.ajax(d)
        },
        toPay:function(orderId){
            global.router('wx_pay.html?orderId='+orderId)
        },
        toShop:function(orderId,type){
            global.router('wx_shop.html?shopId=1&type='+type)
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