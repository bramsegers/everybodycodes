require('../everybody/codes')

let day2 = (notes, part) => {

  let runic = notes[0].split(':')[1].split(',')
  let inscr = notes.slice(2)

  if (part == 1) return runic
  . fold((r, e) => r + len(inscr[0]
  . match(eval(`/${e}/g`)) || []), 0)

  let H = len(inscr)
  let W = max(inscr.map(len))
  let grid = arr(H, _ => arr(W, 0))
  let dirs = neighbors(part == 2 ? 'E W' : 'N E S W')(0, 0)

  let X = x => part == 2 ? x : (x + W) % W

  let V = (r, y, x, i, j, k, c) => {
    if (!r[k]) return c.for(([i, j]) => grid[i][j] = 1)
    if (inscr[i] && inscr[i][j] == r[k])
      V(r, y, x, i + y, X(j + x), k + 1, c, c.push([i, j]))
  }

  grid.for((e, i) => e.for((_, j) =>
    runic.for(r => dirs.for(([y, x]) =>
      V(r, y, x, i, j, 0, [])))))

  return grid.fold((r, e) => e.fold((r, e) => r + e, r), 0)
}

test(day2, 1, 35)
test(day2, 2, 5123)
test(day2, 3, 11679)