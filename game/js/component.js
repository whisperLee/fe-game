/**
 * Created by nielinlin on 2017/9/16.
 */
var component = {
    user : {
        props: ['user'],
        template:
        ' <div class="user" v-bind:num="user.number || 0">'+
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
    usermine : {
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
        '<p class="nick">昵称：user.nickName</p><p class="designation">称号：狼里一枝花</p></div>'
    },
    userend : {
        props: ['user'],
        template:
        '<div class="user userBack">'+
        '<div v-bind:class="`level level${user.thisStage || 0 }`">'+
        '<div class="userInner">'+
        '<div class="head">'+
        '<img v-bind:src="user.headImgUrl || `../image/head.png`">'+
        '</div>'+
        '<i v-bind:class="`star star${user.thisStar || 0 }`"></i>'+
        '<div v-bind:class="`num num${user.number || 0 }`"></div>'+
        '</div>'+
        '</div>'
    },
    userinfo:{
        props: ['user'],
        template:
        '<div class="user userBack">'+
        ' <div v-bind:class="`level level${user.stage || 0 }`">'+
        '  <div class="userInner">'+
        '   <div class="head">'+
        '    <img v-bind:src="user.headImgUrl || `../image/head.png`">'+
        '   </div>'+
        '   <i v-bind:class="`star star${user.star || 0 }`"></i>'+
        '   <div v-bind:class="`num num${user.number || 0 }`"></div>'+
        '  </div>'+
        ' </div>'+
        ' <ul class="infos">'+
        '  <li><span>昵称：</span><p>user.nickName</p></li>'+
        '  <li><span>称号：</span><p>狼里一枝花</p></li>'+
        '  <li><span>MVP：</span><p></p></li>'+
        ' </ul>'+
        '</div>',
        created: function () {
         
        },
        methods:{
            // 抢身份初始化
            addAtten: function (){
                var _self = this
                
               
            }
            
        }
    }
   
}




