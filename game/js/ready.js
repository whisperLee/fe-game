/**
 * Created by nielinlin on 2017/7/16.
 */
$(function(){
    var list = [
        {
            head:"../image/head.png",
            level:1,
            num:1,
            ready:0
        },
        {
            head:"../image/head.png",
            level:1,
            num:2,
            ready:1
        },
        {
            head:"../image/head.png",
            level:3,
            num:3,
            ready:1
        },
        {
            head:"../image/head.png",
            level:2,
            num:4,
            ready:1
        },
        {
            head:"../image/head.png",
            level:6,
            num:5,
            ready:1
        },
        {
            head:"../image/head.png",
            level:1,
            num:6,
            ready:1
        },
        {
            head:"../image/head.png",
            level:6,
            num:7,
            ready:0
        },
        {
            head:"../image/head.png",
            level:3,
            num:8,
            ready:1
        },
        {
            head:"../image/head.png",
            level:1,
            num:9,
            ready:0
        },
        {
            head:"../image/head.png",
            level:1,
            num:10,
            ready:1
        },
        {
            head:"../image/head.png",
            level:1,
            num:11,
            ready:1
        },
        {
            head:"../image/head.png",
            level:5,
            num:12,
            ready:0
        },
        {
            head:"../image/head.png",
            level:1,
            num:13,
            ready:1
        },
        {
            head:"../image/head.png",
            level:1,
            num:14,
            ready:0
        },
        {
            head:"../image/head.png",
            level:4,
            num:15,
            ready:0
        }

    ];
    var layout = {
        init:function(){
            var _this = this;
            _this.showList();
            _this.active();
        },
        showList:function(){
            var _this = this;
            var h = '';
            var className,img;
            for(var i=0;i<list.length;i++){
                className = list[i].ready?"in":"no-in";
                img = list[i].ready?list[i].head:"../image/head1.png";
                h+='<li class="user '+className+'"><a><b class="num-bg"></b><div class="head level level'+list[i].level+'"> <img src="'+img+'"></div><div class="number">'+list[i].num+'</div></a></li>';
            }
            $(".ready .center ul").html(h);
        },
        active:function(){
            var _this = this;
            setTimeout(function(){
                $(".js-start-game").removeClass("disabled");
                $(".top").html("桌长请点击开始按钮，进入游戏");
            },2000);
            $(".js-start-game").off().on("tap",function(){
                window.location.href='游戏.html';
            })
        }
    }
    layout.init();
});