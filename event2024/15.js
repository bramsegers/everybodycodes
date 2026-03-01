require('../everybody/codes')

let day15 = (notes, part) => {

  let grid = notes.map(e => arr(e))
  let height = len(grid)
  let width = len(grid[0])
  let start = [0, grid[0].indexOf('.')]
  let moves = neighbors('N E S W')

  let solve = ([y, x], herbs) => {

    let mul = 2 ** len(herbs)
    let key = (i, j, c) => (width * i + j) * mul + c
    let val = arr(herbs).fold((d, c, i) => (d[c] = 2 ** i, d), {})

    let tgt = key(y, x, mul - 1)
    let queue = [[y, x, 0]]
    let seen = i32(width * height * mul)
    seen[key(y, x, 0)] = 1

    for (let d = 1; queue[0]; d++) {
      let q2 = []
      for (let [i, j, c] of queue) {
        for ([i, j] of moves(i, j)) {
          let v = grid.at(i)[j]
          if (v != '.' && !val[v]) continue
          let c2 = c | val[v]
          let k = key(i, j, c2)
          if (k == tgt) return d
          if (seen[k]) continue
          q2.push([i, j, c2])
          seen[k] = 1
        }
      }
      queue = q2
    }
  }

  if (part == 1) return solve(start, 'H')
  if (part == 2) return solve(start, 'ABCDE')

  // part 3 - my input
  // ################ ################
  // # A     A  #  G   G  #  N     N #
  // #          #         #          #
  // #    B     #    H    #     O    #
  // #          #         #          #
  // # C     C  #  I   I  #  P     P #
  // #          #         #          #
  // # E  D  E  K    J    K  R  Q  R #
  // #################################

  let y = height - 2
  let K = [y, grid[y].indexOf('K')]
  let Z = [y, grid[y].lastIndexOf('K')]
  grid[Z[0]][Z[1]] = 'Z'

  let res1 = solve(start, 'GHIJKZ')
  let res2 = solve(K, 'ABCDEK')
  let res3 = solve(Z, 'NOPQRZ')
  return res1 + res2 + res3
}

test(day15, 1, 196)
test(day15, 2, 540)
test(day15, 3, 1526)