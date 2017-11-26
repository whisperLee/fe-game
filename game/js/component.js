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
                        '<b v-if="user.campaignFlag" class="state campaign"></b>'+
                        '<b v-if="user.sergeantFlag" class="state sergeant"></b>'+
                        '<b v-if="user.identityStatus" v-bind:class="`state ${user.identityStatus}`"></b>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'
    },
    usermine : {
        props: ['user'],
        template:
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
        '</div>'

    },
    userend : {
        props: ['user'],
        template:
        '<div class="user userBack">'+
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

    }
   
}




