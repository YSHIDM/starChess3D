/**
 * Map<any, Map>
 */
let toMap = new Map()
let fromMap = new Map()
let marchMap = new Map()
/**
 * 
 * @param {number} to toStar
 * @param {number} from fromStar
 * @returns {Map}
 */
let getMarchMap = (to, from) => toMap.get(to).get(from)

let _militaryToArmy = (marchLog) => {
  let l = 10 - marchLog.get('startMusterTime')
  for (let i = 0; i < l; i++) {
    marchLog.set(marchLog.get('startMusterTime') + i,marchLog.get('military'))
  }
}

function t1() {
  let countArmy = 0
  let timeArray = []

  marchMap.set(0, 500)//时间/兵力
  marchMap.set('startMusterTime', 1)
  marchMap.set('military', 10)

  fromMap.set(0, marchMap)

  toMap.set(3, fromMap)
  getMarchMap(3, 0).set(1, 10)
  getMarchMap(3, 0).set(2, 10)
  getMarchMap(3, 0).set(3, 10)
  getMarchMap(3, 0).set(4, 10)
  getMarchMap(3, 0).set(5, 10)

  console.log(toMap);

  getMarchMap(3, 0).forEach((v,k,map)=>{
    if (k >= 2 && k <= 4) {
      countArmy += v|0
      marchMap.delete(k)
      timeArray.push(k)
    }
  })
  console.log(countArmy);
  console.log(toMap);
  console.log(timeArray);
}
t1()


// let a = [3,0]
// let army = _starsMap.get(a)
// console.log(army)