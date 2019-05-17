function Vertex(label) {
  this.label = label;
}
class Graph {
  constructor(v = 0) {
    this.vertices = v;// 顶点数
    this.vertexList = [];// 边数
    // this.edges = 0;
    this.adj = [];// 边表
    this.edgeTo = [];
    this.marked = [];//用来存储已访问过的顶点
    // for (let i = 0; i < this.vertices; i++) {
    //   this.adj[i] = [];
    //   this.marked[i] = false;
    // }
  }
  initByAdj(adj=[]){
    this.adj = adj;
    this.vertices = adj.length;
  }

  addEdge(v, w) {
    if(!this.adj[v]){
      this.adj[v] = [];
    }
    if(!this.adj[w]){
      this.adj[w] = [];
    }
    this.adj[v].push(w);
    this.adj[w].push(v);//无向
    // this.edges++;
    // this.vertices = this.adj.length
  }

  showGraph() {
    for (let i = 0; i < this.vertices; i++) {
      let str = i + '->';
      for (let j = 0; j < this.vertices; j++) {
        if (this.adj[i][j] !== undefined) {
          str += this.adj[i][j] + ' ';
        }
      }
      console.log(str);
    }
  }

  showGraphTex() {
    for (let i = 0; i < this.vertices; i++) {
      let str = this.vertexList[i] + '->';
      for (let j = 0; j < this.vertices; j++) {
        if (this.adj[i][j] !== undefined && this.adj[i][j] > i) {
          str += this.vertexList[this.adj[i][j]] + ' ';
        }
      }
      console.log(str);
    }
  }

  // 深度优先搜索 depthFirst
  dfs(v) {
    this.marked[v] = true;
    if (this.adj[v] !== undefined) {
      console.log('visited vertex: ' + v);
    }
    this.adj[v].forEach((w) => {
      if (!this.marked[w]) {
        this.dfs(w);
      }
    })
  }

  // 广度优先搜索
  bfs(s) {
    let queue = [];
    this.marked[s] = true;
    queue.push(s);
    while (queue.length > 0) {
      let v = queue.shift();
      if (v !== undefined) {
        console.log("visited vertex: " + v);
      }
      this.adj[v].forEach((w) => {
        if (!this.marked[w]) {
          this.edgeTo[w] = v;
          this.marked[w] = true;
          queue.push(w);
        }
      })
    }
  }

  pathTo(t, v) {
    for (let i = 0; i < this.vertices; i++) {
      this.marked[i] = false;
    }
    this.bfs(t);
    let source = t;
    if (!this.marked[v]) {
      return undefined;
    }
    let path = [];
    for (let i = v; i != source; i = this.edgeTo[i]) {
      path.unshift(i);
    }
    path.unshift(source);
    let str = '';
    for (let i in path) {
      if (i < path.length - 1) {
        str += path[i] + '->'
      } else {
        str += path[i];
      }
    }
    console.log({str});
    return path;
  }
/**
 * 拓扑排序
 *
 * @memberof Graph
 */
topSort() {
    let stack = [];
    let visited = [];
    for (let i = 0; i < this.vertices; i++) {
      visited[i] = false;
    }
    for (let i = 0; i < this.vertices; i++) {
      if (visited[i] == false) {
        this.topSortHelper(i, visited, stack);
      }
    }
    for (let i = stack.length - 1; i >= 0; i--) {
      console.log(this.vertexList[stack[i]])
    }
  }
  /**
   * 拓扑排序-辅助
   *
   * @param {*} v
   * @param {*} visited
   * @param {*} stack
   * @memberof Graph
   */
  topSortHelper(v, visited, stack) {
    visited[v] = true;

    this.adj[v].forEach((w) => {
      if (!visited[w]) {
        this.topSortHelper(w, visited, stack)
      }
    })
    stack.push(v)
  }
}

module.exports = Graph;

// JAVASCRIPT 查找图中连接两点的所有路径算法
// 1、把图看成以起点为根节点的树

// 2、使用深度遍历算法遍历路径

// 3、遍历到节点为目标节点时，保存这条路径

// 复制代码
    find2PointsPath(sourceId, targetId) {
        const { nodesKV } = this.chart.getStore();  // 节点集合
        let pathArr = [];  // 保存找到的所有路径

        const findPath = (sourceId, targetId, pathNodes = []) => {
            pathNodes = [...pathNodes];  // 存储当前路径的节点。拷贝一下，避免引用传递导致递归调用时相互影响。
            pathNodes.push(sourceId);
            // 找到终点，保存路径退出
            if (sourceId === targetId) {
                pathArr.push(pathNodes);
                return;
            }

            const node = nodesKV[sourceId];
            // 取出相邻的节点
            const neighborNodes = { ...gof(node, {})('childrenKV')(), ...gof(node, {})('parentsKV')() };
            for (let id in neighborNodes) {
                // 没在已探寻中的才递归探寻，避免图中的环导致循环探寻
                if (!pathNodes.includes(id)) {
                    findPath(id, targetId, pathNodes);
                }
            }
        };
        findPath(sourceId, targetId);

        // 路径长度由短到长排序
        pathArr.sort((path1, path2) => {
            return path1.length - path2.length;
        });

        return pathArr;
    }