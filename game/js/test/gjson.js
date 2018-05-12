/**
 * Created by nielinlin on 2018/5/5.
 */
$(function(){
    game.active()
    var el = $('.layer')
    var el = $('.layerShenfen')
    var el = $('.layerEventVoteResult')
    var el = $('.layerUserInfo')
    var el = $('.layerEventVoteResult')
    //var el = $('.layerDead')
    //animate.layerEnter(el)
    var data = {}
//      game.users = [
//          {userId:101,nickName:"aaa",number:1,stage:1,star:1},
//          {userId:102,nickName:"bbb",number:2,stage:1,star:1},
//          {userId:103,nickName:"ccc",number:3,stage:1,star:1},
//          {userId:104,nickName:"ddd",number:4,stage:1,star:1},
//          {userId:105,nickName:"eee",number:5,stage:1,star:1},
//          {userId:106,nickName:"fff",number:6,stage:1,star:1},
//          {userId:107,nickName:"ggg",number:7,stage:1,star:1},
//          {userId:108,nickName:"xxx",number:8,stage:1,star:1},
//          {userId:109,nickName:"zzz",number:9,stage:1,star:1},
//          {userId:110,nickName:"ggg",number:7,stage:1,star:1},
//          {userId:111,nickName:"xxx",number:8,stage:1,star:1},
//          {userId:112,nickName:"zzz",number:9,stage:1,star:1}]
    //data.body = '{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"QUEUE","leaderInfo":{"leaderFlag":true,"leaderButton":[]},"boxInfo":{"boxName":"遇见未来"},"userInfoList":[{"userId":401,"nickName":"401","number":1,"deadFlag":false,"identityStatus":"SURVIVAL","stage":1,"star":1},{"userId":402,"nickName":"402","number":2,"deadFlag":false,"identityStatus":"SURVIVAL","stage":1,"star":1},{"userId":403,"nickName":"403","number":3,"deadFlag":false,"identityStatus":"SURVIVAL","stage":1,"star":1},{"userId":404,"nickName":"404","number":4,"deadFlag":false,"identityStatus":"SURVIVAL","stage":1,"star":1},{"userId":405,"nickName":"405","number":5,"deadFlag":false,"identityStatus":"SURVIVAL","stage":1,"star":1},{"userId":406,"nickName":"406","number":6,"deadFlag":false,"identityStatus":"SURVIVAL","stage":1,"star":1}],"screeningInfo":{"combinationConfigStr":"预言家 女巫 猎人 守卫 白痴 魔术师 盗贼 丘比特 狼王 白狼王","combinationName":"什么都有","playerCount":15},"personalInfo":{"userId":401,"nickName":"401","number":1,"sergeantFlag":false,"campaignFlag":false,"deadFlag":false,"identityStatus":"SURVIVAL","stage":1,"star":1,"consumptionScore":100,"buttons":[]}}'
    data.body = '{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"CUR_GAME_STATUS","leaderInfo":{"leaderFlag":true,"leaderButton":[]},"boxInfo":{"boxName":"遇见未来"},"userInfoList":[{"userId":401,"nickName":"401","number":1,"deadFlag":false,"identityStatus":"SURVIVAL","stage":1,"star":1}],"screeningInfo":{"combinationConfigStr":"预言家 女巫 猎人 守卫 白痴 魔术师 盗贼 丘比特 狼王 白狼王","combinationName":"什么都有","playerCount":15},"gameInfo":{"nightFlag":false,"gameTime":0,"gameStatus":"LOOK_IDENTITY","gameStatusStr":"查看身份"},"personalInfo":{"userId":401,"nickName":"401","number":1,"sergeantFlag":false,"campaignFlag":false,"identityName":"平民","identityId":1,"deadFlag":false,"identityStatus":"SURVIVAL","stage":1,"star":1,"consumptionScore":100,"buttons":[]}}'
    game.socketCallback(data)

    // setTimeout(function(){
    //     console.log("2222")
    //     data.body = '{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"UPDATE","gameInfo":{"nightFlag":true,"gameTime":1,"gameStatus":"DARK","gameStatusStr":"天黑请闭眼"}}'
    //     game.socketCallback(data)
    // },2000)

});