/**
 * Created by nielinlin on 2018/1/21.
 */
Vue.component('user',wcomponent.user)
Vue.component('userwin',wcomponent.user)
Vue.component('userlose',wcomponent.user)
new Vue({
    el: '#wx_records',
    data: {
        gameHistoryList:{},
        gameHistoryDetail:{},
        gameHistoryDetailInfo:{},
    },
    created: function () {
        var _self = this
        _self.init()
    },
    methods: {
        init:function(){
            var _self = this
            _self.getGameHistoryList() //查询历史游戏记录
        },
        getGameHistoryList:function(){
            var _self = this
            var d = {
                url: 'game/queryGameHistoryList',
                data: {
                    "pageIndex": 1,
                    "pageSize": 0
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                        for(var i=0;i<d.data.dataList.length;i++){
                            d.data.dataList[i].head = '../'+interfaceValue.shenfen[d.data.dataList[i].identityId].headf
                        }
                        _self.gameHistoryList = d.data
                        setTimeout(function(){
                            new IScroll(".container .records", {click:true});
                        },10)
                    }

                }
            }
            wglobal.ajax(d)
        },
        showGameHistoryDetail:function(event){
            var _self = this
            var el = $(event.currentTarget)
            var d = {
                url: 'game/queryGameHistoryDetail',
                data: {
                    "id": el.attr('gameid')
                },
                success: function (d) {
                    console.log(d)
                    _self.gameHistoryDetail = d
                    _self.gameHistoryDetailInfo = d.gameHistoryDetailInfo
                    wglobal.layerEnter($(".gameHistoryLayer"))
                }
            }
            wglobal.ajax(d)
        }
    }
})