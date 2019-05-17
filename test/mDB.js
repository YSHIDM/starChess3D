const MongoDB = require('@brickyang/easy-mongodb').default;
const config = {
  host: '127.0.0.1',
  port: '27017',
  name: 'test',
};
const mongo = new MongoDB(config);

// mongo.on('connect', () => {
//   console.log(connect);
// });
// let find = async ()=> await mongo.find('ts').then(out => console.log(out));
// let update = async ()=> await mongo.updateMany('ts',{"id":1},{$set:{"relation.0.1.endTime":345}});

async function test() {
  await mongo.connect()
  // let f = await mongo.find('ts');
  // console.table(f);
  // let u = await mongo.updateMany('ts', { filter: { "id": 1 }, update: { $set: { "relation.0.0.offset": 5 } } });
  let u = await mongo.updateMany('ts', {
    filter: { "id": 1 },
    update: {
      $pop: { 'relation.0': -1 }//-1开头
      // $push: {'relation.0':{
      //   "army": 9.0,
      //   "startMusterTime": 1556384738610
      // }}
    }
  });
  // console.log(u);
}
test();
// db.ts.update({"sid":90},{$set:{"move.91.1.endTime":345}});
// db.ts.update({"sid":90},{$pull:{"musterFrom.1":93}});

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