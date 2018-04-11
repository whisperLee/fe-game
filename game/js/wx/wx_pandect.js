/**
 * Created by lynnenie on 2018/3/20.
 */

new Vue({
    el: '#wx_pandect',
    data: {
        record:{}
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
                    _self.record = d.data
                    _self.record.totalWinCount = parseInt(d.data.totalScreeningCount *  d.data.totalWinRate)
                }
            }
            wglobal.ajax(d)
        }
    }
})
