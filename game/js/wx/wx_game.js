/**
 * Created by nielinlin on 2018/4/23.
 */
var host = 'http://liyn.me:8888/web-api/v1/'
Vue.component('user',wcomponent.user)
new Vue({
    el: '#wx_game',
    data: {
        boxId:0,
        userId:0,
        users:[],
        balance:{},//用户余额
        mustBuy:false,
        banners:[],
        sitTip:''
    },
    created: function () {
        var _self = this
        _self.init()
    },
    methods: {
        init:function(){
            var _self = this
            _self.getSeat()
        },
        getSeat:function(orderId){
            var _self = this
            var nowtimestamp=new Date().getTime()
            var urlHash = wglobal.urlHash()
            timestamp = urlHash.timestamp
            _self.boxId = urlHash.boxId
            _self.gameNumber = urlHash.gameNumber
            var d = {
                url: 'game/play/getGameCurrentInfo',
                data: {},
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                        _self.boxName = d.data.boxName
                        _self.gameStatus = d.data.gameStatus
                        if(_self.gameStatus=="队列中" || _self.gameStatus=="游戏中"){
                            //排队页面渲染
                            _self.showUsers(d.data.gameUserList,_self.gameStatus)
                            if(_self.gameStatus=="队列中"){
                                _self.sitTip = '请使用桌面上的游戏终端等待游戏开始'
                                setTimeout(function () {
                                    _self.getSeat()
                                },5000)
                            }else{
                                wglobal.pop_tips('游戏开始，请使用桌面上的游戏终端进行游戏')
                                _self.sitTip = '请使用桌面上的游戏终端进行游戏'
                            }
                            console.log(_self.sitTip)
                        }else if(_self.gameStatus=="游戏结束"){
                            if(timestamp && _self.boxId && _self.gameNumber){ // 判断当前也没面有没有参数 ，boxId，gameNumber,时间戳
                                if(nowtimestamp-timestamp>0){
                                    //二维码无效需要重新调取扫一扫接口
                                    console.log('二维码无效需要重新调取扫一扫接口')
                                    _self.saoyisao()
                                }else{
                                    //调取用户余额接口，显示支付和购买界面
                                    $(".pay").show()
                                    _self.toPayConfig()
                                    _self.queryShowBanner()//显示支付页面广告
                                }
                            }else{
                                //调取扫一扫接口,仍旧打开当前页面
                                _self.saoyisao()
                            }


                        }
                    }
                }
            }
            wglobal.ajax(d)
        },
        toPayConfig:function () {
            var _self = this
            var d = {
                url: 'game/play/toPayConfig',
                data: {},
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){

                        var balance = {
                            0:{
                                name:"体验券"
                            },
                            1:{
                                name:"计时",
                                less:d.data.minuteLess,
                            },
                            2:{
                                name:"畅玩",
                                less:d.data.expiredTimestampLess,
                            }
                        }

                        if(d.data.expiredTimestamp>0){
                            balance["2"].info = '有效期：'+wglobal.timestampToTime(d.data.expiredTimestamp)
                        }else{
                            balance["2"].info = '无'
                        }
                        if(d.data.minute>0){
                            balance["1"].info = '剩余'+d.data.minute+'分'
                        }else{
                            balance["1"].info = '无'
                        }
                        if(d.data.voucherList.length>0){
                            balance["0"].info = '共'+d.data.voucherList.length+'张可用'
                            $(".voucherListLayer .enabledVoucher").html(wglobal.returnVoucherList(d.data.voucherList))
                        }else{
                            balance["0"].info = "无可用"
                            balance["0"].less = true
                        }

                        if(!d.data.expiredTimestampLess){
                            balance["2"].on = true
                        }else if(!d.data.minuteLess){
                            balance["1"].on = true
                        }else{
                            if(d.data.voucherList.length>0){
                                balance["1"].on = true // 优惠券有的情况下暂时不处理

                            }else{
                                _self.mustBuy = true // 三种情况都没有的话，显示余额不足，去商城购买
                            }
                        }
                        _self.balance = balance
                        setTimeout(function(){
                            $(".radios").each(function(){
                                var el = $(this)
                                el.find(".radio").off().on("click",function(){
                                    var f = $(this)
                                    if(f.attr("isless")!="less"){
                                        el.find(".radio").removeClass("on")
                                        f.addClass("on")
                                        if(f.attr("typeid")==0){
                                            wglobal.layerEnter($(".voucherListLayer"))
                                        }
                                    }
                                })
                            })
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
                    }
                }
            }
            wglobal.ajax(d)
        },
        queryShowBanner:function(){
            var _self = this
            var d = {
                url: 'http://liyn.me:7777/web-api/v1/face/banner/queryShowBanner',
                data: {
                    "showAreaId": 1,
                    "type": 0 //0:首页,1:订单支付页,2:订单支付成功页
                },
                contentType: 'application/json',
                timeout: 30000,
                type: 'POST',
                dataType: 'json',
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data.length>0){
                        _self.banners = d.data
                        setTimeout(function () {
                            var mySwiper = new Swiper('.swiper-container',{
                                loop : true,
                                pagination: {
                                    el: '.swiper-pagination',
                                },
                            })
                        },10)
                    }
                }
            }
            d.data = JSON.stringify(d.data)
            $.ajax(d)
        },
        sit:function(){
            var _self = this
            var feeType = $(".payType .radio.on").attr("typeid")
            var voucherId
            if(feeType!=0){
                voucherId = 0
            }else{
                var card = $(".voucherListLayer .enabledVoucher .card.active")
                if(card.length>0){
                    voucherId = card.eq(0).attr("cardId")
                }else{
                    wglobal.pop_tips('你还没有选择要使用的体验券哦')
                    return
                }

            }
            var d = {
                url: 'game/play/sit',
                data: {
                    "boxId": _self.boxId,
                    "gameNumber": _self.gameNumber,
                    "feeType": feeType,
                    "voucherId": voucherId
                },
                success: function (d) {
                    if (d.status.code === 'OK') {
                        console.log('入座成功:' + new Date())
                        //_self.queueFlow = 1
                        window.location.reload() //刷新当前页面
                    } else {
                        wglobal.pop_tips(d.status.msg)
                    }
                }
            }
            wglobal.ajax(d)
        },
        quitSeat: function () {
            var _self = this
            var d = {
                url: 'game/play/quitSeat',
                data: {},
                success: function (d) {
                    if (d.status.code === 'OK') {
                        wglobal.pop_tips('退座成功', function () {
                            _self.saoyisao()
                        })
                    } else {
                        wglobal.pop_tips(d.status.msg)
                    }
                }
            }
            wglobal.ajax(d)

        },
        shop:function(){
            var _self = this
            wglobal.router('wx_shop.html?shopId=1&type=0')
        },
        saoyisao:function () {
            console.log('saoyisao')
        },
        changeCard:function(){
            wglobal.layerOuter($(".voucherListLayer"))
            var card = $(".voucherListLayer .enabledVoucher .card.active")
            if(card.length>0){
                $(".payType .radio[typeid='0'] span").html("已选择一张")
            }else{
                $(".payType .radio[typeid='0'] span").html("共"+$(".voucherListLayer .enabledVoucher .card").length+"张可用")
            }
        },
        showUsers:function(d,status){
            var _self = this
            _self.users = []
            if(status=='队列中'){
                var total = 15

                for (var t = 1; t <= total; t++) {
                    _self.users.push({
                        number: t,
                        name:'暂未入座'
                    })
                }
            }

            for (var i = 0; i < d.length; i++) {
                var head = d[i].headImg || '../image/head.png'
                d[i].userId = d[i].id
                d[i].number = d[i].gameNumber
                d[i].headImgUrl = head
                _self.users[d[i].gameNumber-1] = d[i]
            }
        }
    }
})