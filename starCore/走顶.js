// 一个游戏,一个棋盘,逻辑不好
class AGame {
  constructor() {
    this.gamerState = true;
    this.init()
  }
  init() {
    this.chessboard = this.getChessboard()
  }
  getChessboard() {
    return [
      this.initChessman(false, 0),
      this.initChessman(null, 1),
      this.initChessman(null, 2),
      this.initChessman(true, 3),
    ]
  }
  /**
   * 棋子初始化
   * @param {boolean} gamer 玩家状态
   * @param {number} index 棋子坐标
   * @returns
   */
  initChessman(gamer, index) {
    const chessmanList = []
    this.chessmanMap = new Map()
    for (let i = 0; i < 4; i++) {
      if (gamer) {
        const id = index + '_' + i;
        const chessman = {
          id,
          gamer,
          coordinate: [index, i],
        }
        this.chessmanMap.set(id, chessman)
        chessmanList.push(chessman)
      }
    }
    return chessmanList;
  }
  // 出界
  /**
   * 走一步
   * @param {1|2} gamer 玩家
   * @param chessmanId 棋子 id
   * @param {number[]} coordinate 棋子坐标
   */
  step(gamer, chessmanId, coordinate) {
    const chessman = this.chessmanMap.get(chessmanId)
    if (this.gamerState === chessman.gamer) {
      throw '不是该玩家'
    }
    const [x, y] = coordinate;
    if (this.chessboard[x][y]) {
      throw '该位置有其他棋子'
    }
    const [a, b] = this[gamer][chessmanId]
    if (Math.abs(x - a) !== 1 || Math.abs(y - b) !== 1) {
      throw '行棋错误'
    }
    this.chessboard[a][b] = null;
    this.chessboard[x][y] = chessman;
    this[gamer][chessmanId] = coordinate
    // 吃子
    this.eat(gamer, coordinate)
  }
  // 被吃棋子位置?
  // 中间
  eat(gamer, coordinate) {
    const [x, y] = coordinate;
    const xChessmanList = []
    for (let i = 0; i < 4; i++) {
      const xChessman = this.chessboard[x][i]
      if (xChessman) {
        xChessmanList.push(xChessman)
      } else if (xChessmanList.length > 1 && xChessmanList.length < 3) {
        return
      }
    }
    if (xChessmanList.length === 3) {
      this.forEat(xChessmanList)
    }
    const yChessmanList = []
    for (let i = 0; i < 4; i++) {
      const yChessman = this.chessboard[i][y]
      if (yChessman) {
        yChessmanList.push(yChessman)
      } else if (yChessmanList.length > 1 && yChessmanList.length < 3) {
        return
      }
    }
    if (yChessmanList.length === 3) {
      this.forEat(yChessmanList)
    }
  }
  /**
   *
   * @param {any[]} chessmanList
   * @returns
   */
  forEat(chessmanList) {
    const [a, b, c] = chessmanList.map(chessman => chessman.gamer === this.gamerState)
    // 中间棋子不是自己的,或三个都是自己的
    if (b && !(a && c)) {
      if (a) {
        return 2
      }
      if (c) {
        return 0
      }
    }
  }
}

class Chessman {

}