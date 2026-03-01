require('../everybody/codes')

let day1 = (notes, part) => {

  let modpow = (b, e, m) => {
    let r = 1
    while (e)
      r = (e % 2) ? (r * b) % m : r,
      b = (b * b) % m,
      e = int(e / 2)
    return r
  }

  let nums = notes
  . map(e => e
  . match(/\d+/g)
  . map(int))

  let eni1 = (b, e, m, n = 1) => {
    let r = ''
    while (e--) {
      n = n * b % m
      r = n + r
    }
    return +r
  }

  let eni2 = (b, e, m) => {
    let n = modpow(b, e - 5, m)
    return eni1(b, 5, m, n)
  }

  let eni3 = (b, e, m) => {

    let i = 0
    let s = 0
    let v = b % m
    let seen = []
    let vals = []

    while (!(v in seen)) {
      seen[v] = i++
      vals.push(v)
      s += v
      v *= b
      v %= m
    }

    let pre = seen[v]
    let cyc = vals.slice(pre)
    let rem = (e - pre) % (i - pre)
    let mul = int((e - pre) / (i - pre))
    let res = (pre && s) + mul * sum(cyc)
    return res + (rem && sum(cyc.slice(0, rem)))
  }

  let fn = part == 1 ? eni1 : part == 2 ? eni2 : eni3

  return nums.fold((r, [A, B, C, X, Y, Z, M]) => max(r,
    fn(A, X, M) + fn(B, Y, M) + fn(C, Z, M)), 0)
}

test(day1, 1, 1080819427)
test(day1, 2, 155691917446501)
test(day1, 3, 539663128742322)