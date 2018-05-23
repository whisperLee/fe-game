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
            var _self = this
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
                            global.chooseWXPay(d.data,function(){
                                global.pop_tips("支付成功",function(){
                                    global.router('wx_orders.html?orderId='+orderId)
                                })
                            })
                            // wx.chooseWXPay({
                            //     timestamp: d.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            //     nonceStr: d.data.nonce, // 支付签名随机串，不长于 32 位
                            //     package: d.data.pack, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                            //     signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            //     paySign: d.data.signature, // 支付签名
                            //     success: function (res) {
                            //
                            //     }
                            // });
                        }

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
                    }

                }
            }
            global.ajax(d)
        }
    }
})