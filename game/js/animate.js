/**
 * Created by lynnenie on 2017/9/4.
 */

var animate = {
    eventTime:0,
    sfLayerInter: function (el, initStyle) {
        var _self = this
        el.find('.title').hide()
        el.css(initStyle)
        el.velocity({
            width: '100%',
            height: '100%',
            left: '0',
            top: '0',
            opacity: 1
        }, {
            duration: 500,
            easing: 'ease-in-out',
            complete: function(){
                el.addClass('active')
                el.find('.title,.btn').show()
                // setTimeout(function(){
                //     animate.sfLayerOuter(el)
                // },10000)
            }
        })
    },
    sfLayerOuter: function (el, fun) {
        var btn = $('.mine .identity')
        el = el || $('.layerShenfen')
        el.removeClass('active')
        el.find('.title,.btn').hide()
        el.velocity({
            width: btn.width(),
            height: btn.height(),
            left: '100%',
            top: '100%'
        }, {
          duration: 300, 
          complete: function() {
            el.hide()
            }
        })
    },
    layerEnter: function(el,time){
        var _self = this
        $('.layer').hide()  //隐藏其它弹层
        $('.layer').removeClass("lock") //作用 控制按钮重复点击

        el.css({
            display:'block',
            opacity:0
        })
        el.velocity({
            scale:[1,0],
            opacity:[1,0]
        }, {
            duration: 500,
            easing: 'ease-in-out',
            complete:function(){
                el.removeClass("lock")
                el.addClass('active')
            }
        })
        if(time && time>0){
            if(el.find('.countDown').length<=0){
                el.find('.title').append('<div class="countDown">( <span time='+parseInt(time+1)+'></span> )</div>')
            }else{
                el.find('.countDown span').attr('time',time+1)
            }
            _self.countDown(el)
        }
    },
    countDown: function(el){
        var _self = this
        var $time =  el.find('.countDown span')
        var time = $time.attr('time')
        if(time>1){
            time--
            $time.attr('time',time).html(time+'秒')
            // if(time>0){
            //     $time.attr('time',time).html(time+'秒')
            // }else{
            //     $time.attr('time',0).html('时间到！')
            // }
            setTimeout(function(){
                _self.countDown(el)
            },1000)
        }else{
            if(el.hasClass('layerEventChoose')){
                _self.layerOuter($('.layerEventConfirmAgain'))
            }
            _self.layerOuter(el)
        }
    },
    layerOuter: function(el){
        var $time = el.find('.countDown span')
        el.removeClass('active')
        el.addClass("lock") //作用 控制按钮重复点击
        $('.user-list.choosing').removeClass('choosing')
        if($time && $time.attr('time')>0){
            $time.attr('time'==-1)
        }
        el.velocity({
            scale:[0,1]
        }, {
            duration: 500,
            easing: 'ease-in-out',
            complete: function() {
                el.hide()
                el.find('.longPress.state-success').removeClass('state-success')
                el.removeClass("lock") //作用 控制按钮重复点击
            }
        })
    },
    fanzhuan: function (el, fun1, fun2) {
        fun1 = fun1 || function () { }
        fun2 = fun2 || function () { }
        el.velocity(
            {rotateY: '90deg'},
            {
                duration: 400,
                easing: 'ease-in-out',
                complete: fun1
            }
        ).velocity(
            {rotateY: '0deg'},
            {
                duration: 300,
                easing: 'ease-in-out',
                complete: fun2
            }
        )
    },
    scale: function (el, scale, fun) {
        fun = fun || function () { }
        el.velocity(
            {scale: scale},
            {
                duration: 400,
                easing: 'ease-in-out',
                complete: fun
            }
        )
    },
    fadeIn: function (el, fun) {
        fun = fun || function () { }
        el.show()
        el.velocity(
            {
                opacity: 1
            },
            {
                duration: 400,
                easing: 'ease-in-out',
                complete: fun
            }
        )
    },
    fadeOut: function (el, fun) {
        fun = fun || function () { el.hide() }
        el.velocity(
            {
                opacity: 0
            },
            {
                duration: 400,
                easing: 'ease-in-out',
                complete: fun
            }
        )
    },
    stopAll: function (el) {
        el.velocity('stop', true)
    },
    // messageEnter: function (el, time) {
    //   el.velocity(
    //     {
    //       translateY: [0, '20px'], // 初始值50，终止值0
    //       opacity: [1, 0]
    //     }, {
    //       duration: 300,
    //       complete: function(){
    //         if(time){
    //           setTimeout(function(){
    //             animate.messageOuter(el)
    //           },global.returnDurTime(time))
    //         }
    //       }
    //     }
    //   )
    // },
    // messageOuter: function (el) {
    //   el.velocity(
    //     {
    //       translateY: '-20px',
    //       opacity: 0
    //     }, {
    //       duration: 300,
    //       complete: function(){
    //         if($('.messageCenter .message').length<=0){
    //           $('.messageCenter').hide()
    //         }
    //       }
    //     }
    //   )
    // }
  // layerEnterFormBtn: function (btn, el, callback) {
  //   var _self = this
  //   callback = callback || function () {}
  //   var initStyle = {
  //     width: btn.width(),
  //     height: btn.height(),
  //     left: btn.offset().left,
  //     top: btn.offset().top,
  //     display: 'block'
  //   }
  //   _self.layerEnter(el, initStyle, callback)
  // },
  // layerOuterToBtn: function (el, callback) {
  //   var _self = this
  //   callback = callback || function () {}
  //   _self.layerOuter(el, function () {
  //     el.css({display: 'none'})
  //     callback()
  //   })
  // },


}
