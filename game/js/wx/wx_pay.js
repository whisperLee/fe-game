/**
 * Created by nielinlin on 2018/4/16.
 */
new Vue({
    el: '#wx_pay',
    data: {
        orderId:0,
        amount:0
    },
    created: function () {
        var _self = this
        _self.init()
    },
    methods: {
        init:function(){
            var _self = this
            var urlHash = global.urlHash()
            _self.orderId = urlHash.orderId
            _self.amount = urlHash.amount
            if(_self.orderId && _self.orderId!='undefined'){

            }else{
                global.pop_tips('页面出错，请重新支付',function(){
                    global.router('wx_orders.html')
                })
            }
        },
        pay:function(orderId){
            var d = {
                url: 'order/orderPay',
                data: {
                    "onlinePayType": 1,
                    "orderId": orderId,
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                        global.router('wx_orders.html?orderId='+orderId)
                    }

                }
            }
            global.ajax(d)
        }
    }
})