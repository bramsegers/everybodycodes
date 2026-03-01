require('../everybody/codes')

let day10 = (notes, part) => {

  let res = 0
  let grid = notes.map(e => arr(e))
  let height = len(grid)
  let width = len(grid[0])

  let word = a => arr(16, i => a[(i >> 2) + 2][(i % 4) + 2]).join``
  let powr = w => arr(w).fold((r, c, i) => r + (i + 1) * (ord(c) - 64), 0)

  let getpart = (i, j) => grid.slice(i, i + 8).map(e => e.slice(j, j + 8))
  let setpart = (i, j, a) => a.for((e, u) => e.for((c, v) => grid[i + u][j + v] = c))


  let solve = (i, j) => {

    let g = getpart(i, j)

    g.for((e, i) => e.for((v, j) => {
      if (v != '.') return
      let c = g.map(r => r[j])
      let m = e.filter(e => e != '.' && c.includes(e))
      if (len(m) == 1) g[i][j] = m[0]
    }))

    g.for((e, i) => e.for((v, j) => {
      if (v != '.') return
      let c = g.map(r => r[j])
      let f = {}; [e, c].for(e => e.for(c => f[c] = -~f[c]))
      let m = Object.keys(f).filter(e => e >= 'A' && f[e] == 1)
      if (!f['?'] || len(m) != 1) return
      g[i].for((c, v) => c == '?' && (g[i][v] = m[0]))
      g.for((r, u) => r[j] == '?' && (g[u][j] = m[0]))
      g[i][j] = m[0]
    }))

    return !g.flat().includes('.') && g
  }


  if (part == 1)
    res = word(solve(0, 0))


  if (part == 2)
    for (let i = 0; i < height; i += 9)
      for (let j = 0; j < width; j += 9)
        res += powr(word(solve(i, j)))


  if (part == 3)
    for (let i, j, a, v = [], more = 1; more;)
      for (more = i = 0; i + 2 < height; i += 6)
        for (j = 0; j + 2 < width; j += 6)
          if (!v[[i, j]] && (a = solve(i, j)))
            v[[i, j]] = more = 1,
            res += powr(word(a)),
            setpart(i, j, a)

  return res
}

test(day10, 1, 'ZJSQBMPXGLDWNRTH')
test(day10, 2, 196471)
test(day10, 3, 209282)