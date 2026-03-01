require('../everybody/codes')

let day16 = (notes, part) => {

  let nums = notes[0].split`,`.map(int)
  let pos = nums.map(_ => 0)
  
  let reels = nums
  . map((_, i) => notes
  . slice(2)
  . map(e => e
  . slice(i * 4, i * 4 + 3)
  . trim())
  . filter(e => e))

  let spins = part == 1 ? 100 : part == 2 ? 202420242024 : 256

  let score = s => {
    let f = [...s].fold((f, c, i) => (i % 3 == 1 || (f[c] = -~f[c]), f), {})
    return Object.values(f).fold((r, v) => r + max(0, v - 2), 0)
  }

  let spin = (pos, n) => pos.map((e, i) => (e + nums[i] + n) % len(reels[i]))

  let bar = (pos) => pos.fold((r, e, i) => r + reels[i][e], '')

  if (part == 1 || part == 2) {

    let tscore = 0
    for (let i = 1; i <= spins; i++) {
      pos = spin(pos, 0)
      tscore += score(bar(pos))
      if (sum(pos) == 0) {
        tscore *= int(spins / i)
        i = spins - (spins % i)
      }
    }

    if (part == 1) return bar(pos).match(/.../g).join` `
    if (part == 2) return tscore
  }

  let f = (i, pos, fn, mem) => {
    if (!i) return 0
    let k = i + ',' + pos.join`,`
    if (k in mem) return mem[k]
    let p1 = spin(pos, -1)
    let p2 = spin(pos, +0)
    let p3 = spin(pos, +1)
    return mem[k] = fn([
      score(bar(p1)) + f(i - 1, p1, fn, mem),
      score(bar(p2)) + f(i - 1, p2, fn, mem),
      score(bar(p3)) + f(i - 1, p3, fn, mem)
    ])
  }

  let smax = f(spins, pos, max, {})
  let smin = f(spins, pos, min, {})
  return smax + ' ' + smin
}

test(day16, 1, '*,* ^:^ -,* -,*')
test(day16, 2, 126238308818)
test(day16, 3, '568 62')