require('../everybody/codes')

let day14 = (notes, part) => {

  let paths = notes
  . map(e => e.split`,`
  . map(([a, ...b]) => [a, +b
  . join``]))

  let nb = (i, j, k) => [
    [i - 1, j, k], [i + 1, j, k], [i, j - 1, k], 
    [i, j + 1, k], [i, j, k - 1], [i, j, k + 1]
  ]

  let maxh = 0
  let segm = set()
  let trunk = set()
  let leaves = []
  let key = (x, y, z) => x + ',' + y + ',' + z

  paths.for(path => {
    let [x, y, z] = [0, 0, 0]
    path.for(([dir, steps]) => {
      while (steps--) {
        if (dir == 'U') y++
        if (dir == 'D') y--
        if (dir == 'R') x++
        if (dir == 'L') x--
        if (dir == 'F') z++
        if (dir == 'B') z--
        maxh = max(maxh, y)
        segm.add(key(x, y, z))
        if (x == 0 && z == 0) trunk.add(key(x, y, z))
      }
    })
    leaves.push([x, y, z])
  })

  if (part == 1) return maxh
  if (part == 2) return len(segm)

  let dist = ([x, y, z], tgt) => {
    let Q = [[x, y, z]], R
    let V = set()
    V.add(key(x, y, z))
    for (let d = 0, k; ; d++) {
      [Q, R] = [[], Q]
      for ([x, y, z] of R) {
        if (key(x, y, z) == tgt) return d
        for ([x, y, z] of nb(x, y, z))
          if (segm.has(k = key(x, y, z)) && !V.has(k)) 
            V.add(k), Q.push([x, y, z])
      }
    }
  }

  return arr(trunk).fold((r, t) =>
    min(r, leaves.fold((d, [x, y, z]) =>
      d + dist([x, y, z], t), 0)), inf)
}

test(day14, 1, 150)
test(day14, 2, 4968)
test(day14, 3, 1636)