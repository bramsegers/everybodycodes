require('../everybody/codes')

let day19 = (notes, part) => {

  let walls = Object
  . entries(notes
  . map(e => e.split`,`.map(int))
  . fold((r, [a, b, c]) => ((r[a] ||= [])
  . push([b, c]), r), {}))
  . sort(([a], [b]) => a - b)
  . map(([k, v]) => [+k, v])

  let flaps = map([[0, 0]])

  walls.for(([x, gaps], i) => {
    let flaps2 = map()
    let dx = i ? x - walls[i - 1][0] : x
    gaps.for(([a, b]) => {
      for (let y = a; y < a + b; y++) {
        for (let [y0, need] of flaps) {
          let dy = y - y0
          if (dx < abs(dy) || (dy - dx) % 2) continue
          need += max(0, dy) + (dx - abs(dy)) / 2
          flaps2.set(y, need)
        }
      }
    })
    flaps = flaps2
  })
 
  return min(...flaps.values())
}

test(day19, 1, 60)
test(day19, 2, 778)
test(day19, 3, 4652450)