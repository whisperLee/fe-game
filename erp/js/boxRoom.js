/**
 * Created by nielinlin on 2018/3/27.
 */
new Vue({
    el: '#e_boxRoom',
    data: {
        roomList:{},
    },
    created: function () {
        var _self = this
        _self.init()
    },
    methods: {
        init:function(){
            var _self = this
            _self.erp = global.getStorage('yjerp')
            _self.getBoxList()
        },
        getBoxList:function(){
            var _self = this
            var d = {
                url: 'box/getBoxListByShopId',
                data: {
                    id:_self.erp.user.shopId
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                        for(i=0;i<d.data.length;i++){
                            d.data[i].gameStatus = interfaceValue.gameStatus[d.data[i].gameScreeningStatus]
                            d.data[i].roomStatus = interfaceValue.roomStatus[d.data[i].status]
                            if(d.data[i].gameScreeningStatus == 2){
                                var nightFlag = d.data[i].nightFlag?'晚上':'白天'
                                d.data[i].gameDate = '第'+d.data[i].gameDay+'天 '+ nightFlag
                            }else{
                                d.data[i].gameDate = '/'
                            }
                        }
                        _self.roomList = d.data
                    }else{
                        global.codeError(d)
                    }

                }
            }
            global.ajax(d)
        },
        lock:function(event,item){
            var _self = this
            var el = $(event.currentTarget)
            var id = el.closest(".tr").attr('id')
            var d = {
                url: 'box/lockBox',
                data: {
                    id:id
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                        item.status = 'APPOINTMENT'
                        item.roomStatus =_self.roomStatus[item.status]
                    }else{
                        global.codeError(d)
                    }

                }
            }
            global.ajax(d)
        },
        unlock:function(event,item){
            var _self = this
            var el = $(event.currentTarget)
            var id = el.closest(".tr").attr('id')
            var d = {
                url: 'box/unlockBox',
                data: {
                    id:id
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                        item.status = 'IDLE'
                        item.roomStatus =_self.roomStatus[item.status]
                    }else{
                        global.codeError(d)
                    }

                }
            }
            global.ajax(d)
        },
        showCancelReason:function(event,item){
            var _self = this
            var el = $(event.currentTarget)
            if(el.hasClass("on")){
                $(".layerCallReason").show()
            }
            $(".js-confirm").off().on("click",function(){
                _self.cancelCall(el,item)
            })
        },
        cancelCall:function(el,item){
            var _self = this
            var reason = []
            $(".layerCallReason .layerCon .check.on").each(function(){
                reason.push($(this).html())
            })
            if($(".layerCallReason .layerCon textarea").val()!=''){
                reason.push($(".layerCallReason .layerCon textarea").val())
            }
            if(reason.length>0){
                $(".layerCallReason").hide()
                var id = el.closest(".tr").attr('id')
                var d = {
                    url: 'box/cancelCallBox',
                    data: {
                        boxId:id,
                        callOutReason:reason.join(",")
                    },
                    success: function (d) {
                        console.log(d)
                        if(d.status.code=="OK" && d.data){
                            item.callOutFlag = false
                        }else{
                            global.codeError(d)
                        }

                    }
                }
                global.ajax(d)
            }else{
                global.pop_tips('请选择或输入呼叫原因')
            }

        },
        enter:function(boxId){
            global.router("../../game/html/game_judge.html?boxId="+boxId)
        }

    }
})