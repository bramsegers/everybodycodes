require('../everybody/codes')

let day19 = (notes, part) => {

  let instr = notes[0]
  let grid = notes.slice(2).map(e => arr(e))
  let rot = neighbors('N NE E SE S SW W NW')
  
  let [ip, mod] = [0, len(instr)]
  let R = grid.map((e, i) => e.map((_, j) => [i, j]))

  for (let i = 1; i + 1 in R; i++) {
    for (let j = 1; j + 1 in R[i]; j++) {
      let r = rot(i, j)
      let t = r.map(([i, j]) => R[i][j])
      let c = instr[ip++ % mod] == 'L' ? 1 : 7
      r.for(([i, j], k) => R[i][j] = t[(k + c) % 8])
    }
  }

  let T = grid.map(_ => [])
  R.for((e, i) => e.for(([y, x], j) => T[y][x] = [i, j]))

  let res = []
  let rep = [, 1, 100, 1048576000][part]

  grid.for((e, i) => e.for((v, j) => {
    if (!+v) return
    let [y, x, r] = [i, j, 0]
    while (++r <= rep) {
      [y, x] = T[y][x]
      if (y == i && x == j)
        r = rep - rep % r
    }
    res.push([x, v])
  }))

  res.sort((a, b) => a[0] - b[0])
  res = res.map(e => e[1]).join``
  return res
}

test(day19, 1, '6331722994827643')
test(day19, 2, '4323512412356884')
test(day19, 3, '4913683863914897')