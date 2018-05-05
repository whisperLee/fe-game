/**
 * Created by nielinlin on 2018/4/19.
 */
window.codeType='test'//host本地环境 test测试环境,online线上环境
window.http = 'http://liyn.me:8000/fe-game/game/html/'
//用户端footer配置
window.wFooter = [
    {
        type:'index',
        link:'wx_index.html',
        name:'首页'
    },
    {
        type:'appoint',
        link:'wx_appoint.html',
        name:'预约'
    },
    {
        type:'game',
        link:'wx_game.html',
        name:'游戏'
    },
    {
        type:'shop',
        link:'wx_shop.html?shopId=1',
        name:'商城'
    },
    {
        type:'mine',
        link:'wx_mine.html',
        name:'我的'
    },

]
window.interfaceValue = {
    orderStatus:{ //订单状态
        '0':'待支付',
        '10':'支付中',
        '20':'已支付',
        '30':'处理中',
        '35':'配送中',
        '40':'退款中',
        '50':'已完成',
        '51':'已开票',
        '60':'已退款',
        '70':'已取消'
    },
    payType :{ //支付类型
        '0':'微信','1':'支付宝','50':'线下'
    },
    orderWarn : { //订单预警状态
        'NORMAL':'正常',
        'WARNING':'预警',
        'TIMEOUT':'超时'
    },
    orderType : { //订单类型
        '0':'虚拟',
        '1':'实物'
    },
    yumiType:{//遇米收支类型
        0:'消费返遇米',
        1:'签到领遇米',
        2:'赠送遇米',
        3:'活动送遇米',
        50:'抢身份扣除遇米',
        51:'购物使用遇米'
    },
    shenfen:{ //身份信息配置
        '1':{
            name:'平民',
            headf:'../shenfen/h1.jpg',
            head:'../shenfen/h_1.jpg',
            bg:'../shenfen/1.png'
        },
        '2':{
            name:'狼人',
            headf:'../shenfen/h2.jpg',
            head:'../shenfen/h_2.jpg',
            bg:'../shenfen/2.png'
        },
        '3':{
            name:'预言家',
            headf:'../shenfen/h3.jpg',
            head:'../shenfen/h_3.jpg',
            bg:'../shenfen/3.png'
        },
        '4':{
            name:'女巫',
            headf:'../shenfen/h4.jpg',
            head:'../shenfen/h_4.jpg',
            bg:'../shenfen/4.png'
        },
        '5':{
            name:'猎人',
            headf:'../shenfen/h5.jpg',
            head:'../shenfen/h_5.jpg',
            bg:'../shenfen/5.png'
        },
        '6':{
            name:'守卫',
            headf:'../shenfen/h6.jpg',
            head:'../shenfen/h_6.jpg',
            bg:'../shenfen/6.png'
        },
        '7':{
            name:'狼王',
            headf:'../shenfen/h7.jpg',
            head:'../shenfen/h_7.jpg',
            bg:'../shenfen/7.png'
        },
        '8':{
            name:'白狼王',
            headf:'../shenfen/h8.jpg',
            head:'../shenfen/h_8.jpg',
            bg:'../shenfen/8.png'
        },
        '9':{
            name:'白痴',
            headf:'../shenfen/h9.jpg',
            head:'../shenfen/h_9.jpg',
            bg:'../shenfen/9.png'
        },
        '10':{
            name:'丘比特',
            headf:'../shenfen/h10.jpg',
            head:'../shenfen/h_10.jpg',
            bg:'../shenfen/10.png'
        },
        '11':{
            name:'盗贼',
            headf:'../shenfen/h11.jpg',
            head:'../shenfen/h_11.jpg',
            bg:'../shenfen/11.png'
        },
        '12':{
            name:'盗贼',
            headf:'../shenfen/h11.jpg',
            head:'../shenfen/h11.jpg',
            bg:'../shenfen/12.png'
        },
        '13':{
            name:'盗贼',
            headf:'../shenfen/h11.jpg',
            head:'../shenfen/h11.jpg',
            bg:'../shenfen/13.png'
        },
        '14':{
            name:'魔术师',
            headf:'../shenfen/h14.jpg',
            head:'../shenfen/h_14.jpg',
            bg:'../shenfen/14.png'
        },
        '15':{
            name:'盗贼',
            headf:'../shenfen/h_11.jpg',
            head:'../shenfen/h15.jpg'
        },
        '16':{
            name:'盗贼',
            headf:'shenfen/h11.jpg',
            head:'shenfen/h11.jpg',
            bg:'shenfen/16.png'
        },
        '17':{
            name:'盗贼',
            headf:'shenfen/h11.jpg',
            head:'shenfen/h11.jpg'
        },
        '18':{
            name:'盗贼',
            headf:'shenfen/h11.jpg',
            head:'shenfen/h11.jpg',
            bg:'shenfen/18.png'
        },
        '19':{
            name:'盗贼',
            headf:'shenfen/h11.jpg',
            head:'shenfen/h11.jpg',
            bg:'shenfen/19.png'
        }
    },
    voucher:{ //优惠抵价券
        carType:{
            0:'次卡',
            1:'天卡',
            2:'月卡',
            3:'vip体验卡',
            50:'满额减',
            51:'直减'
        },
        goodsType:{
            '0':'仅限虚拟商品使用',
            '1':'仅限餐饮小吃使用',
            '-1':'全品类可用'
        }
    },
    roomStatus:{ //包房状态
        "STOP":"停用",
        "IDLE":"空闲",
        "APPOINTMENT":"预定",
        "INUSE":"使用中"
    },
    gameStatus:[//游戏状态
        "空闲","准备中","进行中","结算中"
    ],
    gameBtn:{
        "SPEAK_END":"发言结束",
        "GIVE_UP":"退水",
        "SELF_DESTRUCT":"自爆",
    }
}
