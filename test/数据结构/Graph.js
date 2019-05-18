//定义邻接矩阵
let Arr2 = [
    [0, 1, 0, 0, 0, 1, 0, 0, 0],//0
    [1, 0, 1, 0, 0, 0, 1, 0, 1],//1
    [0, 1, 0, 1, 0, 0, 0, 0, 1],//2
    [0, 0, 1, 0, 0, 0, 1, 1, 1],//3
    [0, 0, 0, 0, 0, 0, 0, 0, 0],//4
    [1, 0, 0, 0, 0, 0, 1, 0, 0],//5
    [0, 1, 0, 1, 0, 1, 0, 1, 0],//6
    [0, 0, 0, 1, 0, 0, 1, 0, 0],//7
    [0, 1, 1, 1, 0, 0, 0, 0, 0],//8
]

let numVertexes = 9; //定义顶点数
// numEdges = 14; //定义边数

// 定义图结构  
function MGraph(vexs, arc, numVertexes) {
    this.vexs = vexs; //顶点表
    this.arc = arc; // 邻接矩阵，可看作边表
    this.numVertexes = numVertexes; //图中当前的顶点数
    // this.numEdges = null; //图中当前的边数
}
let G = new MGraph([0, 1, 2, 3, 4, 5, 6, 7, 8], Arr2, 9); //创建图使用


let visited = []; //访问标志数组，遍历时使用
///----------------------------------------------------
//邻接矩阵的深度优先递归算法
let StarsArea = [];
function DFS(i) {
    visited[i] = true;
    console.log('打印顶点:', G.vexs[i]) //打印顶点 ,也可以其他操作
    for (let j = 0; j < G.numVertexes; j++) {
        if (G.arc[i][j] == 1 && !visited[j]) {
            StarsArea.push(G.vexs[j]);
            console.log(G.vexs[i], '->', G.vexs[j])
            DFS(j) //对未访问的顶点进行递归
        }
    }
}
//邻接矩阵的深度遍历操作
function DFSTraverse() {
    StarsArea.push(0)
    for (let i = 0; i < G.numVertexes; i++) {
        visited[i] = false;
    }
    for (let i = 0; i < G.numVertexes; i++) {
        if (!visited[i])
            DFS(i)
    }
}
DFSTraverse();
console.log('StarsArea', StarsArea);