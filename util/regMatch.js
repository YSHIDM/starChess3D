let regMatch = {
  /**
   * 
   * @param {string} command 
   * @returns {object} { gameId }
   */
  joinGameMatch(command) {
    // gameId非必须
    let { groups } = command.match(/join game (?<gameId>\d+)/)||{groups:{gameId:null}}
    return groups
  },
  /**
   * 
   * @param {string} command 
   * @returns {object} { starId }
   */
  abutMatch(command) {
    let { groups } = command.match(/abut (?<starId>\d+)/)
    return groups
  },
  /**
   * 
   * @param {string} command 
   * @returns {object} { starId }
   */
  detectMatch(command) {
    let { groups } = command.match(/detect (?<starId>\d+)/)
    return groups
  },
  /**
   * 
   * @param {string} command 
   * @returns {object} { starId1, starId2, army }
   */
  moveArmyMatch(command) {
    let { groups } = command.match(/move army (?<starId1>\d+) (?<starId2>\d+) (?<army>\d+)/)
    return groups
  },
  /**
   * 
   * @param {string} command 
   * @returns {object} { starId1, starId2 }
   */
  musterMatch(command) {
    let { groups } = command.match(/muster (?<starId1>\d+) (?<starId2>\d+)/)
    return groups
  },
  /**
   * 
   * @param {string} command 
   * @returns {object} { starId1, starId2, army }
   */
  transferArmyMatch(command) {
    let { groups } = command.match(/transfer army (?<starId1>\d+) (?<starId2>\d+) (?<army>\d+)/)
    return groups
  },
  /**
   * 
   * @param {string} command 
   * @returns {object} { starId, x, y, z }
   */
  transferStarMatch(command) {
    let { groups } = command.match(/transfer star (?<starId>\d+) (?<x>\d+) (?<y>\d+) (?<z>\d+)/)
    return groups
  },
  /**
   * 
   * @param {string} command 
   * @returns {object} { starId }
   */
  destroyMatch(command) {
    let { groups } = command.match(/destroy (?<starId>\d+)/)
    return groups
  },
  /**
   * 
   * @param {string} command 
   * @returns {object} { starId }
   */
  hideMatch(command) {
    let { groups } = command.match(/hide (?<starId>\d+)/)
    return groups
  },
  /**
   * 
   * @param {string} command 
   * @returns {object} { starId, x, y, z }
   */
  createStarMatch(command) {
    let { groups } = command.match(/create star (?<starId>\d+) (?<x>\d+) (?<y>\d+) (?<z>\d+)/)
    return groups
  },
  /**
   * 
   * @param {string} command 
   * @returns {object} { starId }
   */
  occupyMatch(command) {
    let { groups } = command.match(/occupy (?<starId>\d+)/)
    return groups
  }
}
// console.log(regMatch.joinGameMatch('join game'));
module.exports = regMatch
