var stompClient = null;


function Request(m) {
    var sValue = location.search.match(new RegExp("[\?\&]" + m + "=([^\&]*)(\&?)", "i"));
    return sValue ? sValue[1] : sValue;
}

var userId = Request("userId");
var boxId = Request("boxId");
var userToken = '';
// if (userId == '1') {
//     userToken = '962e303a2fdd653908d250c14a03d06d66a21eb0e2e05912ea5b2963c19d0bdc';
// } else if (userId == '2') {
//     userToken = '31f9e5e43ef8dfc0a8a4097a2780b28366a21eb0e2e05912ea5b2963c19d0bdc';
// }

// document.cookie = "a__b=" + userToken + "; path=/";
document.cookie = "jm_x=" + boxId + "; path=/";

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}
var timeout;
var recoverType;
var thisType;
function connect() {
    var domain="http://liyn.me:8888"
    domain=""
    var url = domain+"/stompEndpoints";
    var socket = new SockJS(url);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/userTopic/game/screen/' + boxId, function (msg) {
            var a = JSON.parse(msg.body);
            if(a.statusResponse.retcode==0) {
                showGreeting(a.message);
                if(a.messageExt) {
                    showGreeting(a.messageExt);
                }
                $(".audio").attr("src",a.voiceUrl);
                console.log('recoverType: ' + recoverType);
                console.log('thisType: ' + thisType);
                if(a.countdownSec>0) {
                    var callback;
                    if(a.msgType=='EVENT_CONTINUE') {
                        callback = recover;
                    }else{
                        callback = darkEvent;
                    }
                    if(!recoverType) {
                        recoverType = a.msgType;
                        thisType = a.msgType;
                    }else{
                        if(a.msgType!='EVENT_PAUSE' && a.msgType!='EVENT_CONTINUE') {
                            recoverType = thisType;
                            thisType = a.msgType;
                        }
                    }
                    countDown(a.countdownSec,callback,a)
                }
            }
        });

    }, function (msg) {
        console.log('msg: ' + msg);
        setConnected(false);
    });
}

function darkEvent(a) {
    stompClient.send("/screen/receiveScreenEvent", {}, JSON.stringify({
        'eventType': a.msgType
    }));
}

function countDown(time,callback,a){
    if(a.msgType!='EVENT_RESULT') {
        clearTimeout(timeout);
    }
    if(time>0){
        timeout = setTimeout(function(){
            $(".countDown").html(time)
            // console.log(time)
            time--;
            countDown(time,callback,a)
        },1000)
    }else{
        callback(a)
    }
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}


function light() {
    $("#greetings").html("");
    stompClient.send("/gameUser/receiveScreenEvent", {}, JSON.stringify({
        'eventType': 'EVENT_LIGHT'
    }));
}

function pause() {
    stompClient.send("/gameUser/receiveScreenEvent", {}, JSON.stringify({
        'eventType': 'EVENT_PAUSE'
    }));
}

function recover() {
    console.log('recoverType: ' + recoverType);
    stompClient.send("/gameUser/receiveScreenEvent", {}, JSON.stringify({
        'eventType': recoverType,
        'sourceNumber':1
    }));
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $("#connect").click(function () {
        connect();
    });
    $("#disconnect").click(function () {
        disconnect();
    });

    $("#light").click(function () {
        light();
    });
    $("#pause").click(function () {
        pause();
    });
    $("#recover").click(function () {
        recover();
    });

});

