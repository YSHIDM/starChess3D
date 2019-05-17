Object.prototype.test = 'test';
// var obj = {};
// console.log((obj + 0).length); // 16
// for (var i in obj) {
//   console.log(i); // 输出 test
// }
let a = 1
var obj = Object.create(null)
obj['a'] = 1
for (var i in obj) {
  console.log(i); // 输出 test
}

class Map2 extends Map {
  constructor() {
    super()
  }
  /**
   * set
   * @param {number} number key
   * @param {Map} map value
   */
  set(number,map){
    super.set(number,map)
  }
  /**
   * 
   * @param {number} number 
   * @returns {Map}
   */
  get(number){
    return super.get(number)
  }
}
let m2 = new Map2()
m2.set(1,new Map().set(2,3))
let aa = m2.get(1).get(2)
console.log(aa);