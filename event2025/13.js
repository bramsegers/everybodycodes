require('../everybody/codes')

let day13 = (notes, part) => {

  let nums = [[1, 1, 0]]
  let [left, right] = [1, len(notes)]

  let parse = part == 1 ? s => [+s, +s] : s => s.split`-`.map(int)
  notes.for((s, i) => nums[i % 2 ? right-- : left++] = [...parse(s), i % 2])

  let size = nums.fold((r, [a, b]) => r + b - a + 1, 0)
  let turns = +'2025'.repeat(part)
  let target = turns % size

  let pos = 0
  let [a, b, rev] = nums.find(([a, b]) => (pos += b - a + 1) > target)
  let res = target - pos + b - a + 1
  return rev ? b - res : a + res
}

test(day13, 1, 879)
test(day13, 2, 8398)
test(day13, 3, 72258)