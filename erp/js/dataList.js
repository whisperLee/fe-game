/**
 * Created by nielinlin on 2018/3/27.
 */
new Vue({
    el: '#e_dataList',
    data: {
        todayData:{},
        weekList:[],
        weekTotal:{},
        monthList:[],
        monthTotal:{},
        yearList:[],
        yearTotal:{}
    },
    created: function () {
        var _self = this
        _self.init()
    },
    methods: {
        init:function(){
            var _self = this
            _self.erp = global.getStorage('yjerp')
            _self.getTodayBusinessInfo()
            _self.getWeekBusinessInfo()
            _self.getMonthBusinessInfo()
            _self.getYearBusinessInfo()
        },
        getTodayBusinessInfo:function(){
            var _self = this
            var d = {
                url: 'business/getTodayBusinessInfo',
                data: {
                    id:_self.erp.user.shopId
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                        _self.todayData = d.data
                    }else{
                        global.codeError(d.status.code)
                    }

                }
            }
            global.ajax(d)
        },
        getWeekBusinessInfo:function(){
            var _self = this
            var d = {
                url: 'business/getHistoryBusinessInfo',
                data: {
                    queryDateEnum:"WEEK",
                    id:_self.erp.user.shopId
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                        _self.weekList = d.data.dateInfoList
                        _self.weekTotal = d.data.totalInfo
                    }else{
                        global.codeError(d.status.code)
                    }

                }
            }
            global.ajax(d)
        },
        getMonthBusinessInfo:function(){
            var _self = this
            var d = {
                url: 'business/getHistoryBusinessInfo',
                data: {
                    queryDateEnum:"MONTH",
                    id:_self.erp.user.shopId
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                        _self.monthList = d.data.dateInfoList
                        _self.monthTotal = d.data.totalInfo
                    }else{
                        global.codeError(d.status.code)
                    }

                }
            }
            global.ajax(d)
        },
        getYearBusinessInfo:function(){
            var _self = this
            var d = {
                url: 'business/getHistoryBusinessInfo',
                data: {
                    queryDateEnum:"YEAR",
                    id:_self.erp.user.shopId
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                        _self.yearList = d.data.dateInfoList
                        _self.yearTotal = d.data.totalInfo
                    }else{
                        global.codeError(d.status.code)
                    }
                }
            }
            global.ajax(d)
        }

    }
})