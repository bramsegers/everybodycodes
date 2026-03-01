require('../everybody/codes')

let day5 = (notes, part) => {

  let t = notes.map(e => e.match(/\d+/g).map(int))
  let q = t.fold((q, e) => (e.for((v, i) => (q[i] ||= []).push(v)), q), [])

  let rnd = 0
  let mres = 0
  let seen = {}

  while (1) {

    let v = q[rnd % len(q)].shift()
    let a = q[++rnd % len(q)]
    let k = len(a)
    let n = (v - 1) % (2 * k)
    let s = n < k ? n : k - (n % k)
    a.splice(s, 0, v)
    
    let res = +q.fold((r, e) => r += e[0], '')
    mres = max(res, mres)

    if (part == 1 && rnd == 10) return res
    if (part == 2 && (seen[res] = -~seen[res]) == 2024) return rnd * res
    if (part == 3 && rnd == 1e6) return mres

  }
}

test(day5, 1, 2233)
test(day5, 2, 21794161599210)
test(day5, 3, 7615100410061002)