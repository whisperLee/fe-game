/**
 * Created by nielinlin on 2018/2/26.
 */
new Vue({
    el: '#wx_orderSubmit',
    data: {
        shopId:0,
        orderConfirmDate:{
            'goodsInfoList': [],
            'type': 1 // 0 虚拟 1 现实
        },
        goods:{},//订单详情
        orderConsumptionScore:{},// 用户可用积分
        amount:{},//订单消费情况
        user:{}// 用户信息
    },
    created: function () {
        var _self = this
        _self.shopId = wglobal.urlHash().shopId
        _self.init()
    },
    methods: {
        init:function(){
            var _self = this
            _self.getCart();
        },
        getCart:function(){
            var _self = this
            // 获取本地存储，并提交请求
            var carts = wglobal.getStorage('carts');
            var shopId = _self.shopId
            var cartNum=cartTotal = 0;
            if(carts[shopId]){
                for(var goodId in carts[shopId]){
                    var num = carts[shopId][goodId].num;
                    if(num>0){
                        _self.orderConfirmDate.goodsInfoList.push({
                            'goodsId': goodId,
                            'quantity': num
                        })
                    }
                }
            }
            _self.getOrderConfirm()
        },
        getOrderConfirm:function(){
            var _self = this
            var d = {
                url: 'order/orderConfirm',
                data:_self.orderConfirmDate,
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                        _self.goods = d.data.orderGoodsInfoResponseList
                        _self.user = d.data.userLocationResponse
                        _self.user.address = wglobal.returnAddress(d.data.userLocationResponse)
                        _self.amount = {
                            actualAmount: d.data.actualAmount,
                            amount:d.data.amount,
                            promotionDiscounts:d.data.promotionDiscounts
                        }
                        _self.getOrderConsumptionScore(d.data.actualAmount) //获取可用遇米数
                        setTimeout(function(){
                            $(".voucherListLayer .enabledVoucher").html(wglobal.returnVoucherList(d.data.enabledVoucherResponseList))
                            $(".voucherListLayer .disabledVoucher").html(wglobal.returnVoucherList(d.data.disabledVoucherResponseList))
                            $(".userCash .enable").html(d.data.enabledVoucherResponseList.length+'张可用')
                            $(".voucherListLayer .hd .enabled a").html('可用抵价券('+d.data.enabledVoucherResponseList.length+')')
                            $(".voucherListLayer .hd .disabled a").html('不可用抵价券('+d.data.disabledVoucherResponseList.length+')')

                            $(".voucherListLayer .enabledVoucher .card").each(function(idx){
                                $(this).off().on("click",function(){
                                    if($(this).hasClass("active")){
                                        $(this).removeClass("active")
                                    }else{
                                        $(".voucherListLayer .enabledVoucher .card").removeClass("active").eq(idx).addClass("active")
                                    }
                                })
                            })

                        },10)

                    }else{
                        d.status.msg && wglobal.pop_tips(d.status.msg,function(){
                            wglobal.router('wx_shop.html?shopId='+_self.shopId)
                        })


                    }

                }
            }
            wglobal.ajax(d)
        },
        getOrderConsumptionScore:function(aDouble){
            var _self = this
            var d = {
                url: 'order/getOrderConsumptionScoreByAmount',
                data:{
                    aDouble:aDouble
                },
                success: function (d) {
                    console.log("yumi")
                    console.log(d.data)
                    if(d.status.code=="OK" && d.data){
                        _self.orderConsumptionScore = d.data
                        $("#consumptionScoreChoose").change(function(){
                            var idx = $("#consumptionScoreChoose")[0].selectedIndex;
                            _self.orderConfirmDate.consumptionScore= $("#consumptionScoreChoose option").eq(idx).val()
                            _self.changeVoucherOrConsume()
                        })
                    }

                }
            }
            wglobal.ajax(d)
        },
        changeVoucherOrConsume:function(isGetConScore){ // 使用抵价券or积分
            var _self = this
            var d = {
                url: 'order/changeVoucherOrConsume',
                data:_self.orderConfirmDate,
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                        _self.amount.actualAmount = d.data.actualAmount
                        _self.amount.amount  = d.data.amount
                        _self.amount.promotionDiscounts = d.data.promotionDiscounts
                        _self.amount.useConsumptionScore  = d.data.useConsumptionScore
                        _self.amount.voucherDiscounts   = d.data.voucherDiscounts
                        isGetConScore && _self.getOrderConsumptionScore(d.data.actualAmount) //获取可用遇米数
                    }else{
                        d.status.msg && wglobal.pop_tips(d.status.msg)
                    }

                }
            }
            wglobal.ajax(d)
        },
        changeCard:function(){
            var _self = this
            var actCard = $(".voucherListLayer .enabledVoucher .card.active")
            if(actCard.length>0){
                _self.orderConfirmDate.voucherId = actCard.eq(0).attr("cardId")
            }else{
                _self.orderConfirmDate.voucherId = null
            }
            wglobal.layerOuter($(".voucherListLayer"))
            //遇米数置为0
            _self.conScoreClose()
            _self.changeVoucherOrConsume(true)
        },
        showVoucher:function(){
            wglobal.layerEnter($(".voucherListLayer"))
        },
        conScoreClose:function(){
            var _self = this
            $(".conScore .switch").removeClass("active")
            $(".conScore .consumptionScoreChoose").hide()
            _self.orderConfirmDate.consumptionScore = 0
        },
        switchBtn:function(){
            var _self = this
            var el = $(event.currentTarget)
            if(el.hasClass("active")){
                _self.conScoreClose()
            }else{
                el.addClass("active")
                el.closest(".conScore").find(".consumptionScoreChoose").show()
                console.log($("#consumptionScoreChoose").val())
                _self.orderConfirmDate.consumptionScore = $("#consumptionScoreChoose").val() || $("#consumptionScoreChoose option").first().val()
            }
            _self.changeVoucherOrConsume(false)
        },
        orderSubmit:function(){
            var _self = this
            var payType = $(".payType li.on").attr("type")
            var d = {
                url: 'order/orderSubmit',
                data:{
                    "actualAmount": _self.amount.actualAmount,
                    "boxId": _self.user.boxId,
                    "consumptionScore": _self.orderConfirmDate.consumptionScore || null,
                    "gameNumber": _self.user.gameNumber,
                    "goodsInfoList":_self.orderConfirmDate.goodsInfoList,
                    "payType": payType,
                    "remark": "",
                    "type": 1,
                    "voucherId": _self.orderConfirmDate.voucherId || null
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK"){
                        //清空购物车
                        var shopId = _self.shopId
                        wglobal.setStorage('carts',{shopId:{}})
                        console.log("打开支付界面")
                        if(payType==0){
                            wglobal.router('wx_pay.html?orderId='+d.data.orderId+"&amount="+d.data.amount)
                        }else if(payType==50){
                            wglobal.router('wx_orders.html?orderId='+d.data.orderId)
                        }
                    }

                }
            }
            wglobal.ajax(d)
        },
        back:function(){
            var _self = this
            wglobal.router("wx_shop.html?shopId="+_self.shopId)
        }
    }
})
