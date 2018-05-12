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
            _self.check()
       },
        check:function(){
            var _self = this
            var d = {
                url: 'game/judge/check',
                data: {
                    "id": _self.boxId
                },
                success: function (d) {
                    console.log(d)
                    if(d.status.code == "OK" && d.data){
                        global.setCookie("yy_z_q",d.data)
                        _self.enter()
                    }else{
                        global.pop_tips("请重新登录",function(){
                            //global.router("../../erp/html/login.html")
                        })
                    }
                },
                error:function(){
                    $(".mess").html(d.status.msg)
                }
            }
            global.ajax(d)
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
        kick:function(eventType){
            var data = {
                'targetNumberList': [$("input[name='number']").val()],
                'eventType': eventType}
            websocket.receiveJudgeEvent(data)
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

