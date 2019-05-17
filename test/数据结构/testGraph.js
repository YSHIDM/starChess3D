const Graph = require('./Graph');
let g = new Graph(5);

// g.addEdge(0, 1);
// g.addEdge(0, 2);
// g.addEdge(1, 3);
// g.addEdge(2, 4);
g.addEdge('a', 'b');
g.addEdge('a', 'c');
g.addEdge('b', 'd');
g.addEdge('c', 'e');
// g.showGraph();
console.log(g);
g.pathTo('a','e')
// g.dfs();
// g.pathTo();
// g.showGraphTex()
// g.topSort()

console.log(g);

