/**
 * Created by nielinlin on 2018/4/19.
 */

new Vue({
    el: '#wx_yumi',
    data: {
        yumi:{}
    },
    created: function () {
        var _self = this
        _self.init()
        console.log(interfaceValue)
    },
    methods: {
        init:function(){
            var _self = this
            _self.getYumiList() //查询遇米收支记录
        },
        getYumiList:function(){
            var _self = this
            var d = {
                url: 'consumptionScoreRecord/queryByCondition',
                data: {
                    "pageIndex": 1,
                    "pageSize": 0,
                    "type": 0,
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code == "OK" && d.data){
                        for(var i=0;i<d.data.dataList.length;i++){
                            d.data.dataList[i].typeName = interfaceValue.yumiType[d.data.dataList[i].type]
                        }
                    }
                    _self.yumi = d.data.dataList
                }
            }
            wglobal.ajax(d)
        }
    }
})
