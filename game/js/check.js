/**
 * Created by nielinlin on 2017/9/16.
 */
new Vue({
    el: '#game',
    data: {},
    created: function () {
        var _self = this
        var nowtimestamp=new Date().getTime()
        var urlHash = global.urlHash()
        var shopId = urlHash.shopId
        if(nowtimestamp<urlHash.timestamp){
            global.pop_tips('签到中，请稍候...')
            _self.check_in(shopId)
        }else{
            global.pop_tips('签到失败，请重新扫码签到！',function(){
                global.getConfig(['scanQRCode'],global.saoyisao)
            })
        }
    },
    methods: {
        check_in: function (shopId) {
            var _self = this
            var d = {
                url: http+':8888/web-api/v1/game/play/checkin',
                data: {shopId: shopId},
                success: function (d) {
                    if (d.status.code === 'OK') {
                        global.pop_tips('签到成功,即将为您跳转首页...',function(){global.router('wx_index.html')})
                    } else {
                        global.pop_tips('签到失败，即将为您拉取扫一扫',function(){global.getConfig(['scanQRCode'],global.saoyisao)})
                    }
                }
            }
            global.ajax(d)
        }
    }
});