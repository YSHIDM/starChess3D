let starGame = {

}
let DB = {
  Game: {
    Property: {
      playerNumber: '玩家数',
      id: 'id',
      state: '游戏状态，0:等待加入;1:正在游戏;2:暂停游戏（先不考虑）',
      starsNumber: '星球数量',
      spaceSize: '星空大小（正方体边）',
      starsMap: '全部星球',
      starsDistance: '',
      toMap: '',
      gameTime: '',
      detectMap: '侦察日志'
    },
    //------------------初始化------------------
    initGameByMode: {//wait
      params: {
        param: ``,
        param1: ``,
        param2: ``,
      },
      comment: ``,
    },
    initGame: {
      params: {
        starsNumber: `星球数量`,
        spaceSize: `星空大小（正方体边）`,
      },
      comment: `初始化游戏
      _initStars():生成群星
      _initStarsMap():生成星距
      gameTime：
      `,
    },
    initStar: {
      params: {
        param: ``,
      },
      comment: ``,
    },
    _initStars: {
      params: {
        param: ``,
      },
      comment: ``,
    },
    _initStarsMap: {
      params: {
        param: ``,
      },
      comment: ``,
    },
    //------------------兵力运输------------------
    startMuster: {
      params: {
        param: ``,
      },
      comment: ``,
    },
    _militaryToArmy: {
      params: {
        param: ``,
      },
      comment: ``,
    },
    endMuster: {
      params: {
        param: ``,
      },
      comment: ``,
    },
    _armyOffset: {
      params: {
        param: ``,
      },
      comment: ``,
    },
    receiveSettle: {
      params: {
        param: ``,
      },
      comment: ``,
    },
    moveArmy: {
      params: {
        param: ``,
      },
      comment: ``,
    },
    armySettle: {
      params: {
        param: ``,
      },
      comment: ``,
    },
    sendArmy: {
      params: {
        param: ``,
      },
      comment: ``,
    },
    musterArmy: {
      params: {
        param: ``,
      },
      comment: ``,
    },
    fallback: {//wait
      params: {
        param: ``,
      },
      comment: ``,
    },
    //------------------命令------------------
    //--------星空信息--------
    getAllStar: {
      params: {
        param: ``,
      },
      comment: `获取所有星球`,
    },
    getAllStarCoordinate: {
      params: {
        param: ``,
      },
      comment: `获取所有星球的坐标`,
    },
    getStarGroup: {
      params: {
        param: ``,
      },
      comment: `获取星球分组信息`,
    },
    navigate: {
      params: {
        param: ``,
      },
      comment: `获取两颗星球最近距离(加权图最短路径)`,
    },
    //--------命令--------
    getAllOwnStar: {
      params: {
        param: ``,
      },
      comment: `获取所有拥有的星球`,
    },
    getStarInfo: {
      params: {
        param: ``,
      },
      comment: `获取星球信息`,
    },
    getAbutStar: {//getAbutStar: '获取临近星球',
      params: {
        param: ``,
      },
      comment: `获取临近星球`,
    },
    getAllAbutStar: {
      params: {
        param: ``,
      },
      comment: ``,
    },
    detect: {
      params: {
        param: ``,
      },
      comment: `客户端第一次访问进行记录并返回消耗时间，客户端setTimeout，
      第二次访问进行比较验证`,
    },
    detectCheck: {
      params: {
        param: ``,
      },
      comment: `进行比较验证，返回侦察结果`,
    },
    occupy: {
      params: {
        param: ``,
      },
      comment: ``,
    },

    //------------------科技------------------
    hideStar: {
      params: {
        param: ``,
      },
      comment: ``,
    },
    destroyStar: {
      params: {
        param: ``,
      },
      comment: ``,
    },
    transferArmy: {
      params: {
        param: ``,
      },
      comment: ``,
    },
    transferStar: {
      params: {
        param: ``,
      },
      comment: ``,
    },
    createStar: {
      params: {
        param: ``,
      },
      comment: ``,
    },


    //------------------util------------------
    getDistanceByStar: {
      params: {
        param: ``,
      },
      comment: `根据两颗星球id获得距离`,
    },
    random: {
      params: {
        param: ``,
      },
      comment: `mix 到 max 随机数`,
    },
    secondUp: {
      params: {
        param: ``,
      },
      comment: ``,
    },


  },
  Star: {
    Property: {
      id: `星球id`,
      coordinate: `星球坐标`,
      belong: `用户id`,
      ownDysonBall: `是否拥有戴森球`,
      receiveArmyTime: `兵力接收时间，既是fromStar发兵时间`,
      military: `军队生产力`,
      startMilitaryTime: `军队结算时间/兵力生产时间：时间差*生产力=生产军队
        重置：1.停止输出军队，2.军队结算`,
      armies: `{playerId:army} 野怪/军队`,
      musterTo: `兵力输出目标`,
      defence: `防御`,
      defenceLevel: `防御力等级`,
      production: `生产力`,
      productionLevel: `生产力等级`,
      productSettle: `资源统计时间戳 productTimestamp`,
      resources: `星球拥有资源`
    },
    initGameByMode: {//wait
      params: {
        param: ``,
        param1: ``,
        param2: ``,
      },
      comment: ``,
    },



    //---------------------旧--------------------
    upgradeDefence: '防御力升级',
    upgradeProduction: {
      comment: '资源及军队生产力升级',
      invoke: ['starsMapUtil.endMuster', 'starsMapUtil.startMuster']
    },
    armySettle: '当前兵力结算',
    receiveSettle: {
      comment: '接收兵力统计',
      invoke: ['starsMapUtil.countMassByTime']
    },
    sendArmy: {
      comment: '输出兵力//存入星图',
      invoke: ['starsMapUtil.countMassByTime']
    },
    musterArmy: {
      comment: '向目标星球集结军队//存入星图',
      invoke: ['starsMapUtil.startMuster']
    },
    militarySettle: '军队产出结算',
    resourcesSettle: 'resources结算'
  },
  Player: {
    Property: {
      id: `id`,
      userId: `用户id`,
      resources: `资源`,
      level: `星际航行等级`,
      steps: `星际航行距离`,
      ownTechnologies: `拥有多少科技`
    },
    initGameByMode: {//wait
      params: {
        param: ``,
        param1: ``,
        param2: ``,
      },
      comment: ``,
    },
    upgradeTravel: '星际旅行升级',
    upgradeTechnology: '技能升级',
    countResources: '统计资源总量',
    hide: '安装戴森球',
    destroy: '使用黑洞',
    transferArmy: '虫洞-传送军队',
    transferStar: '虫洞-传送星球',
    occupy: '占领星球',
    detect: '侦察星球',
    muster: '兵力集结命令'
  },
  router: {
    createGame: {
      comment: '创建游戏',
      invoke: ['createGame']
    },
    createPlayerByGame: {
      comment: '创建角色',
      invoke: ['(new Player)']
    },
    getPlayer: {
      comment: '获取个人信息',
      invoke: ['Player.getPlayer']
    },
    getGame: {
      comment: '获取游戏信息',
    },
    joinGame: {
      comment: '加入游戏',
      invoke: ['getGame', '(new Player)']
    },

    getAllOwnStar: '获取拥有的星球列表',
    getStarInfo: '获取星球信息',
    getAbutStar: '获取临近星球',
    getAllAbutStar: '获取所有邻接星球',
    getAllStarCoordinate: '获取所有星球坐标',
    getStarGroup: '获取星球分组信息',
    navigate: '获取两颗星球最近距离(加权图最短路径)',

    upgradeDefence: '升级星球防御力',
    upgradeProduction: '升级星球生产力',
    upgradeTechnology: '升级科技',
    upgradeTravel: '星际旅行升级',




    detect: '侦察星球',
    sendArmy: '向星球派兵',
    musterArmy: '向星球集结兵力',
    occupy: '发动攻击',
    fallback: '撤退',

    hide: '安装戴森球',
    destroy: '使用黑洞-毁灭星球',
    transferArmy: '传送兵力',
    transferStar: '传送星球',
    createStar: '创造星球',

  },
  fastMode: {
    fast: '兵力直接传送'
  },
  MongoDB: {
  },
  command: {
    'abut starId1': {
      comment: '邻近星球1',
      regExp: /abut (?<starId1>\d+)/
    },
    'detect starId1': {
      comment: '侦察星球1',
      regExp: /detect (?<starId1>\d+)/
    },
    'move army starId1 starId2 army1?': {
      comment: 'starId1向starId2输送兵力若干（army1为空则为全部）',
      regExp: /move army (?<starId1>\d+) (?<starId2>\d+) (?<army>\d+)/
    },
    'muster starId1 starId2': {
      comment: 'starId1向starId2集结兵力',
      regExp: /muster (?<starId1>\d+) (?<starId2>\d+)/
    },
    'transfer army starId1 starId2 army1?': {
      comment: '将兵力（缺省为全部）从星球1传送至星球2',
      regExp: /transfer army (?<starId1>\d+) (?<starId2>\d+) (?<army>\d+)/
    },
    'transfer star starId1 x y z': {
      comment: '将星球传送至坐标2',
      regExp: /transfer star (?<starId1>\d+) (?<x>\d+) (?<y>\d+) (?<z>\d+)/
    },
    'destroy starId1': {
      comment: '利用黑洞毁灭starId1（只能是自己的星球或邻近星球）',
      regExp: /destroy (?<starId>\d+)/
    },
    'hide starId1': {
      comment: '利用戴森球隐藏starId1',
      regExp: /hide (?<starId1>\d+)/
    },
    'create star x y z': {
      comment: '在坐标1创建星球',
      regExp: /create star (?<x>\d+) (?<y>\d+) (?<z>\d+)/
    },
    'occupy starId1': {
      comment: '攻击星球1的敌人',
      regExp: /occupy (?<starId1>\d+)/
    }
  }
}

let 模式 = [['2D', '3D'], ['单人', '双人'], ['正常', '快速'], ['自动', '自定义星球坐标', '自定义开始位置']]
let rooms = [1, 2, 3, 4]

// socket.id = userId

// room = gameId

let Game = require('./Game');
let Star = require('./Star');
let Player = require('./Player');
let game = new Star()
for (const key in game) {
  console.log(key);
}
