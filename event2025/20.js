require('../everybody/codes')

let day20 = (notes, part) => {

  let [h, w] = dimensions(notes)
  let tri = arr(2 * h, _ => arr(w, '.'))
  notes.for((e, y) => arr(e).for((v, x) => tri[y * 2 + (x + y) % 2][x] = v))

  let valid = (tri, i, j) =>
    i in tri && /[TSE]/.test(tri[i][j])

  let rot_120 = t => {
    let r = t.map(e => e.map(_ => '.'))
    t.for((e, i) => e.for((v, j) => {
      let y = j - int(i / 2)
      let x = i + int(y / 2)
      if (t[y] && t[y][x]) r[y][w - x - 1] = v
    }))
    return r
  }

  if (part == 1) {
    let res = 0
    let nbs = neighbors('NW N NE SW S SE')
    tri.for((row, i) => row.for((_, j) =>
      res += valid(tri, i, j) &&
      nbs(i, j).fold((r, [i, j]) =>
        r + valid(tri, i, j), 0)))
    return res / 2
  }

  if (part == 2 || part == 3) {
    let seen = set()
    let nbs = neighbors('_ NW N NE SW S SE')
    let prev, queue = [location('S', tri)]
    let rots = part == 2 ? 1 : 3
    let triangles = arr(rots, t => (t = tri, tri = rot_120(t), t))
    for (let d = 1; queue[0]; d++) {
      [queue, prev] = [[], queue]
      tri = triangles[d % rots]
      for (let [i, j] of prev) {
        for (let [y, x] of nbs(i, j)) {
          if (!valid(tri, y, x)) continue
          let k = y + ',' + x + ',' + (d % rots)
          if (!seen.has(k)) seen.add(k), queue.push([y, x])
          if (tri[y][x] == 'E') return d
        }
      }
    }
  }

}

test(day20, 1, 129)
test(day20, 2, 587)
test(day20, 3, 486)