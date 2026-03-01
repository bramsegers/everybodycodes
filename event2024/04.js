require('../everybody/codes')

let day4 = (notes, part) => {

  let a = notes.map(int)
  if (part < 3) return a.fold((r, e) => r + e, 0) - len(a) * min(a)  
  let m = a.sort((a, b) => a - b)[len(a) >> 1]
  return a.fold((r, e) => r + abs(e - m), 0)

}

test(day4, 1, 71)
test(day4, 2, 882639)
test(day4, 3, 129525646)