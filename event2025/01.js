require('../everybody/codes')

let day1 = (notes, part) => {

  let names = notes[0].split`,`
  let instr = notes[2].split`,`
  let k = len(names)

  let i = 0
  instr.for(([d, ...n]) => {
    let v = +n.join``
    let j = d == 'R' ? v : -v
    if (part == 1) i = min(k - 1, max(0, i + j))
    if (part == 2) i = ((i + j) % k + k) % k
    if (part == 3) j = (j % k + k) % k, [names[0], names[j]] = [names[j], names[0]]
  })

  return names[i]
}

test(day1, 1, 'Dorfyr')
test(day1, 2, 'Pylaririn')
test(day1, 3, 'Valvoran')