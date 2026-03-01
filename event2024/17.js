require('../everybody/codes')

let day17 = (notes, part) => {

  let stars = notes
  . fold((r, e, i) => (arr(e)
  . for((c, j) => c == '*' && r
  . push([i, j])), r), [])

  let dist = ([a, b], [c, d]) => 
    abs(a - c) + abs(b - d)
  
  let kruskal = (n, edges) => {
    let [P, R] = [arr(n, i => i), arr(n, 1)]
    let f = i => i == P[i] ? i : P[i] = f(P[i])
    let u = (x, y) => (x = f(x)) == (y = f(y)) || R[x] 
      < R[y] ? P[x] = y : (P[y] = x, R[x] += R[x] == R[y])
    return edges.sort((a, b) => a[2] - b[2]).
      fold((r, [x, y, c]) => f(x) == f(y) ? r : 
      r + (u(x, y), c), 0)
  }

  let size = stars => {
    let edges = []
    let n = len(stars)
    for (let i = 0; i < n; i++)
      for (let j = i + 1; j < n; j++)
        edges.push([i, j, dist(stars[i], stars[j])])
    return n + kruskal(n, edges)
  }

  if (part == 1 || part == 2) return size(stars)

  let group = c => {
    let s = stars.find(s => c.some(t => dist(s, t) < 6))
    if (s) c.push(s), stars = stars.filter(e => e != s), group(c)
  }

  let c, sizes = []
  while (len(stars)) {
    group(c = [stars.pop()])
    sizes.push(size(c))
  }
  sizes.sort((a, b) => b - a)
  return sizes[0] * sizes[1] * sizes[2]
}

test(day17, 1, 144)
test(day17, 2, 1267)
test(day17, 3, 8598024096)