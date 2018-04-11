/**
 * Created by nielinlin on 2017/9/16.
 */
var wcomponent = {
    user : {
        props: ['user'],
        template:
        ' <div v-bind:dead="user.deadFlag" class="user" v-bind:num="user.number || 0">'+
            '<div v-bind:class="`level level${user.stage || 0 }`">'+
                '<div class="userInner">'+
                    '<div class="head">'+
                        '<img v-bind:src="user.headImgUrl || `../image/head.png`">'+
                    '</div>'+
                    '<i v-bind:class="`star star${user.star || 0 }`"></i>'+
                    '<div v-bind:class="`num num${user.number || 0 }`"><b>{{user.number}}</b></div>'+
                    '<div class="status">'+
                        '<b v-show="user.campaignFlag" class="state campaign"></b>'+
                        '<b v-show="user.sergeantFlag" class="state sergeant"></b>'+
                        '<b v-show="user.identityStatus" v-bind:class="`state ${user.identityStatus}`"></b>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'
    },

   
}




