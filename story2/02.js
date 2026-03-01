require('../everybody/codes')

let day2 = (notes, part) => {

  let rep = [1, 100, 100000][part - 1]
  let balls = arr(notes[0].repeat(rep))

  let siz = len(balls)
  let mid = siz >> 1
  let shf = 0

  let shots = 0

  for (let i = 0; i < siz; i++) {
    let c = 'RGB'[shots++ % 3]
    if (part == 1) 
      while (balls[i] == c) i++
    else {
      if (balls[shf++] != c || i % 2) mid += i % 2 
      else balls[mid++] = 1, i++
      while (+balls[shf]) shf++
    }
  }

  return shots
}

test(day2, 1, 131)
test(day2, 2, 21645)
test(day2, 3, 21479022)