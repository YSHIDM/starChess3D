let 游戏简介 = {
  设计: `制作一个类似星尘战略、真菌世界的游戏。
    但是限于个人能力，没有画面，目前只有一个简单的输入框，通过socket.io与后台交互数据。
    其实这个简单页面也没有做好😂`
  ,
  游戏结构: `通过自动生成（或自定义）星球坐标，确定星球间距离，
    根据玩家移动距离生成graph（所以，星球坐标是3维还是2维貌似关系不大）。
    默认每秒移动一单位距离（你行你改🙄）。
    后期研发出虫洞，秒传兵力或星球，
  `,
  特点: `《星尘战略》不支持兵力集结 —— 既将 A 星球的兵力不间断输送到 B 星球。
    《真菌世界》有集结兵力功能（加权有向图两点间最短路径），以及按数值输送兵力功能；
    但 O 星球兵力集结到 P 星球的时候不会把已经生产的兵力及接收的兵力输送出去。
    本游戏试图实现该功能。
    另外，游戏为用户提供了若干主动技能，如通过虫洞传送兵力甚至星球。
    关于技能，部分灵感来自于《halo》等游戏以及一些常见的科学幻想。
    如果未来可以设置剧情，✋
  `,
  难点: {
    军队偏移: `我自己编的一个概念，很不友好。可以简单理解为“行军日志”
      主要用来记录星球输送出多少军队，通过时间戳推算每一批军队的移动距离，
      星球兵力结算时使用，
    `,
    集结结算: `这个是本游戏的特点，根据接收兵力的来源以及时间，倒推出一个有向图
      目前：“行军日志”存储在game下，采用深度优先计算，
      优化：star分别记录自己的兵力接收日志，game对其进行广度优先计算。（可以彼此测试）
    `,
    最短路径: `并行于集结的兵力输送方案，既兵力到达目标星球之前不受操作影响，
      用于长距离、跨星球输送兵力，类似于《真菌世界》操作方式  
    `,
    兵力撤退: `用于集结过程中，目标星球被占领后兵力撤退，
      其实就是倒转运动中的军队的时间戳，
    `,
    UI: `这个也是本游戏的特点，根本没什么操作界面，也没有战斗画面。
      但我仍然构思了若干种方案，在后面有
    `,
    不可能的任务: `根据要求的地图特点，倒退生成星球坐标`
  },
  科技与技能: {
    说明: '数据是随意编的，没有任何科学依据',
    玩家: {
      科技: [
        { 名称: '星际旅行', 研发资源消耗: 200, 效果: '开启星际探索[实现]' },
        { 名称: '人工智能', 研发资源消耗: 300, 效果: '取消最大兵力' },
        { 名称: '星际网络', 研发资源消耗: 400, 效果: '全图星球信息' },
        { 名称: '可控聚变', 研发资源消耗: 500, 效果: '开启高级科技[实现]' }
      ],
      技能: [
        { 名称: '戴森球', 研发资源消耗: 500, 技能消耗: 500, 效果: '资源、兵力产量及防御翻倍，敌方无法侦察，只能通过传送进入[不靠谱]' },
        { 名称: '微型黑洞', 研发资源消耗: 1000, 技能消耗: 1000, 效果: '毁灭一颗星球，及其附近所有兵力' },
        { 名称: '微型虫洞', 研发资源消耗: 1500, 技能消耗: 2100, 效果: '传送军队' },
        { 名称: '星球传送', 研发资源消耗: 2000, 技能消耗: 10000, 效果: '传送星球' },
        { 名称: '星球创造', 研发资源消耗: 2500, 技能消耗: 30000, 效果: '创造一颗满级星球' }
      ]
    },
    星球等级: {
      防御力: [
        { 防御力: 300, 研发资源消耗: 100, 兵力消耗: 100 },
        { 防御力: 600, 研发资源消耗: 100, 兵力消耗: 200 },
        { 防御力: 900, 研发资源消耗: 100, 兵力消耗: 300 },
      ],
      生产力: [
        { 资源生产提升: 10, 兵力生产提升: 10, 研发资源消耗: 100 },
        { 资源生产提升: 20, 兵力生产提升: 20, 研发资源消耗: 100 },
        { 资源生产提升: 30, 兵力生产提升: 30, 研发资源消耗: 100 },
      ]
    }
  }
}
// let 
let DB = {
  Star: '星球',
  Player: '玩家',
  _sendArmy: {
    startMusterTime: '游戏时间',
    army: '军队数量'
  },
  _musterArmy: {
    startMusterTime: '游戏时间',
    military: '集结开始时兵力生产力',
    endTime: '集结结束时间'
  },
  _fromMap: {
    fromStar: [
      _sendArmy | _musterArmy
    ]
  },
  _toMap: {
    toStar: _fromMap,
  },
  marchMap: {
    player: _toMap,
  }
}
let core = {
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
        param: ``,
        param: ``,
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
        param: ``,
        param: ``,
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
        param: ``,
        param: ``,
      },
      comment: ``,
    },
    initGameByMode: {//wait
      params: {
        param: ``,
        param: ``,
        param: ``,
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
    'transfer army starId1 starId2 army1？': {
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
let UI = {
  command: '程序员，努力做得像终端，直接粗暴',
  table: '普通人，大约需要n种表格',
  svg_graph: '2D直观，对于程序员来说图什么的还算友好直观吧',
  chart_coordinate: '3D可操作，对普通人更友好（并不确定）',
  AR_VR: '想多了，兄弟🤣！'
}
let 模式 = [['2D', '3D'], ['单人', '双人'], ['正常', '快速'], ['自动', '自定义星球坐标', '自定义开始位置']]
