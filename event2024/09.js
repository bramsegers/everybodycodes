require('../everybody/codes')

let day9 = (notes, part) => {

  let stamps = notes[0].split`,`.map(int)
  let nums = notes.slice(2).map(int)

  let q = [0]
  let best = [0]
  let lim = max(nums)

  for (let steps = 1; len(q); steps++) {
    let q2 = []
    for (let n of q) {
      for (let e of stamps) {
        if ((e += n) > lim) break
        if (e in best) continue
        best[e] = steps
        q2.push(e)
      }
    }
    q = q2
  }

  let f = n => best[n]

  let g = n => {
    let c = inf
    let u = max(1, cei((n - 100) / 2))
    for (let a = u; a <= n / 2; a++)
      c = min(c, f(a) + f(n - a))
    return c
  }

  return nums.fold((r, e) => r += part < 3 ? f(e) : g(e), 0)
}

test(day9, 1, 12188)
test(day9, 2, 5093)
test(day9, 3, 148004)