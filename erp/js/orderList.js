/**
 * Created by nielinlin on 2018/3/27.
 */
new Vue({
    el: '#e_orderList',
    data: {
        orderListCom:{},
        orderListUnCom:{},
        offlineCom:{},
        offlineUnCom:{},
    },
    created: function () {
        var _self = this
        _self.init()
    },
    methods: {
        init:function(){
            var _self = this
            _self.erp = eglobal.getStorage('yjerp')
            _self.getOrderListCom()
            _self.getOrderListUnCom()
            _self.getOfflineCom()
            _self.getOfflineUnCom()
        },
        getOrderListCom:function(){
            var _self = this
            var d = {
                url: 'order/getTodayOrderList',
                data: {
                    "completeFlag": true, //是否已完成的订单
                    "shopId":_self.erp.user.shopId
                },
                success: function (d) {
                    console.log(d.data)
                    if(d.status.code=="OK" && d.data){
                        _self.orderListCom = _self.returnData(d.data)
                    }
                }
            }
            eglobal.ajax(d)
        },
        getOrderListUnCom:function(){
            var _self = this
            var d = {
                url: 'order/getTodayOrderList',
                data: {
                    "completeFlag": false, //是否已完成的订单
                    "shopId":_self.erp.user.shopId
                },
                success: function (d) {
                    console.log(d.data)
                    if(d.status.code=="OK" && d.data){
                        _self.orderListUnCom = _self.returnData(d.data)
                    }
                }
            }
            eglobal.ajax(d)
        },
        getOfflineCom:function(){
            var _self = this
            var d = {
                url: 'order/getTodayOfflineOrderList',
                data: {
                    "completeFlag": true, //是否已完成的订单
                    "shopId":_self.erp.user.shopId
                },
                success: function (d) {
                    if(d.status.code=="OK" && d.data){
                        _self.offlineCom = _self.returnData(d.data)
                    }
                }
            }
            eglobal.ajax(d)
        },
        getOfflineUnCom:function(){
            var _self = this
            var d = {
                url: 'order/getTodayOfflineOrderList',
                data: {
                    "completeFlag": false, //是否已完成的订单
                    "shopId":_self.erp.user.shopId
                },
                success: function (d) {
                    if(d.status.code=="OK" && d.data){
                        _self.offlineUnCom = _self.returnData(d.data)
                    }
                }
            }
            eglobal.ajax(d)
        },
        paid:function(event,item){
            var _self = this
            var d = {
                url: 'order/payOrder',
                data: {
                    "id": item.id,
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                    }

                }
            }
            eglobal.ajax(d)
        }, //设置已支付
        delivery:function(event,item){ //设置已支付
            var _self = this
            var d = {
                url: 'order/deliveryOrder',
                data: {
                    "id": item.id,
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){

                    }

                }
            }
            eglobal.ajax(d)
        },
        completed:function(event,item){ //设置已完成
            var _self = this
            var d = {
                url: 'order/completeOrder',
                data: {
                    "id": item.id,
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){

                    }

                }
            }
            eglobal.ajax(d)
        },
        invoiced:function(event,item){  //设置已开票
            var _self = this
            var d = {
                url: 'order/invoiceOrder',
                data: {
                    "id": item.id,
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){

                    }

                }
            }
            eglobal.ajax(d)
        },
        returnAddress:function(user){
            var address = ''
            if(user.boxId== '0'){
                address+= '大厅休息区 '
            }else{
                address+= user.boxId+'包房('+user.boxName+') '
                if(user.gameNumber == '0' ){
                    address+= '观战区 '
                }else{
                    address+= user.gameNumber + '号桌 '
                }
            }
            return address
        },
        returnData:function(d){
            var _self = this
            var status = {
                "0":'待支付',
                "10":'支付中',
                "20":'已支付',
                "30":'处理中',
                "35":'配送中',
                "40":'退款中',
                "50":'已退款',
                "60":'已取消',
                "70":'已完成',
                "71":'已开票',
            }
            var payType = {
                '0':'微信','1':'支付宝','50':'线下'
            }
            var warn = {
                'NORMAL':'正常',
                'WARNING':'预警',
                'TIMEOUT':'超时'
            }
            var type = {
                '0':'虚拟',
                '1':'实物'
            }
            for(var i=0;i<d.length;i++){
                d[i].statusT = status[d[i].status]
                d[i].payT = payType[d[i].payType]
                d[i].orderWarningT = warn[d[i].orderWarningEnum]
                d[i].typeT  = type[d[i].type]
                d[i].address = _self.returnAddress(d[i].userLocationResponse)
                if(d[i].status == '0' && d[i].payType == '50'){
                    d[i].btn = "paid"
                }else if(d[i].status == '30' ){
                    d[i].btn = "delivery"
                }else if(d[i].status == '35' ){
                    d[i].btn = "completed"
                }else if(d[i].status == '70' ){
                    d[i].btn = "invoiced"
                }
            }
            return d
        }
    }
})