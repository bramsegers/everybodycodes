require('../everybody/codes')

let day20 = (notes, part) => {

  let grid = notes
  let sx = grid[0].indexOf('S')

  let gain = c => c == '+' ? 1 : c == '-' ? -2 : -1
  let key = (n, i, j, d) => [n, i, j, d].join`,`
  let moves = neighbors('N E S W')
  let opp = [2, 3, 0, 1]
  
  if (part == 1) {

    let mem = {}
    let f = (n, i, j, d) => {
      let k = key(n, i, j, d)
      if (k in mem) return mem[k]
      let r = -inf
      if (!n) return 0
      moves(i, j).for(([i, j], k) => {
        if (k == opp[d]) return
        if (!grid[i] || grid[i][j] == '#') return
        r = max(r, gain(grid[i][j]) + f(n - 1, i, j, k))
      })
      return mem[k] = r
    }
    return 1000 + f(100, 0, sx, 1)
  }

  if (part == 2) {

    let m = map()
    m.set(key(0, 0, sx, 1), 0)
    for (let t = 1; ; t++) {
      let m2 = map()
      for (let [k, h] of m) {
        let [n, i, j, d] = k.split`,`.map(int)
        let nb = moves(i, j)
        for (let d2 = 0; d2 < 4; d2++) {
          if (d2 == opp[d]) continue
          let [i2, j2] = nb[d2]
          if (!grid[i2]) continue
          if (!grid[i2][j2]) continue
          if (grid[i2][j2] == '#') continue
          let n2 = n
          if (n2 == 0 && grid[i2][j2] == 'A') n2++
          if (n2 == 1 && grid[i2][j2] == 'B') n2++
          if (n2 == 2 && grid[i2][j2] == 'C') n2++
          let k = key(n2, i2, j2, d2)
          let h2 = h + gain(grid[i2][j2])
          if (h2 > (m2.get(k) || -inf)) m2.set(k, h2)
          if (n2 == 3 && i2 == 0 && j2 == sx && h2 >= 0) return t
        }
      }
      m = m2
    }
  }

  if (part == 3) {

    let alt = e => e.fold((r, e) => e == '#' ? -inf : r + gain(e), 0)
    let cols = arr(grid[0], (i, e) => [i, e = grid.map(e => e[i]), alt(e) - abs(i - sx)])
    let [x, row] = cols.sort((a, b) => b[2] - a[2])[0]

    let s = 0
    let h = 384400 - abs(x - sx)
    while (h > 0) h += gain(row[++s % len(row)])
    return s
  }
}

test(day20, 1, 1031)
test(day20, 2, 554)
test(day20, 3, 768796)