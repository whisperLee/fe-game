/**
 * Created by nielinlin on 2018/1/21.
 */
Vue.component('user',wcomponent.user)
Vue.component('userwin',wcomponent.user)
Vue.component('userlose',wcomponent.user)
new Vue({
    el: '#wx_mine',
    data: {
        user:{},
        card:[],
        gameHistoryList:{},
        gameHistoryDetail:{},
        gameHistoryDetailInfo:{},
        userCash:{},
        userExperience:{},
        orderList:{},
        orderDatail:{
            userLocationResponse:{}
        }
    },
    created: function () {
        var _self = this
        // setTimeout(function(){
        //     _self.init()
        // },10)
        _self.init()
    },
    methods: {
        init:function(){
            var _self = this
            wglobal.footer('mine')
            _self.getCurrentUser()//查询用户信息
        },
        getCurrentUser:function(){
            var _self = this
            //_self.shopId = wglobal.urlHash().shopId || 0
            var d = {
                url: 'user/getCurrentUser',
                data: {},
                success: function (d) {
                    if(d.status.code=="OK" && d.data){
                        var d = d.data
                        d.gameTimeMin && _self.setCard('天卡',d.gameTimeMin,'')
                        d.gameTimeExpire && _self.setCard('月卡',d.gameTimeExpire,'')
                        d.consumptionScore && _self.setCard('遇米',d.consumptionScore,'')
                        _self.user = {
                            "nickName":d.name,
                            "headImgUrl":d.weixinHeadImg,
                            "stage":1,
                            "star":1,
                            "likeTime":d.likeTime,
                            "mvpTime":d.mvpTime,
                            "nextNeedScore":d.nextNeedScore,
                            "totalGameScore":d.totalGameScore,
                            "levelPro":parseInt(d.totalGameScore*100/(d.nextNeedScore-d.preNeedScore))
                        }
                    }

                }
            }
            wglobal.ajax(d)
        },
        setCard:function(name,value,unit){
            var _self = this
            _self.card.push({
                name:name,
                value:value,
                unit:unit
            })
        },
        logout:function(){
            var d = {
                url: 'user/logout',
                data: {},
                success: function (d) {
                    if(d.status.code=="OK"){
                        var d = d.data
                        wglobal.router('wx_login.html')
                    }

                }
            }
            wglobal.ajax(d)
        }
    }
})