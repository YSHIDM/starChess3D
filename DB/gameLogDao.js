// let mongo = require('./MongoDB');

let DB = [
  {
    "uid": 2,
    "sid": 90,
    "musterFrom": {
      "2": [85, 86],
      "1": [93, 94]
    },
    "musterTo": "91",
    "move": {
      "91": [
        {
          "army": 500,
          "time": 1556384738610
        },
        {
          "startMusterTime": 1556384738610,
          "military": 10,
          "endTime": 1556384748610,
          "offset": 0
        }
      ],
      "92": [
        {
          "army": 500,
          "time": 1556384738610
        },
        {
          "startMusterTime": 1556384738610,
          "military": 10,
          "endTime": 1556384748610,
          "offset": 0
        }
      ]
    }
  }
]

async function test() {
  // let mongo = await MongoDB();
  let f = await mongo.find('ts');

  console.table(f);
}
// test();

let mongoDBOperate = {
  gameLogInsert(playerId, gameId, resources = 0, level = 0,
    steps = 10, ownTechnologies = 0, command = [], directions = {}) {
    return {
      playerId,
      gameId,
      resources,
      level,
      steps,
      ownTechnologies,
      command,
      directions
    }
  },
  musterFromPush(uid, sid) {
    return {
      $push: {
        ['musterFrom.' + uid]: sid
      }
    }
  },
  musterFromPull(uid, sid) {
    return {
      $pull: {
        ['musterFrom.' + uid]: sid
      }
    }
  },
  musterToSet(toSid) {
    $set: {
      musterTo: toSid
    }
  },
  marchLogPush(toSid, marchLog) {
    return {
      $push: {
        ['marchLogs.' + toSid]: marchLog
      }
    }
  },
  marchLogSet(toSid, last, endTime) {
    return {
      $push: {
        ['marchLogs.' + toSid + '.' + last + '.endTime']: endTime
      }
    }
  },


}

console.log(mongoDBOperate.marchLogSet(3, 5, 123123));