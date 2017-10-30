需要处理的事件: msgType字段
UPDATE: 需要获取GameInfo和userInfoList
UPDATE_LEADER: 需要获取leaderInfo
DEAD: 该玩家挂了,黑屏,不在接受事件 除了gameover
EVENT_GAMEOVER: 游戏结束 获取gameResult字段 TODO
EVENT: 游戏事件,需要获取eventInfo
EVENT_RESULT: 游戏事件返回结果,需要获取eventResultInfo

{
    "boxInfo": {
        "boxName": "setBoxName",
        "feature": "setFeature",
        "level": 2
    },
    "eventInfo": {
        "chooseCount": 1,
        "eventDesc": "选择一位玩家查验身份",
        "eventName": "预言家验人",
        "eventSurplusTime": 60,
        "eventType": "EVENT_SEER",
        "targetNumbers": [
            1,
            3,
            5
        ],
        "unifyFlag": null,
        "witchStatusEnum": null
    },
    "eventResultInfo": null,
    "gameInfo": {
        "gameStatus": "EXILE_VOTE",
        "gameStatusStr": "放逐投票",
        "gameTime": 2,
        "nightFlag": false,
        "voteInfoList": [
            {
                "lastFlag": null,
                "voteDetailList": [
                    {
                        "voteNumberList": [
                            1,
                            3,
                            5
                        ],
                        "votedNumber": 2
                    },
                    {
                        "voteNumberList": [
                            2,
                            4
                        ],
                        "votedNumber": 5
                    }
                ],
                "voteTitle": null,
                "voteType": null
            }
        ],
        "voteShowType": "LAST"
    },
    "identityInfoList": [
        {
            "cost": 10,
            "identityId": 1,
            "name": "平民"
        },
        {
            "cost": 15,
            "identityId": 2,
            "name": "狼人"
        },
        {
            "cost": 20,
            "identityId": 4,
            "name": "女巫"
        }
    ],
    "leaderInfo": {
        "leaderButton": [
            "SPEAK_END"
        ],
        "leaderFlag": true
    },
    "msgType": "CUR_GAME_STATUS",
    "personalInfo": {
        "campaignFlag": null,
        "consumptionScore": 100,
        "headImgUrl": "UserInfo",
        "identityId": 1,
        "identityName": "平民",
        "identityStatus": "SURVIVAL",
        "likeTime": 1,
        "loverNumber": null,
        "mvpTime": 10,
        "nickName": "UserInfo",
        "number": 2,
        "sergeantFlag": true,
        "sex": 1,
        "signature": "UserInfo",
        "stage": 2,
        "star": 3,
        "userId": 101,
        "vipLevel": 1
    },
    "screeningInfo": {
        "combinationConfigStr": "女巫 猎人 守卫",
        "combinationName": "守卫vs白狼王",
        "playerCount": 12
    },
    "showMsg": "showMsg",
    "showMsgExt": null,
    "statusResponse": {
        "code": "OK",
        "msg": null,
        "requestUrl": null,
        "retcode": 0
    },
    "userInfoList": [
        {
            "campaignFlag": true,
            "headImgUrl": "UserInfo",
            "identityStatus": "SURVIVAL",
            "likeTime": 1,
            "mvpTime": 10,
            "nickName": "UserInfo",
            "number": 2,
            "sergeantFlag": true,
            "sex": 1,
            "signature": "UserInfo",
            "stage": 2,
            "star": 3,
            "userId": 101,
            "vipLevel": 1
        },
        {
            "campaignFlag": false,
            "headImgUrl": "aaa",
            "identityStatus": "DEAD",
            "likeTime": 1,
            "mvpTime": 10,
            "nickName": "aaa",
            "number": 2,
            "sergeantFlag": false,
            "sex": 1,
            "signature": "aaa",
            "stage": 2,
            "star": 3,
            "userId": 102,
            "vipLevel": 2
        }
    ]
}

/**gameinfo*/
    WELCOME(6, "欢迎光临"),
    START(7, "游戏开始"),
    PLAYING(2, "游戏进行中"), // 只是判断游戏是否结束
    READY_ROB_IDENTITY(8, "准备抢身份"),// 抢身份
    ROB_IDENTITY(3, "开始抢身份"),// 抢身份
    LOOK_IDENTITY(4, "查看身份"),// 查看身份
    DARK(5, "天黑请闭眼"),// 晚上开始
    // 夜间活动3-50
    ROBBER(13, "盗贼活动"),//盗贼
    MIXED(14, "混混活动"), //混混
    CUPID(15, "丘比特活动"),//丘比特
    LOVER(16, "情侣活动"),//情侣
    MAGICIAN(17, "魔术师活动"),//魔术师
    SAVIOR(18, "守卫活动"),//守卫
    WEREWOLF(19, "狼人活动"),//狼人
    DEVIL(20, "恶魔活动"),//恶魔
    WOLF_BEAUTY(21, "狼美人活动"),//狼美人
    SEER(22, "预言家活动"),//预言家
    WITCH(23, "女巫活动"),//女巫
    HUNTER(24, "猎人活动"),//猎人
    SHUTUP(25, "禁言长老活动"),//禁言长老
    NINE(26, "九尾活动"),//九尾

    // 白天活动51-90
    CAMPAIGN_SERGEANT(51, "竞选警长"),// 竞选警长
    CHANGE_SERGEANT(52, "移交警长"),// 移交警长
    CAMPAIGN_SPEAK(53, "竞选警长发言"),// 竞选发言
    CAMPAIGN_VOTE(54, "竞选警长投票"),// 投票警长
    COMMON_SPEAK(55, "白天放逐发言"),// 正常发言
    EXILE_DIE_SPEAK(57, "放逐遗言"),// 放逐遗言
    DIE_SPEAK(58, "死亡遗言"),// 死亡遗言
    SELF_DESTRUCT(59, "狼人自爆"),// 狼人自爆
    LIGHT(60, "天亮了"),// 刚天亮
    LAST_NIGHT_INFO(61, "昨天情况公布"),// 公布昨天情况
    CAMPAIGN_RESULT(62, "竞选结果"),// 竞选结果
    CAMPAIGN_CONFIRM_GIVEUP(63, "竞选警长投票准备"),// 竞选发言结束,询问是否退水
    CAMPAIGN_PK_SPEAK(64, "竞选PK发言"),// 竞选pk发言,
    CAMPAIGN_PK_VOTE(65, "竞选PK投票"),// 竞选pk投票
    CAMPAIGN_OUT_PK_SPEAK(66, "竞选场外PK发言"),// 竞选场外pk发言,
    CAMPAIGN_OUT_PK_VOTE(67, "竞选场外PK投票"),// 竞选场外pk投票
    CAMPAIGN_OUT_PK_CONFIRM_GIVEUP(68, "竞选场外PK投票准备"),
    CAMPAIGN_PK_CONFIRM_GIVEUP(69, "竞选PK投票准备"),
    CHANGE_SERGEANT_RESULT(70, "移交警长结果"),
    SERGEANT_SAME(71, "警长归票"),
    EXILE_RESULT(72, "放逐结果"),
    EXILE_VOTE(74, "放逐投票"),// 放逐投票
    EXILE_PK_SPEAK(75, "放逐PK发言"),// 放逐pk发言,
    EXILE_PK_VOTE(76, "放逐PK投票"),// 放逐pk投票
    EXILE_OUT_PK_SPEAK(77, "放逐场外PK发言"),// 放逐场外pk发言,
    EXILE_OUT_PK_VOTE(78, "放逐场外PK投票"),// 放逐场外pk投票

    GAME_OVER(79, "游戏结束"),// 游戏结束
    GAME_ACCOUNT(80, "游戏结算"),// 游戏结束之后结算
    MVP_RESULT(81, "MVP结果"),// mvp结果
//    GAME_REPLAY(82, "游戏复盘"),// 游戏复盘
    SCREENING_OVER(83, "场次结束"),// 本局场次结束 真的结束

    // 游戏结束90以上
    GOOD_WIN(91, "好人阵营胜利"),
    WOLF_WIN(92, "狼人阵营胜利"),

/***eventInfo*/
    EVENT_LIKE(58),// 点赞
    EVENT_EXILE_RESULT(59),// 放逐结果
    EVENT_EXILE_PK_VOTE(60),// 放逐PK投票
    EVENT_EXILE_PK_SPEAK(61),// 放逐PK发言
    EVENT_EXILE_OUT_PK_VOTE(62),// 放逐场外PK投票
    EVENT_EXILE_OUT_PK_SPEAK(63),// 放逐场外PK投票
    EVENT_CAMPAIGN_PK_CONFIRM_GIVEUP(64),// pk退水询问
    EVENT_CAMPAIGN_PK_SPEAK(65),// pk发言
    EVENT_CAMPAIGN_PK_VOTE(66),// pk投票警长
    EVENT_CAMPAIGN_OUT_PK_CONFIRM_GIVEUP(63),// 场外pk退水询问
    EVENT_CAMPAIGN_OUT_PK_SPEAK(67),// 场外pk发言
    EVENT_CAMPAIGN_OUT_PK_VOTE(68),// 场外投票警长
    EVENT_CAMPAIGN_CONFIRM_GIVEUP(69),// 竞选发言结束,询问是否退水
    EVENT_CAMPAIGN_GIVEUP(70),// 退水
    EVENT_CAMPAIGN_RESULT(71),// 竞选结果
    EVENT_LAST_NIGHT_INFO(72),// 公布昨晚情况
    EVENT_LIGHT(73),// 天亮
    EVENT_CAMPAIGN_SERGEANT(74),// 竞选警长
    EVENT_CHANGE_SERGEANT(75),// 移交警长
    EVENT_CAMPAIGN_SPEAK(76),// 竞选发言
    EVENT_CAMPAIGN_VOTE(77),// 投票警长
    EVENT_COMMON_SPEAK(78),// 正常发言
    EVENT_EXILE_VOTE(79),// 放逐投票
    EVENT_EXILE_DIE_SPEAK(80),// 放逐遗言
    EVENT_SELF_DESTRUCT(81),// 狼人自爆
    EVENT_GAME_OVER(82),// 游戏结束
    EVENT_AGAIN(83),// 游戏结束,调起扫码进入下一次游戏
    EVENT_DIE_SPEAK(84),// 死亡遗言
    EVENT_SHOOT(85),// 猎人或者狼王开枪
    EVENT_WHITE_SHOOT(86),// 白狼王开枪
    EVENT_CHANGE_SERGEANT_RESULT(87),// 移交警长结果
    EVENT_SERGEANT_SAME(87),// 警长归票
    EVENT_GAME_ACCOUNT(88),// 游戏结束之后结算
    EVENT_MVP_RESULT(89),// mvp结果
    EVENT_GAME_REPLAY(90),// 游戏复盘
    EVENT_SCREENING_OVER(91),// 本局场次结束 真的结束


存活状态取值:  （identityStatus） 
SURVIVAL(0), // 存活
    SHUTUP(1), // 禁言
    IDIOT(2), // 白痴翻牌
    DEAD(51),// 死亡
    LOVE_DEAD(54), // 殉情
    EXILE(55), // 放逐
    SHOOT(56), // 开枪带走
    SELF_DESTRUCT(57), // 自爆
    BOMBERMAN(58), //炸弹人
    IDIOT_TIMEOUT(59); //白痴超时死亡

女巫：
PAPA(0), // 双药
SAVE(1), // 解药
POISON(2),// 毒药
RUBBISH(3);// 无药



自爆按钮显示 狼人(2),白狼王(8),狼王(7):  
以下状态显示:
LIGHT 
LAST_NIGHT_INFO
CAMPAIGN_SERGEANT
CAMPAIGN_CONFIRM_GIVEUP
CAMPAIGN_SPEAK
CAMPAIGN_PK_CONFIRM_GIVEUP
CAMPAIGN_PK_SPEAK
CAMPAIGN_OUT_PK_CONFIRM_GIVEUP
CAMPAIGN_OUT_PK_SPEAK
COMMON_SPEAK
SERGEANT_SAME
DIE_SPEAK


普通狼人:自爆 不选择目标 EVENT_SELF_DESTRUCT
白狼王:自爆 选择目标 带走 EVENT_WHITE_SHOOT  
自爆之后直接天黑离场


{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"QUEUE","leaderInfo":{"leaderFlag":true,"leaderButton":[]},"boxInfo":{"boxName":"ggg"},"userInfoList":[{"userId":101,"nickName":"aaa","number":1,"sex":1,"stage":1,"star":1},{"userId":102,"nickName":"bbb","number":2,"stage":1,"star":1},{"userId":103,"nickName":"ccc","number":3,"stage":1,"star":1},{"userId":104,"nickName":"ddd","number":4,"stage":1,"star":1},{"userId":105,"nickName":"eee","number":5,"stage":1,"star":1},{"userId":106,"nickName":"fff","number":6,"stage":1,"star":1},{"userId":107,"nickName":"ggg","number":7,"stage":1,"star":1},{"userId":108,"nickName":"xxx","number":8,"stage":1,"star":1},{"userId":109,"nickName":"zzz","number":9,"stage":1,"star":1}],"screeningInfo":{"combinationConfigStr":"预言家 女巫 猎人 守卫 白痴 白狼王","combinationName":"什么都有","playerCount":12},"personalInfo":{"userId":101,"nickName":"aaa","number":1,"sex":1,"stage":1,"star":1,"consumptionScore":946}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"UPDATE","showMsg":"欢迎光临遇见狼人杀俱乐部"}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"UPDATE","gameInfo":{"gameStatus":"READY_ROB_IDENTITY","gameStatusStr":"准备抢身份"}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"UPDATE","identityInfoList":[{"identityId":3,"name":"预言家","cost":1},{"identityId":4,"name":"女巫","cost":1},{"identityId":5,"name":"猎人","cost":1}],"gameInfo":{"gameStatus":"ROB_IDENTITY","gameStatusStr":"开始抢身份"}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"EVENT_RESULT","eventResultInfo":{"eventType":"EVENT_IDENTITY_PURCHASE_OK","resultSurplusTime":0}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"UPDATE","gameInfo":{"gameStatus":"LOOK_IDENTITY","gameStatusStr":"查看身份"},"personalInfo":{"identityName":"猎人","identityId":5}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"EVENT_START"}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"UPDATE","gameInfo":{"nightFlag":true,"gameTime":1,"gameStatus":"DARK","gameStatusStr":"天黑请闭眼"}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"EVENT","eventInfo":{"eventType":"EVENT_HUNTER","eventName":"猎人上膛","eventDesc":"猎人,如果你天亮后死亡,你'可以'开枪.","chooseCount":0,"eventSurplusTime":6}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"UPDATE","gameInfo":{"nightFlag":true,"gameTime":2,"gameStatus":"LIGHT","gameStatusStr":"天亮了"}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"UPDATE","gameInfo":{"gameStatus":"LAST_NIGHT_INFO","gameStatusStr":"昨天情况公布"},"showMsg":"昨天晚上是,平安夜"}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"UPDATE","userInfoList":[],"gameInfo":{"gameStatus":"COMMON_SPEAK","gameStatusStr":"白天放逐发言"},"showMsg":"从'1'号玩家开始,'顺'序发言.发言结束后,由当前存活最小号:1号玩家在手机上点击发言结束.1->2->3->4->6->7"}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"UPDATE_LEADER","leaderInfo":{"leaderFlag":true,"leaderButton":["SPEAK_END"]}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"EVENT","eventInfo":{"eventType":"EVENT_WEREWOLF","eventName":"狼刀","eventDesc":"选择一位玩家刀掉,所有狼人必须统一意见,否则视为空刀.","chooseCount":1,"unifyFlag":true,"eventSurplusTime":10}}




























































