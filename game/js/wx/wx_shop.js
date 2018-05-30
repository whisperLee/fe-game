/**
 * Created by lynnenie on 2018/1/18.
 */

new Vue({
    el: '#wx_shop',
    data: {
        shopName:'商城',
        bulletin:'今天天气好，所有商品8折优惠',
        topList:{}, // 顶部推荐
        goodsD:{},// 所有商品按照id存储，不做展示，做数据调取用
        cartListD:{},// 购物车数据,不做展示，做数据调取用
        goods:{}, // 商品列表
        cartList:{},// 购物车
        asideType:[],
        cartNum:0,
        cartTotal:0,
        type:-1
    },
    created: function () {
        var _self = this
        _self.init()
    },
    methods: {
        init:function(){
            var _self = this

            var urlHash = global.urlHash()
            _self.type = urlHash.type
            _self.shopId = urlHash.shopId || 1
            if(_self.type && _self.type!='undefined'){
                _self.getGoods();
            }else{
                $(".shopType").show()
            }
            _self._w = $(window).width()
            _self._h = $(window).height()

            $(function(){
                _self.active()
            })
        },
        getGoods:function(){
            var _self = this
            var d = {
                url: 'goods/getGoodsAndClassifyList',
                data: {
                    //'classifyId': 0,//商品分类id,不传为全部 ,
                    'type':_self.type, //0:虚拟,1:现实,不传为全部 ,
                },
                success: function (d) {
                    //console.log(d)
                    if(d.status.code == 'OK' && d.data){
                        for(var i=0; i<d.data.length; i++){
                            if(d.data[i].classifyId == '-1'){
                                var obj = {
                                    classifyName:d.data[i].classifyName,
                                    goodsList:{}
                                }
                                for(var j=0;j< d.data[i].goodsList.length;j++){
                                    obj.goodsList[d.data[i].goodsList[j].id] = d.data[i].goodsList[j]
                                }
                                _self.topList =  obj
                            }else{
                                var g = d.data[i]
                                _self.asideType.push({
                                    classifyName:g.classifyName,
                                    classifyId:g.classifyId
                                })
                                _self.goodsD[g.classifyId] = {
                                    classifyName:g.classifyName,
                                    goodsList:{}
                                }

                                for(var j=0; j<g.goodsList.length; j++){
                                    _self.goodsD[g.classifyId].goodsList[g.goodsList[j].id] = g.goodsList[j]
                                }
                            }
                        }
                        setTimeout(function(){
                            $('.topWrap .recom ul').width($('.topWrap .recom ul li').width() * $('.topWrap .recom ul li').length )
                        },10)

                        _self.getCart()
                    }else{
                        global.codeError(d)
                    }
                }
            }
            global.ajax(d)
        },
        getCart:function(){
            var _self = this
            // 获取本地存储，并更新数据
            var carts = global.getStorage('carts')
            var shopId = _self.shopId
            var type = _self.type
            var cartNum=cartTotal = 0
            var soldName = ''
            if(carts[shopId] && carts[shopId][type]){
                var typeGoods = carts[shopId][type]
                for(var goodId in typeGoods){
                    var num = typeGoods[goodId].num;
                    var classifyId = typeGoods[goodId].classifyId;
                    if(num>0 && _self.goodsD[classifyId]){
                        var price = _self.goodsD[classifyId].goodsList[goodId].actualPrice;
                        if(_self.goodsD[classifyId].goodsList[goodId].soldOutFlag==1){
                            soldName+=' '+_self.goodsD[classifyId].goodsList[goodId].name
                            delete typeGoods[goodId]
                        }else{
                            cartTotal+=parseFloat(price*num);
                            cartNum+=num;
                            _self.goodsD[classifyId].goodsList[goodId].num = num

                            _self.setRepeatGood(goodId,num)
                            _self.cartListD[goodId] = _self.goodsD[classifyId].goodsList[goodId]


                        }

                    }

                }
            }
            if(soldName!=''){
                global.pop_tips('您购物车中的'+soldName+'已售罄，请选择其他商品')
                global.setStorage('carts',carts) //修改本地缓存
            }
            cartTotal = cartTotal.toFixed(2);
            if($('.cartIcon').find('input[name="cartTotal"]').length>0){
                $('.cartIcon').find('input[name="cartTotal"]').val(cartTotal);
            }else{
                $('.cartIcon').append('<input type="hidden" value="'+cartTotal+'" name="cartTotal" >');
            }
            $('.cart .price span').html(cartTotal);
            $('.cartIcon .number').html(cartNum);
            _self.cartTotal = cartTotal;
            _self.cartNum = cartNum;
            _self.cartList = _self.cartListD;
            _self.goods = _self.goodsD;

            setTimeout(function(){
                _self.scrollInit()
            },1000)

        },
        setRepeatGood:function (goodId,num) {
            var _self = this
            if(_self.goodsD[-2] && _self.goodsD[-2].goodsList[goodId]){ // 设置左侧导航热销数据（因为热销数据和其他数据又重复，所以需要单独设置）
                _self.$set(_self.goodsD[-2].goodsList[goodId],'num',num)
            }

            if(_self.goods[-2] && _self.goods[-2].goodsList[goodId]){ // 设置左侧导航热销数据（因为热销数据和其他数据又重复，所以需要单独设置）
                _self.$set(_self.goods[-2].goodsList[goodId],'num',num)
            }
        },
        changeGood:function(event,item,type){
            var _self = this
            var el = $(event.currentTarget)
            item.num = item.num || 0
            var classifyId = item.classifyId
            var goodId = el.closest('.js-goodList').attr('goodId')
            if(type==1){ //加
                item.num++
            }else if(type==-1) { // 减
                item.num--
                if (item.num < 1) {
                    item.num = 0
                }
            }else if(type==2){
                item.num = _self.goods[classifyId].goodsList[goodId].num || 0
                item.num++
            }

            _self.setRepeatGood(goodId,item.num)
            _self.setData(classifyId,goodId,item.num) //设置购物车数据
            //_self.setData()

        },
        setData:function(classifyId,goodId,num){
            var _self = this
            _self.$set(_self.goods[classifyId].goodsList[goodId],'num',num)
            if(!_self.cartList[goodId]){
                _self.cartList[goodId] = _self.goods[classifyId].goodsList[goodId]
            }else{
                var obj = _self.cartList
                if(num>0){
                    obj[goodId].num = num
                }else{
                    delete obj[goodId]
                }
                _self.cartList = Object.assign({}, _self.cartList,obj)
            }
            _self.modifyCart()
            _self.addlocalStorCart()
        },
        modifyCart:function(){
            var _self = this
            var cartNum=cartTotal = 0;
            for(var key in _self.cartList){
                var num = _self.cartList[key].num;
                var classifyId = _self.cartList[key].classifyId;
                var price = _self.cartList[key].actualPrice;
                if(num>0){
                    cartTotal+=parseFloat(price*num);
                    cartNum+=num;
                }
            }
            if(cartNum<=0){
                _self.cartListHide()
            }
            cartTotal = cartTotal.toFixed(2);
            _self.cartTotal = cartTotal;
            _self.cartNum = cartNum;
            $('.cart .price span').html(_self.cartTotal);
            $('.cartIcon .number').html(_self.cartNum);
        },
        addlocalStorCart:function(){
            var _self = this
            var carts = global.getStorage('carts')
            if(!global.isExit(carts[_self.shopId])){
                carts[_self.shopId] = {}
                carts[_self.shopId][_self.type] ={}
            }
            if(!global.isExit(carts[_self.shopId][_self.type])){
                carts[_self.shopId][_self.type] ={}
            }
            carts[_self.shopId][_self.type] =  _self.cartList
            global.setStorage('carts',carts)
        },
        clearCart:function(){
            var _self  =this

            for(var goodId in _self.cartList){
                var classifyId = _self.cartList[goodId].classifyId;
                if(_self.cartList[goodId].num>0){
                    _self.goods[classifyId].goodsList[goodId].num = 0
                }
            }
            _self.cartList = {}
            _self.modifyCart()
            // 清空本地存储，并修改内容
            var shopId = _self.shopId
            var type = _self.type
            var carts = global.getStorage('carts')
            carts[shopId][type] = {}
            global.setStorage('carts',carts)
        },
        cartListHide:function(){
            global.layerBeforeClose()
            $('.cartList').removeClass('on')
            $('.j-mask').hide()
        },
        cartListShow:function(){
            $('.cartList').addClass('on')
            $('.j-mask').show()
            global.layerAfterOpen()
        },
        scrollInit:function(){
            var _self = this
            _self.typeTop = []
            $('.mainWrap ul').each(function(){
                _self.typeTop.push($(this).offset().top+$(this).height())
            })

            $(window).scroll(function(){
                _self.scroll()
            })

            $('.asideWrap ul li').each(function(idx){
                $(this).off().on('click',function(){
                    window.scrollTo(0,$('.mainWrap ul').eq(idx).offset().top-$('.header').height()+1)
                })
            })
            _self.scroll()
        },
        scroll:function(){
            var _self = this
            var top = window.scrollY
            var t_h = $('.header').height()
            if( top >= $('.menuWrap').offset().top-t_h){
                $('.menuWrap .asideWrap').css({'position':'fixed','top':t_h+'px'})
            }else{
                $('.menuWrap .asideWrap').css({'position':'absolute','top':0})
            }
            for(var i=0;i<_self.typeTop.length;i++){
                if(top < _self.typeTop[i]-t_h){
                    $('.asideWrap ul li').removeClass('on').eq(i).addClass('on')
                    return
                }
            }
        },
        account:function(){
            var _self = this
            global.loading()
            if(_self.cartNum>0){
                global.loaded()
                global.router('wx_orderSubmit.html?shopId='+_self.shopId+'&type='+_self.type)
            }
        },
        back:function(){
            global.router("wx_mine.html")
        },
        changeType:function(){
            var _self = this
            var type
            if(_self.type==0){
                type=1
            }else{
                type=0
            }
            global.router('wx_shop.html?shopId='+_self.shopId+'&type='+type)
        },
        active:function () {
            var _self = this
            var h = $(window).height()
            $(".cartList .bd").css("maxHeight",h*2/3)
            $('.cart .cartIcon').off().on('click',function(){

                if($('.cartList').hasClass('on')){
                    _self.cartListHide()
                }else if(_self.cartNum>0){
                    _self.cartListShow()
                }
            })

            $('.j-mask').off().on('click',function(){
               _self.cartListHide()
            })

            $(".shopType .types li").off().on("click",function(){
                _self.type = $(this).attr("type")
                _self.getGoods()
                $(".shopType").hide()
            })

        }
    }
})
