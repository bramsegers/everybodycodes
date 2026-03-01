require('../everybody/codes')

let day3 = (notes, part) => {

  let nums = notes[0].match(/\d+/g).map(int)

  if (part == 1) return sum(arr(set(nums)))
  if (part == 2) return sum(arr(set(nums)).sort((a, b) => a - b).slice(0, 20))
  if (part == 3) return max(Object.values(nums.fold((f, e) => (f[e] = -~f[e], f), {})))

}

test(day3, 1, 2540)
test(day3, 2, 247)
test(day3, 3, 2853)