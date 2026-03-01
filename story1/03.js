require('../everybody/codes')

let day3 = (notes, part) => {

  let pos = notes.map(e => e.match(/\d+/g).map(int))

  if (part == 1)
    return pos.fold((r, [x, y]) => {
      let mod = y + x - 1
      x = (--x + 100) % mod + 1
      y = (--y - 100) % mod
      y = (y + mod) % mod + 1
      return r += x + 100 * y
    }, 0)

  //param pairs: [ [n1, m1], [n1, m1], [n1, m1], ...]
  //returns x: x == n1 (mod m1) == n2 (mod m2) == n3 (mod m3) ...
  let chinese_remainder = pairs => {
    let ext_gcd = (a, b) => {
      if (!b) return [a, 1, 0]
      let [g, x, y] = ext_gcd(b, a % b)
      return [g, y, x - int(a / b) * y]
    }
    let m = pairs.fold((m, [a, b]) => m * b, 1)
    let x = pairs.fold((x, [a, b]) => x + (m / b) * a * ext_gcd(m / b, b)[1], 0)
    return (x % m + m) % m
  }

  let pairs = pos.map(([x, y]) => [y, x + y - 1])
  return chinese_remainder(pairs) - 1
}

test(day3, 1, 3150)
test(day3, 2, 1098717)
test(day3, 3, 92164644826)