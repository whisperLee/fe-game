/**
 * Created by lynnenie on 2017/11/30.
 */
/**
 * Created by nielinlin on 2017/9/16.
 */
Vue.component('user',component.user)
Vue.component('usermine',component.usermine)
Vue.component('userwin',component.user)
Vue.component('userlose',component.user)
Vue.component('userend',component.userend)
var timer
var voiceTimer,audio
var screen = new Vue({
    el: '#screen',
    data :{
        users: [],
        boxInfo:{},
        screeningInfo:{},//板子信息
        screenCenterMessage: {//屏幕控制中心
            nightFlag: -1
        },
        accountInfo:{},
       // voiceUrl:'',//音频url
        bgmUrl:'',//背景音频url
        countdownSec:0,// 倒计时
        recoverNumber:1,
        audioStatus:"end"
    },
    created: function () {
        var _self = this
        console.log('页面开始:' + new Date())
        _self.init()
    },
    methods: {
        init:function(){
            var _self = this
            _self.resize()

            $(window).resize(function(){
                _self.resize()
                _self.setUserQueueStyle()
            })
            _self.getBoxId()
            $(function(){
                _self.voiceEvent()
            })

        },
        getBoxId:function(){
            var _self = this
            var d = {
                url: 'game/screen/getBoxId',
                success: function (d) {
                    //console.log(d)
                    if (d.status.code === 'OK') {
                        _self.boxId = d.data
                        _self.connectWebScoket(0)
                    } else {
                        global.pop_tips(d.status.msg)
                        global.router("screen_login.html")
                    }
                }
            }
            global.ajax(d)

            // if(codeType=='test'){
            //     _self.boxId = global.urlHash().boxId || 3
            //     _self.connectWebScoket()
            // }else{
            //     global.ajax(d)
            // }
        },
        logout:function(){
            var d = {
                url: 'game/screen/logout',
                success: function (d) {
                    //console.log(d)
                    if(d.status.code == "OK"){
                        window.location.href="screen_login.html"
                    }
                }
            }
            global.ajax(d)
        },
        // 连接websocket
        connectWebScoket: function (i) {
            var _self = this

            //console.log('websocket开始:' + new Date())
            var url = '/userTopic/game/screen/' + _self.boxId
            var error = function(i){
                i = i || 0
                i++
                global.pop_tips('网络连接失败，正在重试，请稍候....')
                if(i<=12){
                    setTimeout(function(){
                        _self.connectWebScoket(i)
                    },5000)
                }else{
                    global.pop_tips('重连失败，请查看您的网络连接，或呼叫法官')
                }
            }
            websocket.connectpc(_self, url , _self.socketCallback,function(){
                error(i)
            })
        },
        // socket 接收方法
        socketCallback: function (data) {
            var _self = this
            var d = JSON.parse(data.body)
            var bgMusic = document.getElementById('bgMusic');

            if(d.msgType == 'EVENT_PAUSE'){
                if(!bgMusic.paused){
                    bgMusic.pause()
                }
                clearInterval(timer)
                d.countdownSec = 0;
                //$(".countDown").html("游戏暂停")

            }
            else if(d.msgType == 'EVENT_CONTINUE'){
                if(bgMusic && bgMusic.paused && $("#bgMusic").attr("src")!="" && typeof($("#bgmUrl").attr("src"))!="undefined"){
                    bgMusic.play();
                }

            }else if(d.msgType == 'QUEUE'){
                _self.$set(_self.screenCenterMessage,'message','入座中，请等待请他玩家入座')
            }
            else if(d.msgType == 'EVENT_SCREENING_OVER' || d.msgType == 'EVENT_RESTART' || d.msgType == 'EVENT_NEW'){
                websocket.disconnect()
                location.reload() // 游戏开始，重新刷新页面
            }
            if(global.isExit(d.gameInfo)){
                if(global.isExit(d.gameInfo.nightFlag)){
                    var n = d.gameInfo.nightFlag?1:0
                    _self.$set(_self.screenCenterMessage,'nightFlag',n)
                    //_self.screenCenterMessage.nightFlag = d.gameInfo.nightFlag?1:0
                }
            }
            //console.log(_self.screenCenterMessage.nightFlag)
            if(_self.screenCenterMessage.nightFlag==1 && $("#audio").length>0 && _self.audioStatus!="end" && d.msgType != 'EVENT_PAUSE'){  // 晚上的时候，判断上一个音频文件是否播放完成，如果没有播放完成，则等待音频播放完成之后再执行事件
                // if(audio && audio.paused){ // 对于上次没有播放的音频，直接忽略，继续下一音频
                //     console.log("音乐非法暂停")
                //     _self.audioStatus = 1;
                //     _self.socketCallback(data)
                // }else{
                //     _self.voiceEvent(data)
                //}
                _self.voiceEvent(data)
                return
            }
            // else{
            //     _self.voiceEvent()
            // }


            if( d.userInfoList && d.userInfoList.length>0) { // 玩家信息
                $('.welcome').hide()
                for(var i=0;i<d.userInfoList.length; i++){
                    var num = d.userInfoList[i].number
                    _self.users[num-1] =  $.extend({}, _self.users[num-1], d.userInfoList[i])
                    _self.$set(_self.users,num-1,_self.users[num-1])
                }
            }
            if(d.msgType == 'QUEUE' || d.msgType == 'CUR_GAME_STATUS'){
                    _self.setUser(d)
                    setTimeout(function () {
                        _self.setUserQueueStyle()
                    }, 10)
            }

            if(d.msgType == 'EVENT_CAMPAIGN_RESULT' || d.msgType =='EVENT_CAMPAIGN_PK_SPEAK' || d.msgType =='EVENT_CAMPAIGN_OUT_PK_SPEAK'){
                for(var i=0; i<_self.users.length;i++){
                    if(_self.users[i].campaignFlag){
                        _self.users[i].campaignFlag = false
                        _self.$set(_self.users,i,_self.users[i])
                    }
                }
            }
            if(d.userInfoList){
                for(var i=0;i<d.userInfoList.length; i++){
                    var num = d.userInfoList[i].number
                    _self.users[num-1] =  $.extend({}, _self.users[num-1], d.userInfoList[i])
                    _self.$set(_self.users,num-1,_self.users[num-1])
                }
            }

            if(d.boxInfo){ // 包房信息
                _self.boxInfo = d.boxInfo
            }
            if(d.screeningInfo){ // 板子信息
                _self.screeningInfo = d.screeningInfo
            }

            if(global.isExit(d.gameInfo)){
                if(global.isExit(d.gameInfo.gameTime)){
                    //_self.screenCenterMessage.gameTime = d.gameInfo.gameTime
                    _self.$set(_self.screenCenterMessage,'gameTime',d.gameInfo.gameTime)
                }
                // if(global.isExit(d.gameInfo.gameStatusStr)){
                //     _self.$set(_self.screenCenterMessage,'message',d.gameInfo.gameStatusStr)
                // }
            }

            if(d.message){ // 提示消息
                _self.$set(_self.screenCenterMessage,'message',d.message)
                _self.screenCenterMessage.messageExt = d.messageExt?d.messageExt:''
                if(global.isExit(d.eventResultInfo) && global.isExit(d.eventResultInfo.eventResult)){
                    _self.screenCenterMessage.messageExt+=d.eventResultInfo.eventResult
                }
                _self.$set(_self.screenCenterMessage,'messageExt',_self.screenCenterMessage.messageExt)
            }
            if(d.bgmUrl || d.bgmUrl==''){ // 背景音频播放
                _self.$set(_self,'bgmUrl',d.bgmUrl)
                bgMusic.currentTime = 0;
            }
            if(d.voiceUrl){ // 音频播放
                clearTimeout(voiceTimer)
                /*if($("#audio").length>0){
                    $("#audio").remove()
                }
                $("body").append('<audio class="audio" id="audio" autoplay="autoplay" src="'+d.voiceUrl+'" controls="controls"></audio>')
                _self.voiceEvent()
                //_self.$set(_self,'voiceUrl',d.voiceUrl)*/

                //$("#audio")[0].currentTime = 0;
                if(_self.screenCenterMessage.messageExt && _self.screenCenterMessage.messageExt!=""){
                    var text = _self.screenCenterMessage.messageExt
                }else{
                    var text="啦啦啦"
                }
                _self.addVioce(text)
            }
            // 发送倒计时事件
            _self.sendEventForScreen(d)

            if(d.voteInfo && d.voteInfo.voteDetailList.length>0){ // 投票结果
                _self.showVoteList(d.voteInfo,d.countdownSec)
            }

            if(d.gameResult){ // 游戏结束
                var el = $('.gameResult')
                el.addClass(d.gameResult)
                animate.layerEnter(el)
            }
            if(d.gameAccountInfo){ //游戏结算
                if(d.msgType == 'EVENT_GAME_ACCOUNT'){
                    _self.account(d)
                }
                if(d.msgType == 'EVENT_MVP_RESULT'){
                    _self.mvp(d)
                }
            }
        },
        isVoicePlaying:function(text){
            var _self = this
            if($("#audio").length>0 && _self.audioStatus=="pause"){
                if(codeType=="test"){
                    console.log("没有监测到音乐播放"+text)
                    //alert("没有监测到音乐播放"+text)
                }
                //_self.addVioce(text)
                voiceTimer = setTimeout(function(){
                    _self.isVoicePlaying(text)
                },2000)
            }
        },
        addVioce:function(text){
            var _self = this
            _self.audioStatus = "pause";
            if ($("#audio").length>0) {
                $("#audio").remove()
            }
            audio = null;
            // 参数含义请参考 https://ai.baidu.com/docs#/TTS-API/41ac79a6
            audio = btts({
                tex: text,
                tok: '24.7199c9cbb1c2eebf9c7bbf624fe612a3.2592000.1530804987.282335-2180146',
                spd: 5,pit: 5,vol: 9, per: 0
            }, {
                volume: 1,
                autoplay:true,
                autoDestory: false,
                timeout: 10000,
                hidden: false,
                onSuccess: function(htmlAudioElement) { //远程语音合成完成，并且返回音频文件后调用
                    _self.voiceEvent() // 绑定事件
                    setTimeout(function(){ //判断饮品是否已播放
                        _self.isVoicePlaying(text)
                    },1000)
                },
                onError: function(t) {
                    if(codeType=="test"){
                        alert("baidu:"+t)
                    }
                    console.log("百度:"+t)
                    _self.addVioce(text)
                },
                onTimeout: function () {
                    console.log("百度：timeout")
                    _self.addVioce(text)
                }
            });
        },
        voiceEvent:function(data){
            var _self = this
            $("#audio").off().on("ended",  function(){

                console.log("end")
                _self.audioStatus = "end";
                $("#audio").remove()
                if(data){
                    console.log("callback End")
                    _self.socketCallback(data)
                }
            }).on("playing",  function(){
                console.log("playig")
                _self.audioStatus = "playing";
            });
        },
        sendEventForScreen:function(a){
            var _self = this
            if(a.countdownSec && a.countdownSec>0) {
                var data;
                if(a.msgType!='EVENT_PAUSE' && a.msgType!='EVENT_CONTINUE') {
                    if(!_self.thisType) {
                        _self.recoverType = a.msgType;
                    }else{
                        _self.recoverType = _self.thisType;
                    }
                    if(a.msgType=='EVENT_RESULT'){ // 如果是结果事件，则把具体执行的是什么事件，赋值给当前事件
                        _self.thisType = a.eventResultInfo.eventType;
                        _self.recoverNumber = 0; // 对于的结果事件，需要recover一下
                    }else{
                        _self.thisType = a.msgType;
                        _self.recoverNumber = 1;
                    }
                }
                if(a.msgType=='EVENT_CONTINUE') {
                    data = {
                        'eventType': _self.recoverType,
                        'sourceNumber':_self.recoverNumber
                    }
                }
                else{
                    data = {
                        'eventType': _self.thisType
                    }
                }
                //console.log(a.countdownSec + '倒计时开始：'+  new Date())
                //console.log(data)
                _self.countDown(a.countdownSec,function(){
                    console.log("倒计时结束："+ new Date())
                    setTimeout(function(){
                        //_self.nowDate = {}
                        //console.log("发送事件：" + new Date())
                        //console.log(data)
                        websocket.receiveScreenEvent(data)
                    },2000)
                },a)
            }
        },

        countDown: function (time,callback,a) {
            var _self = this
            clearTimeout(timer);
            //console.log(time)
            callback = callback || function () { }
            timer = setInterval(function () {
                //console.log("倒计时："+time+','+new Date())
                time--
                _self.countdownSec = time
                if (time <= 0) {
                    clearInterval(timer)
                    callback(a)
                }
            }, 1000)
        },
        // 设置用户状态
        setUser: function (d) {
            var _self = this
            _self.users = []
            var total = (d.screeningInfo && d.screeningInfo.playerCount) || 15

            for (var k = 1; k <= total; k++) {
                _self.users.push({
                    userId: k,
                    number: k,
                    headImgUrl: staticUrl+'/image/head.png'
                })
            }
            if (d.userInfoList && d.userInfoList.length > 0) {
                for (var j = 0; j < d.userInfoList.length; j++) {
                    if (typeof (d.userInfoList[j].headImgUrl) === 'undefined' || d.userInfoList[j].headImgUrl === '') {
                        d.userInfoList[j].headImgUrl = staticUrl+'/image/head.png'
                    }
                    _self.users[d.userInfoList[j].number - 1] = d.userInfoList[j]
                }
                if (_self.gameEvent === 'QUEUE' && d.userInfoList.length === total) { // 队列状态下，所有用户都入座完成之后，可以开始游戏
                    _self.queueFlow = 2
                } else {
                    _self.queueFlow = 1
                }
            }

        },
        // 队列页面用户样式设置
        setUserQueueStyle: function () {
            var _self = this
            var total = _self.users.length
            var r = _self._w*0.86/2
            var ao = 160/(total-1) //10-170度之间

            $('.user-list li').each(function (idx) {
                var left = _self._w/2 - r   *   Math.cos((ao*idx+10)   *   3.14   /180   )
                var top =  _self._w/2 - r   *   Math.sin((ao*idx+10)   *   3.14   /180   )
                //console.log(top)
                // x1   =   x0   +   r   *   cos(ao   *   3.14   /180   ) 
                // y1   =   y0   +   r   *   sin(ao   *   3.14   /180   )
                $(this).css({
                    left: left+'px',
                    top: top-_self._h*0.035+'px',
                    opacity:1
                })
            })
        },
        showVoteList:function(d,time){
            var _self = this
            var el = $('.layerEventVoteResult')
            var time = time || 10
            el.find('.title').html(d.voteTitle)
            var info = []
            if(d.maxNumbers.length>0){
                for(var f = 0; f<d.maxNumbers.length; f++){
                    info.push(' 【'+d.maxNumbers[f]+'】')
                }
                el.find('.info').html(info.join(',')+'号得<b>'+d.poll+'</b>票，最多')
            }else{
                el.find('.info').html('所有人弃票')
            }

            var h = ''
            var isSergean = ''
            for(var i = 0; i < d.voteDetailList.length; i++){
                var voteN = d.voteDetailList[i].votedNumber
                h+='<li class="result"><div class="left">'
                if(voteN==0){
                    h+='<b class="userNum qi">弃</b>'
                }else{
                    h+='<b class="userNum">'+voteN+'</b>'
                }
                h+='</div><div class="right"><ul>'
                for(var j = 0; j< d.voteDetailList[i].voteNumberList.length; j++){
                    isSergean = d.voteDetailList[i].voteNumberList[j] == d.sergeantNumber ? '<b class="sergean"></b>': ''
                    h+='<li><b class="userNum">'+d.voteDetailList[i].voteNumberList[j]+'</b>'+isSergean+'</li>'
                }
                h+='</ul> </div> </li>'
            }
            el.find('.resultList').html(h)
            animate.layerEnter(el,time)

            _self.voteListScroll(el)
        },
        voteListScroll:function(el){
            var w_h = el.find('.content').height()
            var c_h = el.find('.content .resultList').height()
            var r = c_h/w_h
            if(r>1.5){
                el.find('.content').addClass('mins')
                el.find('.result').each(function(idx){
                    if($(this).find('.right li').length>3){
                        $(this).addClass('max')
                    }
                })
            }else if(r>1){
                el.find('.content').addClass('halfs')
            }
        },
        account:function(d){
            var _self = this
            $('.gameEnd').show()
            for(var i=0; i< d.gameAccountInfo.winUsers.length;i++){
                d.gameAccountInfo.winUsers[i].identityStatus =  d.gameAccountInfo.winUsers[i].gameIdentityStatusEnum
            }
            for(var i=0; i< d.gameAccountInfo.loseUsers.length;i++){
                d.gameAccountInfo.loseUsers[i].identityStatus =  d.gameAccountInfo.loseUsers[i].gameIdentityStatusEnum
            }
            _self.accountInfo = {}
            _self.accountInfo = d.gameAccountInfo;
        },
        mvp:function(d){
            if(d.gameAccountInfo.mvpNumber>0){
                $('.gameEnd .result .userList li .user[num="'+d.gameAccountInfo.mvpNumber+'"]').closest('li').addClass('mvp')
            }else{
                global.pop_tips(d.messageExt)
            }
        },
        // 返回每个用户坐标
        returnUserStyle: function (total,row,col,width,height,center_user) {
            var _self = this
            var style = []
            var className = []
            for (var i = 1; i <= total; i++) {
                if (i <= row) { // 左边
                    style.push({
                        left: 0,
                        top: (row - i) * height
                    })
                    className.push('left')
                } else if (i > row + center_user) { // 右边
                    style.push({
                        left: (col - 1) * width,
                        top: (i - row - center_user - 1) * height
                    })
                    className.push('right')
                } else {
                    style.push({
                        left: (i - row) * (1 + (col - center_user - 2) / (center_user + 1)) * width,
                        top: 0
                    })
                    className.push('center')
                }
            }
            return {'style':style,'className':className}
        },
        resize:function(){
            var _self = this
            var W = $(window).width()
            var H = $(window).height()
            var n_w = 1920,//n_h = 1200;
                n_h = 1080;
            var i = W / H,
                r = n_w / n_h;
            t = i < r ? W / n_w:H / n_h
            _self._w = parseInt(n_w*t)
            _self._h = parseInt(n_h*t)

            $('.main').css({
                "width":_self._w,
                "height":parseInt(n_h*t)
            })

            $('html').css({
                "fontSize":_self._w/10+'px'
            })
        }
    }
});