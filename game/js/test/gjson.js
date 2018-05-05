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
    data.body = '{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"QUEUE","leaderInfo":{"leaderFlag":true,"leaderButton":[]},"boxInfo":{"boxName":"ggg"},"userInfoList":[{"userId":101,"nickName":"aaa","number":1,"sex":1,"stage":1,"star":1},{"userId":102,"nickName":"bbb","number":2,"stage":1,"star":1},{"userId":103,"nickName":"ccc","number":3,"stage":1,"star":1},{"userId":104,"nickName":"ddd","number":4,"stage":1,"star":1},{"userId":105,"nickName":"eee","number":5,"stage":1,"star":1},{"userId":106,"nickName":"fff","number":6,"stage":1,"star":1},{"userId":107,"nickName":"ggg","number":7,"stage":1,"star":1},{"userId":108,"nickName":"xxx","number":8,"stage":1,"star":1},{"userId":109,"nickName":"zzz","number":9,"stage":1,"star":1}],"screeningInfo":{"combinationConfigStr":"预言家 女巫 猎人 守卫 白痴 白狼王","combinationName":"什么都有","playerCount":9},"personalInfo":{"userId":101,"nickName":"aaa","number":1,"sex":1,"stage":1,"star":1,"consumptionScore":946}}'
    game.socketCallback(data)

    setTimeout(function(){
        console.log("2222")
        data.body = '{"statusResponse":{"retcode":0,"code":"OK"},"msgType":"UPDATE","gameInfo":{"nightFlag":true,"gameTime":1,"gameStatus":"DARK","gameStatusStr":"天黑请闭眼"}}'
        game.socketCallback(data)
    },2000)

});