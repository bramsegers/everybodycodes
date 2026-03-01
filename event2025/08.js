require('../everybody/codes')

let day8 = (notes, part) => {

  let nails = notes[0].match(/\d+/g).map(int)
  let lines = nails.map((e, i) => [nails[i - 1] - 1, e - 1].sort(((a, b) => a - b))).slice(1)

  let diff = (a, b, c, d) => a == c || a == d || b == c || b == d
  let cross = (a, b, c, d) => diff(a, b, c, d) ? a == c && b == d : (a < c && c < b) != (a < d && d < b)

  if (part == 1) return lines.fold((r, [a, b]) => r += b - a == 16, 0)
  if (part == 2) return lines.fold((r, [a, b], i) => lines.slice(0, i).fold((r, [c, d]) => r + cross(a, b, c, d), r), 0)
  if (part == 3) return arr(256, i => arr(i, j => [j, i])).flat().fold((r, [a, b]) => max(r, lines.fold((r, [c, d]) => r += cross(a, b, c, d), 0)), 0)
}

test(day8, 1, 56)
test(day8, 2, 2928109)
test(day8, 3, 2793)