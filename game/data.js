/*_DESTRUCT(81),// 狼人自爆
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


存活状态取值 (identityStatus)
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

女巫
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







{
    "statusResponse": {
    "retcode": 0,
        "code": "OK"
},
    "msgType": "UPDATE",
    "gameInfo": {
    "gameStatus": "GAME_ACCOUNT",
        "gameStatusStr": "游戏结算"
},
    "gameAccountInfo": {
    "endTime": "2017-10-23 00:52",
        "costTime": "08:02:27",
        "winUsers": [
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
        "surplusTime": 10
},
    "personalInfo": {
    "userId": 201,
        "number": 1
}
}

{
    "statusResponse": {
    "retcode": 0,
        "code": "OK"
},
    "msgType": "UPDATE",
    "gameInfo": {
    "gameStatus": "GAME_REPLAY",
        "gameStatusStr": "游戏复盘"
},
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
        "preNeedScore": 100,
        "preStar": 2,
        "preStage": 1,
        "endTime": "2017-10-23 00:53",
        "costTime": "02:48",
        "gameStatus": "GOOD_WIN",
        "gameStatusStr": "好人阵营胜利",
        "mvpFlag": false
}
}



需要处理事件

    SAVIOR(18, "守卫活动"),//守卫
    WEREWOLF(19, "狼人活动"),//狼人
    SEER(22, "预言家活动"),//预言家
    WITCH(23, "女巫活动"),//女巫  ？？？？？？？？？？？？？=======
    HUNTER(24, "猎人活动"),//猎人
    // 白天活动51-90
    CAMPAIGN_SERGEANT(51, "竞选警长"),// 竞选警长
    CHANGE_SERGEANT(52, "移交警长"),// 移交警长
    CAMPAIGN_VOTE(54, "竞选警长投票"),// 投票警长
    CAMPAIGN_CONFIRM_GIVEUP(63, "竞选警长投票准备"),// 竞选发言结束,询问是否退水 ？？？？？？？？？？？？？？
    CAMPAIGN_PK_VOTE(65, "竞选PK投票"),// 竞选pk投票  ？？？？？？？？？？
    CAMPAIGN_OUT_PK_VOTE(67, "竞选场外PK投票"),// 竞选场外pk投票  ？？？？？？？？？？？
    EXILE_VOTE(74, "放逐投票"),// 放逐投票
    EXILE_PK_VOTE(76, "放逐PK投票"),// 放逐pk投票 ？？？？？？？？？？？？？？？
    EXILE_OUT_PK_VOTE(78, "放逐场外PK投票"),// 放逐场外pk投票 ？？？？？？？？？？？？？？？
    GAME_OVER(79, "游戏结束"),// 游戏结束  ？？？？？？？？？？？？？？？
    GAME_ACCOUNT(80, "游戏结算"),// 游戏结束之后结算？？？？？？？？？？？？？？？
    MVP_RESULT(81, "MVP结果"),// mvp结果？？？？？？？？？？？？？？？
    SELF_DESTRUCT(59, "狼人自爆"),// 狼人自爆？？？？？？？？？？？？？？？
    GAME_REPLAY(82, "游戏复盘"),// 游戏复盘？？？？？？？？？？？
    SCREENING_OVER(83, "场次结束"),// 本局场次结束 真的结束

    */

