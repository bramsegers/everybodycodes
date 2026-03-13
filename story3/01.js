require('../everybody/codes')
 
let day1 = (notes, part) => {
 
  let val = s => +('0b' + s.replace(/./g, c => +(c < 'a')))
  let colors = notes.map(e => e.split(/:| /).map((e, i) => i ? val(e) : +e))
 
  return +
    part == 1 ? colors.fold((t, [n, r, g, b]) => t += g > r && g > b ? n : 0, 0) :
    part == 2 ? colors.sort(([, r, g, b, s], [, R, G, B, S]) => S - s || r + g + b - R - G - B)[0][0] :
    part == 3 ? sum(colors.fold((G, [n, r, g, b, s]) => (
      s = s < 31 ? -1 : s > 32 ? 2 : 0,
      s && r > g && r > b && G[s + 1].push(n),
      s && g > r && g > b && G[s + 2].push(n),
      s && b > r && b > g && G[s + 3].push(n), G),
      arr(6, _ => [])).sort((a, b) => len(b) - len(a))[0]) : -1
}
 
test(day1, 1, 49899)
test(day1, 2, 81576)
test(day1, 3, 10501225)