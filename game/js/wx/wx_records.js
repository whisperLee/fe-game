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
        defaultMess:'加载中，请稍候...'
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
                        if(d.data.dataList.length>0){
                            for(var i=0;i<d.data.dataList.length;i++){
                                d.data.dataList[i].head = interfaceValue.shenfen[d.data.dataList[i].identityId].headf
                            }
                            _self.gameHistoryList = d.data
                            setTimeout(function(){
                                new IScroll(".container .records", {click:true});
                            },10)
                        }else{
                            _self.defaultMess = '暂无数据'
                        }
                    }else{
                        global.codeError(d)
                    }
                }
            }
            global.ajax(d)
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
                    if(d && d.gameHistoryDetailInfo){
                        _self.gameHistoryDetail = d
                        _self.gameHistoryDetailInfo = d.gameHistoryDetailInfo
                        global.layerEnter($(".gameHistoryLayer"))
                    }else{
                        _self.pop_tips("网络异常，请重试")
                    }

                }
            }
            global.ajax(d)
        }
    }
})