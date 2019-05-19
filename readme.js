let 游戏简介 = {
  原因: {
    红警与星际: `小学时听同学吹牛，红警如何如何，光棱塔、间谍，
      脑补了好多类似间谍到一个满是光棱塔监视的城市盗取情报的画面
      等学者打红警时，发现一个叫星际争霸的游戏也有大兵：问号.jpg。
      从一个星球打到另一个星球，这不是《星球大战》？
      事实证明，就像对红警一样我想多了，根本没有那么好的特效😑。
      就像认为红警2里的超时空运输真能穿越时空开一个新存档一样不现实。
      星际2有一个功能，可以把集结点设置到某个士兵身上，非常好的功能。
    `,
    星尘战略与真菌世界: `这是大学时期我玩过的两款安卓游戏，很棒，就是废手指头。
      你得一直搓屏幕，控制军队移动，否则大后方的士兵不能一直支援到前线
      真菌世界可以让军队集结到前方————应该是用的图的最短路径算法吧，
      但是并不能把以前集结的士兵一并输送走，或许是为了让后方兵力不会太过空虚。
      或许，我个人感受，这个功能很复杂，如果不是战线很长不是必须的
    `,
    halo光环: `最近这些年为数不多能称之为科幻的东西了，
      星球大战、复仇者、x战警、变形金刚，这些都是魔戒一样的现代魔法，不是科幻。
      光环给了我很多启发，例如，现在的xx就像先行者一样不可救药，
      对于这个游戏，利用黑洞毁灭星球，传送星球，在光环中也曾出现。
    `
  },
  设计: `制作一个类似星尘战略、真菌世界的游戏。
    但是，没有画面，目前只有一个简单的输入框，通过socket.io与后台交互数据。
    其实这个简单页面也还没做好😂
    3D？星球的坐标的确是三个数值的数组，同时兼容两个的。。。
    `
  ,
  游戏结构: `通过自动生成（或自定义）星球坐标，确定星球间距离，
    根据玩家移动距离生成graph（所以，星球坐标是3维还是2维貌似关系不大）。
    默认每秒移动一单位距离（你行你改吧🙄）。
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
    不可能的任务: `根据要求的地图特点，倒推生成星球坐标`
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
  _sendArmy: {// 兵力输送方式：指派
    startMusterTime: '游戏时间',
    army: '军队数量'
  },
  _musterArmy: {// 兵力输送方式：集结
    startMusterTime: '游戏时间',
    military: '集结开始时兵力生产力',
    endTime: '集结结束时间'
  },
  _fromMap: {// 兵力来源星球
    fromStar: [
      _sendArmy | _musterArmy
    ]
  },
  _toMap: {// 兵力目标星球
    toStar: _fromMap,
  },
  marchMap: {// 玩家兵力输送日志
    player: _toMap,
  }
}
/**
 * 逻辑核心
 */
let core = {
  Game: {
    playerNumber: '玩家数',
    id: 'id',
    state: '游戏状态，0:等待加入;1:正在游戏;2:暂停游戏（先不考虑）',
    starsNumber: '星球数量',
    spaceSize: '星空大小（正方体边）',
    starsMap: '全部星球',
    starsDistance: '星球距离表',
    marchMap: '行军日志',
    gameTime: '游戏开始时间',
    detectMap: '侦察日志',
    //------------------初始化------------------
    /**
     * 按模式初始化游戏
     * @param {number} mode 游戏模式
     * @param {number} starsNumber 星球数量
     * @param {number} spaceSize 星空大小（正方体边）
     */
    initGameByMode(mode, starsNumber, spaceSize) { },
    /**
     * 初始化游戏
     * @param {number} starsNumber 星球数量
     * @param {number} spaceSize 星空大小（正方体边）
     */
    initGame(starsNumber = 10, spaceSize = 30) {
      this._initStars()// 生成群星
      this._initStarsMap()// 生成星距
      this.gameTime// 记录游戏时间
    },
    /**
     * 生成星球位置，默认原点对角顶点
     * @param {number[]} coordinate 默认原点对角顶点
     */
    initStar(coordinate) {
      this.starsMap // starsMap存储星球
    },
    /**
     * 生成群星,初始化this.starsMap
     */
    _initStars() {
      // 循环调用
      this.initStar(coordinate)// 初始化this.starsMap
    },
    /**
     * 初始化this.starsDistance
     */
    _initStarsMap() {
      // 根据 this.starsMap 生成 this.starsDistance
    },
    //------------------兵力运输------------------
    /**
     * 开始输送兵力
     * @param {string} playerId 玩家id
     * @param {string} fromStar 出发星球
     * @param {string} toStar 目标星球
     * @param {number} startMusterTime 集结开始时间，game.secondUp()
     * @param {number} military 生产力 做乘法
     */
    startMuster(playerId, fromStar, toStar) { },
    /**
     * 时间段颗粒化
     * _musterArmy: {// 兵力输送方式：集结
     *   startMusterTime: '游戏时间',
     *   military: '集结开始时兵力生产力',
     *   endTime: '集结结束时间'
     * }
     * 转换为：
     * _sendArmy: {// 兵力输送方式：指派
     *   startMusterTime: '游戏时间',
     *   army: '军队数量'
     * }
     * @param {Map<string|number,number>} armyOffset 行军日志
     */
    _militaryToArmy(armyOffset) { },
    /**
     * 停止输送兵力
     * @param {string} playerId 玩家id
     * @param {string} fromStar 出发星球
     * @param {string} toStar 目标星球
     */
    endMuster(playerId, fromStar, toStar) {
      this._militaryToArmy()
    },
    /**
     * 军队运动结算
     * 获取输送到目标星球的兵力，同时返回向目标星球输送兵力的 时间数组
     * 时间数组 用来筛选兵力是否输送到
     * @param {Map<number|string, number>} armyOffset 
     * @param {number|number[]} timeS 时间段开始 或时间数组
     * @param {number} timeE 时间段结束
     * @returns {[number,number[]]}
     */
    _marchOffset(armyOffset, timeS, timeE = 0) { },
    /**
     * 当前星球集结军队数量
     * 根据时间与距离判断 toStar 接收的兵力总数
     * @param {string} playerId 玩家id
     * @param {string} toStar 目标星球
     * @param {number|number[]} timeS 当前（toStar）星球开始收到兵力时间,或时间数组
     * @param {number} timeE 当前（toStar）星球兵力结算时间，外部调用是为当前时间点
     */
    receiveSettle(playerId, toStar, timeS, timeE = 0) {
      this.getDistanceByStar()
      this._marchOffset()
      this.receiveSettle()
    },
    /**
     * 调动军队时间戳
     * @param {string} playerId 玩家id
     * @param {string} fromStar 出发星球
     * @param {string} toStar 目标星球
     * @param {number} army 军队数量
     */
    moveArmy(playerId, fromStar, toStar, army) {
      this.marchMap.get(playerId).get(toStar).get(fromStar).set(this.secondUp(), army);
    },
    /**
     * 当前兵力结算
     * @param {string} playerId 玩家id
     * @param {string} toStar 目标星球
     */
    armySettle(playerId, toStar) {// 未完成 outTime, //调用util
      this.starsMap.get(toStar)
      this.secondUp()// 游戏进行时间
      star.militarySettle()// 生产兵力
      this.receiveSettle();// 接收兵力
      star.startMilitaryTime// 军队结算时间
      star.armies[playerId]
    },
    /**
     * 输出兵力//存入星图
     * @param {string} playerId 玩家id
     * @param {string} fromStar 出发星球
     * @param {string} toStar 目标星球
     * @param {number} army 兵力数量,army 大于总兵力或小于等于零，则赋值为总兵力
     */
    sendArmy(playerId, fromStar, toStar, army = 0) { },
    /**
     * 向目标星球集结军队//存入星图
     * @param {string} fromStar 出发星球
     * @param {string} toStar 目标星球
     */
    musterArmy(fromStar, toStar) { },
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
    /**
     * 获取所有拥有的星球
     * @param {string} playerId 玩家id
     * @returns {string[]} starIds
     */
    getAllOwnStar(playerId) { },
    getStarInfo: {
      params: {
        param: ``,
      },
      comment: `获取星球信息`,
    },
    /**
     * 获取临近星球
     * @param {string} starId 
     * @param {number} steps 
     * @returns {string[]}
     */
    getAbutStar(starId, steps) { },
    getAllAbutStar: {
      params: {
        param: ``,
      },
      comment: ``,
    },
    /**
     * 侦察星球
     * 客户端第一次访问进行记录并返回消耗时间，客户端setTimeout，
     * 第二次访问进行比较验证
     * @param {string} playerId 玩家id
     * @param {string} toStar 星球名称
     * {{time:number,starId1:string,starId2:string,distance:number}}
     */
    detect(playerId, toStar) { },

    /**
     * 进行比较验证，返回侦察结果
     * @param {string} uuid 侦察操作uuid
     */
    detectCheck(uuid) { },
    /**
     * 发动攻击-军队首先进入星球范围，等待命令作战
     * @param {string} starId 星球名称
     */
    occupy(starId) { },

    //------------------科技------------------
    /**
     * 安装戴森球
     * @param {string} starId 星球名称
     */
    hideStar(starId) { },
    /**
     * 使用黑洞-毁灭星球
     * @param {string} starId 星球名称
     */
    destroyStar(starId) { },
    /**
     * 虫洞-传送兵力
     * @param {string} starId 星球名称
     * @param {number[]} transferCoordinate 目标坐标
     */
    transferArmy(starId = '', army = [0, 0, 0]) { },
    /**
     * 虫洞-传送星球
     * @param {string} starId 星球名称
     * @param {number[]} transferCoordinate 目标坐标
     */
    transferStar(starId = '', transferCoordinate = [0, 0, 0]) { },

    /**
     * 创造星球
     * @param {number[]} createCoordinate 目标坐标
     */
    createStar(createCoordinate = [0, 0, 0]) { },


    //------------------util------------------
    /**
     * 根据两颗星球id获得距离
     * @param {string} fromStar 出发星球
     * @param {string} toStar 目标星球
     */
    getDistanceByStar(fromStar, toStar) { },
    // random: {
    //   params: {
    //     param: ``,
    //   },
    //   comment: `mix 到 max 随机数`,
    // },
    /**
     * 获取当前游戏进行的时间
     */
    secondUp() { },
    /**
     * 坐标比较
     * @param {number[]} coordinate1 第一个坐标
     * @param {number[]} coordinate2 第二个坐标
     */
    _checkCoordinate(coordinate1, coordinate2) { }

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
  AR_VR: '想多了，兄弟🤣！',
  辅助AI: 'Co...，NO！'
}
let 模式 = [['2D', '3D'], ['单人', '双人'], ['正常', '快速'], ['自动', '自定义星球坐标', '自定义开始位置']]
let string = '所有的点都可以映射到一个面上吧，一束光不行就两束'
