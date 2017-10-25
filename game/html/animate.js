var animate = {
        sfLayerInter: function (el, initStyle, fun) {
          var _self = this
          fun = fun || function () { }
          el = el || $('.layerShenfen')
          initStyle = initStyle || {'display': 'block'}
          el.css(initStyle)
          el.velocity({
            width: '80%',
            height: '80%',
            left: '10%',
            top: '10%',
            opacity: 1
          }, {
            duration: 500,
            easing: 'ease-in-out',
            complete: fun
          })
        },
        sfLayerOuter: function (el, fun) {
          var btn = $('.btn.shenfen')
          el = el || $('.layerShenfen')
          fun = fun || function () { el.hide() }
          el.velocity({
            width: btn.width(),
            height: btn.height(),
            left: btn.offset().left,
            top: btn.offset().top,
            opacity: 0
          }, {duration: 300, complete: fun})
        },
        layerEnter: function (el, data) {

        },
        layerOuter: function (el, data) {
          el = el || $('.layer')
          el.velocity('reverse', {
            duration: 300,
            easing: 'ease-in-out',
            complete: function () {}
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
        }
      }