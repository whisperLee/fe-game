/**
 * Created by nielinlin on 2018/5/2.
 */
var judge = new Vue({
    el: '#judge',
    data:{

    },
    created: function () {
        var _self = this
        _self.judgeInit()
    },
    methods:{
        judgeInit:function(){
            var _self = this
            _self.boxId = global.urlHash().boxId || 0
            _self.enter()
       },
        enter:function(){
            var _self = this
            console.log('websocket开始:' + new Date())
            var url = '/userTopic/game/judge/' + _self.boxId + '/' + _self.userId
            websocket.connect(_self, url , _self.socketCallback)
        },
        // socket 接收方法
        socketCallback: function (data) {

        },
        receiveJudgeEvent:function(eventType){
            websocket.receiveJudgeEvent({'eventType': eventType})
        },
        kill:function(){
            var _self = this
            var targetNumberList = [$("#target").val()]
            var data = {
                'eventType': 'EVENT_WEREWOLF',
                'targetNumberList': targetNumberList
            }
            websocket.receiveJudgeEvent(data)
        },
        nightEvent:function(){
            var _self = this
            //???????
            var targetNumberList = [$("#target").val()]
            var sourceNumber = 0
            var data = {
                'eventType': mm.eventInfo.eventType,
                'targetNumberList': targetNumberList,
                'sourceNumber': $("#source").val(),
            }
            websocket.receiveJudgeEvent(data)
        },
        startGame:function(){
            var _self = this
            websocket.judgeStartGame({})
        }

    }
})

