require('../everybody/codes')

let day12 = (notes, part) => {

  let grid = notes
  let height = len(grid)

  let launch = []
  let targets = []

  if (part == 1 || part == 2) {

    let val = c => ord(c) - 64

    let find = (ti, tj) => {
      for (let pow = 1; ; pow++)
        for (let [i, j, c] of launch)
          for (let n = 0; i < height; n++) {
            i += n < pow ? -1 : n < 2 * pow ? 0 : 1
            if (++j == tj && i == ti) return c * pow
          }
    }

    grid.for((e, i) => arr(e).for((c, j) => {
      c == 'T' ? targets.push([i, j, 1]) :
      c == 'H' ? targets.push([i, j, 2]) :
      c >= 'A' && launch.push([i, j, val(c)])
    }))

    return targets.fold((r, [i, j, k]) =>
      r + find(i, j) * k, 0)
  }

  if (part == 3) {

    grid.for(e => targets.push(e.split` `.map(int)))

    let besth
    let bestscore

    let find = (i, j, ti, tj) => {
      for (let pow = 1; pow < 2000; pow++) {
        let [u, v] = [i, j]
        for (let n = 0; u >= 0; n++) {
          u += n < pow ? 1 : n < 2 * pow ? 0 : -1
          if (++v > tj - n - 1) break
          if (u - v == ti - tj) {
            let h = u
            if (h < 0) continue
            let score = (i + 1) * pow
            if (h > besth || (h == besth && score < bestscore)) {
              besth = h
              bestscore = score
            }
          }
        }
      }
    }

    let res = 0
    for (let [j, i] of targets) {
      besth = 0
      bestscore = inf
      for (let k = 0; k < 3; k++)
        find(k, 0, i, j)
      res += bestscore
    }

    return res
  }
}

test(day12, 1, 253)
test(day12, 2, 21640)
test(day12, 3, 733309)