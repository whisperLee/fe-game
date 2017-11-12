/**
 * Created by nielinlin on 2017/11/12.
 */

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

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"EVENT","eventInfo":{"eventType":"EVENT_SEER","eventName":"预言家验人","eventDesc":"选择一位玩家查验其身份.","chooseCount":1,"eventSurplusTime":6}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"EVENT","eventInfo":{"eventType":"EVENT_WITCH","witchStatusEnum":"PAPA","eventName":"女巫救人/毒人","eventDesc":"昨天狼队空刀,是否使用毒药,要毒谁?","chooseCount":1,"eventSurplusTime":6}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"EVENT","eventInfo":{"eventType":"EVENT_SAVIOR","eventName":"守卫护盾","eventDesc":"选择一位玩家守护,保证其中刀不死.","chooseCount":1,"eventSurplusTime":6}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"UPDATE_AND_EVENT","gameInfo":{"gameStatus":"EXILE_VOTE","gameStatusStr":"放逐投票"},"eventInfo":{"eventType":"EVENT_EXILE_VOTE","eventName":"放逐投票","eventDesc":"请选择你要放逐的玩家.","chooseCount":1,"eventSurplusTime":10}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"UPDATE_LEADER","leaderInfo":{"leaderFlag":true,"leaderButton":["EMPTY"]}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"EVENT_RESULT","eventResultInfo":{"eventDesc":"你决定弃票.","targetNumber":"0","resultSurplusTime":3}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"UPDATE","gameInfo":{"gameStatus":"EXILE_RESULT","gameStatusStr":"放逐结果","voteInfoList":[{"voteTitle":"放逐投票","voteDetailList":[{"votedNumber":0,"voteNumberList":[1,2,3,4,6,7,9]}]}],"voteShowType":"LAST"},"showMsg":"所有玩家都弃票,今天没有人被放逐."}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"EVENT_RESULT","eventResultInfo":{"eventType":"EVENT_WEREWOLF","eventDesc":"狼队,你们今晚刀掉的是'4'号,狼人请闭眼.","targetNumber":"4"}}


{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"EVENT_RESULT","eventResultInfo":{"eventDesc":"女巫,你放弃了操作.","targetNumber":"0","resultSurplusTime":3}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"UPDATE_AND_EVENT","userInfoList":[{"number":7,"identityStatus":"DEAD"}],"gameInfo":{"gameStatus":"CHANGE_SERGEANT","gameStatusStr":"移交警长"},"eventInfo":{"eventName":"移交警徽","eventDesc":"请选择一位玩家将警徽移交给他.","chooseCount":1}}

{"statusResponse":{"retcode":2001,"code":"WebSocketError","msg":"当前不是发言阶段,不能结束发言.","requestUrl":"/gameUser/receiveUserEvent"},"msgType":"EVENT_OK"}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"EVENT_RESULT","eventResultInfo":{"eventDesc":"你要放逐3号玩家.","targetNumber":"3","resultSurplusTime":3}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"UPDATE","gameInfo":{"gameStatus":"EXILE_RESULT","gameStatusStr":"放逐结果","voteInfoList":[{"voteTitle":"放逐投票","voteDetailList":[{"votedNumber":3,"voteNumberList":[1]},{"votedNumber":0,"voteNumberList":[2,3,4,6,7,9]}]}],"voteShowType":"LAST"},"showMsg":"3号玩家被放逐.投票详情可以在手机上查看."}


{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"EVENT","gameInfo":{"nightFlag":false,"gameTime":1,"gameStatus":"CAMPAIGN_SERGEANT","gameStatusStr":"竞选警长"},"eventInfo":{"eventType":"EVENT_CAMPAIGN_SERGEANT","eventName":"警长竞选","eventDesc":"准备竞选警长,请选择是否参选.","chooseCount":0,"eventSurplusTime":10}}


{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"EVENT_RESULT","eventResultInfo":{"eventDesc":"你选择了上警.","resultSurplusTime":3}}


{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"UPDATE","userInfoList":[{"number":1,"campaignFlag":true},{"number":2,"campaignFlag":true},{"number":7,"campaignFlag":true}],"gameInfo":{"gameStatus":"CAMPAIGN_SPEAK","gameStatusStr":"竞选警长发言"},"showMsg":"1号,2号,7号玩家参与竞选.请从'2'号玩家开始,'逆'序发言.2->1->7"}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"EVENT","eventInfo":{"eventType":"EVENT_SAVIOR","eventName":"守卫护盾","eventDesc":"选择一位玩家守护,保证其中刀不死.","chooseCount":1,"eventSurplusTime":6}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"EVENT_RESULT","eventResultInfo":{"eventDesc":"守卫,你守护的是'3'号,守卫请闭眼.","targetNumber":"3","resultSurplusTime":3}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"EVENT_RESULT","eventResultInfo":{"eventDesc":"守卫,你守护的是'4'号,守卫请闭眼.","targetNumber":"4","resultSurplusTime":3}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"EVENT","gameInfo":{"nightFlag":false,"gameTime":1,"gameStatus":"CAMPAIGN_SERGEANT","gameStatusStr":"竞选警长"},"eventInfo":{"eventType":"EVENT_CAMPAIGN_SERGEANT","eventName":"警长竞选","eventDesc":"准备竞选警长,请选择是否参选.","chooseCount":0,"eventSurplusTime":10}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"UPDATE","userInfoList":[{"userId":107,"number":7,"sergeantFlag":true,"campaignFlag":false}],"gameInfo":{"gameStatus":"CAMPAIGN_RESULT","gameStatusStr":"竞选结果"},"showMsg":"只有7号玩家参选,'7'号玩家自动当选警长.拥有1.5票归票权."}


{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"UPDATE","userInfoList":[{"number":7,"identityStatus":"DEAD"}],"gameInfo":{"gameStatus":"CHANGE_SERGEANT","gameStatusStr":"移交警长"}}



{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"EVENT","eventInfo":{"eventType":"EVENT_SEER","eventName":"预言家验人","eventDesc":"选择一位玩家查验其身份.","chooseCount":1,"eventSurplusTime":6}}


{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"UPDATE","userInfoList":[{"number":3,"identityStatus":"DEAD"}],"gameInfo":{"gameStatus":"COMMON_SPEAK","gameStatusStr":"白天放逐发言"},"personalInfo":{"buttons":["SELF_DESTRUCT"]},"showMsg":"遗言结束.请3号玩家灭灯.从死右开始发言.发言结束后,由当前存活最小号:1号玩家在手机上点击发言结束."}


{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"UPDATE","gameInfo":{"gameStatus":"CAMPAIGN_VOTE","gameStatusStr":"竞选警长投票"},"personalInfo":{"buttons":["EMPTY"]},"eventInfo":{"eventType":"EVENT_CAMPAIGN_VOTE","eventName":"警长投票","eventDesc":"请选择你心目中的警长玩家.","chooseCount":1,"eventSurplusTime":10,"targetNumbers":[1,6]}}

{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"DEAD","showMsg":"你死在夜里..."}
