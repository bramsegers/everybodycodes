require('../everybody/codes')

let day1 = (notes, part) => {

  let idx = notes.findIndex(e => !e)
  let nails = notes.slice(0, idx)
  let tokens = notes.slice(idx + 1)
  let slots = arr(nails[0].match(/\*/g), i => 2 * i)

  let toss = (column, token) => {
    let idx = 0
    let slot1 = (column + 3) >> 1
    nails.for(n => {
      if (n[column] == '.') return
      let t = token[idx++]
      if (t == 'R') column += n[column + 1] ? 1 : -1
      if (t == 'L') column += n[column - 1] ? -1 : 1
    })
    let slot2 = (column + 3) >> 1
    return max(0, 2 * slot2 - slot1)
  }

  if (part == 1)
    return slots.fold((r, s) => r + 
    toss(s, tokens.shift()), 0)

  if (part == 2)
    return tokens.fold((r, t) =>
      r + slots.fold((r, s) =>
      max(r, toss(s, t)), 0), 0)

  if (part == 3) {
    
    let smin = +inf
    let smax = -inf
    let scores = tokens.map(t => slots.map(s => toss(s, t)))

    let permute = (i, seen, score) =>
      tokens[i] ? slots.for((_, j) => (seen >> j) % 2 ||
      permute(i + 1, seen | (1 << j), score + scores[i][j])) : 
      (smin = min(smin, score), smax = max(smax, score))

    permute(0, 0, 0)
    return smin + ' ' + smax
  }
}

test(day1, 1, 40)
test(day1, 2, 1200)
test(day1, 3, '36 117')