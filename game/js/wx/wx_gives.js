/**
 * Created by nielinlin on 2018/5/8.
 */
new Vue({
    el: '#wx_gives',
    data: {
    },
    created: function () {
        var _self = this
        _self.init()
    },
    methods: {
        init:function(){
            var _self = this
            // _self.getUserCash()// 查询所有抵价券
            // _self.getUserExperience()// 查询所有体验券
        },
        getUserCash:function(){
            var _self = this
            var d = {
                url: 'voucher/queryUserCash',
                data: {
                    "pageIndex": 1,
                    "pageSize": 0
                },
                success: function (d) {
                    if(d.status.code == "OK" && d.data){
                        console.log('userCash')
                        if(d.data.dataList.length>0){
                            $('.cards .cash').html(global.returnVoucherList(d.data.dataList))
                        }else{
                            $('.cards .cash').html('<p class="defaultMess">暂无可用抵价券</p>')
                        }

                        $(".cards .cash").off().on("click",function(){
                            global.router("wx_shop.html")
                        })
                    }else{
                        global.codeError(d.status.code)
                    }

                }
            }
            global.ajax(d)
        },
        getUserExperience:function(){
            var _self = this
            var d = {
                url: 'voucher/queryUserExperience',
                data: {
                    "pageIndex": 1,
                    "pageSize": 0
                },
                success: function (d) {
                    if(d.status.code == "OK" && d.data){
                        console.log('UserExperience')
                        if(d.data.dataList.length>0){
                            $('.cards .experience').html(global.returnVoucherList(d.data.dataList))
                        }else{
                            $('.cards .experience').html('<p class="defaultMess">暂无可用体验券</p>')
                        }


                        $(".cards .experience").off().on("click",function(){
                            global.router("game.html")
                        })
                    }else{
                        global.codeError(d.status.code)
                    }

                }
            }
            global.ajax(d)
        }

    }
})