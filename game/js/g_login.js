/**
 * Created by nielinlin on 2018/5/5.
 */
new Vue({
    el: '#g_login',
    data: {

    },
    created: function () {

    },
    methods: {
        login:function(){
            var _self = this
            var boxId = parseInt($(".boxId input").val())
            var gameNumber =  parseInt($(".gameNumber input").val())
            var code = $(".code input").val()
            if(boxId=='' || boxId<=0 || boxId>4){
                global.pop_tips('请输入正确房间号')
                return
            }
            if(gameNumber=='' || gameNumber<=0 || gameNumber>=15){
                global.pop_tips('请输入正确座位号')
                return
            }
            if(code==''){
                global.pop_tips('请输入正确验证码')
                return
            }
            var d = {
                url: 'game/client/login',
                data: {
                    string:code
                },
                success: function (d) {
                    console.log(d)
                    if (d.status.code === 'OK') {
                        global.router("game.html?boxId="+boxId+'&gameNumber='+gameNumber)
                    }else{
                        global.pop_tips(d.status.msg)
                    }
                }
            }
            global.ajax(d)
        }
    }
})

