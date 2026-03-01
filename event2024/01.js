require('../everybody/codes')

let day1 = (notes, part) => {

  let inp = notes[0]
  let mul = [0, 0, 2, 6]
  let pot = { A: 0, B: 1, C: 3, D: 5 }

  return inp
  . match(eval(`/${'.'
  . repeat(part)}/g`))
  . fold((r, e) => [...e]
  . fold((r, e) => r += ~~pot[e], r) + mul[len(e
  . match(/[^x]/g) || [])], 0)
}

test(day1, 1, 1265)
test(day1, 2, 5581)
test(day1, 3, 28380)