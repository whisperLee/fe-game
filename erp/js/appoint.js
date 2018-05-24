/**
 * Created by nielinlin on 2018/3/30.
 */
new Vue({
    el: '#e_appoint',
    data: {
        appoint:[],
        contacts:[]
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
        isToday:function(str){
            var d = new Date(str.replace(/-/g,"/"));
            var todaysDate = new Date();
            if(d.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)){
                return true;
            } else {
                return false;
            }
        },
        getTodayOrderList:function(){
            var _self = this
            var d = {
                url: 'appointment/getShopAppointmentInfo',
                data: {
                    "shopId": _self.erp.user.shopId,
                },
                success: function (d) {
                   // console.log(d)
                    if(d.status.code=="OK" && d.data){
                        for(var i=0;i<d.data.length;i++){
                            if(_self.isToday(d.data[i].dateStr)){
                                d.data[i].dateStr+='(今天)'
                            }
                            _self.appoint.push(d.data[i])

                        }
                        setTimeout(function(){
                            $(".tabWrap").each(function(){
                                var el = $(this)
                                el.find(".tabBar li").each(function(idx){
                                    $(this).off().on("click",function(){
                                        el.find(".tabBar li").removeClass("on").eq(idx).addClass("on")
                                        el.find(".tabCon").removeClass("on").eq(idx).addClass("on")
                                    })
                                })
                            })
                        },10)

                    }else{
                        global.codeError(d.status.code)
                    }
                }
            }
            global.ajax(d)
        },
        viewWholeContact:function(event,item){
            var _self = this
            _self.contacts = item.detailInfoList
            $(".layerContact").show()
        },
        viewSoloContact:function(event,item,type){
            var _self = this
            if(type=='arrive'){
                _self.contacts = item.arriveDetailInfoList
            }else if(type=='confirm'){
                _self.contacts = item.confirmDetailInfoList
            }else if(type=='notConfirm'){
                _self.contacts = item.notConfirmDetailInfoList
            }else if(type=='absent'){
                _self.contacts = item.absentDetailInfoList
            }
            $(".layerContact").show()
        }
    }
})
