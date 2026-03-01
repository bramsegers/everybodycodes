require('../everybody/codes')

let day6 = (notes, part) => {

  let pairs = ['Aa', 'Bb', 'Cc']

  let solve1 = ([mentor, novice]) =>
    arr(notes[0]).fold(([p, m], c) => [
      p += c == novice ? m : 0,
      m += c == mentor ? 1 : 0
    ], [0, 0])[0]

  let solve2 = ([mentor, novice]) =>
    sum([notes1, notes2].map(notes => {
      let [q, r, i, j] = [[], 0, 0, 0]
      arr(notes).for((c, k) => {
        if (k - q[i] > 1000) i++
        if (c == mentor) q[j++] = k
        if (c == novice) r += j - i
      }); return r
    }))

  if (part == 1) return solve1(pairs[0])
  if (part == 2) return sum(pairs.map(solve1))

  let notes1 = notes[0].repeat(1000)
  let notes2 = arr(notes1).reverse()
  return sum(pairs.map(solve2))
}

test(day6, 1, 184)
test(day6, 2, 3933)
test(day6, 3, 1665001456)