/**
 * Created by nielinlin on 2018/3/30.
 */
new Vue({
    el: '#e_appoint',
    data: {
        appoint:{},
    },
    created: function () {
        var _self = this
        _self.init()
    },
    methods: {
        init:function(){
            var _self = this
            _self.erp = global.getStorage('yjerp')
            _self.getTodayOrderList()
        },
        getTodayOrderList:function(){
            var _self = this
            var d = {
                url: 'appointment/getShopAppointmentInfo',
                data: {
                    "shopId": _self.erp.user.shopId,
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                        _self.appoint = d.data
                    }else{
                        global.codeError(d.status.code)
                    }

                }
            }
            global.ajax(d)
        }
    }
})
