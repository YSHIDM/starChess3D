/**
 * mix 到 max 随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {number} 随机数
 */
let random = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}
/**
 * 返回方法 获取计算两颗星球的距离
 * @param {number[]} coordinate 第一颗星球的3维坐标
 */
let getDistance = ([x1, y1, z1]) => ([x2, y2, z2]) => {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2));
}







module.exports = {
  random,
  getDistance
}