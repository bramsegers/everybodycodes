require('../everybody/codes')
require('../everybody/needs/priorityqueues')

let day13 = (notes, part) => {

  let grid = notes.map(e => arr(e))
  let graph = {}
  let starts = []
  let end = []

  let nbs = neighbors('N E S W')
  let key = (i, j) => (i << 16) | j
  
  grid.for((e, i) => e.for((v, j) => {
    if (v == '#' || v == ' ') return
    if (v == 'S') starts.push(key(i, j))
    if (v == 'E') end = key(i, j)
    nbs(i, j).for(([y, x]) => {
      let w = grid[y] ? grid[y][x] : 0
      if (!w || w == '#' || w == ' ') return
      if (v == 'S' && w == 'S') return
      let dist = abs(~~v - ~~w)
      let cost = 1 + min(dist, 10 - dist)
      let [a, b] = [key(i, j), key(y, x)];
      (graph[a] ||= []).push([b, cost]);
      (graph[b] ||= []).push([a, cost])
    })
  }))

  let dijkstra = node => {
    let dists = {}
    let seen = set()
    let pq = prioqueue()
    for (let v in graph) dists[v] = inf
    pq.push(node, dists[node] = 0)
    while (pq.more()) {
      let { val: node, prio: dist } = pq.pop()
      if (seen.has(node)) continue; seen.add(node)
      for (let [neighbor, weight] of graph[node] || []) {
        let dist2 = dist + weight
        if (dist2 < dists[neighbor]) {
          dists[neighbor] = dist2
          pq.push(neighbor, dist2)
        }
      }
    }
    return dists
  }

  let dists = dijkstra(end)
  return starts.fold((r, e) => min(r, dists[e] || inf), inf)
}

test(day13, 1, 149)
test(day13, 2, 630)
test(day13, 3, 521)