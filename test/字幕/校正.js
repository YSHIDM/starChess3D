let { readFile, writeFile } = require('fs').promises;

async function test() {
  let en = await readFile(__dirname + '/[机器人瓦力(三语版)].WALL·E 2008.BluRay.720P.x264.AC3-CMCT.ass','utf16le');
  let cn = await readFile(__dirname + '/WALL-E.2008.BluRay.720p.x264.DTS-WiKI.chs.srt','utf-8')
  let line = en.toString().split('\n');
  let paragraph = cn.toString().split('\r\n\r\n');
  // paragraph.map((v, i, a) => {
  //   if(i===597){
  //     console.log(i);
  //   }
  //   let _english = line[i].split('}');
  //   let english;
  //   if(_english){
  //     english = _english.pop();
  //   }
    
  //   a[i] = v + '\n' + english;
  // })
  line.map((v,i,a)=>{
    let [t1,t2] = paragraph[i].split('\n')[1].split(' --> ');
    let time = `0,${h(t1)},${h(t2.substring(0,t2.length-1))}`;// t2 remove \n
    let nl= v.replace(/[0|1](,[0|1](:\d{2}){2}.\d{2}){2}/,time);
    a[i] = nl;
  });
  await writeFile(__dirname + '/jqrwl.ass', line.join('\n'),'utf16le');

}
// 掐头去尾换逗点
let h = (s='') =>{
  let s1 =s.substr(1);
  let s2 = s1.substring(0,s1.length-1);
  return s2.replace(',','.');
}
// console.log(h('01:28:59,640'));

test();