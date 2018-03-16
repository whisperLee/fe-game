/**
 * Created by lynnenie on 2018/3/15.
 */
new Vue({
    el: '#wx_appoint',
    data: {


    },
    created: function () {
        var _self = this
        _self.init()
    },
    methods: {
        init:function(){
            var _self = this
            wglobal.footer('appoint')
        }


    }
})