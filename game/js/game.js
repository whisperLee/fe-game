/**
 * Created by nielinlin on 2017/9/16.
 */
Vue.component('user',component.user)
Vue.component('usermine',component.usermine)
Vue.component('userinfo',component.userinfo)
Vue.component('userwin',component.user)
Vue.component('userlose',component.user)
Vue.component('userend',component.userend)
// Vue.component('qiangshenfen', component.qiangshenfen)
// Vue.component('identitylayer', component.identitylayer)

var game = new Vue({
    el: '#game',
    data :{
        queueFlow: 0, // 0是入座，1是游戏准备，2是入座完成，3是抢身份
        screeningId: 0,
        leaderFlag: 0,
        leaderButton:[],
        personalButton:[],
        users: [],
        mine: { },
        userinfo:{},//查看用户个人信息
        lookOverIdentity:0,//判定用户是否已经查看身份
        screenCenterMessage: {
            gameTime:0,
            nightFlag: -1,
            gameStatusStr:'',
            result:''
        },
        accountInfo:{},
        personalAccountInfo:{},
        myAccountInfo:{}
    },
    created: function () {
        var _self = this
        console.log('页面开始:' + new Date())
        _self.sit()
        setTimeout(function(){_self.active()},100)
    },
    methods: {
        // 入座
        sit: function () {
            var _self = this
            _self.boxId = global.urlHash().boxId || 0
            _self.gameNumber = global.urlHash().gameNumber || 0

            var d = {
                url: 'game/play/sit',
                data: {
                    boxId: _self.boxId,
                    gameNumber: _self.gameNumber
                    // userToken: '10' + _self.gameNumber // 105-120
                },
                success: function (d) {
                    if (d.status.code === 'OK') {
                        console.log('入座成功:' + new Date())
                        _self.queueFlow = 1
                        _self.leaderFlag = d.data.leaderFlag
                        _self.screeningId = d.data.screeningId
                        _self.userId = d.data.userId
                        if (d.data.leaderFlag && !d.data.screeningId) {
                            global.router('gameSet.html?boxId=' + _self.boxId + '&gameNumber='+_self.gameNumber +'&event=add')
                        } else {
                            _self.connectWebScoket()
                        }
                    } else if (d.status.retcode === 1003) {
                        global.pop_tips('您还没有签到， 稍后为您跳转到签到页面', function () {
                            global.router('check.html')
                        })
                    } else if (d.status.retcode === 1008) {
                        // 状态是通过开始游戏按钮进入游戏时，传递gameNumber=0，如果没有任何游戏状态则调取二维码功能
                        global.pop_tips('请打开微信扫一扫功能， 扫描座位上二维码， 即可开始游戏', function () {
                            global.saoyisao()
                        })
                    } else {
                        global.pop_tips(d.status.msg)
                    }
                }
            }
            global.ajax(d)
            console.log('入座')
        },
        // 离座
        quitSeat: function () {
            var _self = this
            var d = {
                url: 'game/play/quitSeat',
                data: {},
                success: function (d) {
                    if (d.status.code === 'OK') {
                        global.pop_tips('退座成功', function () {
                            global.saoyisao()
                        })
                    } else {
                        global.pop_tips(d.status.msg)
                    }
                }
            }
            global.ajax(d)

        },
        // 修改游戏配置
        modifyGameSet: function () {
            var _self = this
            global.router('gameSet.html?boxId=' + _self.boxId + '&gameNumber='+_self.gameNumber + '&screeningId=' + _self.screeningId + '&event=modify')
        },
        // 连接websocket
        connectWebScoket: function () {
            var _self = this
            console.log('websocket开始:' + new Date())
            websocket.connect(_self, _self.boxId, _self.userId, _self.socketCallback)
        },
        // socket 接收方法
        socketCallback: function (data) {
            var _self = this
            console.log('得到返回数据:' + new Date())
            var d = JSON.parse(data.body)

            _self.gameEvent = d.msgType
            // 队列
            if (d.msgType === 'QUEUE') {
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
        eventInfo:function(info){
            var _self = this
            var e = info.eventType
            var count = info.chooseCount
            var el

            if(e == 'EVENT_WITCH'){// 特殊事件----女巫
                el = $('.layerEventWitch')
                if(info.witchStatusEnum == 'PAPA'){
                    el.find('.btn[event="EVENT_SAVE"]').show()
                    el.find('.btn[event="EVENT_POISON"]').show()
                    $('.user-list').addClass('choosing')//?????
                }else if(info.witchStatusEnum == 'SAVE'){
                    el.find('.btn[event="EVENT_SAVE"]').show()
                    el.find('.btn[event="EVENT_POISON"]').hide()
                    $('.user-list').addClass('choosing')//?????
                }else if(info.witchStatusEnum == 'POISON'){
                    el.find('.btn[event="EVENT_SAVE"]').hide()
                    el.find('.btn[event="EVENT_POISON"]').show()
                    $('.user-list').addClass('choosing')//?????
                }
            }else{ // 其它事件
                if(count==-1){
                    el = $('.layerEventKnow')
                }else if(count==0){
                    el = $('.layerEventDecide')
                    if(e == 'EVENT_CAMPAIGN_SERGEANT'){ // 特殊事件---警长精选
                        el.find('.btn[type="yes"]').html('竞选')
                        el.find('.btn[type="no"]').html('放弃')
                    }else{
                        el.find('.btn[type="yes"]').eq(0).html('是')
                        el.find('.btn[type="no"]').eq(0).html('否')
                    }
                }else if(count>0){
                    el = $('.layerEventChoose')
                    var h = ''
                    for(var i=0;i<info.chooseCount;i++){
                        h+='<li class="unchoose"></li>'
                    }
                    el.find('.content ul').html(h)
                    $('.user-list').addClass('choosing')
                }
            }
            _self.setEventLayer(el,info)
        },
        setEventLayer:function(el,info){
            var _self = this
            info.eventName && el.find('.title').html(info.eventName)
            info.eventDesc && el.find('.info').html(info.eventDesc)
            $('.user-list .canVote').removeClass('canVote')
            if(global.isExit(info.targetNumbers) && info.targetNumbers.length>0 ){
                for(var i=0;i<info.targetNumbers.length;i++){
                    $('.user-list li .user[num="'+info.targetNumbers[i]+'"]').addClass('canVote')
                }
            }else{
                $('.user-list li .user').each(function(){
                    if(!$(this).attr('dead')){
                        $(this).addClass('canVote')
                    }
                })
            }
            if(info.eventType=='EVENT_SHOOT' || info.eventType=='EVENT_WHITE_SELF_DESTRUCT'){ //猎人开抢带走和白狼王自爆的时候不能选择自己
                $('.user-list li .user[num="'+_self.mine.number+'"]').removeClass('canVote')
            }

            el.attr('event',info.eventType)
            if(info.eventSurplusTime){
                animate.layerEnter(el,info.eventSurplusTime)
            }else{
                animate.layerEnter(el)
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
                    for(var i=0; i<_self.users[i];i++){
                        if(_self.users[i].campaignFlag){
                            _self.users[i].campaignFlag = false
                        }
                    }
                }
                for(var i=0;i<d.userInfoList.length; i++){
                    var num = d.userInfoList[i].number
                    _self.users[num-1] =  $.extend({}, _self.users[num-1], d.userInfoList[i])
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
        // 设置用户状态
        setUser: function (d) {
            var _self = this
            _self.users = []
            var total = (d.screeningInfo && d.screeningInfo.playerCount) || 15

            for (var k = 0; k < total; k++) {
                _self.users.push({
                    userId: '10' + k,
                    number: k + 1,
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
            var col = 4
            var row = Math.ceil(total / col)
            var userW = $(window).width() / col
            $('.user-list').css({
                'height': row * userW
            })
            $('.user-list li').each(function (idx) {
                $(this).css({
                    width: userW,
                    height: userW,
                    opacity: 1,
                    left: parseInt(idx % col) * userW,
                    top: parseInt(idx / col) * userW
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

            $('.readyTitle').velocity({
                height: 0,
                opacity: 0
            }, {
                'duration': 500,
                'complete': function () {
                    $('.readyTitle').remove()
                }
            })
            $('.queueBtns').velocity({
                height: 0,
                opacity: 0
            }, {
                'duration': 100,
                'complete': function () {
                    $('.queueBtns').remove()
                }
            })

            $('.user-list').velocity({
                height: row * width
            }, 500)
            $('.messageCenter').css({'top':width+'px'})

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
        // 开始游戏
        startGame: function () {
            var _self = this
            websocket.userStartGame()

        },
        showQiang:function(d){
            var _self = this
            var h = ''
            var className = ''
            for(var i=0;i<d.length;i++){
                className = _self.mine.consumptionScore < d[i].cost?'no':''
                h+='<li identityid="'+d[i].identityId+'" name="'+d[i].name+'" class="'+className+'"><div class="shenfen shenfen'+d[i].identityId+'"></div><div class="price">'+d[i].cost+'</div></li>'
            }
            $('.qiang .shenfens').html(h)

            _self.qiangStart()
        },
        qiangStart: function (){
            var _self = this
            var el = $('.qiang')
            $('.simple_tips').remove()
            el.show()
            el.find('.title').html('准备抢身份')
            $('.qiang .shenfens li').each(function(idx){
                var el = $(this)
                el.velocity({
                    translateX:[0,(1-idx)*100+'%']
                },{
                    duration: 500,
                    easing: 'ease-in-out',
                    complete: function () {
                        animate.fanzhuan(el,function () {
                            el.find('.shenfen').addClass('on')
                        },function () {
                            _self.qiangSf(el)
                        })
                    }
                });

            })
            setTimeout(function (){
                el.find('.title').html('请选择你想要的身份')
                // 倒计时
                global.countDown(5, $('.countDown'),function () {},function () {
                    console.log('qiangsubmit')
                    _self.submitQiang()
                })
            },500)
        },
        qiangSf: function (el) {
            var _self = this;
            el.on('click', function () {
                if(el.hasClass('no')){
                    alert('您的玉米不够，请选择其它身份')
                }else{
                    _self.submitQiang(el)
                }
            })
        },
        submitQiang: function (el) {
            var _self = this;
            $('.shenfens li').off('click')
            if(el){ // 选择身份
                global.countDownStop()
                _self.title = '您选择的身份是：' + el.attr('name')
                //未选择身份置灰，缩小
                el.siblings().each(function () {
                    $(this).addClass('unselect')
                    animate.scale($(this),0.5)
                })
                // 选择的身份放大
                el.addClass('select')
                animate.scale(el,1.2)
                websocket.userChooseIdentity({identityId:el.attr('identityId')})
            }else{ // 未选择身份
                _self.title = '您没有选择任何身份'
                $('.shenfens li').each(function () {
                    var el = $(this)
                    animate.fanzhuan(el,function () {
                        el.find('.shenfen').removeClass('on')
                    })
                })
            }
        },
        showSF: function () {
            var _self = this
            if($('.qiang').length>0){ // 抢身份结束后查看身份
                $('.shenfens li').each(function (idx) {
                    var el = $(this)
                    el.velocity(
                        {
                            translateX:[(1-idx)*100+'%',0],
                            scale: 0,
                            opacity: 0
                        },
                        {
                            duration:400,
                            easing: 'ease-in-out',
                            complete: function () {
                                $('.qiang').hide()
                            }
                        }
                    )
                })
                var initStyle={
                    width:0,
                    height:0,
                    left:'50%',
                    top:'50%',
                    display:'block',
                    opacity: 1
                };
            }else{ // 其它时间查看身份
                var btn = $('.mine .btn.identity')
                if($('.mine .btn.identity').length>0){
                    var initStyle={
                        width: btn.width(),
                        height: btn.height(),
                        left: btn.offset().left,
                        top: btn.offset().top,
                        display:'block',
                        opacity: 0
                    };
                }else{
                    var initStyle={
                        width: 0,
                        height: 0,
                        left: 0,
                        top: $('.main').height(),
                        display:'block',
                        opacity: 0
                    };
                }
            }
            animate.sfLayerInter($('.layerShenfen'),initStyle);
        },
        // event 事件提交websocket
        userEventSubmit:function(el,n,notOuter){
            if(!notOuter){
                animate.layerOuter(el)
            }
            var data = {
                targetNumberList:n,
                eventType:el.attr('event')
            }
            console.log(JSON.stringify(data))
            websocket.receiveUserEvent(data)
        },
        // 提交用户事件选择 --选人
        userEventForUserChoose: function(el){
            var _self = this
            var num = []
            el.find('.user').each(function(){
                num.push($(this).attr('num'))
            })
            $('.user-list').removeClass('choosing')
            _self.userEventSubmit(el,num,1)
        },
        setLeaderBtn:function(info){
            var _self = this
            var btn = info.leaderButton
            if(btn.length==0 || btn[0]=='EMPTY'){
                _self.leaderButton = []
            }else{
                _self.leaderButton = info.leaderButton
            }
        },
        // 按钮事件
        eventForPersonalButton:function(event,idx,type){
            var _self = this
            var el = $(event.currentTarget)
            var e = el.attr('event')
            var buttonEvents = {
                'SPEAK_END':'SPEAK_END',
                'GIVE_UP':'EVENT_CAMPAIGN_GIVEUP',
                'SELF_DESTRUCT':'EVENT_SELF_DESTRUCT'
            }

            if(e == 'SELF_DESTRUCT' && _self.mine.identityId==8){
                var el = $('.layerEventChoose')
                el.find('.content ul').html('<li class="unchoose"></li>')
                var info = {
                    eventName:'白狼王自爆',
                    eventDesc:'请选择你要带走的人',
                    eventType:'EVENT_WHITE_SELF_DESTRUCT',
                    eventSurplusTime:10
                }
                _self.setEventLayer(el,info)
                
                $('.user-list').addClass('choosing')
            }else{
                if(type=='leader'){
                    _self.leaderButton.splice(idx,1);
                }else if(type=='person'){
                    _self.personalButton.splice(idx,1)
                }
                e = buttonEvents[e]
                var data = {
                    targetNumberList:null,
                    eventType:e
                }
                console.log(JSON.stringify(data))
                websocket.receiveUserEvent(data)
            }
        },
        dead:function(){
            var _self = this
            animate.layerEnter($('.layerDead'))
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
        voteMvp: function (event) {
            var el = $(event.currentTarget)
            if(el.hasClass('zan')){
                el.addClass('zaned')
                el.closest('.win').find('.zan').removeClass('zan')
                //mvp 事件提交
                var data = {
                    targetNumberList:[el.find('.user').attr('num')],
                    eventType:'EVENT_LIKE'
                }
                console.log(JSON.stringify(data))
                websocket.receiveUserEvent(data)
            }
        },
        mvp:function(num){
            var _self = this
            $('.gameEnd .result .userList li .user[num="'+num+'"]').closest('li').addClass('mvp')

        },
        userAccountChange: function(d){
            var _self = this
            var el = $('.userAccount')
            var oldPre,newPre,oldStar,old
            var _per = el.find('.pro b')

            newPre = (d.newScore-d.thisNeedScore)*100/(d.nextNeedScore-d.thisNeedScore)
            newPre = newPre*0.8+10 // 样式的问题，当前星级在整个进度条的80%，所以在*0.8之后，加上上一星级的10%
            console.log(newPre)
            if(d.changeLevelFlag){
                if(d.upFlag){
                    oldPre = 5;
                    // if(d.thisStar == 1){
                    //     // 升等
                    // }else{
                    //
                    // }
                }else{
                    oldPre = 95;
                    // if(d.thisStar == 3){
                    //     // 降等
                    // }else{
                    //
                    // }
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
                            _self.myAccountInfo = {}
                            d.showStage = d.thisStage
                            d.showStar = d.thisStar
                            d.showScore = d.newScore 
                            _self.myAccountInfo = d;
                        }
                    })
                }
            })


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
        // 用户点击
        userClick: function (item,event) {
            var _self = this
            var el = $(event.currentTarget)
            console.log(item)
            if($('.user-list').hasClass('choosing')){
                if(el.find('.user').hasClass('canVote')){
                    var li = $('.layerSixCenter.active .content ul li.unchoose')
                    if(li.length>0 || $('.layerSixCenter.active .content ul li').length==1){
                        li = li.length>0?li.eq(0):$('.layerSixCenter.active .content ul li').eq(0)
                        li.html(el.html())
                        li.find('.user').attr('style','')
                        li.find('.user').off().on('click',function(){
                            $(this).closest('li').addClass('unchoose')
                            $(this).remove()
                        })
                        li.eq(0).removeClass('unchoose')
                    }else{
                        global.pop_tips('请删除选择后再次点选')
                    }
                }else{
                     global.pop_tips('请选择正确玩家')
                }
                
            }else{
                _self.userinfo = item
                setTimeout(function(){
                    animate.layerEnter($('.layerUserInfo'))
                },10)
            }
        },
        addAtten:function(){

        },
        active:function(){
            var _self = this
            var shenfen_flow = 0
            $('.layerShenfen .btn').off().on('click',function () {
                animate.sfLayerOuter()
            })

            $('.layerShenfen .shenfen').off().on(
                'touchstart',function(){
                    // $('.layerShenfen .shenfen').off().on('touchstart',function(){
                    var el = $(this);
                    if(shenfen_flow == 0){//必须动画执行完成后才能开始查看动画
                        animate.fanzhuan(el,function () {
                            shenfen_flow = 1;
                            el.addClass('on');
                        }, function () {
                            shenfen_flow=2;
                        })
                    }
                }).on(
                'touchend',function(){
                    el = $(this);
                    if(shenfen_flow==2){ //如果已经查看完身份，则正常执行回返动画
                        animate.fanzhuan(el,function () {
                            el.removeClass('on')
                            if(!game.lookOverIdentity){
                                websocket.userLookIdentity()
                                game.lookOverIdentity = 1
                            }
                        }, function () {
                            shenfen_flow=0
                            animate.fadeIn($('.layerShenfen .btnWrap'))
                        })
                    }else{ //查看过程中终止查看
                        animate.stopAll(el) //停止正在进行的一切动画
                        if(shenfen_flow==0){ //如果还没到90度，则直接翻转回来
                            el.velocity(
                                {rotateY: '0deg'},
                                {
                                    duration:300,
                                    easing: 'ease-in-out',
                                    complete:function(){
                                        shenfen_flow=0;
                                    }
                                }
                            )
                        }else if(shenfen_flow==1){ //过了90度，查看到一部分身份牌时，需要先回转到90度，并将身份样式移除，在回转到0度
                            animate.fanzhuan(el,function () {
                                el.removeClass('on')
                                shenfen_flow=3
                            }, function () {
                                shenfen_flow=0
                            })
                        }
                    }

                }
            )

            var press_flow = 0
            $('.layer').each(function(){
                var el = $(this)
                el.find('.longPress.btn').off().on(
                    'touchstart',function(){
                    var _btn = $(this)
                    var _pro = _btn.find('.process b')
                    press_flow = 1
                    _pro.velocity({
                        width:['100%','0%']
                    },{
                        duration: 1000,
                        easing: 'linear',
                        complete: function(){

                            press_flow = 2
                            _pro.width(0)
                            _btn.addClass('state-success')
                            _btn.attr('event') && el.attr('event',_btn.attr('event'))
                            //方法提交
                            _self.userEventForUserChoose(el)
                        }
                    })
                }).on(
                    'touchend',function(){
                        var _self = $(this)
                        var _pro = _self.find('.process b')
                        if(press_flow==1){
                            animate.stopAll(_pro)
                            _pro.width(0)
                        }else{
                            animate.layerOuter(el)
                        }
                        press_flow = 0

                    })
                el.find('.js-withdraw').off().on('click',function(){
                    _self.userEventSubmit(el,[0])
                })
                el.find('.js-affirm').off().on('click',function(){
                    _self.userEventSubmit(el,null)
                })
            })

            $('.layerUserInfo .close').off().on('click',function(){
                animate.layerOuter($('.layerUserInfo'))
            })

            $('.userBtns').off().on('click',function(){
                var el = $(this)
                if(el.hasClass('active')){
                    el.removeClass('active')
                }else{
                    el.addClass('active')
                }

            })



        }
    }
});