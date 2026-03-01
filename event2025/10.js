require('../everybody/codes')

let day10 = (notes, part) => {

  let res = 0
  let board = notes.map(e => arr(e))
  let dy = board.findIndex(e => e.includes('D'))
  let dx = board[dy].indexOf('D')

  let moves = (i, j) => [
    [i - 2, j - 1], [i - 2, j + 1], [i - 1, j - 2], [i - 1, j + 2],
    [i + 1, j - 2], [i + 1, j + 2], [i + 2, j - 1], [i + 2, j + 1]]
  . filter(([i, j]) => board[i] && board[i][j])

  let safe = (i, j) => board[i][j] == '#'


  if (part == 1) {

    let q = [[dy, dx]]

    for (let r = 4; r--;)
      q = q.fold((q, [i, j]) => (
        moves(i, j).for(([i, j], c) => (
          res += (c = board[i][j]) == 'S',
          c == (board[i][j] = 'D') || q.push([i, j])
        )), q), [])
  }


  if (part == 2) {

    let key = (i, j) => (i << 8) | j
    let q = set([key(dy, dx)])

    let sheep = board.fold((s, e, i) => (e
    . for((v, j) => v == 'S' && s.push([i, j])), s), [])

    let flt = s => s.filter(([i, j], u, v) => (u = 
      safe(i, j), v = q.has(key(i, j)), res += !u && v, u || !v))

    for (let r = 20; r--;)
      q = arr(q).fold((q, k) => (
        moves(k >> 8, k & 255).for(([i, j]) =>
          q.add(key(i, j))), q), set()),
        sheep = flt(flt(sheep).map(([i, j]) =>
          [i + 1, j]).filter(([i]) => board[i]))
  }


  if (part == 3) {

    let mem = map()
    let sheep = board[0].map(e => e == 'S' ? 0 : -1)

    let f = (y, x, sheep) => {
      let res = 0, move = 0
      let key = [y, x, ...sheep].join`,`
      if (mem.has(key)) return mem.get(key)
      if (sheep.every(s => s < 0)) return (mem.set(key, 1), 1)
      sheep.for((sy, sx) => sy < 0 || (sx == x && sy + 1 == y && !safe(y, x))
        || (board[sy + (move = 1)] && moves(y, x).for(([y, x]) => res += f(y, x,
        sheep.map((e, i) => (e = i == sx ? sy + 1 : e) != y || i != x || safe(y, x) ? e : -1)))))
      res += !move && moves(y, x).fold((r, [y, x]) => r + f(y, x, sheep), 0)
      return (mem.set(key, res), res)
    }

    res = f(dy, dx, sheep)
  }

  return res
}

test(day10, 1, 147)
test(day10, 2, 1729)
test(day10, 3, 614828100345380)