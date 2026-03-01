require('../everybody/codes')

let day4 = (notes, part) => {

  let gears = notes.map(e => e.split`|`).flat().map(int)
  
  if (part == 1) return int(2025 * gears[0] / gears.at(-1))
  if (part == 2) return cei(10000000000000 * gears.at(-1) / gears[0])
  if (part == 3) return int(100 * gears.fold((r, e, i) => i % 2 ? r / e : r * e, 1))

  }

test(day4, 1, 14464)
test(day4, 2, 2674066599395)
test(day4, 3, 159722975445)