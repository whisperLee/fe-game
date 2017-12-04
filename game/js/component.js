/**
 * Created by nielinlin on 2017/9/16.
 */
var component = {
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
                    '<div v-bind:class="`num num${user.number || 0 }`"></div>'+
                    '<div class="status">'+
                        '<b v-show="user.campaignFlag" class="state campaign"></b>'+
                        '<b v-show="user.sergeantFlag" class="state sergeant"></b>'+
                        '<b v-show="user.identityStatus" v-bind:class="`state ${user.identityStatus}`"></b>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'
    },
    usermine : {
        props: ['user'],
        template:
        '<div class="userWrap">'+
            // '<div class="user userBack">'+
            '<div class="user">'+
                '<div v-bind:class="`level level${user.stage || 0 }`">'+
                    '<div class="userInner">'+
                        '<div class="head">'+
                            '<img v-bind:src="user.headImgUrl || `../image/head.png`">'+
                        '</div>'+
                        '<i v-bind:class="`star star${user.star || 0 }`"></i>'+
                        '<div v-bind:class="`num num${user.number || 0 }`"></div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="info">'+
                '<p class="nick">昵称：{{user.nickName}}</p>'+
                '<p class="designation">称号：狼里一枝花</p>'+
            '</div>'+
        '</div>'
    },
    userend : {
        props: ['user'],
        template:
        '<div class="user userBack" v-bind:dead="user.deadFlag">'+
        '<div v-bind:class="`level level${user.showStage || 0 }`">'+
        '<div class="userInner">'+
        '<div class="head">'+
        '<img v-bind:src="user.headImgUrl || `../image/head.png`">'+
        '</div>'+
        '<i v-bind:class="`star star${user.showStar || 0 }`"></i>'+
        '<div v-bind:class="`num num${user.number || 0 }`">{{user.showStar}}</div>'+
        '</div>'+
        '</div>'+
        '</div>'
    },
    userinfo:{
        props: ['user'],
        template:
        '<div class="user userBack">'+
            '<div v-bind:class="`level level${user.stage || 0 }`">'+
                '<div class="userInner">'+
                    '<div class="head">'+
                        '<img v-bind:src="user.headImgUrl || `../image/head.png`">'+
                    '</div>'+
                    '<i v-bind:class="`star star${user.star || 0 }`"></i>'+
                    '<div v-bind:class="`num num${user.number || 0 }`"></div>'+
                '</div>'+
            '</div>'+
            '<ul class="infos">'+
                '<li><span>昵称：</span><p>user.nickName</p></li>'+
                '<li><span>称号：</span><p>狼里一枝花</p></li>'+
                '<li><span>MVP：</span><p></p></li>'+
            '</ul>'+
        '</div>'

    },
    messagecenter:{
        props: ['screenCenterMessage'],
        template:
        '<div class="messageCenter">'+
            '<div class="top" v-show="screenCenterMessage && screenCenterMessage.gameTime">第<span>{{ screenCenterMessage.gameTime }}</span>天'+
            '<span v-show="screenCenterMessage && screenCenterMessage.nightFlag">黑天</span><span v-show="screenCenterMessage && !screenCenterMessage.nightFlag">白天</span></div>'+
            '<div class="message" v-show="screenCenterMessage && screenCenterMessage.gameStatusStr && screenCenterMessage.gameStatusStr!=``">{{ screenCenterMessage.gameStatusStr }}</div>'+
            '<div class="result" v-show="screenCenterMessage.result && screenCenterMessage.result!=``">{{ screenCenterMessage.result }}</div>'+
        '</div>'
    }
   
}




