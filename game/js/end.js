/**
 * Created by nielinlin on 2017/9/16.
 */
Vue.component('userwin',component.user)
Vue.component('userlose',component.user)
new Vue({
    el: '#end',
    data: {
        userwin:[
            {"userId":101,"nickName":"aaa","number":1,"sex":1,"stage":1,"star":1,"personalInfo":{"identityName":"猎人","identityId":5}},
            {"userId":102,"nickName":"bbb","number":2,"stage":1,"star":1,"personalInfo":{"identityName":"猎人","identityId":5}},
            {"userId":103,"nickName":"ccc","number":3,"stage":1,"star":1,"personalInfo":{"identityName":"猎人","identityId":5}},
            {"userId":104,"nickName":"ddd","number":4,"stage":1,"star":1,"personalInfo":{"identityName":"猎人","identityId":5}},
            {"userId":105,"nickName":"eee","number":5,"stage":1,"star":1,"personalInfo":{"identityName":"猎人","identityId":5}},
            {"userId":106,"nickName":"fff","number":6,"stage":1,"star":1,"personalInfo":{"identityName":"猎人","identityId":5}},
            {"userId":107,"nickName":"ggg","number":7,"stage":1,"star":1,"personalInfo":{"identityName":"猎人","identityId":5}},
            {"userId":108,"nickName":"xxx","number":8,"stage":1,"star":1,"personalInfo":{"identityName":"猎人","identityId":5}},
            {"userId":109,"nickName":"zzz","number":9,"stage":1,"star":1,"personalInfo":{"identityName":"猎人","identityId":5}}
            ],
        userlose:[
            {"userId":106,"nickName":"fff","number":6,"stage":1,"star":1,"personalInfo":{"identityName":"猎人","identityId":5}},
            {"userId":107,"nickName":"ggg","number":7,"stage":1,"star":1,"personalInfo":{"identityName":"猎人","identityId":5}},
            {"userId":108,"nickName":"xxx","number":8,"stage":1,"star":1,"personalInfo":{"identityName":"猎人","identityId":5}},
            {"userId":109,"nickName":"zzz","number":9,"stage":1,"star":1,"personalInfo":{"identityName":"猎人","identityId":5}}]
    },
    created: function () {
        var _self = this
        //_self.active()
    },
    methods: {
        mvp: function (event) {
            var el = $(event.currentTarget)
            el.addClass('zaned')
            //animate.zan(el,function(){
            el.closest('.win').find('.zan').removeClass('zan')
            //})
        }
    }
});