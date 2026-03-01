require('../everybody/codes')
require('../everybody/needs/priorityqueues')

let day15 = (notes, part) => {

  let instr = notes[0].split(',').map(e => e.match(/L|R|\d+/g))

  let walls = []
  let graph = {}
  let key = (a, b) => a + ',' + b
 
  let [y, x] = [0, 0]
  let [Y, X] = [y, x]
  let ys = set([-1, 1])
  let xs = set([-1, 1])

  let di = 0
  let dr = neighbors('N E S W')(0, 0)
  let xr = neighbors('NW NE SE SW')(0, 0)

  instr.for(([i, n]) => (
    di += i == 'R' ? 1 : 3, di &= 3,
    walls.push([[Y, X], [Y += dr[di][0] * n, X += dr[di][1] * n]]),
    ys.add(Y - 1), ys.add(Y + 1), xs.add(X - 1), xs.add(X + 1)
  ))

  ys = [...ys].sort((a, b) => a - b)
  xs = [...xs].sort((a, b) => a - b)

  let intersects = ([y0, x0], [y1, x1], [y2, x2], [y3, x3]) => {
    let hor1 = y0 == y1
    let hor2 = y2 == y3
    if (x0 > x1) [x0, x1] = [x1, x0]
    if (y0 > y1) [y0, y1] = [y1, y0]
    if (x2 > x3) [x2, x3] = [x3, x2]
    if (y2 > y3) [y2, y3] = [y3, y2]
    if (+hor1 && !hor2) return x2 > x0 && x2 < x1 && y0 > y2 && y0 < y3
    if (!hor1 && +hor2) return x0 > x2 && x0 < x3 && y2 > y0 && y2 < y1
    if (+hor1 && +hor2) return y0 == y2 && max(x0, x2) < min(x1, x3)
    if (!hor1 && !hor2) return x0 == x2 && max(y0, y2) < min(y1, y3)
  }

  ys.for((y, i) =>
    xs.for((x, j) =>
      dr.for(([u, v]) =>
        (u += i) in ys && (v += j) in xs && (u = ys[u], v = xs[v], !
        (walls).some(([p, q]) => intersects([y, x], [u, v], p, q))) &&
        (graph[key(y, x)] ||= []).push([key(u, v), abs(y - u) + abs(x - v)])
  )))

  let dijkstra = node => {
    let dists = {}
    let seen = set()
    let pq = prioqueue()
    for (let v in graph) dists[v] = inf
    pq.push(node, dists[node] = 0)
    while (pq.more()) {
      let { val: node, prio: dist } = pq.pop()
      if (seen.has(node)) continue; seen.add(node)
      for (let [nb, w] of graph[node] || [])
        if ((w += dist) < dists[nb])
          pq.push(nb, dists[nb] = w)
    }
    return dists
  }

  return xr.fold((r, [u, v], d) => (
    d = dijkstra(key(y + u, x + v)), min(r, 4 +
    min(xr.map(([u, v]) => d[key(Y + u, X + v)])))
  ), inf)
}

test(day15, 1, 106)
test(day15, 2, 4459)
test(day15, 3, 490138317)