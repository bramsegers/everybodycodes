require('../everybody/codes')
require('../everybody/needs/priorityqueues')

let day17 = (notes, part) => {

  let grid = notes.map(e => arr(e))
  let [vy, vx] = location('@', grid)
  let [sy, sx] = location('S', grid)
  let distv = (i, j) => cei(hyp(vy - i, vx - j))
  let key = (a, b, c = 0) => (a << 9) | (b << 1) | c

  let dijkstra = ([sy, sx, sz], [ty, tx, tz], rad) => {
    let prq = prioqueue()
    let nbs = neighbors('N E S W')
    let dists = map([[key(sy, sx, sz), 0]])
    let valid = (i, j) => grid[i] && grid[i][j] && distv(i, j) > rad
    prq.push([sy, sx, sz, -1], 0)
    while (prq.more()) {
      let { val: [y, x, z, dir], prio: dist } = prq.pop()
      if (key(y, x, z) == key(ty, tx, tz)) return dist
      nbs(y, x).for(([y2, x2], di) => {
        if (!valid(y2, x2)) return
        let dist2 = dist + ~~grid[y2][x2]
        let z2 = z ^ (y > vy && x == vx && dir == di)
        let k = key(y2, x2, z2)
        if (dist2 < (dists.get(k) || inf)) {
          prq.push([y2, x2, z2, y2 - y ? dir : di], dist2)
          dists.set(k, dist2)
        }
      })
    }
  }

  if (part == 1) {
    let res = 0
    grid.for((e, i) => e.for((v, j) => {
      if (distv(i, j) <= 10) res += ~~v
    }))
    return res
  }

  if (part == 2) {
    let dists = arr(vy + 1, 0)
    grid.for((e, i) => e.for((v, j) =>
      dists[distv(i, j)] += ~~v
    ))
    let v = max(dists)
    return v * dists.indexOf(v)
  }

  if (part == 3)
    for (let rad = 0; ; rad++) {
      let dist = dijkstra([sy, sx, 0], [sy, sx, 1], rad)
      if (dist < 30 * (rad + 1)) return dist * rad
    }

}

test(day17, 1, 1487)
test(day17, 2, 66105)
test(day17, 3, 42106)