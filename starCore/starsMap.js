class starsMap {
  /**
   * 
   * @param {Map<number,Map<number,number>>} customerAM 
   */
  constructor(customerAM) {
    /**
     * 自定义邻接矩阵：star1=>star2=>0:距离,...{跨距:1}
     */
    this.customerAM = customerAM
    this.vexs = []
    this.visited = []
  }
  getAbutStar(starId, step) {
    let abutStar = []
    this.customerAM.get(starId).forEach((distance, star2) => {
      if (distance < step) {
        abutStar.push(star2)
      }
    })
    return abutStar
  }
  /**
   * 
   */
  static customerAM;
  
}

