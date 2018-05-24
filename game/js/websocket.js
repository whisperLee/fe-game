var stompClient
var websocket = {
    host: http+':8888/',
    //host: 'http://192.168.3.28:8888/',
    // 用户连接
    connect: function (vue, url, callback,error) {
        var _self = this
        var socket = new SockJS(_self.host+'stompEndpoints');
        error = error || function(msg){
                console.log('msg: ' + msg)
        }
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            stompClient.subscribe(url, callback)
            _self.userJustEnter()
        }, function (msg) {
            //console.log('msg: ' + msg)
            error()
        })
    },
    disconnect:function(){
        stompClient.disconnect();
    },
    // 大屏连接
    connectpc: function (vue, url, callback,error) {
        var _self = this
        var socket = new SockJS(_self.host+'stompEndpoints');
        error = error || function(msg){
                console.log('msg: ' + msg)
            }
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            stompClient.subscribe(url, callback)
            _self.screenJustEnter()
        }, function (msg) {
            //console.log('msg: ' + msg)
            error()
        })
    },
    // 法官连接
    connectJudge:function(vue, url, callback){
        var _self = this
        var socket = new SockJS(_self.host+'stompEndpoints');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            stompClient.subscribe(url, callback)
            _self.judgeJustEnter()
        }, function (msg) {
            console.log('msg: ' + msg)
        })
    },
    // 用户初次进入，通知服务器
    userJustEnter: function () {
        stompClient.send('/gameUser/userJustEnter', {}, {})
    },
    // 用户开始游戏
    userStartGame: function () {
        stompClient.send('/gameUser/userStartGame', {}, {})
    },
    // 用户选择身份
    userChooseIdentity: function (data){
        console.log(data)
        data = JSON.stringify(data)
        stompClient.send('/gameUser/userChooseIdentity', {}, data)
    },
    // 用户首次查看身份
    userLookIdentity: function (){
        stompClient.send('/gameUser/userLookIdentity', {}, {})
    },
    // 用户事件
    receiveUserEvent:function (data) {
        data = JSON.stringify(data)
        console.log(data)
        stompClient.send('/gameUser/receiveUserEvent', {},data)
    },
    // 大屏事件
    receiveScreenEvent:function(data){
        data = JSON.stringify(data)
        console.log(new Date() +'receiveScreenEvent:'+data)
        stompClient.send('/screen/receiveScreenEvent', {}, data);
    },
    // 法官事件
    receiveJudgeEvent:function(data){
        data = JSON.stringify(data)
        stompClient.send('/judge/receiveJudgeEvent', {}, data);
    },
    // 法官开始事件
    judgeStartGame:function(data){
        data = JSON.stringify(data)
        stompClient.send('/judge/judgeStartGame', {}, data);
    },
    // 大屏初次进入，通知服务器
    screenJustEnter:function(data){
        data
        data = JSON.stringify(data)
        stompClient.send('/screen/screenJustEnter', {}, data);
    },
    // 法官初次进入，通知服务器
    judgeJustEnter:function(data){
        data
        data = JSON.stringify(data)
        stompClient.send('/judge/judgeJustEnter', {}, data);
    },

}
