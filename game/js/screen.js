/**
 * Created by lynnenie on 2017/11/30.
 */
/**
 * Created by nielinlin on 2017/9/16.
 */
Vue.component('user',component.user)
Vue.component('usermine',component.usermine)
Vue.component('messagecenter',component.messagecenter)
Vue.component('userinfo',component.userinfo)
Vue.component('userwin',component.user)
Vue.component('userlose',component.user)
Vue.component('userend',component.userend)
// Vue.component('qiangshenfen', component.qiangshenfen)
// Vue.component('identitylayer', component.identitylayer)

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
        voiceUrl:''//音频url
    },
    created: function () {
        var _self = this

        console.log('页面开始:' + new Date())
        _self.init()
        _self.connectWebScoket()
    },
    methods: {
        init:function(){
            var _self = this
            var W = $(window).width()
            var H = $(window).height()
            var n_w = 1920,n_h = 1200;
            var i = W / H,
                r = n_w / n_h;
            t = i < r ? W / n_w:H / n_h
            _self._w = parseInt(n_w*t)

            $('.main').css({
                "width":_self._w,
                "height":parseInt(n_h*t)
            })

            $('html').css({
                "fontSize":_self._w/10+'px'
            })
        },
        // 连接websocket
        connectWebScoket: function () {
            var _self = this
            _self.boxId = global.urlHash().boxId || 0
            console.log('websocket开始:' + new Date())
            var url = '/userTopic/game/screen/' + _self.boxId
            websocket.connectpc(_self, url , _self.socketCallback)
        },
        // socket 接收方法
        socketCallback: function (data) {
            var _self = this
            console.log('得到返回数据:' + new Date())
            var d = JSON.parse(data.body)
            if (d.msgType === 'QUEUE') {
                _self.mine = d.personalInfo
                _self.setUser(d)
                setTimeout(function () {
                    _self.setUserQueueStyle()
                }, 10)
            }
            if(d.showMsg){
                _self.screenCenterMessage.result = d.showMsg
                if(d.showMsg =='欢迎光临遇见狼人杀俱乐部'){
                    //准备抢身份
                    _self.setUserGameStyle()
                }
            }
            if(d.boxInfo){
                _self.boxInfo = d.boxInfo
            }
            if(d.screeningInfo){
                _self.screeningInfo = d.screeningInfo
            }
            if(d.voiceUrl){
                _self.$set(_self,'voiceUrl',d.voiceUrl)
                var audio = document.getElementById('audio');
                audio.onended = function() {
                    console.log("音频播放完成")
                    _self.sendEventForScreen(d)
                };
                console.log(_self.voiceUrl)
            }
            if(d.message){
                _self.$set(_self.screenCenterMessage,'message',d.message)
                _self.screenCenterMessage.messageExt = d.messageExt?d.messageExt:''
                _self.$set(_self.screenCenterMessage,'messageExt',_self.screenCenterMessage.messageExt)
            }


            // 游戏开始后事件
            if(d.msgType == 'UPDATE'){ //需要获取GameInfo和userInfoList
                _self.gameInfo(d)
            }
            else if(d.msgType == 'UPDATE_LEADER'){//需要获取leaderInfo
                _self.setLeaderBtn(d.leaderInfo)
            }
            else if(d.msgType == 'DEAD'){//该玩家挂了,黑屏,不在接受事件 除了gameover
                _self.dead()
            }
            else if(d.msgType == 'EVENT_GAMEOVER'){ //游戏结束 获取gameResult字段 TODO

            }
            else if(d.msgType == 'EVENT'){ // 游戏事件,需要获取eventInfo
                _self.eventInfo(d.eventInfo)
            }
            else if(d.msgType == 'UPDATE_AND_EVENT'){
                _self.gameInfo(d)
                _self.eventInfo(d.eventInfo)
            }
            else if(d.msgType == 'EVENT_RESULT'){ // 游戏事件返回结果,需要获取eventResultInfo
                d.eventResultInfo.eventDesc && global.pop_tips(d.eventResultInfo.eventDesc)
            }
            else if(d.msgType == 'CUR_GAME_STATUS'){ // 游戏开始后，用户重新进入游戏
                _self.setUser(d)
                setTimeout(function () {
                    _self.setUserGameStyle()
                }, 10)
                // 设置自己的身份
                _self.mine = d.personalInfo
                $('.layerShenfen .shenfen').addClass('shenfen'+d.personalInfo.identityId)
                // 设置自己的游戏信息
                if(d.eventInfo){
                    _self.eventInfo(d.eventInfo)
                }
                if(d.gameInfo){
                    _self.gameInfo(d)
                }
                if(global.isExit(d.leaderInfo.leaderButton)){
                    _self.setLeaderBtn(d.leaderInfo)
                }
                if(d.personalInfo.deadFlag){
                    _self.dead()
                }
            }
        },
        gameInfo:function(d){
            var _self = this
            if(d.gameInfo){
                var s = d.gameInfo.gameStatus
                if(s == 'ROB_IDENTITY'){
                    _self.showQiang(d.identityInfoList)
                }
                else if(s == 'LOOK_IDENTITY'){
                    _self.$set(_self.mine,'identityName',d.personalInfo.identityName)
                    _self.$set(_self.mine,'identityId',d.personalInfo.identityId)
                    $('.layerShenfen .shenfen').addClass('shenfen'+d.personalInfo.identityId)
                    _self.showSF()
                }

                else if(s == 'GAME_ACCOUNT'){
                    _self.account(d.gameAccountInfo)
                }
                else if(s == 'MVP_RESULT'){
                    _self.mvp(d.gameAccountInfo.mvpNumber)
                }
                else if(s == 'GAME_REPLAY'){
                    if(d.personalAccountInfo.changeLevelFlag){
                        if(d.personalAccountInfo.upFlag){
                            d.personalAccountInfo.showStage = d.personalAccountInfo.preStage
                            d.personalAccountInfo.showStar = d.personalAccountInfo.preStar
                        }else{
                            d.personalAccountInfo.showStage = d.personalAccountInfo.nextStage
                            d.personalAccountInfo.showStar = d.personalAccountInfo.nextStar
                        }
                    }else{
                        d.personalAccountInfo.showStage = d.personalAccountInfo.thisStage
                        d.personalAccountInfo.showStar = d.personalAccountInfo.thisStar
                    }
                    d.personalAccountInfo.showScore = d.personalAccountInfo.oldScore
                    _self.myAccountInfo = {}
                    _self.myAccountInfo=d.personalAccountInfo

                    _self.userAccountChange(d.personalAccountInfo)
                }


                if(global.isExit(d.gameInfo.nightFlag)){
                    console.log(d.gameInfo.nightFlag)
                    _self.screenCenterMessage.nightFlag = d.gameInfo.nightFlag?1:0
                }
                if(global.isExit(d.gameInfo.gameTime)){
                    _self.screenCenterMessage.gameTime = d.gameInfo.gameTime
                }
                if(global.isExit(d.gameInfo.gameStatusStr)){
                    _self.screenCenterMessage.gameStatusStr = d.gameInfo.gameStatusStr
                }
                if(global.isExit(d.gameInfo.showMsg)){
                    _self.screenCenterMessage.result = d.gameInfo.result
                }
                if(global.isExit(d.gameInfo.voteInfoList) && d.gameInfo.voteInfoList.length>0){
                    _self.showVoteList(d.gameInfo.voteInfoList[0])
                }
            }
            if(d.userInfoList){
                if(s == 'CAMPAIGN_RESULT' || s =='CAMPAIGN_PK_SPEAK' || s =='CAMPAIGN_OUT_PK_SPEAK'){
                    for(var i=0; i<_self.users.length;i++){
                        if(_self.users[i].campaignFlag){
                            _self.users[i].campaignFlag = false
                            _self.$set(_self.users,i,_self.users[i])
                        }
                    }
                }
                for(var i=0;i<d.userInfoList.length; i++){
                    var num = d.userInfoList[i].number
                    _self.users[num-1] =  $.extend({}, _self.users[num-1], d.userInfoList[i])
                    _self.$set(_self.users,num-1,_self.users[num-1])
                }
                console.log(JSON.stringify(_self.users))
            }
            if(d.personalInfo && d.personalInfo.buttons){
                if(d.personalInfo.buttons.length==0 || d.personalInfo.buttons[0]=='EMPTY'){
                    _self.personalButton = []
                }else{
                    _self.personalButton = d.personalInfo.buttons
                }
            }
        },
        sendEventForScreen:function(a){
            var _self = this
            if(a.countdownSec>0) {
                var data;
                if(!_self.recoverType) {
                    _self.recoverType = a.msgType;
                    _self.thisType = a.msgType;
                }else{
                    if(a.msgType!='EVENT_PAUSE' && a.msgType!='EVENT_CONTINUE') {
                        _self.recoverType = _self.thisType;
                        _self.thisType = a.msgType;
                    }
                }
                if(a.msgType=='EVENT_CONTINUE') {
                    data = {
                        'eventType': _self.recoverType,
                        'sourceNumber':1
                    }
                }else{
                   data = {
                       'eventType': a.msgType
                   }
                }
                _self.countDown(a.countdownSec+2,function(){
                    websocket.receiveScreenEvent(data)
                },a)
            }
        },
        countDown: function (time,callback,a) {
            var _self = this;
            if(a.msgType!='EVENT_RESULT') {
                clearTimeout(_self.countDownTime);
            }
            callback = callback || function () { }
            clearInterval(_self.countDownTime)
            _self.countDownTime = setInterval(function () {
                if (time > 0) {
                    console.log(time)
                    time--
                } else {
                    clearInterval(_self.countDownTime)
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
            var r = _self._w*0.93/2
            var ao = 150/total //20-170度之间

            $('.user-list li').each(function (idx) {
                var left = _self._w/2 - r   *   Math.cos((ao*idx+20)   *   3.14   /180   )
                var top =  _self._w/2 - r   *   Math.sin((ao*idx +20)   *   3.14   /180   )
                // x1   =   x0   +   r   *   cos(ao   *   3.14   /180   ) 
                // y1   =   y0   +   r   *   sin(ao   *   3.14   /180   )
                $(this).css({
                    left: left+'px',
                    top: top+'px',
                    opacity:1
                })
            })
        },
        // 游戏界面用户样式设置
        setUserGameStyle: function () {
            var _self = this
            var total = _self.users.length
            var col = 5
            var row = parseInt((total - 4) / 2) + 1
            var center_user = total - row * 2
            var width = height = $(window).width() / col
            var styles = _self.returnUserStyle(total,row,col,width,height,center_user)

            $('.user-list li').each(function (idx) {
                var f = $(this)
                var data = styles.style[idx]
                data.width = data.height = width
                data.opacity = 1
                f.velocity(data, {
                    'duration': 800,
                    'delay': idx * 50
                })
                f.addClass(styles.className[idx])
            })
        },
        showVoteList:function(d){
            var el = $('.layerEventVoteResult')
            el.find('.title').html(d.voteTitle)
            var info = []
            for(var f = 0; f<d.maxNumbers.length; f++){
                info.push(' 【'+d.maxNumbers[f]+'】')
            }
            el.find('.info').html(info.join(',')+'号票数最多')
            var h = ''
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
                    h+='<li><b class="userNum">'+d.voteDetailList[i].voteNumberList[j]+'</b></li>'
                }
                h+='</ul> </div> </li>'
            }
            el.find('.resultList').html(h)
            animate.layerEnter(el)
        },
        account:function(d){
            var _self = this
            $('.user-list,.messageCenter,.mine').hide()
            $('.gameEnd').show()
            _self.accountInfo = {}
            _self.accountInfo = d;
        },
        mvp:function(num){
            var _self = this
            $('.gameEnd .result .userList li .user[num="'+num+'"]').closest('li').addClass('mvp')

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
            console.log(style)
            return {'style':style,'className':className}
        },

    }
});