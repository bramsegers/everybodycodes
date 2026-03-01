require('../everybody/codes')

let day3 = (notes, part) => {

  let nb = neighbors(part < 3 ? 'N E S W' : 'N NE E SE S SW W NW')
  
  let g = notes
  . map(e => arr(e)
  . map(c => int(c == '#')))

  for (let m = 1, n = 1; m; n++)
    g.for((e, i) => e.for((c, j) => c == n &&
      nb(i, j).every(([i, j]) => g[i] && (g[i][j] == n ||
        g[i][j] == n + 1)) && (m = 1, g[i][j] = n + 1)), m = 0)

  return g
  . fold((r, e) => e
  . fold((r, e) => r + e, r), 0)
}

test(day3, 1, 122)
test(day3, 2, 2740)
test(day3, 3, 10422)