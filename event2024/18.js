require('../everybody/codes')

let day18 = (notes, part) => {

  let grid = notes
  let trees = len(grid.join``.match(/P/g))
  let moves = neighbors('N E S W')
  
  let bfs = q => {
    let M = grid.map(e => arr(e))
    for (let t = 0, c, r; q[0]; t++) {
      [q, r] = [[], q]
      if (!trees) return t
      for (let [y, x] of r)
        for ([y, x] of moves(y, x))
          if (/[\.P]/.test(c = M[y][x]))
            M[y][x] = '~',
            q.push([y, x]),
            part <= 2 && (trees -= c == 'P'),
            part == 3 && (dists[y][x] += t + 1)
    }
  }

  let q = []
  if (part <= 2) q.push([grid.findIndex(e => e[0] == '.'), 0])
  if (part == 2) q.push([grid.findIndex(e => /\.$/.test(e)), len(grid[0]) - 1])
  if (part <= 2) return bfs(q)

  let dists = grid.map(e => arr(len(e), 0))
  grid.for((e, i) => arr(e).for((c, j) => c == 'P' && bfs([[i, j]])))
  return dists.fold((r, e) => e.fold((r, e) => min(r, e || inf), r), inf)
}

test(day18, 1, 115)
test(day18, 2, 1937)
test(day18, 3, 250013)