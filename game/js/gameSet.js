/**
 * Created by nielinlin on 2017/9/16.
 */
new Vue({
    el: '#game',
    data: {
        flow: -1,
        combinats: [
                {
                    name: '标准',
                    content: {
                        combination: []
                    }
                },
                {
                    name: '娱乐',
                    content: {
                        identity: {},
                        total: 0,
                        min: 9,
                        max: 15
                    }
                }
            ],
        comType: -1,
        total: 0,
        selfs: ['全自助', '半自助', '手工'],
        victory: ['屠城', '屠边'],
        postData: {
            combinationId: 0, // 板子id
            config: {}, // 人员配置
            gameModule: 0, // 游戏模式
            playerCount: 0, // 游戏人数
            type: 0, // 胜利条件
            userToken: '101'
        }
    },
    created: function () {
        var _self = this
        _self.boxId = global.urlHash().boxId
        _self.gameNumber = global.urlHash().gameNumber
        if (_self.boxId) {
            _self.flow = 0
            _self.getAllCombination()
            _self.getAllIdentity()
        } else {
            global.pop_tips('房间号有误，请重新入座')
        }
    },
    methods: {
        getAllCombination: function () {
            var _self = this
            var d = {
                url: 'game/play/getAllCombination',
                data: {prefabricateFlag: true},
                success: function (d) {
                    if (d.status.code === 'OK') {
                        var l = d.data.dataList
                        var combination = []
                        for (var i = 0; i < l.length; i++) {
                            var com = {
                                id: l[i].id,
                                playerCount: l[i].playerCount,
                                list: [
                                    l[i].configMap['狼人'] + '狼人', l[i].configMap['平民'] + '平民', ''
                                ]
                            }
                            for (var k in l[i].configMap) {
                                if (k !== '狼人' && k !== '平民') {
                                    com.list[2] += k + ' '
                                }
                            }
                            combination.push(com)
                        }
                        _self.combinats[0].content.combination = combination
                    }
                }
            }
            global.ajax(d)
        },
        getAllIdentity: function () {
            var _self = this
            var d = {
                url: 'game/play/getAllIdentity',
                data: {},
                success: function (d) {
                    if (d.status.code === 'OK') {
                        var identity = {}
                        for (var k in d.data) {
                            for (var i = 0; i < d.data[k].length; i++) {
                                if (d.data[k][i].name === '平民') {
                                    if (!identity['pingmin']) {
                                        identity['pingmin'] = []
                                    }
                                    identity['pingmin'].push({
                                        id: d.data[k][i].id,
                                        name: d.data[k][i].name,
                                        select: 3
                                    })
                                } else if (d.data[k][i].name === '狼人') {
                                    if (!identity['langren']) {
                                        identity['langren'] = []
                                    }
                                    identity['langren'].push({
                                        id: d.data[k][i].id,
                                        name: d.data[k][i].name,
                                        select: 3
                                    })
                                } else {
                                    if (!identity[k]) {
                                        identity[k] = []
                                    }
                                    identity[k].push({
                                        id: d.data[k][i].id,
                                        name: d.data[k][i].name,
                                        select: 0
                                    })
                                }
                            }
                        }
                        _self.combinats[1].content.identity = identity
                        _self.setTotal()
                    }
                }
            }
            global.ajax(d)
        },
        chooseType: function () {
            var _self = this
            _self.flow = 1
            _self.comType = parseInt(event.currentTarget.getAttribute('typeid'))
        },
        chooseBaseCom: function () {
            var _self = this
            _self.flow = 2
            _self.postData.config = {}
            _self.postData.combinationId = parseInt(event.currentTarget.getAttribute('typeid'))
            _self.postData.playerCount = event.currentTarget.getAttribute('playercount')
        },
        toggle: function (item) {
            var _self = this
            item.select = !item.select
            _self.setTotal()
        },
        add: function (item) {
            var _self = this
            item.select++
            _self.setTotal()
        },
        sub: function (item) {
            var _self = this
            if (item.select > 0) {
                item.select--
                _self.setTotal()
            }
        },
        setTotal: function () {
            var _self = this
            var total = 0
            var s = 0
            for (var k in _self.combinats[1].content.identity) {
                for (var i = 0; i < _self.combinats[1].content.identity[k].length; i++) {
                    s = _self.combinats[1].content.identity[k][i].select
                    s = s || 0
                    total += s
                }
            }
            _self.combinats[1].content.total = total
        },
        addCombination: function () {
            var _self = this
            var cus = _self.combinats[1].content
            if (cus.min <= cus.total && cus.total <= cus.max) {
                var config = {}
                for (var k in cus.identity) {
                    for (var i = 0; i < cus.identity[k].length; i++) {
                        var s = cus.identity[k][i].select
                        s = s || 0
                        if (s) {
                            config[cus.identity[k][i].id] = s
                        }
                    }
                }
                _self.postData = $.extend({}, _self.postData, {
                    combinationId: null,
                    playerCount: cus.total,
                    config: config
                })
                _self.flow = 2
            } else {
                global.pop_tips('游戏人数请在' + cus.min + '和' + cus.max + '之间')
            }
        },
        chooseSelfs: function () {
            var _self = this
            _self.flow = 3
            _self.postData.gameModule = parseInt(event.currentTarget.getAttribute('typeid'))
        },
        chooseVictory: function () {
            var _self = this
            _self.flow = 4
            _self.postData.type = parseInt(event.currentTarget.getAttribute('typeid'))
            _self.addScreeningByUser()
        },
        addScreeningByUser: function () {
            var _self = this
            var d
            if (global.urlHash().event === 'modify') {
                _self.postData.screeningId = parseInt(global.urlHash().screeningId)
                d = {
                    url: 'game/play/updateScreeningByUser',
                    data: _self.postData,
                    success: function (d) {
                        var mes = ''
                        callback = function () {global.router('game.html?boxId=' + _self.boxId + '&gameNumber='+_self.gameNumber)}
                        if (d.status.code === 'OK') {
                            mes = '修改成功,准备进入游戏页面'
                        } else if (d.status.retcode === 1001) {
                            mes = d.status.msg
                        } else {
                            mes = d.status.msg
                            callback = function () {}
                        }
                        global.pop_tips(mes, callback)
                    }
                }
            } else {
                _self.postData.boxId = _self.boxId
                d = {
                    url: 'game/play/addScreeningByUser',
                    data: _self.postData,
                    success: function (d) {
                        var mes = ''
                        callback = function () {global.router('game.html?boxId=' + _self.boxId + '&gameNumber='+_self.gameNumber)}
                        if (d.status.code === 'OK') {
                            mes = '设置成功,准备进入游戏页面'
                        } else if (d.status.retcode === 1001) {
                            mes = d.status.msg
                        } else {
                            mes = d.status.msg
                            callback = function () {}
                        }
                        global.pop_tips(mes, callback)
                    }
                }
            }
            global.ajax(d)
        }
    }
})