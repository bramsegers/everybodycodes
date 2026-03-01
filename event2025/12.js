require('../everybody/codes')

let day12 = (notes, part) => {

  let barrels = notes.map(e => arr(e).map(int))
  let height = len(barrels)
  let width = len(barrels[0])

  let bounds = (i, j) => j in (barrels[i] || [])
  let nb = neighbors('N E S W', bounds)

  let f = (i, j, bar, val = bar[i][j]) =>
    nb(i, j).fold((r, [i, j]) =>
    bar[i][j] < 0 || bar[i][j] > val ? r : 
    f(i, j, bar) + r, 1, bar[i][j] = -1)

  let g = (bar, rounds) => {
    if (!rounds) return 0
    let best = 0, bestb
    bar.for((e, i) => e.for((v, j) => {
      let m = max(nb(i, j).map(([i, j]) => bar[i][j]))
      if (v < 0 || m > v) return // only consider local maximums
      let b = bar.map(e => arr(e))
      let r = f(i, j, b)
      if (r > best) best = r, bestb = b
    }))
    return best + g(bestb, rounds - 1)
  }

  if (part == 1) return f(0, 0, barrels)
  if (part == 2) return f(0, 0, barrels) + f(height - 1, width - 1, barrels)
  if (part == 3) return g(barrels, 3)
}

test(day12, 1, 262)
test(day12, 2, 5711)
test(day12, 3, 4119)