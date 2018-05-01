/**
 * Created by nielinlin on 2018/4/19.
 */
Vue.component('user',wcomponent.user)
new Vue({
    el: '#wx_ranking',
    data: {
        dataList:[],
        defaultMess:'加载中，请稍候...'

    },
    created: function () {
        var _self = this
        _self.init()
    },
    methods: {
        init:function(){
            var _self = this
            $(function(){
                _self.active()
            })
            _self.getGameT() //查询历史游戏记录
        },
        getCharmT:function(){//游戏实时榜
            var _self = this
            if(_self.charmT && _self.charmT.length>0){
                _self.setData(_self.charmT)
            }
            else{
                _self.defaultMess = '加载中，请稍候...'
                var d = {
                    url: 'ranking/rankingQuery',
                    data: {
                        "rankingTypeEnum": "CHARM_TODAY",
                    },
                    success: function (d) {
                        console.log(d)
                        if(d.status.code=="OK" && d.data){
                            _self.charmT = d.data.dataList
                            _self.setData(_self.charmT)
                        }

                    }
                }
                wglobal.ajax(d)
            }
        },
        getCharmY:function(){ //游戏昨日榜
            var _self = this
            if(_self.charmY && _self.charmY.length>0){
                _self.setData(_self.charmY)
            }
            else{
                _self.defaultMess = '加载中，请稍候...'
                var d = {
                    url: 'ranking/rankingQuery',
                    data: {
                        "rankingTypeEnum": "CHARM_YESTERDAY",
                    },
                    success: function (d) {
                        console.log(d)
                        if(d.status.code=="OK" && d.data){
                            _self.charmY = d.data.dataList
                            _self.setData(_self.charmY)
                        }

                    }
                }
                wglobal.ajax(d)
            }
        },
        getCharmW:function(){ //游戏周榜
            var _self = this
            if(_self.charmW && _self.charmW.length>0){
                _self.setData(_self.charmW)
            }
            else{
                _self.defaultMess = '加载中，请稍候...'
                var d = {
                    url: 'ranking/rankingQuery',
                    data: {
                        "rankingTypeEnum": "CHARM_WEEK",
                    },
                    success: function (d) {
                        console.log(d)
                        if(d.status.code=="OK" && d.data){
                            _self.charmW = d.data.dataList
                            _self.setData(_self.charmW)
                        }

                    }
                }
                wglobal.ajax(d)
            }
        },
        getCharmTt:function(){  //游戏总榜
            var _self = this
            if(_self.charmTt && _self.charmTt.length>0){
                _self.setData(_self.charmTt)
            }
            else{
                _self.defaultMess = '加载中，请稍候...'
                var d = {
                    url: 'ranking/rankingQuery',
                    data: {
                        "rankingTypeEnum": "CHARM_TOTAL",
                    },
                    success: function (d) {
                        console.log(d)
                        if(d.status.code=="OK" && d.data){
                            _self.charmTt = d.data.dataList
                            _self.setData(_self.charmTt)
                        }

                    }
                }
                wglobal.ajax(d)
            }
        },
        getGameT:function(){//游戏实时榜
            var _self = this
            if(_self.gameT && _self.gameT.length>0){
                _self.setData(_self.gameT)
            }
            else{
                _self.defaultMess = '加载中，请稍候...'
                var d = {
                    url: 'ranking/rankingQuery',
                    data: {
                        "rankingTypeEnum": "GAME_TODAY",
                    },
                    success: function (d) {
                        console.log(d)
                        if(d.status.code=="OK" && d.data){
                            _self.gameT = d.data.dataList
                            _self.setData(_self.gameT)
                        }

                    }
                }
                wglobal.ajax(d)
            }
        },
        getGameY:function(){ //游戏昨日榜
            var _self = this
            if(_self.gameY && _self.gameY.length>0){
                _self.setData(_self.gameY)
            }
            else{
                _self.defaultMess = '加载中，请稍候...'
                var d = {
                    url: 'ranking/rankingQuery',
                    data: {
                        "rankingTypeEnum": "GAME_YESTERDAY",
                    },
                    success: function (d) {
                        console.log(d)
                        if(d.status.code=="OK" && d.data){
                            _self.gameY = d.data.dataList
                            _self.setData(_self.gameY)
                        }

                    }
                }
                wglobal.ajax(d)
            }
        },
        getGameW:function(){ //游戏周榜
            var _self = this
            if(_self.gameW && _self.gameW.length>0){
                _self.setData(_self.gameW)
            }
            else{
                _self.defaultMess = '加载中，请稍候...'
                var d = {
                    url: 'ranking/rankingQuery',
                    data: {
                        "rankingTypeEnum": "GAME_WEEK",
                    },
                    success: function (d) {
                        console.log(d)
                        if(d.status.code=="OK" && d.data){
                            _self.gameW = d.data.dataList
                            _self.setData(_self.gameW)
                        }

                    }
                }
                wglobal.ajax(d)
            }
        },
        getGameTt:function(){  //游戏总榜
            var _self = this
            if(_self.gameTt && _self.gameTt.length>0){
                _self.setData(_self.gameTt)
            }
            else{
                _self.defaultMess = '加载中，请稍候...'
                var d = {
                    url: 'ranking/rankingQuery',
                    data: {
                        "rankingTypeEnum": "GAME_TOTAL",
                    },
                    success: function (d) {
                        console.log(d)
                        if(d.status.code=="OK" && d.data){
                            _self.gameTt = d.data.dataList
                            _self.setData(_self.gameTt)
                        }

                    }
                }
                wglobal.ajax(d)
            }
        },
        getMvpT:function(){//游戏实时榜
            var _self = this
            if(_self.mvpT && _self.mvpT.length>0){
                _self.setData(_self.mvpT)
            }
            else{
                _self.defaultMess = '加载中，请稍候...'
                var d = {
                    url: 'ranking/rankingQuery',
                    data: {
                        "rankingTypeEnum": "MVP_TODAY",
                    },
                    success: function (d) {
                        console.log(d)
                        if(d.status.code=="OK" && d.data){
                            _self.mvpT = d.data.dataList
                            _self.setData(_self.mvpT)
                        }

                    }
                }
                wglobal.ajax(d)
            }
        },
        getMvpY:function(){ //游戏昨日榜
            var _self = this
            if(_self.mvpY && _self.mvpY.length>0){
                _self.setData(_self.mvpY)
            }
            else{
                _self.defaultMess = '加载中，请稍候...'
                var d = {
                    url: 'ranking/rankingQuery',
                    data: {
                        "rankingTypeEnum": "MVP_YESTERDAY",
                    },
                    success: function (d) {
                        console.log(d)
                        if(d.status.code=="OK" && d.data){
                            _self.mvpY = d.data.dataList
                            _self.setData(_self.mvpY)
                        }

                    }
                }
                wglobal.ajax(d)
            }
        },
        getMvpW:function(){ //游戏周榜
            var _self = this
            if(_self.mvpW && _self.mvpW.length>0){
                _self.setData(_self.mvpW)
            }
            else{
                _self.defaultMess = '加载中，请稍候...'
                var d = {
                    url: 'ranking/rankingQuery',
                    data: {
                        "rankingTypeEnum": "MVP_WEEK",
                    },
                    success: function (d) {
                        console.log(d)
                        if(d.status.code=="OK" && d.data){
                            _self.mvpW = d.data.dataList
                            _self.setData(_self.mvpW)
                        }

                    }
                }
                wglobal.ajax(d)
            }
        },
        getMvpTt:function(){  //游戏总榜
            var _self = this
            if(_self.mvpTt && _self.mvpTt.length>0){
                _self.setData(_self.mvpTt)
            }
            else{
                _self.defaultMess = '加载中，请稍候...'
                var d = {
                    url: 'ranking/rankingQuery',
                    data: {
                        "rankingTypeEnum": "MVP_TOTAL",
                    },
                    success: function (d) {
                        console.log(d)
                        if(d.status.code=="OK" && d.data){
                            _self.mvpTt = d.data.dataList
                            _self.setData(_self.mvpTt)
                        }

                    }
                }
                wglobal.ajax(d)
            }
        },
        getCharm:function(){
            var _self = this
            $(".charm.barSWrap .hd li").removeClass("on").eq(0).addClass("on")
            _self.getCharmT()
        },
        getGame:function(){
            var _self = this
            $(".game.barSWrap .hd li").removeClass("on").eq(0).addClass("on")
            _self.getGameT()
        },
        getMvp:function(){
            var _self = this
            $(".mvp.barSWrap .hd li").removeClass("on").eq(0).addClass("on")
            _self.getMvpT()
        },
        setData:function(d){
            var _self = this
            _self.dataList = d
            if(d.length<=0){
                _self.defaultMess = '暂无数据'
            }
            //_self.gameHistoryList = d.data
            // setTimeout(function(){
            //     new IScroll(".container .records", {click:true});
            // },10)
        },
        active:function(){
            var _self = this

            $(".barSWrap").each(function(num){
                var w = $(this)
                w.find(".hd > li").each(function(idx){
                    $(this).off().on("click",function(){
                        w.find(".hd > li").removeClass("on").eq(idx).addClass("on")
                        w.find(".barSCon").removeClass("on").eq(idx).addClass("on")
                    })
                })
            })
        }
    }
})
