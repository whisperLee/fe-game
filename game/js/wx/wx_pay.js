/**
 * Created by nielinlin on 2018/4/16.
 */
var timer
new Vue({
    el: '#wx_pay',
    data: {
        orderId:0,
        amount:0,
        minutes:0,
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
            if(_self.orderId && _self.orderId!='undefined'){
                _self.getOrderDetail()
                $(".header .back").attr("href","wx_orders.html?orderId="+_self.orderId)
            }else{
                global.pop_tips('页面出错，请重新支付',function(){
                    global.router('wx_orders.html')
                })
            }
        },
        getOrderDetail:function(){
            var _self = this
            var d = {
                url: 'order/orderDetail',
                data: {
                    "orderId": _self.orderId
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                        _self.amount = d.data.actualAmount
                        _self.shopId = d.data.shopId
                        var orderDate = d.data.placeTime.replace(/\-/g, "/"); // 在ios中日期必须转换为x/x/x 格式才可以
                        _self.countTime = (new Date(orderDate).getTime()+60*60*1000-new Date().getTime())/1000
                        if(_self.countTime>0){
                            _self.minutes = parseInt(_self.countTime/60)
                            _self.countDown()
                        }else{
                            _self.minutes = -1
                            global.pop_tips('订单支付超时，请重新下单',function(){
                                global.router('wx_shop.html?shopId='+_self.shopId)
                            })
                        }
                    }else{
                        global.codeError(d)
                    }

                }
            }
            global.ajax(d)

        },
        countDown:function(){
            var _self = this
            if (_self.minutes > 0) {

                timer = setTimeout(function(){
                    _self.minutes--;
                    // if(_self.minutes<=10){
                    //     _self.minutes = "0"+(_self.minutes-1)
                    // }else{
                    //     _self.minutes--;
                    // }
                    _self.countDown()
                }, 60000);
            } else{
                clearInterval(timer);
                global.pop_tips('订单支付超时，请重新下单',function(){
                    global.router('wx_shop.html?shopId='+_self.shopId)
                })
            }
        },
        pay:function(orderId){
            var _self = this
            global.loading()
            var d = {
                url: 'order/orderWxPay',
                data: {
                    "onlinePayType": $(".payType li.on").attr("type"),
                    "orderId": _self.orderId,
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                        if(d.data.pack=="prepay_id=0"){  // 进一步验证
                            global.pop_tips("支付成功",function(){
                                global.router('wx_orders.html?orderId='+orderId)
                            })
                        }else{
                            global.loaded()
                            global.getConfig(['chooseWXPay'],function(){
                                global.chooseWXPay(d.data,function(){
                                    global.pop_tips("支付成功",function(){
                                        global.router('wx_orders.html?orderId='+orderId)
                                    })
                                })
                            })
                        }
                    }else{
                        global.codeError(d)
                    }

                }
            }
            global.ajax(d)
        },
        pay1:function(orderId){
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
                    }else{
                        global.codeError(d)
                    }

                }
            }
            global.ajax(d)
        }
    }
})