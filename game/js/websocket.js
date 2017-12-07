var stompClient
var websocket = {
    host: 'http://liyn.me:8888/',
    //host: 'http://192.168.3.28:8888/',
    connect: function (vue, url, callback) {
        var _self = this
        var socket = new SockJS(_self.host+'stompEndpoints');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            stompClient.subscribe(url, callback)
            _self.userJustEnter()
        }, function (msg) {
            console.log('msg: ' + msg)
        })
    },
    connectpc: function (vue, url, callback) {
        var _self = this
        var socket = new SockJS(_self.host+'stompEndpoints');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            stompClient.subscribe(url, callback)
        }, function (msg) {
            console.log('msg: ' + msg)
        })
    },
    // 初次进入，通知服务器
    userJustEnter: function () {
        stompClient.send('/gameUser/userJustEnter', {}, {})
    },
    // 开始游戏
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
        stompClient.send('/gameUser/receiveUserEvent', {},data)
    },
    // 大屏事件
    receiveScreenEvent:function(data){
        data = JSON.stringify(data)
        console.log(new Date() +'receiveScreenEvent:'+data)
        stompClient.send('/screen/receiveScreenEvent', {}, data);
    }

}
