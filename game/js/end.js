/**
 * Created by nielinlin on 2017/9/16.
 */
Vue.component('userwin',component.user)
Vue.component('userlose',component.user)
Vue.component('userend',component.userend)
new Vue({
    el: '#end',
    data: {
        endTime: "2017-10-23 00:52",
        costTime: "08:02:27",
        winUsers: [
            {
                "userId": 203,
                "nickName": "203",
                "number": 3,
                "identityName": "平民",
                "identityId": 1,
                "stage": 1,
                "star": 1
            }, {
                "userId": 204,
                "nickName": "204",
                "number": 4,
                "identityName": "女巫",
                "identityId": 4,
                "stage": 1,
                "star": 1
            }, {
                "userId": 205,
                "nickName": "205",
                "number": 5,
                "identityName": "猎人",
                "identityId": 5,
                "stage": 1,
                "star": 1
            }, {
                "userId": 206,
                "nickName": "206",
                "number": 6,
                "identityName": "平民",
                "identityId": 1,
                "stage": 1,
                "star": 1
            }, {
                "userId": 207,
                "nickName": "207",
                "number": 7,
                "identityName": "白痴",
                "identityId": 9,
                "stage": 1,
                "star": 1
            }, {
                "userId": 208,
                "nickName": "208",
                "number": 8,
                "identityName": "平民",
                "identityId": 1,
                "stage": 1,
                "star": 1
            }, {
                "userId": 209,
                "nickName": "209",
                "number": 9,
                "identityName": "预言家",
                "identityId": 3,
                "stage": 1,
                "star": 1
            }, {
                "userId": 210,
                "nickName": "210",
                "number": 10,
                "identityName": "守卫",
                "identityId": 6,
                "stage": 1,
                "star": 1
            }, {
                "userId": 211,
                "nickName": "211",
                "number": 11,
                "identityName": "平民",
                "identityId": 1,
                "stage": 1,
                "star": 1
            }, {
                "userId": 212,
                "nickName": "212",
                "number": 12,
                "identityName": "平民",
                "identityId": 1,
                "stage": 1,
                "star": 1
            }
        ],
        "loseUsers": [{
            "userId": 201,
            "nickName": "201",
            "number": 1,
            "identityName": "狼人",
            "identityId": 2,
            "stage": 1,
            "star": 1
        }, {
            "userId": 202,
            "nickName": "202",
            "number": 2,
            "identityName": "白狼王",
            "identityId": 8,
            "stage": 1,
            "star": 1
        }],
        "gameStatus": "GOOD_WIN",
        "gameStatusStr": "好人阵营胜利",
        "surplusTime": 10,
        "personalAccountInfo": {
            "userId": 201,
            "nickName": "201",
            "number": 1,
            "identityId": 2,
            "identityName": "狼人",

            // 模拟数据 +30
            // "changeLevelFlag": false,
            // "upFlag": true,
            // "oldScore": 60,
            // "newScore": 90,
            // "thisNeedScore": 40,
            // "thisStar": 2,
            // "thisStage": 1,
            // "nextNeedScore": 100,
            // "nextStar":3,
            // "nextStage": 1,
            // "preNeedScore": 0,
            // "preStar": 1,
            // "preStage": 1,
            // 0-40,40-100,100-200,200-350

            // 模拟数据 -30
            // "changeLevelFlag": false,
            // "upFlag": false,
            // "oldScore": 90,
            // "newScore": 60,
            // "thisNeedScore": 40,
            // "thisStar": 2,
            // "thisStage": 1,
            // "nextNeedScore": 100,
            // "nextStar":3,
            // "nextStage": 1,
            // "preNeedScore": 0,
            // "preStar": 1,
            // "preStage": 1,

            // 模拟数据 +30 +*
            //  "changeLevelFlag": true,
            //  "upFlag": true,
            //  "oldScore": 30,
            //  "newScore": 60,
            //  "thisNeedScore": 40,
            //  "thisStar": 2,
            //  "thisStage": 1,
            //  "nextNeedScore": 100,
            //  "nextStar":3,
            //  "nextStage": 1,
            //  "preNeedScore": 0,
            //  "preStar": 1,
            //  "preStage": 1,


            // 模拟数据 -30 -*
             "changeLevelFlag": true,
             "upFlag": false,
             "oldScore": 110,
             "newScore": 80,
             "thisNeedScore": 40,
             "thisStar": 2,
             "thisStage": 1,
             "nextNeedScore": 100,
             "nextStar":3,
             "nextStage": 1,
             "preNeedScore": 0,
             "preStar": 1,
             "preStage": 1,


            /*// 模拟数据 +30 +*l
             "changeLevelFlag": true,
             "upFlag": true,
             "oldScore": 180,
             "newScore": 210,
             "thisNeedScore": 200,
             "thisStar": 1,
             "thisStage": 2,
             "nextNeedScore": 350,
             "nextStar":2,
             "nextStage": 2,
             "preNeedScore": 100,
             "preStar": 3,
             "preStage": 1,
             */

            /*// 模拟数据 -30 -*l
             "changeLevelFlag": true,
             "upFlag": false,
             "oldScore": 210,
             "newScore": 180,
             "thisNeedScore": 100,
             "thisStar": 3,
             "thisStage": 1,
             "nextNeedScore": 200,
             "nextStar":1,
             "nextStage": 2,
             "preNeedScore": 40,
             "preStar": 2,
             "preStage": 1,
             */

            "endTime": "2017-10-23 00:53",
            "costTime": "02:48",
            "gameStatus": "GOOD_WIN",
            "gameStatusStr": "好人阵营胜利",
            "mvpFlag": false
        }
    },
    created: function () {
        var _self = this
        setTimeout(function(){
            //
            //setTimeout(function(){
            _self.userAccountChange()
            //},1000)
            _self.mvp(203)
        },1000)

    },
    methods: {
        voteMvp: function (event) {
            var el = $(event.currentTarget)
            if(el.hasClass('zan')){
                el.addClass('zaned')
                el.closest('.win').find('.zan').removeClass('zan')
            }
        },
        mvp:function(num){
            var _self = this
            $('.gameEnd .result .userList li[userid="'+num+'"]').addClass('mvp')
        },
        userAccountChange: function(){
            var _self = this
            var el = $('.userAccount')
            var d = _self.personalAccountInfo
            var oldPre,newPre
            var _per = el.find('.pro b')

            newPre = (d.newScore-d.thisNeedScore)*100/(d.nextNeedScore-d.thisNeedScore)
            newPre = newPre*0.8+10 // 样式的问题，当前星级在整个进度条的80%，所以在*0.8之后，加上上一星级的10%
            console.log(newPre)
            if(d.changeLevelFlag){
                if(d.upFlag){
                    oldPre = 5;
                    if(d.thisStar == 1){
                        // 升等
                    }else{

                    }
                }else{
                    oldPre = 95;
                    if(d.thisStar == 3){
                        // 降等
                    }else{

                    }
                }
            }else{
                oldPre = (d.oldScore-d.thisNeedScore)*100/(d.nextNeedScore-d.thisNeedScore)
                oldPre = parseInt(oldPre*0.8)+10
                console.log(oldPre)
            }
            _per.css({'width':oldPre+'%'})
            animate.layerEnter($('.userAccount'))

            el.find('.count').velocity({
                translateY: ['0','100%'],
                opacity:[1,0]
            },{
                duration: 1000,
                delay:3000,
                complete: function() {
                    _per.velocity({
                        width:newPre+'%'
                    },{
                        duration: 500,
                        complete: function() {

                        }
                    })
                }
            })


        }
    }
});