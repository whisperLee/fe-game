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
            _self.erp = global.getStorage('yjerp')
            _self.getDataList()
        },
        getDataList:function(){
          var _self = this
          // 定时更新数据
          _self.getOrderListCom()
          _self.getOrderListUnCom()
          setInterval(function(){
              console.log('get data')
              _self.getOrderListCom()
              _self.getOrderListUnCom()
          },50000)
        },
        getOrderListCom:function(){
            var _self = this
            var el = $(".tabCon.com")
            var d = {
                url: 'order/queryByCondition',
                data: {
                    "completeFlag": true, //是否已完成的订单
                    "orderPayTypeEnum": el.find(".searchMod[type='payType'] .js-radio.on").attr("type"),
                    "orderType":  el.find(".searchMod[type='orderType'] .js-radio.on").attr("type"),
                    "queryDateEnum":  el.find(".searchMod[type='queryDate'] .js-radio.on").attr("type"),
                    "shopId":_self.erp.user.shopId
                },
                success: function (d) {
                    console.log(d.data)
                    if(d.status.code=="OK" && d.data){
                        for(var i=0;i<d.data.length;i++){
                            d[i] = _self.returnData(d.data[i])
                        }
                        _self.orderListCom =d.data
                    }
                }
            }
            global.ajax(d)
        },
        getOrderListUnCom:function(){
            var _self = this
            var el = $(".tabCon.unCom")
            var d = {
                url: 'order/queryByCondition',
                data: {
                    "completeFlag": false, //是否已完成的订单
                    "orderPayTypeEnum": el.find(".searchMod[type='payType'] .js-radio.on").attr("type"),
                    "orderType":  el.find(".searchMod[type='orderType'] .js-radio.on").attr("type"),
                    "queryDateEnum":  el.find(".searchMod[type='queryDate'] .js-radio.on").attr("type"),
                    "shopId":_self.erp.user.shopId
                },
                success: function (d) {
                    console.log(d.data)
                    if(d.status.code=="OK" && d.data){
                        for(var i=0;i<d.data.length;i++){
                            d[i] = _self.returnData(d.data[i])
                        }
                        _self.orderListUnCom =d.data
                    }
                }
            }
            global.ajax(d)
        },
        paid:function(event,item){ //设置已支付
            var _self = this
            var d = {
                url: 'order/payOrder',
                data: {
                    "id": item.id,
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                        item.status = 30
                        item = _self.returnData(item)
                        console.log(item)
                    }

                }
            }
            global.ajax(d)
        },
        delivery:function(event,item){ //设置配送中
            var _self = this
            var d = {
                url: 'order/deliveryOrder',
                data: {
                    "id": item.id,
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                        item.status = 35
                        item = _self.returnData(item)
                    }

                }
            }
            global.ajax(d)
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
                        item.status = 50
                        item.orderWarningEnum = 'NORMAL'
                        item = _self.returnData(item)
                        setTimeout(function(){
                            //已完成订单数据清除该数据
                            _self.removeItem(_self.orderListUnCom,item)
                        },1000)
                    }

                }
            }
            global.ajax(d)
        },
        removeItem:function(list,item){
            for(var i=0;i<list.length;i++){
                if(list[i].id==item.id){
                    list.splice(i, 1)
                    return
                }
            }
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
                        item.status = 51
                        item = _self.returnData(item)
                    }
                }
            }
            global.ajax(d)
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
        returnData:function(item){
            var _self = this
            var status = window.interfaceValue.orderStatus
            var payType = window.interfaceValue.payType
            var warn = window.interfaceValue.orderWarn
            var type = window.interfaceValue.orderType
            item.statusT = status[item.status]
            item.payT = payType[item.payType]
            item.orderWarningT = warn[item.orderWarningEnum]
            item.typeT  = type[item.type]
            item.address = _self.returnAddress(item.userLocationResponse)
            if(item.status == '0'){
                item.btn = "paid"
            }else if(item.status == '30' ){
                item.btn = "delivery"
            }else if(item.status == '35' ){
                item.btn = "completed"
            }else if(item.status == '50' ){
                item.btn = "invoiced"
            }else{
                item.btn = ''
            }
            return item
        }
    }
})