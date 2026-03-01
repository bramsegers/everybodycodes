require('../everybody/codes')

let day11 = (notes, part) => {
  
  let map = notes
  . map(e => e
  . match(/[A-Z]+/g))
  . fold((r, [a, ...b]) => 
    (r[a] = arr(b), r), {})
  
  let pop = f => sum(Object.values(f))

  let gen = (f, r) => {
    while (r--) {
      let g = {}
      for (let a in f)
        for (let b of map[a])
          g[b] = (g[b] || 0) + f[a]
      f = g
    }
    return f
  }

  if (part == 1) return pop(gen({ A: 1 }, 4))
  if (part == 2) return pop(gen({ Z: 1 }, 10))

  let minp = inf
  let maxp = -inf
  for (let k in map) {
    let p = pop(gen({ [k]: 1 }, 20))
    minp = min(minp, p)
    maxp = max(maxp, p)
  }
  return maxp - minp
}

test(day11, 1, 34)
test(day11, 2, 202637)
test(day11, 3, 1304072797850)