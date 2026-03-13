require('../everybody/codes')

let day2 = (notes, part) => {

  let off = 80
  let nb1 = neighbors('N E S W')
  let nb2 = part < 3 ? nb1 : neighbors('N N N E E E S S S W W W')
  let [y, x] = location('@', notes).map(e => e + off)

  let bones = []
  notes.for((e, i) => arr(e).for((v, j) =>
    v == '#' && bones.push([i + off, j + off])))
  let [Y, X] = bones[0]

  let grid = arr(2 * off, _ => arr(2 * off, 0))
  if (part > 1) bones.for(([Y, X]) => grid[Y][X] = 1)
  grid[y][x] = 1

  let fill = () => {
    let q = [[0, 0]]
    while (q[0]) {
      let q2 = []
      for (let [i, j] of q)
        if (!grid[i][j])
          grid[i - 1] && q2.push([i - 1, j]),
          grid[i + 1] && q2.push([i + 1, j]),
          grid[j - 1] && q2.push([i, j - 1]),
          grid[j + 1] && q2.push([i, j + 1]),
          grid[i][j] = 2
      q = q2
    }
    grid = grid.map(e => e.map(v => v == 2 ? 0 : 1))
  }

  for (let i = 0, n = 1; ; n++) {
    for (let m; !m; i++) {
      let nb = nb2(y, x)
      let [u, v] = nb[i % len(nb)]
      m = !grid[u][v] && (grid[y = u][x = v] = 1)
    }
    if (part == 1 ? (y == Y && x == X) : bones.every(([y, x]) =>
      nb1(y, x).every(([y, x]) => grid[y][x]), fill()))
      return n
  }
}

test(day2, 1, 237)
test(day2, 2, 3592)
test(day2, 3, 2392)