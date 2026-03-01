require('../everybody/codes')

let day2 = (notes, part) => {

  let A = notes[0].match(/-?\d+/g).map(big)

  let add = ([a, b], [c, d]) => [a + c, b + d]
  let div = ([a, b], [c, d]) => [a / c, b / d]
  let mul = ([a, b], [c, d]) => [a * c - b * d, a * d + b * c]
  
  if (part == 1) {
    let R = [0n, 0n]
    for (let i = 0; i < 3; i++) {
      R = mul(R, R)
      R = div(R, [10n, 10n])
      R = add(R, A)
    }
    return '[' + str(R) + ']'
  }

  let cyc = P => {
    let R = [0n, 0n]
    for (let i = 0; i < 100; i++) {
      R = mul(R, R)
      R = div(R, [100000n, 100000n])
      R = add(R, P)
      if (abs(R[0]) > 1000000) return 0
      if (abs(R[1]) > 1000000) return 0
    }
    return 1
  }

  let res = 0
  let B = add(A, [1000n, 1000n])
  let step = part == 2 ? 10n : 1n
  for (let y = A[1]; y <= B[1]; y += step)
    for (let x = A[0]; x <= B[0]; x += step)
      res += cyc([x, y])
  return res
}

test(day2, 1, '[250412,734364]')
test(day2, 2, 593)
test(day2, 3, 55441)