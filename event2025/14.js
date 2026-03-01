require('../everybody/codes')
 
let day14 = (notes, part) => {
 
  let G = notes.map(e => arr(e))
  let rounds = [10, 2025, 1e9][part - 1]
  let bounds = (i, j) => G[i] && G[i][j]
  let nbs = neighbors('NE SE SW NW', bounds)
 
  let key = g => g.map(e => e.join``).join``
  let score = g => g.fold((s, e) => e.fold((s, c) => s += c == '#', s), 0)
  let match = g => center.every((e, i) => e.every((c, j) => g[i + 13][j + 13] == c))
  let nextg = g => g.map((e, i) => e.map((c, j) => '#.'[surnd(g, i, j, c == '#')]))
  let surnd = (g, i, j, c) => nbs(i, j).fold((r, [i, j]) => r ^= g[i][j] == '#', c)
 
  if (part == 1 || part == 2) {
    let res = 0
    while (rounds--) {
      G = nextg(G)
      res += score(G)
    }
    return res
  }
 
  let round = 0
  let scores = []
  let center = G
  G = arr(34, arr(34, '.'))
  G = nextg(G)
  let tgt = key(G)
 
  while (++round) {
    G = nextg(G)
    if (match(G)) scores.push([round, score(G)])
    if (key(G) == tgt) return scores.fold((res, [r, s]) =>
      res + int((rounds - r) / round) * s + s, 0)
  }
}
 
test(day14, 1, 509)
test(day14, 2, 1170219)
test(day14, 3, 1754335744)