/**
 * Created by lynnenie on 2018/3/20.
 */

new Vue({
    el: '#wx_pandect',
    data: {
        record:{},
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
                url: 'gameRecord/queryUserGameRecord ',
                data: {
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                        if(d.data.totalScreeningCount>0){
                            for(var k in d.data.identityCountMap){
                                d.data.identityCountMap[k].name = interfaceValue.shenfen[k].name
                                d.data.identityCountMap[k].head = interfaceValue.shenfen[k].head
                            }
                            _self.record = d.data
                        }else{
                            _self.defaultMess = '暂无数据'
                        }
                    }else{
                        global.codeError(d)
                    }


                }
            }
            global.ajax(d)
        }
    }
})
