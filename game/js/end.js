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
            "changeLevelFlag": false,
            "upFlag": false,
            "oldScore": 0,
            "newScore": 0,
            "thisNeedScore": 0,
            "thisStar": 1,
            "thisStage": 1,
            "nextNeedScore": 100,
            "nextStar": 2,
            "nextStage": 1,
            "endTime": "2017-10-23 00:53",
            "costTime": "02:48",
            "gameStatus": "GOOD_WIN",
            "gameStatusStr": "好人阵营胜利",
            "mvpFlag": false
        }
    },
    created: function () {
        var _self = this
        _self.userAccountChange()
    },
    methods: {
        mvp: function (event) {
            var el = $(event.currentTarget)
            if(el.hasClass('zan')){
                el.addClass('zaned')
                el.closest('.win').find('.zan').removeClass('zan')
            }
        },
        userAccountChange: function(){

        }
    }
});