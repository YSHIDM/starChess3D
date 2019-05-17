const gameTime = 1557335465000
const secondDown = () => Math.ceil((new Date().getTime() - gameTime) / 1000);// Math.floor(time / 1000) * 1000;
/**
 * 游戏计时
 * 当前毫秒值/1000向上取整-游戏开始时间/1000向上取整
 * 可以加入Game套餐
 */
const secondUp = (gameTime) => Math.ceil(new Date().getTime() / 1000) - gameTime;
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
  secondDown,
  secondUp,
  random,
  getDistance
}