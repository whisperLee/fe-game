/**
 * Created by nielinlin on 2017/9/16.
 */
new Vue({
    el: '#end',
    data: {
    },
    created: function () {
        var _self = this
        _self.check_in()
    },
    methods: {
        check_in: function () {
            var _self = this
            var shopId = global.urlHash().shopId || 0
            var d = {
                url: 'game/play/checkin',
                data: {shopId: shopId},
                success: function (d) {
                    if (d.status.code === 'OK') {
                        global.pop_tips('签到成功')
                    } else {
                        global.pop_tips('签到失败，请重新扫码签到！',global.saoyisao)

                    }
                }
            }
            global.ajax(d)
        }
    }
});