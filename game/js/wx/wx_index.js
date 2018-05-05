/**
 * Created by nielinlin on 2018/1/21.
 */
Vue.component('user',wcomponent.user)
new Vue({
    el: '#wx_index',
    data: {
        tips:'',
        user:{},
        importantMess:'',
        card:[],
        banners:[],
        shops:[]
    },
    created: function () {
        var _self = this
        _self.init()
    },
    methods: {
        init:function(){
            var _self = this
            wglobal.footer('index')
            _self.getCurrentUser()//查询用户信息
            _self.queryNotice() //获取推送信息
            _self.queryShowBanner()//获取商圈banner
            _self.queryShop()//查询门店信息
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
                        console.log(d)
                        d.gameTimeMin && _self.setCard('点卡',d.gameTimeMin,'分')
                        d.gameTimeExpire && _self.setCard('畅玩',d.gameTimeExpire,'')
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
                        console.log(_self.user)
                    }else{
                        wglobal.router("wx_login.html")
                    }

                }
            }
            wglobal.ajax(d)
        },
        queryNotice:function(){
            var _self = this
            var d = {
                url: 'area/queryNotice',
                data: 1,
                success: function (d) {
                    if(d.status.code=="OK" && d.data){
                        _self.importantMess = d.data
                    }
                }
            }
            wglobal.ajax(d)
        },
        queryShowBanner:function(){
            var _self = this
            var d = {
                url: 'banner/queryShowBanner',
                data: {
                    "showAreaId": 1,
                    "type": 0 //0:首页,1:订单支付页,2:订单支付成功页
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data.length>0){
                        _self.banners = d.data
                        setTimeout(function () {
                            var mySwiper = new Swiper('.swiper-container',{
                                loop : true,
                                pagination: {
                                    el: '.swiper-pagination',
                                },
                            })
                        },10)
                    }
                }
            }
            wglobal.ajax(d)
        },
        queryShop:function(){
            var _self = this
            var d = {
                url: 'shop/query',
                data: {
                    "areaId": 1,
                    "countFlag":true,
                    "pageIndex":1,
                    "pageSize":0
                    //"userToken":'101'
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code=="OK" && d.data){
                        _self.shops = d.data
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
        }

    }
})